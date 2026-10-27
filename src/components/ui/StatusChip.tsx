import React from "react";
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: string;
  variant?: "neutral" | "success" | "warning" | "danger" | "teal" | "blue";
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export function StatusChip({
  status,
  variant = "neutral",
  icon,
  label,
  className,
}: StatusChipProps) {
  const variantStyles = {
    neutral: "bg-surface-muted text-slate-700 dark:bg-surface-darkMuted dark:text-slate-300 border-surface-border dark:border-surface-darkBorder",
    success: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    warning: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    danger: "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border-red-200 dark:border-red-800/50",
    teal: "bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800/50",
    blue: "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip text-xs font-medium border tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      <span>{label || status}</span>
    </span>
  );
}
