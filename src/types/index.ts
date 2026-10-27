export type UserRole =
  | "worker"
  | "supervisor"
  | "hr_payroll"
  | "safety_officer"
  | "admin";

export type IndustryType = "construction" | "hospital" | "education";

export type LanguageCode = "en" | "ta" | "hi" | "te";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  avatarUrl?: string;
  industry: IndustryType;
  organizationId: string;
  organizationName: string;
  siteOrDepartmentId: string;
  siteOrDepartmentName: string;
  preferredLanguage: LanguageCode;
  simpleLanguageMode?: boolean;
}

export interface WorkerProfile extends User {
  jobTitle: string;
  employeeCode: string;
  joiningDate: string;
  supervisorName: string;
  hourlyRate: number;
  dailyBaseHours: number;
  overtimeRateMultiplier: number;
  healthSignal: "stable" | "needs_attention" | "high_risk";
  weeklyHours: number;
  skillsCount: number;
}

export interface EmployerOrganization {
  id: string;
  name: string;
  industry: IndustryType;
  sitesAndDepartments: SiteOrDepartment[];
  policySettings: WorkplacePolicySettings;
}

export interface SiteOrDepartment {
  id: string;
  name: string;
  organizationId: string;
  industry: IndustryType;
  location: string;
  activeWorkersCount: number;
  qrSecretKey?: string;
}

export type ShiftStatus = "scheduled" | "checked_in" | "on_break" | "completed" | "missed";

export interface Shift {
  id: string;
  workerId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  scheduledHours: number;
  status: ShiftStatus;
  siteOrDepartmentName: string;
  supervisorName: string;
  isNightShift?: boolean;
}

export interface AttendanceRecord {
  id: string;
  shiftId: string;
  workerId: string;
  workerName: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInMethod: "qr_code" | "gps_location" | "manual_request";
  locationVerified: boolean;
  actualHoursWorked: number;
  regularHours: number;
  overtimeHours: number;
  overtimeStatus?: "pending_approval" | "approved" | "rejected";
  overtimeApprovedBy?: string;
  breakDurationMinutes: number;
  breakStatus: "none" | "active" | "ended";
  status: "verified" | "pending_review" | "flagged";
  offlineQueued?: boolean;
}

export interface AttendanceCorrectionRequest {
  id: string;
  attendanceRecordId: string;
  workerId: string;
  workerName: string;
  date: string;
  requestedHours: number;
  requestedOvertimeHours: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface QrValidationToken {
  token: string;
  siteId: string;
  siteName: string;
  expiresAt: string;
  nonce: string;
}

export interface Payslip {
  id: string;
  workerId: string;
  month: string; // e.g. "October 2026"
  year: number;
  payPeriod: string;
  baseHourlyRate: number;
  shiftsCompleted: number;
  regularHours: number;
  overtimeHours: number;
  overtimeRate: number;
  baseWages: number;
  overtimePay: number;
  allowances: { name: string; amount: number }[];
  deductions: { name: string; amount: number }[];
  grossEarnings: number;
  totalDeductions: number;
  netPayable: number;
  paymentStatus: "paid" | "scheduled" | "processing" | "query_open";
  paymentDate: string;
  plainLanguageExplanation: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface PayQuery {
  id: string;
  ticketNumber: string;
  workerId: string;
  workerName: string;
  payslipId: string;
  month: string;
  category: "missing_hours" | "incorrect_overtime" | "allowance_issue" | "deduction_clarification" | "other";
  description: string;
  submittedAt: string;
  status: "submitted" | "under_review" | "resolved" | "adjusted";
  adminResponse?: string;
  resolvedAt?: string;
  adjustedAmount?: number;
}

export type HazardCategory =
  | "missing_ppe"
  | "unsafe_equipment"
  | "fall_trip_hazard"
  | "electrical_risk"
  | "heat_dehydration"
  | "hygiene_sanitation"
  | "staffing_overload"
  | "other";

export type SafetySeverity = "low" | "medium" | "high" | "critical";

export type SafetyStatus =
  | "submitted"
  | "acknowledged"
  | "assigned"
  | "in_progress"
  | "resolved"
  | "verified"
  | "closed";

export interface SafetyReport {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  hazardCategory: HazardCategory;
  severity: SafetySeverity;
  industry: IndustryType;
  siteOrDepartmentName: string;
  isAnonymous: boolean;
  workerId?: string; // only populated if not anonymous
  workerName?: string; // only populated if not anonymous
  submittedAt: string;
  status: SafetyStatus;
  voiceNoteAttached?: boolean;
  voiceTranscription?: string;
  photoAttached?: boolean;
  photoUrl?: string;
  assignedOwner?: string;
  targetResolutionDate?: string;
  correctiveActions?: string[];
  resolutionNote?: string;
  resolvedAt?: string;
  workerVerifiedWorked?: boolean;
  workerVerificationFeedback?: string;
  slaBreachWarning?: boolean;
  escalationLevel?: "site" | "director" | "statutory_advisory";
}

export interface FeedbackResponse {
  id: string;
  workerId?: string; // never exposed in admin aggregate or report view
  industry: IndustryType;
  siteOrDepartmentId: string;
  submittedAt: string;
  safetyRating: number; // 1-5
  supervisorRespectRating: number; // 1-5
  workloadRating: number; // 1-5
  payClarityRating: number; // 1-5
  restAndBreaksRating: number; // 1-5
  enoughRestBetweenShifts: boolean;
  safeRaisingConcerns: boolean;
  understandsPay: boolean;
  voiceNoteTranscription?: string;
  comments?: string;
  isAnonymous: boolean;
}

export interface FatigueAlert {
  id: string;
  workerId: string;
  workerName: string;
  riskLevel: "warning" | "high";
  ruleTriggered: "shift_over_12h" | "rest_under_10h" | "week_over_60h" | "consecutive_night_shifts";
  headline: string;
  message: string;
  whyExplanation: string;
  recordedAt: string;
  supportiveActionSuggestion: string;
  acknowledgedByWorker?: boolean;
  reviewedByAdmin?: boolean;
}

export interface SkillCredential {
  id: string;
  workerId: string;
  title: string;
  industry: IndustryType;
  category: "safety" | "technical" | "hygiene" | "equipment";
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  isVerified: boolean;
  verificationBadgeUrl?: string;
  badgeLevel: "foundation" | "advanced" | "expert";
  verificationHash?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetEntity: "safety_report" | "pay_query" | "attendance" | "settings" | "payroll";
  targetId: string;
  notes: string;
}

export interface WorkplacePolicySettings {
  standardWorkdayHours: number;
  overtimeThresholdHours: number;
  overtimeMultiplier: number;
  requiredRestIntervalHours: number;
  weeklyHourWarningThreshold: number;
  maxConsecutiveNightShifts: number;
  privacyMinimumGroupSize: number; // K-anonymity, defaults to 5
  supportedLanguages: LanguageCode[];
  organizationName: string;
  industry: IndustryType;
}
