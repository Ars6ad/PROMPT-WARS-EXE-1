"use client";

import React from "react";
import { Volume2, Square } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface AudioPlaybackControlProps {
  textToRead: string;
  label?: string;
  className?: string;
  variant?: "primary" | "subtle" | "chip";
}

export function AudioPlaybackControl({
  textToRead,
  label,
  className,
  variant = "subtle",
}: AudioPlaybackControlProps) {
  const { isSpeaking, speakText, stopSpeaking, t } = useApp();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(textToRead);
    }
  };

  if (variant === "chip") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isSpeaking ? t.stopAudio : t.listenAudio}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-chip text-xs font-medium transition-all active:scale-95",
          isSpeaking
            ? "bg-brand-indigo text-white shadow-sm animate-pulse"
            : "bg-surface-muted hover:bg-slate-200 text-slate-800 dark:bg-surface-darkMuted dark:hover:bg-slate-700 dark:text-slate-200 border border-surface-border dark:border-surface-darkBorder",
          className
        )}
      >
        {isSpeaking ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>{t.stopAudio}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-brand-teal" />
            <span>{label || t.listenAudio}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isSpeaking ? t.stopAudio : t.listenAudio}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-control text-sm font-medium transition-all active:scale-[0.98]",
        isSpeaking
          ? "bg-brand-indigo text-white shadow-appleSm animate-pulse"
          : "bg-teal-50/80 hover:bg-teal-100/90 text-teal-900 dark:bg-teal-950/40 dark:hover:bg-teal-900/50 dark:text-teal-200 border border-teal-200 dark:border-teal-800",
        className
      )}
    >
      {isSpeaking ? (
        <>
          <Square className="w-4 h-4 fill-current" />
          <span>{t.stopAudio}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-brand-teal dark:text-brand-tealLight" />
          <span>{label || t.listenAudio}</span>
        </>
      )}
    </button>
  );
}
