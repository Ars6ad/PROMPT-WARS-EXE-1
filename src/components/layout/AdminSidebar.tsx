"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Settings,
  Building2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const { safetyReports, payQueries, fatigueAlerts, policySettings } = useApp();

  const openSafetyCount = safetyReports.filter(
    (s) => s.status !== "verified" && s.status !== "resolved"
  ).length;

  const pendingPayCount = payQueries.filter((q) => q.status !== "resolved").length;

  const highFatigueCount = fatigueAlerts.filter((f) => f.riskLevel === "high").length;

  const navLinks = [
    {
      href: "/admin/dashboard",
      label: "Operations Overview",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      href: "/admin/workers",
      label: "Worker Directory",
      icon: Users,
      badge: "50 Active",
    },
    {
      href: "/admin/safety",
      label: "Safety Command",
      icon: ShieldAlert,
      badge: openSafetyCount > 0 ? `${openSafetyCount}` : undefined,
      badgeVariant: "danger",
    },
    {
      href: "/admin/insights",
      label: "Fair Work Insights",
      icon: Sparkles,
      badge: highFatigueCount > 0 ? `${highFatigueCount} Alerts` : undefined,
      badgeVariant: "warning",
    },
    {
      href: "/admin/pay-queries",
      label: "Pay Queries Triage",
      icon: HelpCircle,
      badge: pendingPayCount > 0 ? `${pendingPayCount}` : undefined,
      badgeVariant: "blue",
    },
    {
      href: "/admin/settings",
      label: "Workforce Rules",
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <aside className="w-64 bg-surface-card dark:bg-surface-darkCard border-r border-surface-border dark:border-surface-darkBorder flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Organization Header */}
      <div className="p-4 border-b border-surface-border dark:border-surface-darkBorder">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-control bg-brand-indigo text-white flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {policySettings.organizationName}
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Operations Control
            </span>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="p-3 space-y-1 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-control text-sm font-medium transition-all group",
                isActive
                  ? "bg-brand-indigo text-white shadow-appleSm font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-brand-tealLight"
                      : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  )}
                />
                <span className="truncate">{link.label}</span>
              </div>

              {link.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-chip",
                    isActive
                      ? "bg-white/20 text-white"
                      : link.badgeVariant === "danger"
                      ? "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                      : link.badgeVariant === "warning"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Worker App Preview Shortcut */}
      <div className="p-3 border-t border-surface-border dark:border-surface-darkBorder">
        <Link
          href="/worker/dashboard"
          className="flex items-center justify-between p-2.5 rounded-control text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-brand-teal hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors border border-teal-200 dark:border-teal-800"
        >
          <span>Open Worker App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Privacy guarantee badge */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 border-t border-surface-border dark:border-surface-darkBorder flex items-center gap-2">
        <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>K-Anonymity (≥5) & Zero Worker Retaliation Policy enforced</span>
      </div>
    </aside>
  );
}
