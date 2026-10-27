"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  User,
  WorkerProfile,
  Shift,
  AttendanceRecord,
  Payslip,
  PayQuery,
  SafetyReport,
  FeedbackResponse,
  FatigueAlert,
  SkillCredential,
  AuditLog,
  WorkplacePolicySettings,
  LanguageCode,
  IndustryType,
  SafetyStatus,
} from "@/types";
import {
  demoWorkerAsha,
  demoWorkerRavi,
  demoWorkerSuresh,
  demoSafetyOfficerHarish,
  demoHrMeenakshi,
  demoSupervisorVikram,
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
} from "@/lib/mockData";
import { translations, TranslationDictionary } from "@/lib/i18n";

interface OfflineQueueItem {
  id: string;
  type: "attendance" | "safety_report" | "feedback" | "pay_query";
  payload: any;
  queuedAt: string;
}

interface AppContextType {
  currentUser: User | WorkerProfile;
  allWorkers: WorkerProfile[];
  shifts: Shift[];
  attendanceRecords: AttendanceRecord[];
  payslips: Payslip[];
  payQueries: PayQuery[];
  safetyReports: SafetyReport[];
  feedbackResponses: FeedbackResponse[];
  fatigueAlerts: FatigueAlert[];
  skillCredentials: SkillCredential[];
  auditLogs: AuditLog[];
  policySettings: WorkplacePolicySettings;
  sitesAndDepartments: typeof demoSitesAndDepartments;

  // Language & Accessibility
  language: LanguageCode;
  t: TranslationDictionary;
  setLanguage: (lang: LanguageCode) => void;
  simpleLanguageMode: boolean;
  setSimpleLanguageMode: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Audio / Speech
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;

  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  offlineQueue: OfflineQueueItem[];
  isSyncing: boolean;

  // Role Switching
  switchUser: (userId: string) => void;

  // Core Worker Actions
  checkIn: (method: AttendanceRecord["checkInMethod"]) => { success: boolean; message: string };
  checkOut: () => { success: boolean; message: string };
  startBreak: () => void;
  endBreak: () => void;
  submitSafetyReport: (report: Omit<SafetyReport, "id" | "ticketNumber" | "submittedAt" | "status">) => SafetyReport;
  verifySafetyResolution: (reportId: string, worked: boolean, feedback?: string) => void;
  submitPayQuery: (query: Omit<PayQuery, "id" | "ticketNumber" | "submittedAt" | "status" | "workerId" | "workerName">) => PayQuery;
  submitFeedback: (feedback: Omit<FeedbackResponse, "id" | "submittedAt">) => void;
  addSkillCredential: (skill: Omit<SkillCredential, "id">) => void;

  // Admin Actions
  updateSafetyReportStatus: (
    reportId: string,
    status: SafetyStatus,
    owner?: string,
    note?: string,
    correctiveActions?: string[]
  ) => void;
  respondToPayQuery: (queryId: string, response: string, adjustedAmount?: number) => void;
  updatePolicySettings: (settings: Partial<WorkplacePolicySettings>) => void;

  // Privacy & Helpers
  getPrivacySafeFeedback: (filterSiteId?: string) => {
    isSuppressed: boolean;
    sampleCount: number;
    metrics: {
      safetyAvg: number;
      respectAvg: number;
      workloadAvg: number;
      payClarityAvg: number;
      restAvg: number;
      enoughRestPercent: number;
      safeRaisingPercent: number;
    } | null;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Master storage state
  const [currentUser, setCurrentUser] = useState<User | WorkerProfile>(demoWorkerAsha);
  const [allWorkers, setAllWorkers] = useState<WorkerProfile[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>(initialPayslips);
  const [payQueries, setPayQueries] = useState<PayQuery[]>(initialPayQueries);
  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>(initialSafetyReports);
  const [feedbackResponses, setFeedbackResponses] = useState<FeedbackResponse[]>(initialFeedbackResponses);
  const [fatigueAlerts, setFatigueAlerts] = useState<FatigueAlert[]>(initialFatigueAlerts);
  const [skillCredentials, setSkillCredentials] = useState<SkillCredential[]>(initialSkillCredentials);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [policySettings, setPolicySettings] = useState<WorkplacePolicySettings>(initialWorkplacePolicy);

  // Settings
  const [language, setLanguageState] = useState<LanguageCode>("hi");
  const [simpleLanguageMode, setSimpleLanguageMode] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Offline simulation
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Initialize once on mount
  useEffect(() => {
    const loadedWorkers = generateWorkers();
    setAllWorkers(loadedWorkers);
    setShifts(generateDemoShifts());
    setAttendanceRecords(generateDemoAttendance());

    // Check system preference for dark mode
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setTheme("dark");
      }
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setReduceMotion(true);
      }
    }
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      if (highContrast) {
        root.classList.add("contrast-more");
      } else {
        root.classList.remove("contrast-more");
      }
    }
  }, [theme, highContrast]);

  // Audio TTS helper
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    // Language mapping for synthesis
    const langMap: Record<LanguageCode, string> = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
    };
    utterance.lang = langMap[language] || "en-IN";
    utterance.rate = 0.95; // comfortable speed

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Sync offline queue when connection returns
  useEffect(() => {
    if (!isOffline && offlineQueue.length > 0) {
      setIsSyncing(true);
      const timer = setTimeout(() => {
        setOfflineQueue([]);
        setIsSyncing(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOffline, offlineQueue]);

  // Set language with auto-propagation to user preferred language
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (currentUser) {
      setCurrentUser((prev) => ({ ...prev, preferredLanguage: lang }));
    }
  };

  // Switch demo user
  const switchUser = (userId: string) => {
    stopSpeaking();
    if (userId === "worker-asha") {
      setCurrentUser(demoWorkerAsha);
      setLanguageState(demoWorkerAsha.preferredLanguage);
    } else if (userId === "worker-ravi") {
      setCurrentUser(demoWorkerRavi);
      setLanguageState(demoWorkerRavi.preferredLanguage);
    } else if (userId === "worker-suresh") {
      setCurrentUser(demoWorkerSuresh);
      setLanguageState(demoWorkerSuresh.preferredLanguage);
    } else if (userId === "safety-harish") {
      setCurrentUser(demoSafetyOfficerHarish);
      setLanguageState("en");
    } else if (userId === "hr-meenakshi") {
      setCurrentUser(demoHrMeenakshi);
      setLanguageState(demoHrMeenakshi.preferredLanguage);
    } else if (userId === "supervisor-vikram") {
      setCurrentUser(demoSupervisorVikram);
      setLanguageState("en");
    } else if (userId === "admin-priya") {
      setCurrentUser(demoAdminPriya);
      setLanguageState("en");
    } else {
      const match = allWorkers.find((w) => w.id === userId);
      if (match) {
        setCurrentUser(match);
        setLanguageState(match.preferredLanguage);
      }
    }
  };

  // Check In action
  const checkIn = (method: AttendanceRecord["checkInMethod"]) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    // Check if already checked in today
    const existing = attendanceRecords.find(
      (r) => r.workerId === currentUser.id && r.date === todayStr && !r.checkOutTime
    );

    if (existing) {
      return { success: false, message: "Already checked in for today's shift." };
    }

    const newRecord: AttendanceRecord = {
      id: `att-${currentUser.id}-${Date.now()}`,
      shiftId: `shift-${currentUser.id}-${todayStr}`,
      workerId: currentUser.id,
      workerName: currentUser.name,
      date: todayStr,
      checkInTime: timeStr,
      checkInMethod: method,
      locationVerified: true,
      actualHoursWorked: 0,
      regularHours: 0,
      overtimeHours: 0,
      breakDurationMinutes: 0,
      breakStatus: "none",
      status: "verified",
      offlineQueued: isOffline,
    };

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { id: `q-${Date.now()}`, type: "attendance", payload: newRecord, queuedAt: new Date().toISOString() },
      ]);
    }

    setAttendanceRecords((prev) => [newRecord, ...prev]);

    // Update shift status
    setShifts((prev) =>
      prev.map((s) => (s.workerId === currentUser.id && s.date === todayStr ? { ...s, status: "checked_in" } : s))
    );

    return { success: true, message: "Check-in logged successfully." };
  };

  // Check Out action
  const checkOut = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const activeRec = attendanceRecords.find(
      (r) => r.workerId === currentUser.id && r.date === todayStr && !r.checkOutTime
    );

    if (!activeRec) {
      return { success: false, message: "No active check-in found to conclude." };
    }

    // Calculate hours (default 8 + simulated 1.5 OT for demonstration)
    const hours = 8.5;
    const reg = Math.min(8, hours);
    const ot = Math.max(0, hours - 8);

    setAttendanceRecords((prev) =>
      prev.map((r) =>
        r.id === activeRec.id
          ? {
              ...r,
              checkOutTime: timeStr,
              actualHoursWorked: hours,
              regularHours: reg,
              overtimeHours: ot,
              breakStatus: "ended",
            }
          : r
      )
    );

    setShifts((prev) =>
      prev.map((s) => (s.workerId === currentUser.id && s.date === todayStr ? { ...s, status: "completed" } : s))
    );

    return { success: true, message: "Shift concluded and logged." };
  };

  // Break actions
  const startBreak = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    setAttendanceRecords((prev) =>
      prev.map((r) =>
        r.workerId === currentUser.id && r.date === todayStr && !r.checkOutTime
          ? { ...r, breakStatus: "active" }
          : r
      )
    );
  };

  const endBreak = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    setAttendanceRecords((prev) =>
      prev.map((r) =>
        r.workerId === currentUser.id && r.date === todayStr && !r.checkOutTime
          ? { ...r, breakStatus: "ended", breakDurationMinutes: (r.breakDurationMinutes || 0) + 45 }
          : r
      )
    );
  };

  // Submit Safety Report
  const submitSafetyReport = (reportData: Omit<SafetyReport, "id" | "ticketNumber" | "submittedAt" | "status">) => {
    const ticketNum = `FS-SAF-${new Date().getFullYear()}-${105 + safetyReports.length}`;
    const newReport: SafetyReport = {
      ...reportData,
      id: `safe-${Date.now()}`,
      ticketNumber: ticketNum,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "submitted",
      // Strictly protect anonymity
      workerId: reportData.isAnonymous ? undefined : currentUser.id,
      workerName: reportData.isAnonymous ? undefined : currentUser.name,
    };

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { id: `q-${Date.now()}`, type: "safety_report", payload: newReport, queuedAt: new Date().toISOString() },
      ]);
    }

    setSafetyReports((prev) => [newReport, ...prev]);

    // Add Audit Log
    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: reportData.isAnonymous ? "Anonymous Worker" : currentUser.name,
        actorRole: currentUser.role,
        action: "SAFETY_REPORT_FILED",
        targetEntity: "safety_report",
        targetId: newReport.id,
        notes: `Report filed: ${newReport.title} (${newReport.severity.toUpperCase()} priority)`,
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/safety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReport),
      }).catch((e) => console.warn("Safety API sync:", e));
    }

    return newReport;
  };

  // Verify Safety Resolution (Worker closes loop)
  const verifySafetyResolution = (reportId: string, worked: boolean, feedback?: string) => {
    setSafetyReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: worked ? "verified" : "in_progress",
              workerVerifiedWorked: worked,
              workerVerificationFeedback: feedback || (worked ? "Worker verified hazard resolved" : "Worker flagged issue persists"),
            }
          : r
      )
    );

    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "WORKER_VERIFICATION",
        targetEntity: "safety_report",
        targetId: reportId,
        notes: worked ? "Worker confirmed resolution verified." : "Worker indicated hazard still exists; re-opened.",
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/safety", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "worker_verify", reportId, workerConfirmed: worked, feedback }),
      }).catch((e) => console.warn("Safety verification API sync:", e));
    }
  };

  // Submit Pay Query
  const submitPayQuery = (queryData: Omit<PayQuery, "id" | "ticketNumber" | "submittedAt" | "status" | "workerId" | "workerName">) => {
    const ticketNum = `PQ-${new Date().getFullYear()}-${43 + payQueries.length}`;
    const newQuery: PayQuery = {
      ...queryData,
      id: `pq-${Date.now()}`,
      ticketNumber: ticketNum,
      workerId: currentUser.id,
      workerName: currentUser.name,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "submitted",
    };

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { id: `q-${Date.now()}`, type: "pay_query", payload: newQuery, queuedAt: new Date().toISOString() },
      ]);
    }

    setPayQueries((prev) => [newQuery, ...prev]);

    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "PAY_QUERY_FILED",
        targetEntity: "pay_query",
        targetId: newQuery.id,
        notes: `Pay query raised for ${newQuery.month}: ${newQuery.category}`,
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/payroll/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuery),
      }).catch((e) => console.warn("Pay query API sync:", e));
    }

    return newQuery;
  };

  // Submit Feedback (Anonymous by default)
  const submitFeedback = (feedbackData: Omit<FeedbackResponse, "id" | "submittedAt">) => {
    const newFb: FeedbackResponse = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      // If anonymous, ensure workerId is omitted
      workerId: feedbackData.isAnonymous ? undefined : currentUser.id,
    };

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { id: `q-${Date.now()}`, type: "feedback", payload: newFb, queuedAt: new Date().toISOString() },
      ]);
    }

    setFeedbackResponses((prev) => [newFb, ...prev]);

    if (!isOffline) {
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFb),
      }).catch((e) => console.warn("Feedback API sync:", e));
    }
  };

  // Add Skill Credential
  const addSkillCredential = (skillData: Omit<SkillCredential, "id">) => {
    const newSkill: SkillCredential = {
      ...skillData,
      id: `skill-${Date.now()}`,
    };
    setSkillCredentials((prev) => [newSkill, ...prev]);

    if (!isOffline) {
      fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      }).catch((e) => console.warn("Skill API sync:", e));
    }
  };

  // Admin: Update Safety Report
  const updateSafetyReportStatus = (
    reportId: string,
    status: SafetyStatus,
    owner?: string,
    note?: string,
    correctiveActions?: string[]
  ) => {
    setSafetyReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status,
            assignedOwner: owner || r.assignedOwner,
            resolutionNote: note || r.resolutionNote,
            correctiveActions: correctiveActions || r.correctiveActions,
            resolvedAt: status === "resolved" ? new Date().toISOString().replace("T", " ").substring(0, 16) : r.resolvedAt,
          };
        }
        return r;
      })
    );

    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "SAFETY_STATUS_UPDATE",
        targetEntity: "safety_report",
        targetId: reportId,
        notes: `Status changed to ${status}. Note: ${note || "None"}`,
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/safety", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status, owner, resolutionNote: note, correctiveActions }),
      }).catch((e) => console.warn("Safety status API sync:", e));
    }
  };

  // Admin: Respond to Pay Query
  const respondToPayQuery = (queryId: string, response: string, adjustedAmount?: number) => {
    setPayQueries((prev) =>
      prev.map((q) =>
        q.id === queryId
          ? {
              ...q,
              status: "resolved",
              adminResponse: response,
              adjustedAmount: adjustedAmount || q.adjustedAmount,
              resolvedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
            }
          : q
      )
    );

    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "PAY_QUERY_RESOLVED",
        targetEntity: "pay_query",
        targetId: queryId,
        notes: `Admin response provided: ${response}`,
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/payroll/queries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId, adminResponse: response, adjustedAmount }),
      }).catch((e) => console.warn("Pay query resolve API sync:", e));
    }
  };

  // Admin: Update Workplace Policy Settings
  const updatePolicySettings = (newSettings: Partial<WorkplacePolicySettings>) => {
    setPolicySettings((prev) => ({ ...prev, ...newSettings }));
    setAuditLogs((prev) => [
      {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: "SETTINGS_UPDATED",
        targetEntity: "settings",
        targetId: "workplace-policy",
        notes: "Workplace policy rules updated.",
      },
      ...prev,
    ]);

    if (!isOffline) {
      fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      }).catch((e) => console.warn("Policy settings API sync:", e));
    }
  };

  // Privacy-safe aggregated feedback calculation (Strict K-anonymity guarantee >= 5)
  const getPrivacySafeFeedback = (filterSiteId?: string) => {
    const list = filterSiteId
      ? feedbackResponses.filter((f) => f.siteOrDepartmentId === filterSiteId)
      : feedbackResponses;

    const k = policySettings.privacyMinimumGroupSize || 5;
    if (list.length < k) {
      return {
        isSuppressed: true,
        sampleCount: list.length,
        metrics: null,
      };
    }

    const count = list.length;
    const safetySum = list.reduce((acc, f) => acc + f.safetyRating, 0);
    const respectSum = list.reduce((acc, f) => acc + f.supervisorRespectRating, 0);
    const workloadSum = list.reduce((acc, f) => acc + f.workloadRating, 0);
    const paySum = list.reduce((acc, f) => acc + f.payClarityRating, 0);
    const restSum = list.reduce((acc, f) => acc + f.restAndBreaksRating, 0);

    const enoughRestCount = list.filter((f) => f.enoughRestBetweenShifts).length;
    const safeRaisingCount = list.filter((f) => f.safeRaisingConcerns).length;

    return {
      isSuppressed: false,
      sampleCount: count,
      metrics: {
        safetyAvg: Number((safetySum / count).toFixed(1)),
        respectAvg: Number((respectSum / count).toFixed(1)),
        workloadAvg: Number((workloadSum / count).toFixed(1)),
        payClarityAvg: Number((paySum / count).toFixed(1)),
        restAvg: Number((restSum / count).toFixed(1)),
        enoughRestPercent: Math.round((enoughRestCount / count) * 100),
        safeRaisingPercent: Math.round((safeRaisingCount / count) * 100),
      },
    };
  };

  const t = useMemo(() => translations[language] || translations.en, [language]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allWorkers,
        shifts,
        attendanceRecords,
        payslips,
        payQueries,
        safetyReports,
        feedbackResponses,
        fatigueAlerts,
        skillCredentials,
        auditLogs,
        policySettings,
        sitesAndDepartments: [...demoSitesAndDepartments, demoEducationSite],

        language,
        t,
        setLanguage,
        simpleLanguageMode,
        setSimpleLanguageMode,
        reduceMotion,
        setReduceMotion,
        highContrast,
        setHighContrast,
        theme,
        setTheme,

        isSpeaking,
        speakText,
        stopSpeaking,

        isOffline,
        setIsOffline,
        offlineQueue,
        isSyncing,

        switchUser,

        checkIn,
        checkOut,
        startBreak,
        endBreak,
        submitSafetyReport,
        verifySafetyResolution,
        submitPayQuery,
        submitFeedback,
        addSkillCredential,

        updateSafetyReportStatus,
        respondToPayQuery,
        updatePolicySettings,

        getPrivacySafeFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
