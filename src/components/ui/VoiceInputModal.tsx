"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Check, X, AudioWaveform } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (transcription: string) => void;
  promptText?: string;
  defaultSimulatedText?: string;
}

export function VoiceInputModal({
  isOpen,
  onClose,
  onCapture,
  promptText = "Speak clearly in your language",
  defaultSimulatedText = "I observed scaffolding clamps loose on level 3, and workers do not have proper chin straps.",
}: VoiceInputModalProps) {
  const { t, language } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Simulated regional transcriptions based on language
  const simulatedByLang: Record<string, string> = {
    en: defaultSimulatedText,
    hi: "मचान के तीसरे स्तर पर क्लैंप ढीले हैं और श्रमिकों के पास सुरक्षा हेलमेट की बेल्ट नहीं है।",
    ta: "சாரக்கட்டின் 3-வது தளத்தில் கொக்கிகள் தளர்வாக உள்ளன மற்றும் தொழிலாளர்களுக்கு பாதுகாப்பு பட்டை இல்லை.",
    te: "మూడవ అంతస్తులో పరంజా బిగింపులు వదులుగా ఉన్నాయి మరియు కార్మికులకు సరైన హెల్మెట్ పట్టీలు లేవు.",
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimerSeconds(0);
    setTranscription("");

    // Simulate realistic speech recognition after 2.5 seconds
    setTimeout(() => {
      setTranscription(simulatedByLang[language] || defaultSimulatedText);
      setIsRecording(false);
    }, 2800);
  };

  const handleConfirm = () => {
    onCapture(transcription || simulatedByLang[language] || defaultSimulatedText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-surface-card dark:bg-surface-darkCard rounded-sheet p-6 shadow-2xl border border-surface-border dark:border-surface-darkBorder">
        <div className="flex items-center justify-between pb-4 border-b border-surface-border dark:border-surface-darkBorder">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-brand-teal" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t.voiceInput}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 flex flex-col items-center text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            {promptText}
          </p>

          {/* Animated mic container */}
          <div className="relative mb-6">
            {isRecording && (
              <span className="absolute -inset-4 rounded-full bg-teal-500/20 animate-ping" />
            )}
            <button
              type="button"
              onClick={isRecording ? () => setIsRecording(false) : handleStartRecording}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-transform active:scale-95 shadow-lg ${
                isRecording
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-brand-teal hover:bg-teal-700 text-white"
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-8 h-8" />
                  <span className="text-xs mt-1 font-mono">{timerSeconds}s</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8" />
                  <span className="text-xs mt-1 font-medium">{t.voiceInput}</span>
                </>
              )}
            </button>
          </div>

          {isRecording ? (
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-medium">
              <AudioWaveform className="w-5 h-5 animate-bounce" />
              <span>{t.listening}</span>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Tap button and speak. AI will transcribe your regional speech.
            </p>
          )}

          {/* Transcription preview */}
          {transcription && (
            <div className="mt-6 w-full text-left p-4 bg-surface-muted dark:bg-surface-darkMuted rounded-control border border-surface-border dark:border-surface-darkBorder">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                Transcribed Note:
              </span>
              <p className="text-sm text-slate-800 dark:text-slate-100 font-medium">
                "{transcription}"
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-border dark:border-surface-darkBorder">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-control text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            disabled={!transcription && !isRecording}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-control text-sm font-semibold bg-brand-indigo text-white hover:bg-brand-indigoDark disabled:opacity-50 flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            <span>{t.confirm}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
