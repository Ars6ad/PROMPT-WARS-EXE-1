import {
  AttendanceRecord,
  Shift,
  WorkplacePolicySettings,
  FatigueAlert,
  SafetyReport,
  FeedbackResponse,
} from "@/types";

/**
 * Calculates earnings based on base rate, hours worked, overtime multiplier, allowances and deductions.
 * Adheres to transparent explainable formula.
 */
export function calculatePay(params: {
  baseHourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
  allowances?: { name: string; amount: number }[];
  deductions?: { name: string; amount: number }[];
}) {
  const {
    baseHourlyRate,
    regularHours,
    overtimeHours,
    overtimeMultiplier,
    allowances = [],
    deductions = [],
  } = params;

  const overtimeRate = Number((baseHourlyRate * overtimeMultiplier).toFixed(2));
  const baseWages = Math.round(regularHours * baseHourlyRate);
  const overtimePay = Math.round(overtimeHours * overtimeRate);

  const totalAllowances = allowances.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);

  const grossEarnings = baseWages + overtimePay + totalAllowances;
  const netPayable = Math.max(0, grossEarnings - totalDeductions);

  const plainExplanation = `You worked ${regularHours} regular hours and ${overtimeHours} overtime hours. At your configured overtime rate of ₹${overtimeRate}/hr (${overtimeMultiplier}x), your overtime adds ₹${overtimePay.toLocaleString(
    "en-IN"
  )} to your base wages of ₹${baseWages.toLocaleString("en-IN")}.`;

  return {
    baseHourlyRate,
    regularHours,
    overtimeHours,
    overtimeRate,
    baseWages,
    overtimePay,
    totalAllowances,
    totalDeductions,
    grossEarnings,
    netPayable,
    plainExplanation,
  };
}

/**
 * Evaluates fatigue and shift risk rules:
 * 1. Single shift > 12h = high risk
 * 2. Less than 10h rest between shifts = warning
 * 3. More than 60h in rolling 7 days = warning
 * 4. More than 3 consecutive night shifts = warning
 */
export function evaluateFatigueRules(
  workerId: string,
  workerName: string,
  records: AttendanceRecord[],
  shifts: Shift[],
  policy: WorkplacePolicySettings
): FatigueAlert[] {
  const alerts: FatigueAlert[] = [];

  // Filter records for this worker sorted by date descending
  const workerRecords = records
    .filter((r) => r.workerId === workerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (workerRecords.length === 0) return alerts;

  // 1. Single shift > 12 hours
  const extremeShift = workerRecords.find((r) => r.actualHoursWorked > 12);
  if (extremeShift) {
    alerts.push({
      id: `alert-shift-${extremeShift.id}`,
      workerId,
      workerName,
      riskLevel: "high",
      ruleTriggered: "shift_over_12h",
      headline: `Shift exceeded 12 hours (${extremeShift.actualHoursWorked}h logged)`,
      message: `On ${extremeShift.date}, worker logged ${extremeShift.actualHoursWorked} continuous hours.`,
      whyExplanation:
        "Extended shifts beyond 12 hours significantly increase cognitive and physical fatigue, posing safety risks on site.",
      recordedAt: extremeShift.date,
      supportiveActionSuggestion:
        "Provide compensatory rest and verify adequate staffing coverage for long pours or shifts.",
    });
  }

  // 2. Rolling 7-day cumulative hours > weeklyHourWarningThreshold (default 60h or 55h)
  const recent7Days = workerRecords.slice(0, 7);
  const total7DayHours = recent7Days.reduce((acc, r) => acc + r.actualHoursWorked, 0);
  if (total7DayHours > (policy.weeklyHourWarningThreshold || 60)) {
    alerts.push({
      id: `alert-7day-${workerId}`,
      workerId,
      workerName,
      riskLevel: "high",
      ruleTriggered: "week_over_60h",
      headline: `High cumulative duty (${total7DayHours.toFixed(1)} hours in 7 days)`,
      message: `Worker has accumulated ${total7DayHours.toFixed(1)} hours over the past 7 days.`,
      whyExplanation: `Rule triggered: Policy weekly ceiling is set at ${policy.weeklyHourWarningThreshold} hours.`,
      recordedAt: new Date().toISOString().substring(0, 10),
      supportiveActionSuggestion:
        "Operational recommendation: Schedule rest day before scheduling additional overtime.",
    });
  }

  // 3. Turnaround rest time between consecutive days < policy.requiredRestIntervalHours
  for (let i = 0; i < workerRecords.length - 1; i++) {
    const curr = workerRecords[i];
    const prev = workerRecords[i + 1];

    if (curr.checkInTime && prev.checkOutTime) {
      const prevDate = new Date(`${prev.date}T${prev.checkOutTime}`);
      const currDate = new Date(`${curr.date}T${curr.checkInTime}`);
      const diffHours = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60);

      if (diffHours > 0 && diffHours < (policy.requiredRestIntervalHours || 10)) {
        alerts.push({
          id: `alert-rest-${curr.id}`,
          workerId,
          workerName,
          riskLevel: "warning",
          ruleTriggered: "rest_under_10h",
          headline: `Rest interval below ${policy.requiredRestIntervalHours} hours (${diffHours.toFixed(
            1
          )}h gap)`,
          message: `Worker had only ${diffHours.toFixed(1)} hours rest between ${prev.date} and ${curr.date}.`,
          whyExplanation: `Medical standard requires at least ${policy.requiredRestIntervalHours} hours recuperation between duties.`,
          recordedAt: curr.date,
          supportiveActionSuggestion:
            "Adjust next shift start time to guarantee a full rest interval.",
        });
        break; // Record one instance
      }
    }
  }

  // 4. Consecutive night shifts > policy.maxConsecutiveNightShifts
  const workerShifts = shifts
    .filter((s) => s.workerId === workerId && s.isNightShift)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (workerShifts.length >= (policy.maxConsecutiveNightShifts || 3)) {
    alerts.push({
      id: `alert-night-${workerId}`,
      workerId,
      workerName,
      riskLevel: "warning",
      ruleTriggered: "consecutive_night_shifts",
      headline: `${workerShifts.length} consecutive night shifts logged`,
      message: `Completed consecutive nocturnal duties exceeding standard rotation limits.`,
      whyExplanation:
        "Circadian disruption from extended night duties impairs alertness in clinical and construction environments.",
      recordedAt: new Date().toISOString().substring(0, 10),
      supportiveActionSuggestion: "Rotate worker to daylight schedule or provide 48h recovery window.",
    });
  }

  return alerts;
}

/**
 * Anonymizes safety report for Admin view:
 * If isAnonymous is true, strips workerId, workerName, and any identifying metadata.
 */
export function sanitizeSafetyReportForAdmin(report: SafetyReport): SafetyReport {
  if (report.isAnonymous) {
    return {
      ...report,
      workerId: undefined,
      workerName: undefined,
    };
  }
  return report;
}

/**
 * Computes k-anonymous feedback summary.
 * If group size is strictly less than k (e.g. 5), returns isSuppressed = true
 * to protect individual workers from retaliatory de-anonymization.
 */
export function computeKAnonymousFeedback(
  responses: FeedbackResponse[],
  kThreshold: number = 5
) {
  if (responses.length < kThreshold) {
    return {
      isSuppressed: true,
      count: responses.length,
      threshold: kThreshold,
      reason: `Data suppressed to protect worker anonymity. Minimum ${kThreshold} responses required.`,
      metrics: null,
    };
  }

  const count = responses.length;
  const safetyAvg = Number(
    (responses.reduce((sum, r) => sum + r.safetyRating, 0) / count).toFixed(1)
  );
  const respectAvg = Number(
    (responses.reduce((sum, r) => sum + r.supervisorRespectRating, 0) / count).toFixed(1)
  );
  const workloadAvg = Number(
    (responses.reduce((sum, r) => sum + r.workloadRating, 0) / count).toFixed(1)
  );
  const payClarityAvg = Number(
    (responses.reduce((sum, r) => sum + r.payClarityRating, 0) / count).toFixed(1)
  );
  const restAvg = Number(
    (responses.reduce((sum, r) => sum + r.restAndBreaksRating, 0) / count).toFixed(1)
  );

  return {
    isSuppressed: false,
    count,
    threshold: kThreshold,
    metrics: {
      safetyAvg,
      respectAvg,
      workloadAvg,
      payClarityAvg,
      restAvg,
    },
  };
}
