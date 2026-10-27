"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Globe2,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  Building2,
  HeartPulse,
  Sparkles,
  RefreshCw,
  Info,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LanguageCode } from "@/types";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const {
    currentUser,
    switchUser,
    language,
    setLanguage,
    t,
    theme,
    setTheme,
    isOffline,
    setIsOffline,
    offlineQueue,
    isSyncing,
  } = useApp();

  const pathname = usePathname();
  const isAdminView = pathname.startsWith("/admin");
  const isWorkerLanding = pathname === "/" || pathname === "/login" || pathname === "/about" || pathname === "/privacy";

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
  ];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-surface-card/95 dark:bg-surface-darkCard/95 backdrop-blur-md border-b border-surface-border dark:border-surface-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & SDG 8 Tag */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="FairShift Home"
            >
              <div className="w-9 h-9 rounded-control bg-brand-indigo flex items-center justify-center text-white shadow-appleSm group-hover:bg-brand-indigoLight transition-all">
                <ShieldCheck className="w-5 h-5 text-brand-tealLight" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                  Fair<span className="text-brand-teal">Shift</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none mt-1 hidden sm:inline">
                  UN SDG 8 • India
                </span>
              </div>
            </Link>

            {/* Offline simulation badge */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-chip text-xs font-medium transition-all active:scale-95 border",
                isOffline
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
              )}
              title="Click to toggle offline mode simulation"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline ({offlineQueue.length} queued)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>{isSyncing ? "Syncing..." : "Live"}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold bg-surface-muted dark:bg-surface-darkMuted text-slate-700 dark:text-slate-200 border border-surface-border dark:border-surface-darkBorder hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-h-[44px]"
              aria-label="Change Language"
            >
              <Globe2 className="w-4 h-4 text-brand-teal" />
              <span>
                {languages.find((l) => l.code === language)?.native || "Language"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Role Switcher Pill */}
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-control text-xs font-medium bg-brand-indigo/10 dark:bg-brand-indigo/30 text-brand-indigo dark:text-indigo-300 border border-brand-indigo/20 hover:bg-brand-indigo/20 transition-all min-h-[44px]"
              aria-label="Switch Role"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="text-left leading-tight hidden xs:block">
                <span className="block font-semibold truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                  {currentUser.role === "admin" ? "Admin" : `${currentUser.industry}`}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-control flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-surface-muted dark:hover:bg-surface-darkMuted border border-surface-border dark:border-surface-darkBorder transition-all"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Offline Queued notification bar */}
        {isOffline && (
          <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
            <WifiOff className="w-3.5 h-3.5" />
            <span>
              {t.offlineMode} - Check-ins, safety issues, and feedback will sync when reconnected.
            </span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-8">{children}</main>

      {/* Role Switcher Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Switch Demo Profile"
        description="Select a realistic test persona to experience the dual-interface platform"
      >
        <div className="space-y-3 pt-2">
          {/* Asha Kumar */}
          <button
            onClick={() => {
              switchUser("worker-asha");
              setIsRoleModalOpen(false);
            }}
            className={cn(
              "w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3",
              currentUser.id === "worker-asha"
                ? "border-brand-teal bg-teal-50/50 dark:bg-teal-950/30 ring-1 ring-brand-teal"
                : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  Asha Kumar
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-chip bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  Construction
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Construction Helper & Scaffolding Support • Metro Phase 4
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
                Preferred: Hindi (हिन्दी) • ₹110/hr + Overtime
              </p>
            </div>
          </button>

          {/* Ravi Kumar */}
          <button
            onClick={() => {
              switchUser("worker-ravi");
              setIsRoleModalOpen(false);
            }}
            className={cn(
              "w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3",
              currentUser.id === "worker-ravi"
                ? "border-brand-teal bg-teal-50/50 dark:bg-teal-950/30 ring-1 ring-brand-teal"
                : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  Ravi Kumar
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-chip bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  Hospital Care
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Senior Hospital Attendant • Ward 4 & ICU Housekeeping
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
                Preferred: Tamil (தமிழ்) • ₹125/hr + ICU Allowance
              </p>
            </div>
          </button>

          {/* Priya Sharma */}
          <button
            onClick={() => {
              switchUser("admin-priya");
              setIsRoleModalOpen(false);
            }}
            className={cn(
              "w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3",
              currentUser.id === "admin-priya"
                ? "border-brand-teal bg-teal-50/50 dark:bg-teal-950/30 ring-1 ring-brand-teal"
                : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  Priya Sharma
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-chip bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                  Operations Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Workforce Operations Manager • Apex Infrastructure & Care
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
                Admin Command Center: 50 Workers, Safety & Pay Triage
              </p>
            </div>
          </button>
        </div>
      </Modal>

      {/* Language Selector Modal */}
      <Modal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        title="Select Language / भाषा चुनें"
        description="Choose your preferred language for text and audio playback"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLanguage(l.code);
                setIsLangModalOpen(false);
              }}
              className={cn(
                "p-4 rounded-card border text-left transition-all flex items-center justify-between",
                language === l.code
                  ? "border-brand-teal bg-teal-50/60 dark:bg-teal-950/40 ring-1 ring-brand-teal"
                  : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <div>
                <span className="font-bold text-base block text-slate-900 dark:text-white">
                  {l.native}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {l.label}
                </span>
              </div>
              {language === l.code && (
                <span className="w-2 h-2 rounded-full bg-brand-teal" />
              )}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
