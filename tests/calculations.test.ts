import { describe, it, expect } from "vitest";
import { calculatePay, evaluateFatigueRules } from "@/lib/calculations";
import { AttendanceRecord, Shift, WorkplacePolicySettings } from "@/types";

describe("Transparent Pay Calculation Engine", () => {
  it("calculates regular wages and overtime accurately at 1.5x multiplier", () => {
    const result = calculatePay({
      baseHourlyRate: 110,
      regularHours: 192,
      overtimeHours: 28,
      overtimeMultiplier: 1.5,
      allowances: [
        { name: "Site Conveyance", amount: 1200 },
        { name: "Safety Helmet & Gear", amount: 500 },
      ],
      deductions: [
        { name: "EPF (12%)", amount: 2534 },
        { name: "ESIC (0.75%)", amount: 158 },
      ],
    });

    // 110 * 1.5 = 165
    expect(result.overtimeRate).toBe(165);
    // 192 * 110 = 21120
    expect(result.baseWages).toBe(21120);
    // 28 * 165 = 4620
    expect(result.overtimePay).toBe(4620);
    // 21120 + 4620 + 1700 = 27440 gross
    expect(result.grossEarnings).toBe(27440);
    // 2534 + 158 = 2692 total deductions
    expect(result.totalDeductions).toBe(2692);
    // 27440 - 2692 = 24748 net
    expect(result.netPayable).toBe(24748);
    expect(result.plainExplanation).toContain("adds ₹4,620 to your base wages of ₹21,120");
  });

  it("handles zero overtime correctly", () => {
    const result = calculatePay({
      baseHourlyRate: 125,
      regularHours: 160,
      overtimeHours: 0,
      overtimeMultiplier: 1.5,
    });

    expect(result.baseWages).toBe(20000);
    expect(result.overtimePay).toBe(0);
    expect(result.grossEarnings).toBe(20000);
    expect(result.netPayable).toBe(20000);
  });
});

describe("Explainable Fatigue & Fair-Shift Rules", () => {
  const samplePolicy: WorkplacePolicySettings = {
    organizationName: "Test Org",
    standardWorkdayHours: 8,
    overtimeThresholdHours: 8,
    overtimeMultiplier: 1.5,
    requiredRestIntervalHours: 10,
    weeklyHourWarningThreshold: 60,
    maxConsecutiveNightShifts: 3,
    privacyMinimumGroupSize: 5,
    supportedLanguages: ["en", "hi", "ta", "te"],
  };

  it("flags single shift exceeding 12 hours as high risk", () => {
    const records: AttendanceRecord[] = [
      {
        id: "att-test-1",
        shiftId: "s-1",
        workerId: "worker-1",
        workerName: "Test Worker",
        date: "2026-10-25",
        checkInTime: "07:00",
        checkOutTime: "20:30",
        checkInMethod: "qr_code",
        locationVerified: true,
        actualHoursWorked: 13.5, // > 12h
        regularHours: 8,
        overtimeHours: 5.5,
        breakDurationMinutes: 60,
        breakStatus: "ended",
        status: "verified",
      },
    ];

    const alerts = evaluateFatigueRules("worker-1", "Test Worker", records, [], samplePolicy);
    expect(alerts.length).toBeGreaterThan(0);
    const extremeAlert = alerts.find((a) => a.ruleTriggered === "shift_over_12h");
    expect(extremeAlert).toBeDefined();
    expect(extremeAlert?.riskLevel).toBe("high");
    expect(extremeAlert?.headline).toContain("Shift exceeded 12 hours");
  });

  it("flags cumulative hours > 60 in rolling 7 days", () => {
    const records: AttendanceRecord[] = [];
    for (let i = 1; i <= 6; i++) {
      records.push({
        id: `att-7d-${i}`,
        shiftId: `s-${i}`,
        workerId: "worker-2",
        workerName: "Worker 2",
        date: `2026-10-2${i}`,
        checkInTime: "08:00",
        checkOutTime: "19:00",
        checkInMethod: "gps_location",
        locationVerified: true,
        actualHoursWorked: 11, // 6 days * 11h = 66h > 60h
        regularHours: 8,
        overtimeHours: 3,
        breakDurationMinutes: 45,
        breakStatus: "ended",
        status: "verified",
      });
    }

    const alerts = evaluateFatigueRules("worker-2", "Worker 2", records, [], samplePolicy);
    const cumulativeAlert = alerts.find((a) => a.ruleTriggered === "week_over_60h");
    expect(cumulativeAlert).toBeDefined();
    expect(cumulativeAlert?.riskLevel).toBe("high");
    expect(cumulativeAlert?.whyExplanation).toContain("Policy weekly ceiling");
  });

  it("flags turnaround rest period below 10 hours", () => {
    const records: AttendanceRecord[] = [
      {
        id: "att-rest-today",
        shiftId: "s-today",
        workerId: "worker-3",
        workerName: "Worker 3",
        date: "2026-10-25",
        checkInTime: "06:00", // Started at 6 AM next day (only 7 hours after 23:00)
        checkOutTime: "14:00",
        checkInMethod: "qr_code",
        locationVerified: true,
        actualHoursWorked: 8,
        regularHours: 8,
        overtimeHours: 0,
        breakDurationMinutes: 45,
        breakStatus: "ended",
        status: "verified",
      },
      {
        id: "att-rest-yesterday",
        shiftId: "s-yesterday",
        workerId: "worker-3",
        workerName: "Worker 3",
        date: "2026-10-24",
        checkInTime: "14:00",
        checkOutTime: "23:00", // Finished at 11 PM
        checkInMethod: "qr_code",
        locationVerified: true,
        actualHoursWorked: 9,
        regularHours: 8,
        overtimeHours: 1,
        breakDurationMinutes: 45,
        breakStatus: "ended",
        status: "verified",
      },
    ];

    const alerts = evaluateFatigueRules("worker-3", "Worker 3", records, [], samplePolicy);
    const restAlert = alerts.find((a) => a.ruleTriggered === "rest_under_10h");
    expect(restAlert).toBeDefined();
    expect(restAlert?.riskLevel).toBe("warning");
    expect(restAlert?.headline).toContain("Rest interval below 10 hours");
  });
});
