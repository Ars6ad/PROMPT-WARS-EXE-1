"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  HeartPulse,
  Clock,
  Wallet,
  AlertTriangle,
  Sparkles,
  Award,
  Globe2,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Lock,
  Smartphone,
  Eye,
  Activity,
  Layers,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const { switchUser } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-surface-light via-white to-surface-muted dark:from-surface-dark dark:via-surface-darkCard dark:to-slate-950 border-b border-surface-border dark:border-surface-darkBorder">
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* SDG 8 Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-brand-teal dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-appleSm">
            <Sparkles className="w-4 h-4 text-brand-tealLight" />
            <span>UN SDG 8 • Decent Work & Economic Growth</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Fair work should be{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-teal">
              visible, understandable,
            </span>{" "}
            and safe.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            A multilingual, mobile-first workforce trust platform built for India&apos;s
            frontline workers in <strong>construction</strong> and <strong>healthcare support</strong>.
            Transparent wages, anonymous safety voice, and proactive fatigue protection.
          </p>

          {/* Quick Demo CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/worker/dashboard"
              onClick={() => switchUser("worker-asha")}
              className="px-6 py-3.5 rounded-control font-semibold text-sm bg-brand-indigo text-white hover:bg-brand-indigoDark shadow-appleMd transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Launch Worker App (Construction)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/worker/dashboard"
              onClick={() => switchUser("worker-ravi")}
              className="px-6 py-3.5 rounded-control font-semibold text-sm bg-brand-teal text-white hover:bg-teal-700 shadow-appleMd transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-teal-200" />
              <span>Launch Worker App (Hospital)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin/dashboard"
              onClick={() => switchUser("admin-priya")}
              className="px-6 py-3.5 rounded-control font-semibold text-sm bg-surface-card dark:bg-surface-darkCard text-slate-800 dark:text-slate-100 border border-surface-border dark:border-surface-darkBorder hover:bg-slate-100 dark:hover:bg-slate-800 shadow-appleSm transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-brand-indigo" />
              <span>Admin Operations Console</span>
            </Link>
          </div>

          {/* Trust stats pill */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">4 Languages</div>
              <div className="text-xs text-slate-500">English • தமிழ் • हिन्दी • తెలుగు</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">K-Anonymity ≥ 5</div>
              <div className="text-xs text-slate-500">Guaranteed feedback privacy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">Offline Queue</div>
              <div className="text-xs text-slate-500">Works with spotty data</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">Explainable</div>
              <div className="text-xs text-slate-500">Transparent pay & fatigue rules</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Industry Showcase */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-wider font-bold text-brand-teal">
            Tailored Industry Workflows
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Engineered for India&apos;s High-Stress Sectors
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-2">
            Construction sites and hospitals face unique workforce vulnerabilities. FairShift adapts
            its vocabulary, risk models, and safety taxonomies to each environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Construction Card */}
          <div className="p-8 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm relative overflow-hidden group hover:border-amber-400/50 transition-all">
            <div className="w-12 h-12 rounded-control bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-chip bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Heavy Infrastructure & Real Estate
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-2">
              Construction Sites
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Designed for scaffolding workers, masonry assistants, and helpers who face extreme heat,
              fall hazards, complex overtime shifts, and language barriers.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>QR geofence check-in at Work Zones & Gates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scaffold, PPE & 415V electrical hazard voice reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Heat stress and consecutive 12-hour pour alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Portable skills: NSDC Scaffold Safety & Masonry Helper</span>
              </li>
            </ul>

            <Link
              href="/worker/dashboard"
              onClick={() => switchUser("worker-asha")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-indigo dark:text-indigo-400 hover:underline"
            >
              <span>Explore as Asha Kumar (Construction Helper)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hospital Card */}
          <div className="p-8 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm relative overflow-hidden group hover:border-teal-400/50 transition-all">
            <div className="w-12 h-12 rounded-control bg-teal-100 dark:bg-teal-900/40 text-brand-teal dark:text-teal-300 flex items-center justify-center mb-6">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-chip bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Healthcare Systems & Hospitals
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-2">
              Hospitals & Clinical Support
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Tailored for housekeeping, ward attendants, sanitization technicians, and security
              facing back-to-back night shifts, bio-waste risks, and staffing overloads.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ward & ICU unit shift verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nitrile glove shortage & chemical splash incident tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fatigue guards: Max 3 consecutive night duty warning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified skills: Infection Prevention (IPC) & Bio-Medical Waste</span>
              </li>
            </ul>

            <Link
              href="/worker/dashboard"
              onClick={() => switchUser("worker-ravi")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal dark:text-teal-400 hover:underline"
            >
              <span>Explore as Ravi Kumar (Hospital Attendant)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Core Worker Features Overview */}
      <section className="py-16 bg-surface-muted/50 dark:bg-surface-darkCard/30 border-y border-surface-border dark:border-surface-darkBorder">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-teal">
              Worker Trust Architecture
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Six Pillars of Frontline Worker Dignity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-indigo-50 dark:bg-indigo-950/50 text-brand-indigo dark:text-indigo-300 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                1. Shift Check-in & Offline Queue
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Scan site QR codes or simulate geofence location. Offline-first architecture queues
                actions locally when cell reception drops on remote sites or hospital basements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                2. Transparent Pay & Overtime Wallet
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Visual breakdown of regular vs. overtime hours, statutory EPF/ESIC deductions,
                plain-language explanations, and printable HTML/PDF payslips.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                3. Safety Reporting & Worker Verification
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Voice note simulation, typed notes, and photo attachments. Genuine anonymous mode.
                Workers close the loop by confirming whether corrective actions worked.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-teal-50 dark:bg-teal-950/50 text-brand-teal dark:text-teal-300 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                4. Anonymous Feedback (k-Anonymity)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Simple emoji pulse ratings on supervisor respect, workload, and rest. Strict
                k-anonymity (≥5) suppresses aggregates to eliminate retaliation fear.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                5. Fatigue & Fair-Shift Early Alerts
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Explainable non-punitive logic alerts workers and supervisors when shifts exceed 12h,
                rest falls below 10h, or weekly cumulative hours exceed 55h.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
              <div className="w-10 h-10 rounded-control bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                6. Portable Skill Passport
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Workers own their verified certifications and self-reported track record, allowing
                them to take credentials from site to site with downloadable cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Intelligence Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-sheet bg-brand-indigo text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-tealLight">
              For Operations Leaders & Contractors
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4 leading-tight">
              Actionable, Privacy-Safe Operational Intelligence
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed mb-6">
              View live attendance rates, triage safety hazards in a Kanban command center,
              investigate back-to-back shift hotspots, and resolve pay queries with clear audit
              trails. All without compromising individual anonymous feedback.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-chip">
                <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                <span>50 Seeded Workers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-chip">
                <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                <span>Configurable Workplace Policies</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-chip">
                <CheckCircle2 className="w-4 h-4 text-brand-tealLight" />
                <span>Full Audit Logging</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <Link
              href="/admin/dashboard"
              onClick={() => switchUser("admin-priya")}
              className="px-6 py-3.5 rounded-control font-bold text-sm bg-white text-brand-indigo hover:bg-slate-100 shadow-md transition-all text-center"
            >
              Enter Admin Console as Priya Sharma
            </Link>
            <Link
              href="/privacy"
              className="px-6 py-2.5 rounded-control font-medium text-xs text-indigo-200 hover:text-white border border-indigo-400/40 text-center"
            >
              Read Worker Privacy Guarantees
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-surface-darkCard border-t border-surface-border dark:border-surface-darkBorder">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-teal" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              FairShift Platform
            </span>
            <span>•</span>
            <span>UN SDG 8 Hackathon Edition</span>
          </div>
          <p className="max-w-2xl mx-auto leading-relaxed">
            <strong>Important Policy Notice:</strong> FairShift provides estimated pay and shift health
            intelligence based on workplace-configured policies. It does not provide legal advice,
            statutory tax counsel, or automatic compliance guarantees.
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            <Link href="/about" className="hover:underline">
              About Mission
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Notice
            </Link>
            <Link href="/login" className="hover:underline">
              Demo Accounts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
