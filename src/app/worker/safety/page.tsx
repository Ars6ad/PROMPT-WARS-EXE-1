"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Mic,
  Camera,
  Shield,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  EyeOff,
  UserCheck,
  Check,
  X,
  FileText,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { HazardCategory, SafetySeverity, SafetyReport } from "@/types";
import { VoiceInputModal } from "@/components/ui/VoiceInputModal";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { BottomSheet } from "@/components/ui/BottomSheet";

export default function WorkerSafetyPage() {
  const {
    currentUser,
    safetyReports,
    submitSafetyReport,
    verifySafetyResolution,
    t,
  } = useApp();

  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Safety Form State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<HazardCategory>("missing_ppe");
  const [severity, setSeverity] = useState<SafetySeverity>("high");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  // Worker verification feedback modal state
  const [verifyReportId, setVerifyReportId] = useState<string | null>(null);
  const [verificationFeedback, setVerificationFeedback] = useState("");

  const categories: { key: HazardCategory; label: string; icon: string }[] = [
    { key: "missing_ppe", label: t.catMissingPpe, icon: "🪖" },
    { key: "unsafe_equipment", label: t.catUnsafeEquipment, icon: "🪜" },
    { key: "fall_trip_hazard", label: t.catFallTrip, icon: "⚠️" },
    { key: "electrical_risk", label: t.catElectrical, icon: "⚡" },
    { key: "heat_dehydration", label: t.catHeatDehydration, icon: "☀️" },
    { key: "hygiene_sanitation", label: t.catHygiene, icon: "🧼" },
    { key: "staffing_overload", label: t.catStaffingOverload, icon: "👥" },
    { key: "other", label: t.catOther, icon: "📋" },
  ];

  const handleVoiceCapture = (transcription: string) => {
    setDescription(transcription);
    setHasVoiceNote(true);
  };

  const handlePhotoSimulate = () => {
    setHasPhoto(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRep = submitSafetyReport({
      title: `${categories.find((c) => c.key === category)?.label || "Hazard Report"}`,
      description: description || "Worker observed safety hazard on site.",
      hazardCategory: category,
      severity,
      industry: currentUser.industry,
      siteOrDepartmentName: currentUser.siteOrDepartmentName,
      isAnonymous,
      voiceNoteAttached: hasVoiceNote,
      voiceTranscription: hasVoiceNote ? description : undefined,
      photoAttached: hasPhoto,
      photoUrl: hasPhoto ? "/images/hazard-sample.jpg" : undefined,
    });

    setIsReportingOpen(false);
    setStep(1);
    setDescription("");
    setHasVoiceNote(false);
    setHasPhoto(false);
    setSuccessToast(
      `Safety report logged (${newRep.ticketNumber}). Supervisors notified without revealing identity.`
    );
    setTimeout(() => setSuccessToast(null), 4500);
  };

  const handleVerify = (worked: boolean) => {
    if (!verifyReportId) return;
    verifySafetyResolution(verifyReportId, worked, verificationFeedback);
    setVerifyReportId(null);
    setVerificationFeedback("");
    setSuccessToast(
      worked
        ? "Thank you! Resolution marked as verified."
        : "Report reopened. Safety officer alerted that hazard persists."
    );
    setTimeout(() => setSuccessToast(null), 4500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Feedback */}
      {successToast && (
        <div className="p-3.5 rounded-control bg-slate-900 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Screen Title */}
      <div>
        <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
          Workplace Protection
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          {t.safetyTitle}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Report hazards safely. Anonymous by default to protect your voice.
        </p>
      </div>

      {/* Primary Big Action: Report a Hazard */}
      <button
        type="button"
        onClick={() => setIsReportingOpen(true)}
        className="w-full p-5 rounded-sheet bg-red-700 hover:bg-red-800 text-white shadow-appleMd flex items-center justify-between transition-all active:scale-[0.98] group"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-control bg-white/20 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-base block">{t.reportHazard}</span>
            <span className="text-xs text-red-100 block mt-0.5">
              Missing PPE, loose scaffolding, biohazard, heat stress
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Pending Worker Verification Notice (Resolution Loop Closure) */}
      {safetyReports.filter((r) => r.status === "resolved" && r.workerVerifiedWorked === undefined)
        .length > 0 && (
        <div className="p-4 rounded-card bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-2">
          <div className="flex items-center gap-2 text-brand-teal dark:text-teal-300 font-bold text-xs">
            <UserCheck className="w-4 h-4" />
            <span>{t.workerVerifyResolution}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            A supervisor marked an issue resolved. Did this fix the problem for you on the ground?
          </p>
          <div className="flex gap-2 pt-1">
            {safetyReports
              .filter((r) => r.status === "resolved" && r.workerVerifiedWorked === undefined)
              .slice(0, 1)
              .map((rep) => (
                <button
                  key={rep.id}
                  onClick={() => setVerifyReportId(rep.id)}
                  className="px-3 py-1.5 rounded-control text-xs font-semibold bg-brand-teal text-white hover:bg-teal-700 transition-colors"
                >
                  Verify Resolution: {rep.ticketNumber}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Active & Past Safety Tickets Timeline */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-teal" />
          <span>Incident Resolution Tracking</span>
        </h2>

        <div className="space-y-3">
          {safetyReports.slice(0, 6).map((report) => {
            const isCritical = report.severity === "critical" || report.severity === "high";

            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-slate-300 dark:hover:border-slate-700 shadow-appleSm transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-400">
                        {report.ticketNumber}
                      </span>
                      {report.isAnonymous ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-chip">
                          <EyeOff className="w-3 h-3" /> Anonymous
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500">
                          {report.workerName}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                      {report.title}
                    </h3>
                  </div>

                  <StatusChip
                    status={report.status.replace("_", " ").toUpperCase()}
                    variant={
                      report.status === "verified"
                        ? "success"
                        : report.status === "resolved"
                        ? "teal"
                        : isCritical
                        ? "danger"
                        : "warning"
                    }
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {report.description}
                </p>

                {/* 5-Stage Status Timeline Indicator */}
                <div className="pt-2 border-t border-surface-border dark:border-surface-darkBorder">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                    <span
                      className={
                        report.status !== "submitted"
                          ? "text-brand-teal font-bold"
                          : "text-slate-900 dark:text-white"
                      }
                    >
                      1. Submitted
                    </span>
                    <span>→</span>
                    <span
                      className={
                        report.status === "acknowledged" ||
                        report.status === "in_progress" ||
                        report.status === "resolved" ||
                        report.status === "verified"
                          ? "text-brand-teal font-bold"
                          : ""
                      }
                    >
                      2. In Review
                    </span>
                    <span>→</span>
                    <span
                      className={
                        report.status === "resolved" || report.status === "verified"
                          ? "text-brand-teal font-bold"
                          : ""
                      }
                    >
                      3. Action Taken
                    </span>
                    <span>→</span>
                    <span
                      className={
                        report.status === "verified"
                          ? "text-emerald-600 font-bold"
                          : ""
                      }
                    >
                      4. Verified
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Report Wizard Modal */}
      <Modal
        isOpen={isReportingOpen}
        onClose={() => setIsReportingOpen(false)}
        title={t.reportHazard}
        description="Submit safety observation without retaliation fear"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="space-y-3">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                {t.hazardStep1}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategory(c.key)}
                    className={`p-3 rounded-control border text-left flex items-center gap-2 transition-all ${
                      category === c.key
                        ? "border-brand-teal bg-teal-50 dark:bg-teal-950/40 text-brand-teal font-bold ring-1 ring-brand-teal"
                        : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-base">{c.icon}</span>
                    <span className="text-xs truncate">{c.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-control font-semibold bg-brand-indigo text-white flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Voice or Text Description */}
          {step === 2 && (
            <div className="space-y-3">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                {t.hazardStep2}
              </span>

              {/* Voice capture trigger */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="flex-1 py-3 px-3 rounded-control border border-brand-teal bg-teal-50 dark:bg-teal-950/40 text-brand-teal font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Mic className="w-4 h-4" />
                  <span>{hasVoiceNote ? "Voice Attached ✓" : t.voiceNotePrompt}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePhotoSimulate}
                  className="py-3 px-4 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-muted dark:bg-surface-darkMuted text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>{hasPhoto ? "Photo Attached ✓" : "Photo"}</span>
                </button>
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Describe what needs attention
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: Scaffold lock pin missing on 2nd level, bricks at risk of falling..."
                  className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-control font-semibold bg-brand-indigo text-white flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Privacy & Severity */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                {t.hazardStep3}
              </span>

              {/* Anonymous Toggle (Default true) */}
              <div className="p-4 rounded-control bg-slate-100 dark:bg-slate-800/80 border border-surface-border dark:border-surface-darkBorder space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-brand-teal" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {t.anonymousToggleLabel}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded accent-brand-teal"
                  />
                </label>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.anonymousExplanation}
                </p>
              </div>

              {/* Severity Selection */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.severityLevel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSeverity("low")}
                    className={`py-2 px-3 rounded-control border text-center font-medium ${
                      severity === "low"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40"
                        : "border-surface-border"
                    }`}
                  >
                    {t.sevLow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeverity("high")}
                    className={`py-2 px-3 rounded-control border text-center font-medium ${
                      severity === "high"
                        ? "border-amber-600 bg-amber-50 text-amber-800 dark:bg-amber-950/40"
                        : "border-surface-border"
                    }`}
                  >
                    {t.sevHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeverity("critical")}
                    className={`py-2 px-3 rounded-control border text-center font-bold ${
                      severity === "critical"
                        ? "border-red-600 bg-red-50 text-red-800 dark:bg-red-950/40"
                        : "border-surface-border"
                    }`}
                  >
                    {t.sevCritical}
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-slate-500 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-control font-bold bg-brand-indigo text-white hover:bg-brand-indigoDark flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Safety Incident</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </Modal>

      {/* Detail Bottom Sheet for Ticket */}
      <BottomSheet
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.ticketNumber || "Ticket Details"}
        subtitle={selectedReport?.title}
      >
        {selectedReport && (
          <div className="space-y-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between pb-2 border-b">
              <span>Status:</span>
              <StatusChip
                status={selectedReport.status.replace("_", " ").toUpperCase()}
                variant={selectedReport.status === "verified" ? "success" : "warning"}
              />
            </div>

            <div>
              <span className="font-bold block text-slate-500 mb-1">Observation Description:</span>
              <p className="bg-slate-50 dark:bg-slate-900 p-3 rounded-control border">
                {selectedReport.description}
              </p>
            </div>

            {selectedReport.correctiveActions && (
              <div>
                <span className="font-bold block text-slate-500 mb-1">
                  Corrective Actions Taken by Management:
                </span>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedReport.correctiveActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReport.resolutionNote && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-control">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  Resolution Note:
                </span>
                <p>{selectedReport.resolutionNote}</p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="w-full py-2.5 rounded-control font-semibold bg-brand-indigo text-white"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </BottomSheet>

      {/* Worker Verify Resolution Modal */}
      <Modal
        isOpen={Boolean(verifyReportId)}
        onClose={() => setVerifyReportId(null)}
        title={t.didThisFixTheProblem}
        description="Your confirmation is required before this ticket is officially marked complete"
      >
        <div className="space-y-4 pt-2 text-xs">
          <textarea
            rows={3}
            value={verificationFeedback}
            onChange={(e) => setVerificationFeedback(e.target.value)}
            placeholder="Optional comment: e.g. 'Helmets and chin straps distributed at 10 AM, looks good.'"
            className="w-full p-3 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleVerify(true)}
              className="flex-1 py-3 rounded-control font-bold bg-emerald-700 text-white flex items-center justify-center gap-2 hover:bg-emerald-800"
            >
              <Check className="w-4 h-4" />
              <span>{t.yesFixed}</span>
            </button>

            <button
              type="button"
              onClick={() => handleVerify(false)}
              className="flex-1 py-3 rounded-control font-bold bg-red-700 text-white flex items-center justify-center gap-2 hover:bg-red-800"
            >
              <X className="w-4 h-4" />
              <span>{t.stillAProblem}</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Voice Recorder Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onCapture={handleVoiceCapture}
        promptText="Describe the safety hazard in your voice"
      />
    </div>
  );
}
