"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Lock,
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  Mic,
  Send,
  HelpCircle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { VoiceInputModal } from "@/components/ui/VoiceInputModal";

export default function WorkerFeedbackPage() {
  const { currentUser, submitFeedback, t } = useApp();

  const [safetyRating, setSafetyRating] = useState<number>(4);
  const [supervisorRating, setSupervisorRating] = useState<number>(4);
  const [workloadRating, setWorkloadRating] = useState<number>(3);
  const [payClarityRating, setPayClarityRating] = useState<number>(4);
  const [restRating, setRestRating] = useState<number>(3);

  const [enoughRest, setEnoughRest] = useState<boolean>(true);
  const [safeRaising, setSafeRaising] = useState<boolean>(true);
  const [understandsPay, setUnderstandsPay] = useState<boolean>(true);

  const [comments, setComments] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const emojis = [
    { score: 1, icon: "😡", label: "Very Bad" },
    { score: 2, icon: "🙁", label: "Poor" },
    { score: 3, icon: "😐", label: "Okay" },
    { score: 4, icon: "🙂", label: "Good" },
    { score: 5, icon: "😄", label: "Great" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitFeedback({
      industry: currentUser.industry,
      siteOrDepartmentId: currentUser.siteOrDepartmentId,
      safetyRating,
      supervisorRespectRating: supervisorRating,
      workloadRating,
      payClarityRating,
      restAndBreaksRating: restRating,
      enoughRestBetweenShifts: enoughRest,
      safeRaisingConcerns: safeRaising,
      understandsPay,
      comments: comments || undefined,
      isAnonymous,
    });

    setToastMessage("Feedback submitted privately. Thank you for making work fairer!");
    setComments("");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const RatingRow = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
  }) => (
    <div className="space-y-2 p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder">
      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
        {label}
      </span>
      <div className="flex justify-between items-center gap-1">
        {emojis.map((em) => (
          <button
            key={em.score}
            type="button"
            onClick={() => onChange(em.score)}
            className={`flex-1 py-2 rounded-control flex flex-col items-center justify-center transition-all ${
              value === em.score
                ? "bg-teal-50 dark:bg-teal-950/50 border-2 border-brand-teal scale-105"
                : "border border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="text-2xl">{em.icon}</span>
            <span className="text-[10px] text-slate-500 font-semibold mt-1">
              {em.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3.5 rounded-control bg-slate-900 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Header */}
      <div>
        <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
          Anonymous Sentiment Pulse
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          {t.workerVoiceTitle}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t.feedbackSubtitle}
        </p>
      </div>

      {/* Privacy Guarantee Pill */}
      <div className="p-3.5 rounded-card bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-2.5 text-xs text-indigo-900 dark:text-indigo-200">
        <Lock className="w-4 h-4 text-brand-indigo dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">K-Anonymity Privacy Guarantee</span>
          <p className="text-[11px] text-indigo-800 dark:text-indigo-300 mt-0.5 leading-relaxed">
            {t.privacyGuaranteeKAnon} Managers see only aggregated averages, never individual answers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating 1: Safety */}
        <RatingRow
          label={t.rateSafety}
          value={safetyRating}
          onChange={setSafetyRating}
        />

        {/* Rating 2: Supervisor Respect */}
        <RatingRow
          label={t.rateSupervisor}
          value={supervisorRating}
          onChange={setSupervisorRating}
        />

        {/* Rating 3: Workload */}
        <RatingRow
          label={t.rateWorkload}
          value={workloadRating}
          onChange={setWorkloadRating}
        />

        {/* Rating 4: Pay Clarity */}
        <RatingRow
          label={t.ratePayClarity}
          value={payClarityRating}
          onChange={setPayClarityRating}
        />

        {/* Rating 5: Rest & Breaks */}
        <RatingRow
          label={t.rateRest}
          value={restRating}
          onChange={setRestRating}
        />

        {/* 3 Quick Yes/No Questions */}
        <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-4 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
            Quick Health & Rest Checks
          </span>

          {/* Q1: Rest */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {t.qRestBetweenShifts}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEnoughRest(true)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  enoughRest
                    ? "bg-brand-teal text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setEnoughRest(false)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  !enoughRest
                    ? "bg-red-700 text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.no}
              </button>
            </div>
          </div>

          {/* Q2: Safe Raising Concern */}
          <div className="flex items-center justify-between gap-2 border-t pt-3 border-surface-border dark:border-surface-darkBorder">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {t.qSafeRaisingConcern}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSafeRaising(true)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  safeRaising
                    ? "bg-brand-teal text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setSafeRaising(false)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  !safeRaising
                    ? "bg-red-700 text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.no}
              </button>
            </div>
          </div>

          {/* Q3: Understand Pay */}
          <div className="flex items-center justify-between gap-2 border-t pt-3 border-surface-border dark:border-surface-darkBorder">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {t.qUnderstandPay}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUnderstandsPay(true)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  understandsPay
                    ? "bg-brand-teal text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setUnderstandsPay(false)}
                className={`px-3 py-1.5 rounded-chip font-bold text-xs ${
                  !understandsPay
                    ? "bg-red-700 text-white"
                    : "bg-surface-muted text-slate-600 dark:bg-surface-darkMuted dark:text-slate-300"
                }`}
              >
                {t.no}
              </button>
            </div>
          </div>
        </div>

        {/* Optional Comments with Voice Recording simulation */}
        <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Optional Voice Note or Comments
            </span>
            <button
              type="button"
              onClick={() => setIsVoiceOpen(true)}
              className="text-brand-teal font-semibold flex items-center gap-1 hover:underline"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Note</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share anything you want leadership to understand..."
            className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-control font-bold text-sm bg-brand-indigo hover:bg-brand-indigoDark text-white shadow-appleSm transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Send className="w-4 h-4" />
          <span>Submit Anonymous Voice Feedback</span>
        </button>
      </form>

      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onCapture={(note) => setComments(note)}
        promptText="Speak your feedback in your comfortable language"
        defaultSimulatedText="Supervisors are supportive, but we need more drinking water tanks near the 4th level scaffold."
      />
    </div>
  );
}
