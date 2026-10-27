import React from "react";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: React.ReactNode;
  whyExplanation?: string;
  isPriority?: boolean;
  onWhyClick?: () => void;
  className?: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  trend,
  icon,
  whyExplanation,
  isPriority,
  onWhyClick,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative p-5 rounded-card bg-surface-card dark:bg-surface-darkCard border transition-all shadow-appleSm",
        isPriority
          ? "border-brand-teal/40 dark:border-brand-teal/50 ring-1 ring-brand-teal/20"
          : "border-surface-border dark:border-surface-darkBorder hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-control bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              {icon}
            </div>
          )}
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
        </div>

        {whyExplanation && (
          <button
            type="button"
            onClick={onWhyClick}
            title={whyExplanation}
            className="text-slate-400 hover:text-brand-teal transition-colors p-1"
            aria-label="Why this metric"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {subValue && (
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            {subValue}
          </span>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-chip",
              trend.isNeutral
                ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                : trend.isPositive
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
            )}
          >
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
