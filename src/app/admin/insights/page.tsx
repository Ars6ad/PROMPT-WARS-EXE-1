"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  HeartPulse,
  Info,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

interface SupportSignal {
  id: string;
  departmentName: string;
  industry: "construction" | "hospital";
  workersCount: number;
  riskCategory: "fatigue_cluster" | "unresolved_pay" | "sentiment_dip" | "back_to_back_night";
  signalSeverity: "high" | "medium";
  transparentReason: string;
  recommendedSupportiveActions: string[];
}

export default function AdminInsightsPage() {
  const { allWorkers, fatigueAlerts, payQueries, safetyReports } = useApp();

  const [selectedSignal, setSelectedSignal] = useState<SupportSignal | null>(null);

  // Explainable ethical signals (No punitive scoring)
  const supportSignals: SupportSignal[] = [
    {
      id: "sig-1",
      departmentName: "Metro Phase 4 - Station North Yard",
      industry: "construction",
      workersCount: 26,
      riskCategory: "fatigue_cluster",
      signalSeverity: "high",
      transparentReason:
        "High cumulative overtime (148 hrs MTD) + 2 consecutive weekends of concrete curing pours + 4 workers logged >55h rolling duty.",
      recommendedSupportiveActions: [
        "Rotate foundation crew to daytime framing tasks",
        "Mandate 14-hour recuperation gap before next overtime shift",
        "Deploy on-site electrolyte fluid hydration canopy",
        "Add backup labor sub-contractor pool for concrete pouring",
      ],
    },
    {
      id: "sig-2",
      departmentName: "Ward 4 & ICU Housekeeping",
      industry: "hospital",
      workersCount: 16,
      riskCategory: "back_to_back_night",
      signalSeverity: "high",
      transparentReason:
        "3 attendants completed 4+ consecutive nocturnal shifts (21:00-06:00) with short day recovery intervals + recent PPE shortage report.",
      recommendedSupportiveActions: [
        "Enforce max 3 consecutive night duties policy",
        "Assign 48-hour recuperative time-off for nocturnal attendants",
        "Verify double-nitrile glove and face shield inventory in clean utility",
        "Conduct compassionate supervisor 1-on-1 check-in",
      ],
    },
    {
      id: "sig-3",
      departmentName: "Prestige Cyber Tech Park - Tower B",
      industry: "construction",
      workersCount: 14,
      riskCategory: "unresolved_pay",
      signalSeverity: "medium",
      transparentReason:
        "3 pay queries raised regarding gate biometric clock-ins failing during monsoon rain + scaffold plank replacement pending verification.",
      recommendedSupportiveActions: [
        "Fast-track gate clock-in manual register verification",
        "Ensure prompt credit of ₹1,760 adjustment to affected helpers",
        "Conduct supervisor safety toolbox briefing on scaffold planks",
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
          Ethical Workforce Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          Fair Work & Support Signals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Root-cause fatigue diagnostics and supportive interventions. Built to support and protect
          frontline workers, never for punitive surveillance or opaque employee scoring.
        </p>
      </div>

      {/* Ethical AI & Policy Banner */}
      <div className="p-4 rounded-sheet bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-brand-teal dark:text-teal-300 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-950 dark:text-teal-200 space-y-1">
          <span className="font-bold block">
            Guiding Principles: Supportive Intelligence (UN SDG 8)
          </span>
          <p className="text-[11px] text-teal-900/80 dark:text-teal-300/80 leading-relaxed">
            Every indicator below provides a plain-language explanation of <em>why</em> it was flagged
            and pairs it with concrete managerial actions: roster adjustments, PPE restocks, and
            supportive check-ins. No black-box algorithmic punishments.
          </p>
        </div>
      </div>

      {/* 3 Core Support Signal Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-teal" />
          <span>Active Department Support Hotspots</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportSignals.map((sig) => (
            <div
              key={sig.id}
              className="p-5 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {sig.industry === "construction" ? "Construction Site" : "Hospital Ward"}
                  </span>
                  <StatusChip
                    status={sig.signalSeverity === "high" ? "High Priority" : "Attention"}
                    variant={sig.signalSeverity === "high" ? "danger" : "warning"}
                  />
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {sig.departmentName}
                </h3>
                <span className="text-xs text-slate-500">
                  {sig.workersCount} frontline workers assigned
                </span>

                {/* Plain language reason */}
                <div className="mt-3 p-3 rounded-control bg-surface-muted dark:bg-surface-darkMuted text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Transparent Reason:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{sig.transparentReason}</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
                  Recommended Supportive Actions:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {sig.recommendedSupportiveActions.slice(0, 2).map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                      <span className="text-[11px]">{act}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSelectedSignal(sig)}
                  className="mt-4 w-full py-2.5 rounded-control text-xs font-bold bg-brand-indigo text-white hover:bg-brand-indigoDark flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Review Intervention Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intervention Detail Modal */}
      <Modal
        isOpen={Boolean(selectedSignal)}
        onClose={() => setSelectedSignal(null)}
        title={selectedSignal?.departmentName}
        description="Comprehensive workforce support and roster adjustment playbook"
        maxWidth="md"
      >
        {selectedSignal && (
          <div className="space-y-4 pt-1 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-control bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                Root Diagnostic Signal:
              </span>
              <p className="text-amber-800 dark:text-amber-300">
                {selectedSignal.transparentReason}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-2">
                All Recommended Supportive Actions:
              </span>
              <div className="space-y-2">
                {selectedSignal.recommendedSupportiveActions.map((act, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted border flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSignal(null)}
                className="px-5 py-2.5 rounded-control font-bold bg-brand-indigo text-white"
              >
                Acknowledge & Apply to Rostering
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
