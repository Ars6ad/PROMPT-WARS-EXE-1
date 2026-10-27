"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Globe2,
  Clock,
  Sparkles,
  Info,
  Save,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminSettingsPage() {
  const { policySettings, updatePolicySettings } = useApp();

  const [standardHours, setStandardHours] = useState(policySettings.standardWorkdayHours);
  const [otMultiplier, setOtMultiplier] = useState(policySettings.overtimeMultiplier);
  const [restInterval, setRestInterval] = useState(policySettings.requiredRestIntervalHours);
  const [weeklyThreshold, setWeeklyThreshold] = useState(policySettings.weeklyHourWarningThreshold);
  const [privacyGroupSize, setPrivacyGroupSize] = useState(policySettings.privacyMinimumGroupSize);
  const [orgName, setOrgName] = useState(policySettings.organizationName);

  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePolicySettings({
      standardWorkdayHours: Number(standardHours),
      overtimeMultiplier: Number(otMultiplier),
      requiredRestIntervalHours: Number(restInterval),
      weeklyHourWarningThreshold: Number(weeklyThreshold),
      privacyMinimumGroupSize: Number(privacyGroupSize),
      organizationName: orgName,
    });

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Toast Feedback */}
      {savedToast && (
        <div className="p-3.5 rounded-control bg-emerald-600 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Workplace policy rules saved & audit log created.</span>
        </div>
      )}

      {/* Top Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
          Policy Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          Workforce Rules & Policy Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure workplace shifts, fair overtime multipliers, rest thresholds, and k-anonymity
          privacy floors.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Name Card */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Organization Identity
          </h2>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Employer / Contractor Entity Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-xs text-slate-900 dark:text-white font-semibold"
            />
          </div>
        </div>

        {/* Shift & Overtime Policy Rules */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-teal" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Shift & Overtime Calculation Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Standard Daily Hours
              </label>
              <input
                type="number"
                min="6"
                max="10"
                step="0.5"
                value={standardHours}
                onChange={(e) => setStandardHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Standard baseline duty (typically 8.0 hours).
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Overtime Multiplier Rate
              </label>
              <input
                type="number"
                min="1.0"
                max="2.5"
                step="0.1"
                value={otMultiplier}
                onChange={(e) => setOtMultiplier(Number(e.target.value))}
                className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Multiplier applied to base rate (1.5x standard in FairShift).
              </span>
            </div>
          </div>
        </div>

        {/* Fatigue & Wellbeing Guardrails */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Fatigue & Shift Protection Limits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Mandatory Rest Interval Between Shifts (Hours)
              </label>
              <input
                type="number"
                min="8"
                max="14"
                step="0.5"
                value={restInterval}
                onChange={(e) => setRestInterval(Number(e.target.value))}
                className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Alerts triggered if turn-around is below this threshold (default 10h).
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Weekly Cumulative Hours Warning Limit
              </label>
              <input
                type="number"
                min="48"
                max="72"
                step="1"
                value={weeklyThreshold}
                onChange={(e) => setWeeklyThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Rolling 7-day threshold to flag cumulative fatigue (default 60h).
              </span>
            </div>
          </div>
        </div>

        {/* Privacy Floor (K-Anonymity) */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Worker Anonymity & Privacy Floor
            </h2>
          </div>

          <div className="text-xs space-y-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">
              Minimum Group Size for Feedback Aggregates (K-Anonymity Floor)
            </label>
            <input
              type="number"
              min="3"
              max="15"
              step="1"
              value={privacyGroupSize}
              onChange={(e) => setPrivacyGroupSize(Number(e.target.value))}
              className="w-32 p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-bold"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              If fewer than {privacyGroupSize} workers in a department or demographic respond to a
              sentiment pulse, the reporting view will suppress the metric to ensure individual
              answers cannot be de-anonymized.
            </p>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4 rounded-control bg-surface-muted dark:bg-surface-darkMuted text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <span className="font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Policy Advisory:</span>
          </span>
          <p>
            FairShift policies reflect workplace agreement standards. They do not constitute legal
            advice or statutory compliance certification.
          </p>
        </div>

        {/* Save Actions */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-control font-bold text-sm bg-brand-indigo hover:bg-brand-indigoDark text-white shadow-appleSm flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Workplace Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
}
