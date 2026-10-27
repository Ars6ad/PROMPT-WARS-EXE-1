"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Wallet,
  AlertTriangle,
  Activity,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Building2,
  HeartPulse,
  Coffee,
  Calendar,
  Volume2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatRupees } from "@/lib/utils";
import { AudioPlaybackControl } from "@/components/ui/AudioPlaybackControl";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { StatusChip } from "@/components/ui/StatusChip";

export default function WorkerDashboardPage() {
  const {
    currentUser,
    attendanceRecords,
    shifts,
    payslips,
    fatigueAlerts,
    t,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
  } = useApp();

  const [activeModal, setActiveModal] = useState<"checkin" | "why_fatigue" | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  // Active attendance record
  const todayRecord = attendanceRecords.find(
    (r) => r.workerId === currentUser.id && r.date === todayStr
  );
  const isCheckedIn = Boolean(todayRecord && !todayRecord.checkOutTime);
  const isOnBreak = todayRecord?.breakStatus === "active";

  // Relevant current payslip
  const currentPayslip = payslips.find((p) => p.workerId === currentUser.id);

  // Relevant fatigue alert
  const workerFatigueAlert = fatigueAlerts.find((f) => f.workerId === currentUser.id);

  const handleQuickCheck = () => {
    if (isCheckedIn) {
      const res = checkOut();
      setFeedbackToast(t.checkOutSuccess);
      setTimeout(() => setFeedbackToast(null), 3000);
    } else {
      setActiveModal("checkin");
    }
  };

  const handleCheckInMethod = (method: "qr_code" | "gps_location" | "manual_request") => {
    const res = checkIn(method);
    setActiveModal(null);
    setFeedbackToast(t.checkInSuccess);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Audio greeting content
  const audioGreeting = `${t.greetingWorker} ${currentUser.name}. ${
    isCheckedIn ? t.shiftStatusCheckedIn : t.shiftStartsAt + " 9:00 AM"
  }. ${
    currentPayslip
      ? `${t.estimatedPayForMonth} ${currentPayslip.month}: ${formatRupees(
          currentPayslip.netPayable
        )}.`
      : ""
  }`;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="p-3.5 rounded-control bg-emerald-600 text-white text-sm font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Greeting & Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
            {currentUser.industry === "construction" ? "Construction Site" : "Hospital Care"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            {t.greetingWorker}, {currentUser.name.split(" ")[0]}!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {currentUser.siteOrDepartmentName}
          </p>
        </div>

        {/* TTS Audio Narration Button */}
        <AudioPlaybackControl textToRead={audioGreeting} variant="chip" />
      </div>

      {/* Primary Shift Status Card (Apple-inspired central action) */}
      <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isCheckedIn
                  ? isOnBreak
                    ? "bg-amber-500 animate-pulse"
                    : "bg-emerald-500 animate-pulse"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {isCheckedIn
                ? isOnBreak
                  ? t.shiftStatusOnBreak
                  : t.shiftStatusCheckedIn
                : t.shiftStartsAt + " 09:00 AM"}
            </span>
          </div>

          <StatusChip
            status={isCheckedIn ? "Active Shift" : "Scheduled"}
            variant={isCheckedIn ? "success" : "neutral"}
          />
        </div>

        {/* Shift Details */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-surface-border dark:border-surface-darkBorder my-3 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">{t.supervisor}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {"supervisorName" in currentUser ? currentUser.supervisorName : "Vikram Gowda"}
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">
              {currentUser.industry === "construction"
                ? t.workZoneConstruction
                : t.workZoneHospital}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {currentUser.siteOrDepartmentName}
            </span>
          </div>
        </div>

        {/* Action Button: Check in or Check out */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleQuickCheck}
            className={`w-full py-4 rounded-control text-base font-bold transition-all shadow-appleSm active:scale-[0.98] min-h-[48px] flex items-center justify-center gap-2 ${
              isCheckedIn
                ? "bg-brand-indigo hover:bg-brand-indigoDark text-white"
                : "bg-brand-teal hover:bg-teal-700 text-white"
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{isCheckedIn ? t.checkOutAction : t.checkInAction}</span>
          </button>

          {isCheckedIn && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={isOnBreak ? endBreak : startBreak}
                className="flex-1 py-2.5 rounded-control text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-surface-border dark:border-surface-darkBorder flex items-center justify-center gap-1.5 transition-colors"
              >
                <Coffee className="w-4 h-4 text-amber-600" />
                <span>{isOnBreak ? t.endBreakAction : t.startBreakAction}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Estimated Pay Wallet Glance */}
      {currentPayslip && (
        <div className="p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-control bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                {t.estimatedPayForMonth} {currentPayslip.month}
              </span>
            </div>
            <StatusChip
              status={currentPayslip.paymentStatus.toUpperCase()}
              variant="teal"
            />
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatRupees(currentPayslip.netPayable)}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.paymentExpectedDate} {currentPayslip.paymentDate}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Overtime Tracked</span>
              <span className="text-sm font-bold text-brand-teal">
                +{currentPayslip.overtimeHours} hrs (₹{currentPayslip.overtimePay})
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 bg-surface-muted dark:bg-surface-darkMuted p-3 rounded-control border border-surface-border dark:border-surface-darkBorder line-clamp-2">
            {currentPayslip.plainLanguageExplanation}
          </p>

          <div className="mt-4 pt-3 border-t border-surface-border dark:border-surface-darkBorder flex items-center justify-between">
            <Link
              href="/worker/pay"
              className="text-xs font-semibold text-brand-indigo dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View Full Payslip Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <AudioPlaybackControl
              textToRead={currentPayslip.plainLanguageExplanation}
              variant="chip"
              label="Listen Pay"
            />
          </div>
        </div>
      )}

      {/* 3. Fatigue & Shift Health Signal Card */}
      {workerFatigueAlert ? (
        <div className="p-5 rounded-card bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 shadow-appleSm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                {workerFatigueAlert.headline}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("why_fatigue")}
              className="text-amber-700 dark:text-amber-300 hover:underline text-xs flex items-center gap-1 shrink-0 font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.whyAmISeeingThis}</span>
            </button>
          </div>

          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed mb-3">
            {workerFatigueAlert.message} {t.askSupervisorRest}
          </p>

          <div className="text-[11px] text-amber-900/80 dark:text-amber-200/80 font-medium bg-amber-100/60 dark:bg-amber-900/40 p-2.5 rounded-chip">
            {workerFatigueAlert.supportiveActionSuggestion}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.restSignalGood}</span>
          </div>
          <span className="text-emerald-700 dark:text-emerald-400 font-medium">Standard Hours</span>
        </div>
      )}

      {/* 4. Quick Safety & Feedback Hub */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/worker/safety"
          className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-red-300 dark:hover:border-red-800 shadow-appleSm transition-all active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-control bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">
              {t.reportHazard}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Voice / Anonymous
            </span>
          </div>
        </Link>

        <Link
          href="/worker/feedback"
          className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-teal-300 dark:hover:border-teal-800 shadow-appleSm transition-all active:scale-[0.98] flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-control bg-teal-50 dark:bg-teal-950/50 text-brand-teal dark:text-teal-300 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">
              {t.workerVoiceTitle}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Private 1-5 Emoji Rating
            </span>
          </div>
        </Link>
      </div>

      {/* Check-In Method Bottom Sheet */}
      <BottomSheet
        isOpen={activeModal === "checkin"}
        onClose={() => setActiveModal(null)}
        title="Confirm Worksite Attendance"
        subtitle="Choose how to verify your shift attendance"
      >
        <div className="space-y-3 pt-2">
          {/* QR Code Simulation */}
          <button
            type="button"
            onClick={() => handleCheckInMethod("qr_code")}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal bg-surface-light dark:bg-surface-dark text-left flex items-center gap-3 transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-control bg-brand-teal text-white flex items-center justify-center font-bold">
              QR
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white block">
                {t.qrSimulation}
              </span>
              <span className="text-xs text-slate-500">
                Point camera at the printed badge at Site Gate
              </span>
            </div>
          </button>

          {/* GPS Simulation */}
          <button
            type="button"
            onClick={() => handleCheckInMethod("gps_location")}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal bg-surface-light dark:bg-surface-dark text-left flex items-center gap-3 transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-control bg-brand-indigo text-white flex items-center justify-center font-bold">
              GPS
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white block">
                {t.gpsSimulation}
              </span>
              <span className="text-xs text-slate-500">
                Confirm current phone location is within site bounds
              </span>
            </div>
          </button>

          {/* Manual Fallback */}
          <button
            type="button"
            onClick={() => handleCheckInMethod("manual_request")}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-slate-400 bg-surface-light dark:bg-surface-dark text-left flex items-center gap-3 transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-control bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
              REQ
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white block">
                {t.manualFallback}
              </span>
              <span className="text-xs text-slate-500">
                Submit manual time request if phone camera/GPS fails
              </span>
            </div>
          </button>
        </div>
      </BottomSheet>

      {/* Why am I seeing this Fatigue Alert Sheet */}
      <BottomSheet
        isOpen={activeModal === "why_fatigue"}
        onClose={() => setActiveModal(null)}
        title={t.whyAmISeeingThis}
        subtitle="Transparent explanation of workforce wellbeing algorithms"
      >
        {workerFatigueAlert && (
          <div className="space-y-4 pt-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-control border border-amber-200 dark:border-amber-800 text-xs">
              <strong>Rule Triggered:</strong> {workerFatigueAlert.whyExplanation}
            </div>
            <p className="text-xs leading-relaxed">
              <strong>Non-Punitive Guarantee:</strong> FairShift fatigue signals are designed to protect
              workers from dangerous physical exhaustion and injuries. Managers receive this signal as
              a reminder to review duty rosters and allocate rest periods, never to deduct pay or penalize workers.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-control font-semibold bg-brand-indigo text-white text-xs"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
