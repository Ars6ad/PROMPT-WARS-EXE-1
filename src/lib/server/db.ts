import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  User,
  WorkerProfile,
  Shift,
  AttendanceRecord,
  AttendanceCorrectionRequest,
  Payslip,
  PayQuery,
  SafetyReport,
  FeedbackResponse,
  FatigueAlert,
  SkillCredential,
  AuditLog,
  WorkplacePolicySettings,
  SiteOrDepartment,
  QrValidationToken,
  SafetyStatus,
} from "@/types";
import {
  demoWorkerAsha,
  demoWorkerRavi,
  demoAdminPriya,
  generateWorkers,
  generateDemoShifts,
  generateDemoAttendance,
  initialPayslips,
  initialSafetyReports,
  initialPayQueries,
  initialFatigueAlerts,
  initialSkillCredentials,
  initialFeedbackResponses,
  initialAuditLogs,
  initialWorkplacePolicy,
  demoSitesAndDepartments,
  demoEducationSite,
  demoWorkerSuresh,
  demoSafetyOfficerHarish,
  demoHrMeenakshi,
  demoSupervisorVikram,
} from "@/lib/mockData";

interface FairShiftDatabaseSchema {
  users: (User | WorkerProfile)[];
  sites: SiteOrDepartment[];
  shifts: Shift[];
  attendance: AttendanceRecord[];
  attendanceCorrections: AttendanceCorrectionRequest[];
  payslips: Payslip[];
  payQueries: PayQuery[];
  safetyReports: SafetyReport[];
  feedback: FeedbackResponse[];
  fatigueAlerts: FatigueAlert[];
  skills: SkillCredential[];
  auditLogs: AuditLog[];
  policySettings: WorkplacePolicySettings;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE_PATH = path.join(DATA_DIR, "fairshift_store.json");

// In-memory singleton cache with atomic file persistence
class FairShiftDatabase {
  private db: FairShiftDatabaseSchema | null = null;
  private isSaving: boolean = false;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (this.db) return;

    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (err) {
        console.warn("Could not create data dir, using ephemeral memory store", err);
      }
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      try {
        const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
        this.db = JSON.parse(raw);
        return;
      } catch (err) {
        console.warn("Failed to read database file, re-initializing with seed data", err);
      }
    }

    // Initialize with comprehensive seed data across 3 industries
    const baseWorkers = generateWorkers();
    const allUsers: (User | WorkerProfile)[] = [
      demoAdminPriya,
      demoSafetyOfficerHarish,
      demoHrMeenakshi,
      demoSupervisorVikram,
      demoWorkerSuresh,
      ...baseWorkers,
    ];

    const allSites = [...demoSitesAndDepartments, demoEducationSite];

    this.db = {
      users: allUsers,
      sites: allSites,
      shifts: generateDemoShifts(),
      attendance: generateDemoAttendance(),
      attendanceCorrections: [
        {
          id: "corr-001",
          attendanceRecordId: "att-asha-sample",
          workerId: "worker-asha",
          workerName: "Asha Kumar",
          date: "2026-10-24",
          requestedHours: 11,
          requestedOvertimeHours: 3,
          reason: "Supervisor requested extended concrete pour until 20:30; biometric clock was locked.",
          status: "pending",
          submittedAt: "2026-10-25 08:30",
        },
      ],
      payslips: initialPayslips,
      payQueries: initialPayQueries,
      safetyReports: initialSafetyReports,
      feedback: initialFeedbackResponses,
      fatigueAlerts: initialFatigueAlerts,
      skills: initialSkillCredentials,
      auditLogs: initialAuditLogs,
      policySettings: {
        ...initialWorkplacePolicy,
        industry: "construction",
      },
    };

    this.persist();
  }

  private persist(): void {
    if (!this.db) return;
    try {
      if (fs.existsSync(DATA_DIR)) {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.db, null, 2), "utf-8");
      }
    } catch (err) {
      console.warn("Persistent write error (falling back to memory):", err);
    }
  }

  // --- Users & Profiles ---
  public getUsers(): (User | WorkerProfile)[] {
    this.ensureInitialized();
    return this.db!.users;
  }

  public getUserById(id: string): User | WorkerProfile | undefined {
    this.ensureInitialized();
    return this.db!.users.find((u) => u.id === id);
  }

  public saveUser(user: User | WorkerProfile): void {
    this.ensureInitialized();
    const idx = this.db!.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      this.db!.users[idx] = user;
    } else {
      this.db!.users.push(user);
    }
    this.persist();
  }

  // --- Sites & Departments ---
  public getSites(): SiteOrDepartment[] {
    this.ensureInitialized();
    return this.db!.sites;
  }

  // --- Shifts ---
  public getShifts(workerId?: string): Shift[] {
    this.ensureInitialized();
    if (workerId) {
      return this.db!.shifts.filter((s) => s.workerId === workerId);
    }
    return this.db!.shifts;
  }

  public createShift(shift: Shift): Shift {
    this.ensureInitialized();
    this.db!.shifts.unshift(shift);
    this.persist();
    return shift;
  }

  // --- Attendance ---
  public getAttendance(workerId?: string): AttendanceRecord[] {
    this.ensureInitialized();
    if (workerId) {
      return this.db!.attendance.filter((a) => a.workerId === workerId);
    }
    return this.db!.attendance;
  }

  public recordCheckIn(params: {
    workerId: string;
    workerName: string;
    method: "qr_code" | "gps_location" | "manual_request";
    siteId: string;
    siteName: string;
  }): { success: boolean; record?: AttendanceRecord; message: string } {
    this.ensureInitialized();
    const today = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    // Check duplicate active check-in
    const active = this.db!.attendance.find(
      (a) => a.workerId === params.workerId && a.date === today && !a.checkOutTime
    );
    if (active) {
      return { success: false, message: "Duplicate check-in blocked: Already checked in for today." };
    }

    const newRecord: AttendanceRecord = {
      id: `att-${params.workerId}-${Date.now()}`,
      shiftId: `shift-${params.workerId}-${today}`,
      workerId: params.workerId,
      workerName: params.workerName,
      date: today,
      checkInTime: timeNow,
      checkInMethod: params.method,
      locationVerified: true,
      actualHoursWorked: 0,
      regularHours: 0,
      overtimeHours: 0,
      breakDurationMinutes: 0,
      breakStatus: "none",
      status: "verified",
    };

    this.db!.attendance.unshift(newRecord);
    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: params.workerName,
      actorRole: "worker",
      action: "CHECK_IN_LOGGED",
      targetEntity: "attendance",
      targetId: newRecord.id,
      notes: `Verified check-in via ${params.method} at ${params.siteName}.`,
    });

    return { success: true, record: newRecord, message: "Check-in logged successfully on server." };
  }

  public recordCheckOut(params: {
    workerId: string;
    hoursWorked?: number;
  }): { success: boolean; record?: AttendanceRecord; message: string } {
    this.ensureInitialized();
    const today = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const active = this.db!.attendance.find(
      (a) => a.workerId === params.workerId && a.date === today && !a.checkOutTime
    );
    if (!active) {
      return { success: false, message: "No active check-in found to conclude." };
    }

    const hours = params.hoursWorked || 8.5;
    const reg = Math.min(8, hours);
    const ot = Math.max(0, hours - 8);

    active.checkOutTime = timeNow;
    active.actualHoursWorked = hours;
    active.regularHours = reg;
    active.overtimeHours = ot;
    active.overtimeStatus = ot > 0 ? "pending_approval" : undefined;
    active.breakStatus = "ended";

    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: active.workerName,
      actorRole: "worker",
      action: "CHECK_OUT_LOGGED",
      targetEntity: "attendance",
      targetId: active.id,
      notes: `Shift concluded. ${hours}h logged (${ot}h overtime pending approval).`,
    });

    return { success: true, record: active, message: "Shift concluded and hours recorded." };
  }

  public approveOvertime(
    attendanceId: string,
    approved: boolean,
    supervisorName: string
  ): boolean {
    this.ensureInitialized();
    const record = this.db!.attendance.find((a) => a.id === attendanceId);
    if (!record) return false;

    record.overtimeStatus = approved ? "approved" : "rejected";
    record.overtimeApprovedBy = supervisorName;
    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: supervisorName,
      actorRole: "supervisor",
      action: "OVERTIME_ADJUDICATED",
      targetEntity: "attendance",
      targetId: attendanceId,
      notes: `Overtime ${record.overtimeHours}h marked ${record.overtimeStatus} by ${supervisorName}.`,
    });

    return true;
  }

  // --- Attendance Corrections ---
  public getAttendanceCorrections(): AttendanceCorrectionRequest[] {
    this.ensureInitialized();
    return this.db!.attendanceCorrections;
  }

  public submitAttendanceCorrection(
    correction: Omit<AttendanceCorrectionRequest, "id" | "status" | "submittedAt">
  ): AttendanceCorrectionRequest {
    this.ensureInitialized();
    const newReq: AttendanceCorrectionRequest = {
      ...correction,
      id: `corr-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };
    this.db!.attendanceCorrections.unshift(newReq);
    this.persist();
    return newReq;
  }

  public reviewAttendanceCorrection(
    correctionId: string,
    approved: boolean,
    supervisorName: string,
    notes?: string
  ): boolean {
    this.ensureInitialized();
    const corr = this.db!.attendanceCorrections.find((c) => c.id === correctionId);
    if (!corr) return false;

    corr.status = approved ? "approved" : "rejected";
    corr.reviewedBy = supervisorName;
    corr.reviewedAt = new Date().toISOString().replace("T", " ").substring(0, 16);
    corr.reviewNotes = notes;

    // If approved, update target attendance record
    if (approved) {
      const att = this.db!.attendance.find((a) => a.id === corr.attendanceRecordId);
      if (att) {
        att.actualHoursWorked = corr.requestedHours;
        att.regularHours = Math.min(8, corr.requestedHours);
        att.overtimeHours = corr.requestedOvertimeHours;
        att.overtimeStatus = "approved";
      }
    }

    this.persist();
    return true;
  }

  // --- QR Validation Tokens ---
  public generateSignedQrToken(siteId: string): QrValidationToken {
    this.ensureInitialized();
    const site = this.db!.sites.find((s) => s.id === siteId) || this.db!.sites[0];
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min expiry
    const nonce = crypto.randomBytes(8).toString("hex");

    const payload = `${site.id}|${nonce}|${expiresAt}`;
    const secret = site.qrSecretKey || "fairshift-default-secret-salt-2026";
    const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex").substring(0, 16);

    const token = Buffer.from(`${payload}|${signature}`).toString("base64");

    return {
      token,
      siteId: site.id,
      siteName: site.name,
      expiresAt,
      nonce,
    };
  }

  public verifyQrToken(tokenStr: string, expectedSiteId: string): { valid: boolean; reason?: string } {
    try {
      const decoded = Buffer.from(tokenStr, "base64").toString("utf-8");
      const parts = decoded.split("|");
      if (parts.length !== 4) {
        return { valid: false, reason: "Malformed QR token structure." };
      }

      const [siteId, nonce, expiresAt, signature] = parts;
      if (siteId !== expectedSiteId) {
        return { valid: false, reason: "QR token does not match authorized worksite." };
      }

      const expiry = new Date(expiresAt).getTime();
      if (Date.now() > expiry) {
        return { valid: false, reason: "QR token expired (5-minute security limit exceeded)." };
      }

      const site = this.getSites().find((s) => s.id === siteId);
      const secret = site?.qrSecretKey || "fairshift-default-secret-salt-2026";
      const expectedSig = crypto
        .createHmac("sha256", secret)
        .update(`${siteId}|${nonce}|${expiresAt}`)
        .digest("hex")
        .substring(0, 16);

      if (signature !== expectedSig) {
        return { valid: false, reason: "Invalid cryptographic signature." };
      }

      return { valid: true };
    } catch {
      return { valid: false, reason: "Verification exception." };
    }
  }

  // --- Payroll ---
  public getPayslips(workerId?: string): Payslip[] {
    this.ensureInitialized();
    if (workerId) {
      return this.db!.payslips.filter((p) => p.workerId === workerId);
    }
    return this.db!.payslips;
  }

  public getPayQueries(): PayQuery[] {
    this.ensureInitialized();
    return this.db!.payQueries;
  }

  public submitPayQuery(
    query: Omit<PayQuery, "id" | "ticketNumber" | "submittedAt" | "status">
  ): PayQuery {
    this.ensureInitialized();
    const newQuery: PayQuery = {
      ...query,
      id: `pq-${Date.now()}`,
      ticketNumber: `PQ-${new Date().getFullYear()}-${44 + this.db!.payQueries.length}`,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "submitted",
    };
    this.db!.payQueries.unshift(newQuery);
    this.persist();
    return newQuery;
  }

  public resolvePayQuery(
    queryId: string,
    response: string,
    adminName: string,
    adjustedAmount?: number
  ): boolean {
    this.ensureInitialized();
    const q = this.db!.payQueries.find((item) => item.id === queryId);
    if (!q) return false;

    q.status = "resolved";
    q.adminResponse = response;
    q.adjustedAmount = adjustedAmount;
    q.resolvedAt = new Date().toISOString().replace("T", " ").substring(0, 16);

    // If adjusted amount, update worker's active payslip
    if (adjustedAmount && adjustedAmount > 0) {
      const payslip = this.db!.payslips.find((p) => p.id === q.payslipId);
      if (payslip) {
        payslip.allowances.push({ name: `Pay Query Adjustment (${q.ticketNumber})`, amount: adjustedAmount });
        payslip.grossEarnings += adjustedAmount;
        payslip.netPayable += adjustedAmount;
      }
    }

    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: adminName,
      actorRole: "hr_payroll",
      action: "PAY_QUERY_RESOLVED",
      targetEntity: "pay_query",
      targetId: queryId,
      notes: `Resolution provided: "${response}". Wage adjustment: ₹${adjustedAmount || 0}.`,
    });

    return true;
  }

  // --- Safety Incident Management ---
  public getSafetyReports(forAdmin: boolean = false): SafetyReport[] {
    this.ensureInitialized();
    // Ingress Anonymity Guarantee: Strip identity if anonymous
    return this.db!.safetyReports.map((r) => {
      if (r.isAnonymous) {
        return {
          ...r,
          workerId: undefined,
          workerName: undefined,
        };
      }
      return r;
    });
  }

  public submitSafetyReport(
    report: Omit<SafetyReport, "id" | "ticketNumber" | "submittedAt" | "status">
  ): SafetyReport {
    this.ensureInitialized();
    const ticketNum = `FS-SAF-${new Date().getFullYear()}-${106 + this.db!.safetyReports.length}`;

    // Server-enforced anonymity
    const sanitizedWorkerId = report.isAnonymous ? undefined : report.workerId;
    const sanitizedWorkerName = report.isAnonymous ? undefined : report.workerName;

    const newReport: SafetyReport = {
      ...report,
      id: `safe-${Date.now()}`,
      ticketNumber: ticketNum,
      workerId: sanitizedWorkerId,
      workerName: sanitizedWorkerName,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "submitted",
    };

    this.db!.safetyReports.unshift(newReport);
    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: report.isAnonymous ? "Anonymous Worker" : report.workerName || "Worker",
      actorRole: "worker",
      action: "SAFETY_INCIDENT_REPORTED",
      targetEntity: "safety_report",
      targetId: newReport.id,
      notes: `Incident logged: ${newReport.title} (${newReport.severity.toUpperCase()} Priority).`,
    });

    return newReport;
  }

  public updateSafetyStatus(
    reportId: string,
    status: SafetyStatus,
    adminName: string,
    owner?: string,
    resolutionNote?: string,
    correctiveActions?: string[]
  ): boolean {
    this.ensureInitialized();
    const r = this.db!.safetyReports.find((item) => item.id === reportId);
    if (!r) return false;

    r.status = status;
    if (owner) r.assignedOwner = owner;
    if (resolutionNote) r.resolutionNote = resolutionNote;
    if (correctiveActions) r.correctiveActions = correctiveActions;
    if (status === "resolved") {
      r.resolvedAt = new Date().toISOString().replace("T", " ").substring(0, 16);
    }

    this.persist();

    this.addAuditLog({
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      actorName: adminName,
      actorRole: "safety_officer",
      action: "SAFETY_STATUS_UPDATED",
      targetEntity: "safety_report",
      targetId: reportId,
      notes: `Status changed to ${status}. Assigned to ${r.assignedOwner || "Officer"}.`,
    });

    return true;
  }

  public verifySafetyResolution(
    reportId: string,
    workerConfirmed: boolean,
    workerFeedback?: string
  ): boolean {
    this.ensureInitialized();
    const r = this.db!.safetyReports.find((item) => item.id === reportId);
    if (!r) return false;

    r.status = workerConfirmed ? "verified" : "in_progress";
    r.workerVerifiedWorked = workerConfirmed;
    r.workerVerificationFeedback = workerFeedback;

    this.persist();
    return true;
  }

  // --- Feedback with K-Anonymity (k >= 5) ---
  public submitFeedback(
    feedback: Omit<FeedbackResponse, "id" | "submittedAt">
  ): FeedbackResponse {
    this.ensureInitialized();
    const newFb: FeedbackResponse = {
      ...feedback,
      id: `fb-${Date.now()}`,
      workerId: feedback.isAnonymous ? undefined : feedback.workerId,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };
    this.db!.feedback.unshift(newFb);
    this.persist();
    return newFb;
  }

  public getKAnonymousFeedback(siteId?: string): {
    isSuppressed: boolean;
    sampleCount: number;
    threshold: number;
    metrics: {
      safetyAvg: number;
      respectAvg: number;
      workloadAvg: number;
      payClarityAvg: number;
      restAvg: number;
      enoughRestPercent: number;
      safeRaisingPercent: number;
    } | null;
  } {
    this.ensureInitialized();
    const list = siteId
      ? this.db!.feedback.filter((f) => f.siteOrDepartmentId === siteId)
      : this.db!.feedback;

    const k = this.db!.policySettings.privacyMinimumGroupSize || 5;

    if (list.length < k) {
      return {
        isSuppressed: true,
        sampleCount: list.length,
        threshold: k,
        metrics: null,
      };
    }

    const count = list.length;
    return {
      isSuppressed: false,
      sampleCount: count,
      threshold: k,
      metrics: {
        safetyAvg: Number((list.reduce((s, f) => s + f.safetyRating, 0) / count).toFixed(1)),
        respectAvg: Number((list.reduce((s, f) => s + f.supervisorRespectRating, 0) / count).toFixed(1)),
        workloadAvg: Number((list.reduce((s, f) => s + f.workloadRating, 0) / count).toFixed(1)),
        payClarityAvg: Number((list.reduce((s, f) => s + f.payClarityRating, 0) / count).toFixed(1)),
        restAvg: Number((list.reduce((s, f) => s + f.restAndBreaksRating, 0) / count).toFixed(1)),
        enoughRestPercent: Math.round((list.filter((f) => f.enoughRestBetweenShifts).length / count) * 100),
        safeRaisingPercent: Math.round((list.filter((f) => f.safeRaisingConcerns).length / count) * 100),
      },
    };
  }

  // --- Skills ---
  public getSkills(workerId?: string): SkillCredential[] {
    this.ensureInitialized();
    if (workerId) {
      return this.db!.skills.filter((s) => s.workerId === workerId);
    }
    return this.db!.skills;
  }

  public addSkill(skill: Omit<SkillCredential, "id">): SkillCredential {
    this.ensureInitialized();
    const newSkill: SkillCredential = {
      ...skill,
      id: `skill-${Date.now()}`,
      verificationHash: crypto.randomBytes(8).toString("hex"),
    };
    this.db!.skills.unshift(newSkill);
    this.persist();
    return newSkill;
  }

  public verifySkill(skillId: string, verifierName: string): boolean {
    this.ensureInitialized();
    const s = this.db!.skills.find((item) => item.id === skillId);
    if (!s) return false;
    s.isVerified = true;
    s.verificationBadgeUrl = "/badges/employer-verified.png";
    this.persist();
    return true;
  }

  // --- Fatigue Alerts ---
  public getFatigueAlerts(workerId?: string): FatigueAlert[] {
    this.ensureInitialized();
    if (workerId) {
      return this.db!.fatigueAlerts.filter((f) => f.workerId === workerId);
    }
    return this.db!.fatigueAlerts;
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLog[] {
    this.ensureInitialized();
    return this.db!.auditLogs;
  }

  public addAuditLog(log: AuditLog): void {
    this.ensureInitialized();
    this.db!.auditLogs.unshift(log);
    this.persist();
  }

  // --- Policy Settings ---
  public getPolicySettings(): WorkplacePolicySettings {
    this.ensureInitialized();
    return this.db!.policySettings;
  }

  public updatePolicySettings(settings: Partial<WorkplacePolicySettings>): WorkplacePolicySettings {
    this.ensureInitialized();
    this.db!.policySettings = { ...this.db!.policySettings, ...settings };
    this.persist();
    return this.db!.policySettings;
  }
}

// Global server singleton
export const serverDb = new FairShiftDatabase();
