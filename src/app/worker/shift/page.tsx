"use client";

import React, { useState } from "react";
import {
  Clock,
  QrCode,
  MapPin,
  FileCheck,
  Coffee,
  CheckCircle2,
  Calendar,
  AlertCircle,
  WifiOff,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { StatusChip } from "@/components/ui/StatusChip";
import { formatDate } from "@/lib/utils";

export default function WorkerShiftPage() {
  const {
    currentUser,
    attendanceRecords,
    shifts,
    t,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
    isOffline,
  } = useApp();

  const [activeModal, setActiveModal] = useState<"qr" | "gps" | "manual" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const todayRecord = attendanceRecords.find(
    (r) => r.workerId === currentUser.id && r.date === todayStr
  );
  const isCheckedIn = Boolean(todayRecord && !todayRecord.checkOutTime);
  const isOnBreak = todayRecord?.breakStatus === "active";

  // Worker's personal records
  const myRecords = attendanceRecords.filter((r) => r.workerId === currentUser.id);

  const handleAction = (method: "qr_code" | "gps_location" | "manual_request") => {
    const res = checkIn(method);
    setActiveModal(null);
    if (res.success) {
      setToastMessage(
        isOffline
          ? "Check-in saved locally (Offline queue active)"
          : t.checkInSuccess
      );
    } else {
      setToastMessage(res.message);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConclude = () => {
    const res = checkOut();
    if (res.success) {
      setToastMessage(t.checkOutSuccess);
    } else {
      setToastMessage(res.message);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="p-3.5 rounded-control bg-slate-900 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Title */}
      <div>
        <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
          {currentUser.industry === "construction" ? t.workZoneConstruction : t.workZoneHospital}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          {t.currentShift}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {currentUser.siteOrDepartmentName} • Supervisor:{" "}
          {"supervisorName" in currentUser ? currentUser.supervisorName : "Assigned Lead"}
        </p>
      </div>

      {/* Immediate State Card */}
      <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
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
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {isCheckedIn
                ? isOnBreak
                  ? t.shiftStatusOnBreak
                  : t.shiftStatusCheckedIn
                : todayRecord?.checkOutTime
                ? t.shiftStatusCheckedOut
                : t.shiftStartsAt + " 09:00 AM"}
            </span>
          </div>

          <StatusChip
            status={isCheckedIn ? "Active Shift" : todayRecord?.checkOutTime ? "Concluded" : "Pending"}
            variant={isCheckedIn ? "success" : "neutral"}
          />
        </div>

        {/* Detailed Times */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-surface-border dark:border-surface-darkBorder text-xs">
          <div>
            <span className="text-slate-500 block">Check-in Time</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {todayRecord?.checkInTime || "--:--"}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Check-out Time</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {todayRecord?.checkOutTime || (isCheckedIn ? "Ongoing" : "--:--")}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">{t.scheduledHours}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              8.0 Hours
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Location Method</span>
            <span className="font-semibold text-brand-teal mt-0.5 block capitalize">
              {todayRecord?.checkInMethod?.replace("_", " ") || "Pending"}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 space-y-2">
          {!isCheckedIn ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveModal("qr")}
                className="py-3 px-4 rounded-control font-bold text-xs bg-brand-teal text-white hover:bg-teal-700 shadow-appleSm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
              >
                <QrCode className="w-4 h-4" />
                <span>{t.qrSimulation}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("gps")}
                className="py-3 px-4 rounded-control font-bold text-xs bg-brand-indigo text-white hover:bg-brand-indigoDark shadow-appleSm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.gpsSimulation}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleConclude}
                className="w-full py-3.5 rounded-control font-bold text-sm bg-red-700 hover:bg-red-800 text-white shadow-appleSm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Clock className="w-4 h-4" />
                <span>{t.checkOutAction}</span>
              </button>

              <button
                type="button"
                onClick={isOnBreak ? endBreak : startBreak}
                className="w-full py-2.5 rounded-control text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-surface-border dark:border-surface-darkBorder flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4 text-amber-600" />
                <span>{isOnBreak ? t.endBreakAction : t.startBreakAction}</span>
              </button>
            </div>
          )}

          {!isCheckedIn && (
            <button
              type="button"
              onClick={() => setActiveModal("manual")}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline block text-center"
            >
              {t.manualFallback}
            </button>
          )}
        </div>
      </div>

      {/* 30-Day Shift History List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-teal" />
            <span>Recent Logged Shifts</span>
          </h2>
          <span className="text-xs text-slate-500">{myRecords.length} shifts recorded</span>
        </div>

        <div className="space-y-2">
          {myRecords.slice(0, 10).map((record) => (
            <div
              key={record.id}
              className="p-3.5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatDate(record.date)}
                  </span>
                  {record.overtimeHours > 0 && (
                    <span className="px-1.5 py-0.5 rounded-chip text-[10px] font-semibold bg-teal-50 text-brand-teal dark:bg-teal-950/50 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      +{record.overtimeHours}h OT
                    </span>
                  )}
                  {record.offlineQueued && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-600">
                      <WifiOff className="w-3 h-3" />
                      Queued
                    </span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  In: {record.checkInTime || "--:--"} • Out: {record.checkOutTime || "Ongoing"}
                </p>
              </div>

              <div className="text-right">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  {record.actualHoursWorked} hrs
                </span>
                <StatusChip status="Verified" variant="success" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Simulation Bottom Sheet */}
      <BottomSheet
        isOpen={activeModal === "qr"}
        onClose={() => setActiveModal(null)}
        title={t.qrSimulation}
        subtitle="Simulated camera viewfinder scanning Site Entry Code"
      >
        <div className="py-4 text-center space-y-4">
          <div className="w-48 h-48 mx-auto rounded-card border-2 border-dashed border-brand-teal flex flex-col items-center justify-center p-4 bg-teal-50/50 dark:bg-teal-950/30">
            <QrCode className="w-24 h-24 text-brand-teal animate-pulse" />
            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 mt-2">
              SITE-QR-2026-N4
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            QR code detected for <strong>{currentUser.siteOrDepartmentName}</strong>.
          </p>

          <button
            type="button"
            onClick={() => handleAction("qr_code")}
            className="w-full py-3.5 rounded-control font-bold bg-brand-teal text-white shadow-appleSm active:scale-98"
          >
            Confirm & Log Attendance
          </button>
        </div>
      </BottomSheet>

      {/* GPS Simulation Bottom Sheet */}
      <BottomSheet
        isOpen={activeModal === "gps"}
        onClose={() => setActiveModal(null)}
        title={t.gpsSimulation}
        subtitle="Validating device coordinates against geofence"
      >
        <div className="py-4 space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-control space-y-1">
            <div className="flex justify-between">
              <span>Device Lat/Long:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                12.9716° N, 77.5946° E
              </span>
            </div>
            <div className="flex justify-between">
              <span>Geofence Boundary:</span>
              <span className="text-emerald-600 font-bold">Within Site Perimeter (15m radius)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAction("gps_location")}
            className="w-full py-3.5 rounded-control font-bold bg-brand-indigo text-white shadow-appleSm active:scale-98 text-sm"
          >
            Confirm GPS Attendance
          </button>
        </div>
      </BottomSheet>

      {/* Manual Request Fallback */}
      <BottomSheet
        isOpen={activeModal === "manual"}
        onClose={() => setActiveModal(null)}
        title={t.manualFallback}
        subtitle="Send manual sign-off request to supervisor"
      >
        <div className="py-4 space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            If your camera or location service is unavailable on your device, this sends a manual
            entry request to your site supervisor for end-of-shift approval.
          </p>

          <button
            type="button"
            onClick={() => handleAction("manual_request")}
            className="w-full py-3.5 rounded-control font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-appleSm active:scale-98 text-sm"
          >
            Submit Manual Request
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
