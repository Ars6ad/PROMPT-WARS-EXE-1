import { describe, it, expect } from "vitest";
import {
  sanitizeSafetyReportForAdmin,
  computeKAnonymousFeedback,
} from "@/lib/calculations";
import { SafetyReport, FeedbackResponse } from "@/types";

describe("Privacy & Anti-Retaliation Guarantees", () => {
  it("strictly removes worker name and worker ID from anonymous safety reports", () => {
    const rawReport: SafetyReport = {
      id: "safe-anon-test",
      ticketNumber: "FS-SAF-TEST-1",
      title: "Missing safety harnesses",
      description: "Workers on 4th level unclipped.",
      hazardCategory: "missing_ppe",
      severity: "high",
      industry: "construction",
      siteOrDepartmentName: "North Site",
      isAnonymous: true,
      workerId: "worker-secret-id-999",
      workerName: "Confidential Worker",
      submittedAt: "2026-10-25 10:00",
      status: "submitted",
    };

    const sanitized = sanitizeSafetyReportForAdmin(rawReport);

    expect(sanitized.isAnonymous).toBe(true);
    expect(sanitized.workerId).toBeUndefined();
    expect(sanitized.workerName).toBeUndefined();
    expect(sanitized.ticketNumber).toBe("FS-SAF-TEST-1");
  });

  it("preserves worker identity on explicitly non-anonymous reports", () => {
    const rawReport: SafetyReport = {
      id: "safe-named-test",
      ticketNumber: "FS-SAF-TEST-2",
      title: "Broken ladder rung",
      description: "Ladder rung cracked at step 3.",
      hazardCategory: "unsafe_equipment",
      severity: "medium",
      industry: "construction",
      siteOrDepartmentName: "North Site",
      isAnonymous: false,
      workerId: "worker-asha",
      workerName: "Asha Kumar",
      submittedAt: "2026-10-25 10:00",
      status: "submitted",
    };

    const sanitized = sanitizeSafetyReportForAdmin(rawReport);

    expect(sanitized.isAnonymous).toBe(false);
    expect(sanitized.workerId).toBe("worker-asha");
    expect(sanitized.workerName).toBe("Asha Kumar");
  });

  it("suppresses feedback aggregates if sample size is less than k (e.g. 5)", () => {
    const smallSample: FeedbackResponse[] = [
      {
        id: "fb-1",
        industry: "hospital",
        siteOrDepartmentId: "ward-special",
        submittedAt: "2026-10-26",
        safetyRating: 5,
        supervisorRespectRating: 4,
        workloadRating: 3,
        payClarityRating: 4,
        restAndBreaksRating: 3,
        enoughRestBetweenShifts: true,
        safeRaisingConcerns: true,
        understandsPay: true,
        isAnonymous: true,
      },
      {
        id: "fb-2",
        industry: "hospital",
        siteOrDepartmentId: "ward-special",
        submittedAt: "2026-10-26",
        safetyRating: 4,
        supervisorRespectRating: 4,
        workloadRating: 3,
        payClarityRating: 4,
        restAndBreaksRating: 4,
        enoughRestBetweenShifts: true,
        safeRaisingConcerns: true,
        understandsPay: true,
        isAnonymous: true,
      },
    ];

    const result = computeKAnonymousFeedback(smallSample, 5);

    expect(result.isSuppressed).toBe(true);
    expect(result.count).toBe(2);
    expect(result.metrics).toBeNull();
    expect(result.reason).toContain("Data suppressed to protect worker anonymity");
  });

  it("releases aggregated statistics when sample meets or exceeds k threshold", () => {
    const validSample: FeedbackResponse[] = [];
    for (let i = 1; i <= 6; i++) {
      validSample.push({
        id: `fb-val-${i}`,
        industry: "construction",
        siteOrDepartmentId: "site-1",
        submittedAt: "2026-10-26",
        safetyRating: 4,
        supervisorRespectRating: 4,
        workloadRating: 3,
        payClarityRating: 5,
        restAndBreaksRating: 4,
        enoughRestBetweenShifts: true,
        safeRaisingConcerns: true,
        understandsPay: true,
        isAnonymous: true,
      });
    }

    const result = computeKAnonymousFeedback(validSample, 5);

    expect(result.isSuppressed).toBe(false);
    expect(result.count).toBe(6);
    expect(result.metrics).toBeDefined();
    expect(result.metrics?.safetyAvg).toBe(4);
    expect(result.metrics?.payClarityAvg).toBe(5);
  });
});
