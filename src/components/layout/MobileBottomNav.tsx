"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, AlertTriangle, User, Wallet, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t, currentUser } = useApp();

  // Hide on admin routes and landing/auth routes
  if (
    pathname.startsWith("/admin") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/about" ||
    pathname === "/privacy"
  ) {
    return null;
  }

  const navItems = [
    {
      href: "/worker/dashboard",
      label: t.navHome,
      icon: Home,
      isActive: pathname === "/worker/dashboard",
    },
    {
      href: "/worker/shift",
      label: t.navShifts,
      icon: Clock,
      isActive: pathname === "/worker/shift",
    },
    {
      href: "/worker/safety",
      label: t.navSafety,
      icon: AlertTriangle,
      isActive: pathname === "/worker/safety",
    },
    {
      href: "/worker/pay",
      label: t.navPay,
      icon: Wallet,
      isActive: pathname === "/worker/pay",
    },
    {
      href: "/worker/profile",
      label: t.navProfile,
      icon: User,
      isActive: pathname === "/worker/profile" || pathname === "/worker/skills",
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-card/95 dark:bg-surface-darkCard/95 backdrop-blur-lg border-t border-surface-border dark:border-surface-darkBorder pb-safe md:hidden shadow-lg"
      aria-label="Worker Mobile Navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 min-h-[48px] min-w-[48px] rounded-control transition-all active:scale-95",
                item.isActive
                  ? "text-brand-teal dark:text-brand-tealLight font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5 transition-transform", item.isActive && "scale-110")} />
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-teal" />
                )}
              </div>
              <span className="text-[11px] mt-1 leading-none tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
