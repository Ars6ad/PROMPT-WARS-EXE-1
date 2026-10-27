import { describe, it, expect } from "vitest";
import { serverDb } from "@/lib/server/db";

describe("FairShift Server Engine & Cross-Industry Platform Tests", () => {
  it("generates and verifies cryptographic QR tokens with expiration", () => {
    const siteId = "site-metro-4";
    const qrObj = serverDb.generateSignedQrToken(siteId);

    expect(qrObj).toBeDefined();
    expect(qrObj.siteId).toBe(siteId);
    expect(qrObj.token).toBeDefined();
    expect(qrObj.expiresAt).toBeDefined();

    // Valid token check
    const checkValid = serverDb.verifyQrToken(qrObj.token, siteId);
    expect(checkValid.valid).toBe(true);

    // Tampered token check
    const checkTampered = serverDb.verifyQrToken("forged.tampered.token", siteId);
    expect(checkTampered.valid).toBe(false);

    // Mismatched site check
    const checkWrongSite = serverDb.verifyQrToken(qrObj.token, "dept-ward4-icu");
    expect(checkWrongSite.valid).toBe(false);
  });

  it("demonstrates cross-industry configuration across Construction, Healthcare, and Education", () => {
    const sites = serverDb.getSites();
    expect(sites.length).toBeGreaterThanOrEqual(3);

    const constructionSite = sites.find((s) => s.industry === "construction");
    const healthcareSite = sites.find((s) => s.industry === "hospital");
    const educationSite = sites.find((s) => s.industry === "education");

    expect(constructionSite).toBeDefined();
    expect(constructionSite?.name).toContain("Metro Phase 4");

    expect(healthcareSite).toBeDefined();
    expect(healthcareSite?.name).toContain("Ward 4 & ICU");

    expect(educationSite).toBeDefined();
    expect(educationSite?.name).toContain("NIT Campus");
  });

  it("enforces strict server-side anonymity on safety reports at ingress", () => {
    const anonReport = serverDb.submitSafetyReport({
      title: "Broken guardrail on scaffolding level 3",
      description: "Fasteners missing on the north-east scaffolding corner.",
      hazardCategory: "unsafe_equipment",
      severity: "high",
      industry: "construction",
      siteOrDepartmentName: "Metro Phase 4 - Station North Yard",
      isAnonymous: true,
      workerId: "worker-asha",
      workerName: "Asha Kumar",
    });

    expect(anonReport.ticketNumber).toBeDefined();
    expect(anonReport.workerId).toBeUndefined();
    expect(anonReport.workerName).toBeUndefined();

    // Verify stored report in database cannot be de-anonymized
    const retrievedReports = serverDb.getSafetyReports(true);
    const stored = retrievedReports.find((r) => r.id === anonReport.id);
    expect(stored?.workerId).toBeUndefined();
    expect(stored?.workerName).toBeUndefined();
  });

  it("supports worker ground verification of resolved safety incidents", () => {
    const report = serverDb.submitSafetyReport({
      title: "Chemical fume exhaust leak in chemistry lab",
      description: "Ventilation duct loose in Lab Room 204.",
      hazardCategory: "environmental",
      severity: "critical",
      industry: "education",
      siteOrDepartmentName: "NIT Campus - Facilities, Hostels & Labs",
      isAnonymous: false,
      workerId: "worker-suresh",
      workerName: "Suresh Patel",
    });

    // Safety officer marks as resolved
    serverDb.updateSafetyStatus(
      report.id,
      "resolved",
      "Harish Shetty",
      "Site Facilities Engineer",
      "Exhaust duct clamped and airflow verified at 450 CFM.",
      ["Replaced worn rubber gasket", "Pressure sensor calibrated"]
    );

    // Worker performs ground verification
    const verified = serverDb.verifySafetyResolution(
      report.id,
      true,
      "Inspected fume hood during morning chemistry lab session; air velocity normal and odorless."
    );
    expect(verified).toBe(true);

    const afterVerification = serverDb.getSafetyReports(false).find((r) => r.id === report.id);
    expect(afterVerification?.status).toBe("verified");
    expect(afterVerification?.workerVerifiedWorked).toBe(true);
  });

  it("manages portable digital skill credentials and employer verification", () => {
    const skill = serverDb.addSkill({
      workerId: "worker-suresh",
      title: "Hazardous Chemical Spill Response (OSHA Tier 2)",
      industry: "education",
      category: "safety",
      issuer: "Apex Safety Institute & NIT EHS Directorate",
      issuedDate: "2026-02-15",
      badgeLevel: "advanced",
      isVerified: false,
    });

    expect(skill.id).toBeDefined();
    expect(skill.verificationHash).toBeDefined();
    expect(skill.isVerified).toBe(false);

    // Employer verifies skill
    const ok = serverDb.verifySkill(skill.id, "Prof. M. Raghavan");
    expect(ok).toBe(true);

    const workerSkills = serverDb.getSkills("worker-suresh");
    const verifiedSkill = workerSkills.find((s) => s.id === skill.id);
    expect(verifiedSkill?.isVerified).toBe(true);
  });

  it("handles attendance correction workflows transparently", () => {
    const corr = serverDb.submitAttendanceCorrection({
      attendanceRecordId: "att-sample-1",
      workerId: "worker-asha",
      workerName: "Asha Kumar",
      date: "2026-10-26",
      requestedHours: 10,
      requestedOvertimeHours: 2,
      reason: "Extended pour past 19:30 requested by supervisor; biometric machine powered off early.",
    });

    expect(corr.id).toBeDefined();
    expect(corr.status).toBe("pending");
    expect(corr.requestedOvertimeHours).toBe(2);

    // Supervisor adjudicates
    const adjudicated = serverDb.reviewAttendanceCorrection(
      corr.id,
      true,
      "Vikram R. Gowda",
      "Approved after cross-verifying concrete delivery log #882."
    );
    expect(adjudicated).toBe(true);

    const corrections = serverDb.getAttendanceCorrections();
    const reviewed = corrections.find((c) => c.id === corr.id);
    expect(reviewed?.status).toBe("approved");
    expect(reviewed?.reviewedBy).toBe("Vikram R. Gowda");
  });
});
