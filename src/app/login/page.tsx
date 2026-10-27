"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
  UserPlus,
  Scale,
  FileCheck2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { switchUser } = useApp();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSelect = async (userId: string, targetPath: string) => {
    setLoadingId(userId);
    try {
      // Sync server-side session cookie
      await fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    } catch (e) {
      console.warn("Server session sync fallback:", e);
    }
    switchUser(userId);
    router.push(targetPath);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-surface-card dark:bg-surface-darkCard rounded-sheet p-6 sm:p-8 shadow-appleMd border border-surface-border dark:border-surface-darkBorder">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-control bg-brand-indigo text-white flex items-center justify-center mx-auto mb-3 shadow-appleSm">
            <ShieldCheck className="w-6 h-6 text-brand-tealLight" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome to FairShift
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Select a verified persona to test frontline worker and employer workflows.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs mt-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span>Pre-seeded across Construction, Healthcare & Education Sectors</span>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Frontline Workers (Mobile & Voice-First)
          </div>

          {/* Persona 1: Asha Kumar (Construction) */}
          <button
            type="button"
            onClick={() => handleSelect("worker-asha", "/worker/dashboard")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal dark:hover:border-brand-teal bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Asha Kumar
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  Construction
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Scaffolding & Rigging Helper • Metro Phase 4 Site (North Yard)
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-brand-teal font-semibold">
                <span>Enter Worker App (Hindi / हिन्दी)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Persona 2: Ravi Kumar (Healthcare Support) */}
          <button
            type="button"
            onClick={() => handleSelect("worker-ravi", "/worker/dashboard")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal dark:hover:border-brand-teal bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-brand-teal dark:text-teal-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Ravi Kumar
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                  Healthcare Support
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Senior Hospital Attendant • Ward 4 & ICU Housekeeping
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-brand-teal font-semibold">
                <span>Enter Worker App (Tamil / தமிழ்)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Persona 3: Suresh Patel (Education Campus) */}
          <button
            type="button"
            onClick={() => handleSelect("worker-suresh", "/worker/dashboard")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-indigo-500 dark:hover:border-indigo-400 bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Suresh Patel
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                  Education Campus
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Campus Facilities & Chemistry Lab Maintenance • NIT Campus
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-brand-indigo dark:text-indigo-300 font-semibold">
                <span>Enter Worker App (Telugu / हिन्दी)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pt-4 mb-1">
            Site Leadership & Administration
          </div>

          {/* Persona 4: Harish Shetty (Safety Officer) */}
          <button
            type="button"
            onClick={() => handleSelect("safety-harish", "/admin/safety")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-amber-500 dark:hover:border-amber-400 bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Harish Shetty
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  Safety Officer
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Chief EHS Safety Inspector • Incident Triage & Corrective Measures
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <span>Enter Safety Command Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Persona 5: Meenakshi Sundaram (HR & Payroll) */}
          <button
            type="button"
            onClick={() => handleSelect("hr-meenakshi", "/admin/pay-queries")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-emerald-500 dark:hover:border-emerald-400 bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Meenakshi Sundaram
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  HR & Payroll
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Payroll Compliance Officer • Wage Reconciliation & Overtime Audits
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Enter Wage Triage & Payroll Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Persona 6: Priya Sharma (Operations Admin) */}
          <button
            type="button"
            onClick={() => handleSelect("admin-priya", "/admin/dashboard")}
            disabled={loadingId !== null}
            className="w-full p-4 rounded-card border border-surface-border dark:border-surface-darkBorder hover:border-brand-indigo dark:hover:border-indigo-400 bg-surface-light dark:bg-surface-dark/50 text-left transition-all active:scale-[0.98] group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Priya Sharma
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-chip bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                  Operations Admin
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Workforce Operations Manager • 50+ Workers across Sites & Wards
              </p>
              <div className="flex items-center justify-between mt-2.5 text-xs text-brand-indigo dark:text-indigo-300 font-semibold">
                <span>Enter Admin Operations Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Link to First-time Onboarding */}
        <div className="mt-8 pt-6 border-t border-surface-border dark:border-surface-darkBorder flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-teal hover:underline"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Worker or Employer? Start 4-Step Onboarding</span>
          </Link>
          <div className="text-xs text-slate-500">
            UN SDG 8 • Zero Biometric Storage
          </div>
        </div>
      </div>
    </div>
  );
}
