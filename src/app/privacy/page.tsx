"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";

export default function PrivacyNoticePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to FairShift Home</span>
        </Link>
        <span className="text-xs uppercase font-bold tracking-wider text-brand-teal block">
          Worker Rights & Trust Guarantee
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Privacy Notice & Protection Principles
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          FairShift is built on the foundational premise that frontline workers should never fear
          retaliation when recording shifts, checking wages, or raising safety concerns.
        </p>
      </div>

      {/* 3 Clear Columns: What Workers See vs What Admins See */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-3">
          <div className="flex items-center gap-2 text-brand-teal">
            <Eye className="w-5 h-5" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              What Frontline Workers See
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Full, unedited itemized records of personal shifts and overtime hours</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Clear breakdown of allowances and EPF/ESIC statutory deductions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Resolution timelines and management notes on submitted safety tickets</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Portable skill credentials and training badges</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-3">
          <div className="flex items-center gap-2 text-brand-indigo dark:text-indigo-400">
            <Lock className="w-5 h-5" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              What Employers / Admins See
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
              <span>Aggregated site-wide attendance, overtime patterns, and roster hotspots</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
              <span>Safety hazard reports with reporter names stripped if marked anonymous</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
              <span>Only aggregated sentiment scores when group size is at least 5 workers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
              <span>Immutable audit logs of all status modifications and wage adjustments</span>
            </li>
          </ul>
        </div>
      </div>

      {/* K-Anonymity Detailed Policy */}
      <div className="p-6 rounded-sheet bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-teal" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            The K-Anonymity (k ≥ 5) Standard
          </h2>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          In small teams or specialized shifts, individual survey answers can often be guessed
          by deduction. To protect frontline workers, FairShift mathematically enforces a k-anonymity
          privacy floor. If a department or demographic slice has fewer than 5 active responses,
          aggregated feedback is automatically suppressed from admin view.
        </p>
      </div>

      {/* Zero Surveillance Guarantees */}
      <div className="p-6 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Our Zero-Surveillance Commitments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-control">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              No Biometric Template Storage
            </span>
            <p className="text-slate-500">
              FairShift prototype stores zero facial geometry, iris scans, or fingerprint templates.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-control">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              No Continuous GPS Tracking
            </span>
            <p className="text-slate-500">
              Location is accessed only at the exact moment of check-in to verify site geofence entry.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-control">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Raw Audio Never Stored
            </span>
            <p className="text-slate-500">
              Voice notes are transcribed locally into anonymized text notes.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-control">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Audit Logged Interventions
            </span>
            <p className="text-slate-500">
              Every status change, wage adjustment, or policy update records a permanent timestamped actor record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
