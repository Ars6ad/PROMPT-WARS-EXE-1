"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Globe2,
  Sliders,
  ShieldCheck,
  Moon,
  Sun,
  Eye,
  Award,
  Wallet,
  Sparkles,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LanguageCode } from "@/types";

export default function WorkerProfilePage() {
  const {
    currentUser,
    switchUser,
    language,
    setLanguage,
    simpleLanguageMode,
    setSimpleLanguageMode,
    reduceMotion,
    setReduceMotion,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    t,
  } = useApp();

  const languages: { code: LanguageCode; native: string; label: string }[] = [
    { code: "en", native: "English", label: "English" },
    { code: "hi", native: "हिन्दी", label: "Hindi" },
    { code: "ta", native: "தமிழ்", label: "Tamil" },
    { code: "te", native: "తెలుగు", label: "Telugu" },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Header Card */}
      <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-indigo text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-appleSm">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">
            {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {"jobTitle" in currentUser ? currentUser.jobTitle : "Attendant"}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {"employeeCode" in currentUser ? currentUser.employeeCode : "AI-4082"}
            </span>
            <span className="text-[10px] font-semibold text-brand-teal capitalize">
              {currentUser.industry}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Pathways */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/worker/skills"
          className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal flex items-center justify-between text-xs font-bold transition-all shadow-appleSm"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-teal" />
            <span>{t.skillPassportTitle}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <Link
          href="/worker/pay"
          className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-brand-teal flex items-center justify-between text-xs font-bold transition-all shadow-appleSm"
        >
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>{t.navPay}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>

      {/* Language Preference Section */}
      <div className="p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-3">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-brand-teal" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            App Language / భాష / भाषा
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`p-3 rounded-control border text-left flex items-center justify-between transition-all ${
                language === l.code
                  ? "border-brand-teal bg-teal-50 dark:bg-teal-950/40 text-brand-teal font-bold ring-1 ring-brand-teal"
                  : "border-surface-border dark:border-surface-darkBorder text-slate-700 dark:text-slate-300"
              }`}
            >
              <div>
                <span className="text-sm block">{l.native}</span>
                <span className="text-[10px] text-slate-400">{l.label}</span>
              </div>
              {language === l.code && <span className="w-2 h-2 rounded-full bg-brand-teal" />}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility & Visual Comfort Settings */}
      <div className="p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-teal" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Accessibility & Visual Preferences
          </h2>
        </div>

        {/* Simple Language Mode */}
        <div className="flex items-center justify-between py-2 border-b border-surface-border dark:border-surface-darkBorder text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {t.simpleLanguageMode}
            </span>
            <span className="text-slate-500 text-[11px]">
              Uses extra-short phrases and large visual status chips
            </span>
          </div>
          <input
            type="checkbox"
            checked={simpleLanguageMode}
            onChange={(e) => setSimpleLanguageMode(e.target.checked)}
            className="w-5 h-5 rounded accent-brand-teal"
          />
        </div>

        {/* Reduce Motion Mode */}
        <div className="flex items-center justify-between py-2 border-b border-surface-border dark:border-surface-darkBorder text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {t.reduceMotion}
            </span>
            <span className="text-slate-500 text-[11px]">
              Replaces all sliding and spring motion with instant state changes
            </span>
          </div>
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
            className="w-5 h-5 rounded accent-brand-teal"
          />
        </div>

        {/* High Contrast Mode */}
        <div className="flex items-center justify-between py-2 border-b border-surface-border dark:border-surface-darkBorder text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {t.highContrast}
            </span>
            <span className="text-slate-500 text-[11px]">
              Increases borders and text contrast for outdoor sunlight use
            </span>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="w-5 h-5 rounded accent-brand-teal"
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between py-1 text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Dark Mode (Night Shift)
            </span>
            <span className="text-slate-500 text-[11px]">
              Saves battery and reduces glare during hospital/night duties
            </span>
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1.5 rounded-chip text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border flex items-center gap-1.5"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Link */}
      <div className="p-4 rounded-card bg-surface-muted dark:bg-surface-darkMuted text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Worker Rights & K-Anonymity Notice
          </span>
        </div>
        <Link href="/privacy" className="text-brand-teal font-bold hover:underline">
          Read
        </Link>
      </div>

      {/* Switch Persona */}
      <div className="pt-2">
        <Link
          href="/login"
          className="w-full py-3 rounded-control text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Switch Demo Account</span>
        </Link>
      </div>
    </div>
  );
}
