"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Building2, HeartPulse, ArrowLeft, Layers, Code, Globe2 } from "lucide-react";

export default function AboutPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mission & Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About FairShift: UN SDG 8 in Action
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          FairShift was conceived to bridge the systemic trust gap between frontline workers
          and employer operations in India.
        </p>
      </div>

      {/* SDG 8 Alignment */}
      <div className="p-6 rounded-sheet bg-brand-indigo text-white shadow-appleSm space-y-3">
        <h2 className="text-lg font-bold">UN Sustainable Development Goal 8 Alignment</h2>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Target 8.8 explicitly calls to: <em>&ldquo;Protect labour rights and promote safe and secure
          working environments for all workers, including migrant workers and those in precarious employment.&rdquo;</em>
        </p>
        <p className="text-xs text-indigo-100 leading-relaxed">
          In India, millions of workers on construction sites and in hospital support roles lack
          dependable digital records of overtime, face extreme heat and physical risks without safe
          channels to report hazards, and risk retaliation if they speak out. FairShift provides a
          humane, multilingual digital companion that restores transparency and mutual dignity.
        </p>
      </div>

      {/* Dual Industry Use Cases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-2">
          <div className="flex items-center gap-2 text-amber-600">
            <Building2 className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Construction Sites</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Addresses long concrete foundation pours, high heat indices, scaffolding hazards,
            and transient contractor teams with multi-language voice and QR attendance.
          </p>
        </div>

        <div className="p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-2">
          <div className="flex items-center gap-2 text-teal-600">
            <HeartPulse className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Healthcare Support</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Protects hospital housekeeping, ward attendants, and disinfection technicians from
            back-to-back nocturnal fatigue and hazardous bio-medical waste exposure.
          </p>
        </div>
      </div>

      {/* Tech Stack Overview */}
      <div className="p-6 rounded-sheet bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-3">
        <div className="flex items-center gap-2 text-brand-teal">
          <Code className="w-5 h-5" />
          <h2 className="font-bold text-base text-slate-900 dark:text-white">Technical Architecture</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Engineered as a production-style, mobile-first web application deployed on Google Cloud Run:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            Next.js 15+ App Router
          </div>
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            TypeScript & Zod
          </div>
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            Tailwind CSS
          </div>
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            Recharts Visualizations
          </div>
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            Offline Action Queue
          </div>
          <div className="p-2.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted font-semibold text-center">
            Multi-Language i18n
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-control bg-surface-muted dark:bg-surface-darkMuted text-xs text-slate-500 leading-relaxed">
        <strong>Advisory:</strong> FairShift operates as a workforce trust demonstration system.
        Calculations represent workplace policy estimates and do not substitute for formal legal
        representation or certified statutory labor audits.
      </div>
    </div>
  );
}
