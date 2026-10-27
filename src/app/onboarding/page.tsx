"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  Sparkles,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { IndustryType, LanguageCode } from "@/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { setLanguage, setSimpleLanguageMode, setHighContrast, switchUser } = useApp();

  const [step, setStep] = useState<number>(1);
  const [roleType, setRoleType] = useState<"worker" | "employer">("worker");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [employeeCode, setEmployeeCode] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>("construction");
  const [selectedSiteId, setSelectedSiteId] = useState("site-metro-4");
  const [jobTitle, setJobTitle] = useState("");
  const [selectedLang, setSelectedLang] = useState<LanguageCode>("hi");
  const [simpleMode, setSimpleMode] = useState(false);
  const [contrastMode, setContrastMode] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("105");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = () => {
    if (step === 1 && !fullName.trim()) {
      setErrorMsg("Please provide your full legal or preferred name.");
      return;
    }
    setErrorMsg("");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const generatedId = `onboard-${roleType}-${Date.now().toString().slice(-6)}`;
      const payload = {
        id: generatedId,
        name: fullName.trim() || (roleType === "worker" ? "New Frontline Worker" : "New Facility Administrator"),
        role: roleType === "worker" ? "worker" : "admin",
        phone: phone.trim() || "+91 98000 00000",
        industry: selectedIndustry,
        organizationId: "org-apex",
        organizationName: "Apex Infrastructure & Care",
        siteOrDepartmentId: selectedSiteId,
        siteOrDepartmentName:
          selectedSiteId === "site-metro-4"
            ? "Metro Phase 4 - Station North Yard"
            : selectedSiteId === "dept-ward4-icu"
            ? "Ward 4 & ICU Housekeeping"
            : "NIT Campus - Facilities, Hostels & Labs",
        preferredLanguage: selectedLang,
        employeeCode: employeeCode.trim() || `FS-${Math.floor(1000 + Math.random() * 9000)}`,
        jobTitle: jobTitle.trim() || (roleType === "worker" ? "General Shift Associate" : "Operations Supervisor"),
        hourlyRate: parseFloat(hourlyRate) || 100,
        dailyBaseHours: 8,
        overtimeRateMultiplier: 1.5,
      };

      // Set session on server
      await fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: roleType === "worker" ? "worker-asha" : "admin-priya" }),
      });

      // Apply client accessibility prefs
      setLanguage(selectedLang);
      setSimpleLanguageMode(simpleMode);
      setHighContrast(contrastMode);

      if (roleType === "worker") {
        router.push("/worker/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Onboarding failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl bg-surface-card dark:bg-surface-darkCard rounded-sheet p-6 sm:p-10 shadow-appleMd border border-surface-border dark:border-surface-darkBorder">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-surface-border dark:border-surface-darkBorder mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-brand-teal text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                FairShift Onboarding
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                UN SDG 8 Aligned • Secure & Transparent Work Profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-brand-teal">
            <span>Step {step} of 4</span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-brand-teal transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {errorMsg && (
          <div className="p-3 mb-6 rounded-card bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Role & Identity */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Select Your Role in the Workforce
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleType("worker")}
                  className={`p-4 rounded-card border text-left transition-all ${
                    roleType === "worker"
                      ? "border-brand-teal bg-teal-50/60 dark:bg-teal-950/30 text-brand-teal"
                      : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Frontline Worker / Technician
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Daily-wage, shift worker, maintenance attendant, or scaffolding crew.
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType("employer")}
                  className={`p-4 rounded-card border text-left transition-all ${
                    roleType === "employer"
                      ? "border-brand-indigo bg-indigo-50/60 dark:bg-indigo-950/30 text-brand-indigo"
                      : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Site Supervisor / HR / Manager
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Shift scheduling, overtime authorization, safety triage, and payroll.
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Suresh Patel or Sunita Roy"
                  className="w-full pl-11 pr-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Mobile Number (For Shift SMS / OTP)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Employee / Contractor Code
                </label>
                <input
                  type="text"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  placeholder="e.g. AI-ED-5102 or CON-901"
                  className="w-full px-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Industry & Worksite */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Select Your Industry Sector
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndustry("construction");
                    setSelectedSiteId("site-metro-4");
                    setJobTitle("Scaffolding & Rigging Specialist");
                  }}
                  className={`p-4 rounded-card border text-left transition-all ${
                    selectedIndustry === "construction"
                      ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200"
                      : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <Building2 className="w-5 h-5 text-amber-600 mb-2" />
                  <div className="font-bold text-sm">Construction</div>
                  <div className="text-xs text-slate-500 mt-1">Infrastructure, Metro Rail, Civil Engineering</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndustry("hospital");
                    setSelectedSiteId("dept-ward4-icu");
                    setJobTitle("Hospital Attendant & Sanitation");
                  }}
                  className={`p-4 rounded-card border text-left transition-all ${
                    selectedIndustry === "hospital"
                      ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200"
                      : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <HeartPulse className="w-5 h-5 text-brand-teal mb-2" />
                  <div className="font-bold text-sm">Healthcare Support</div>
                  <div className="text-xs text-slate-500 mt-1">ICU Support, Waste Handling, Orderlies</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndustry("education");
                    setSelectedSiteId("site-nit-campus");
                    setJobTitle("Campus Facilities & Lab Maintenance Attendant");
                  }}
                  className={`p-4 rounded-card border text-left transition-all ${
                    selectedIndustry === "education"
                      ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200"
                      : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-indigo-600 mb-2" />
                  <div className="font-bold text-sm">Education Campus</div>
                  <div className="text-xs text-slate-500 mt-1">Colleges, Hostels, Laboratories & Grounds</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Worksite / Department Facility
              </label>
              <select
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                className="w-full px-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="site-metro-4">Metro Phase 4 - Station North Yard (Construction)</option>
                <option value="dept-ward4-icu">Ward 4 & ICU Housekeeping (Healthcare Support)</option>
                <option value="site-nit-campus">NIT Campus - Facilities, Hostels & Labs (Education)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Designated Trade / Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Electrician, Scaffolder, or Lab Attendant"
                className="w-full px-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Language & Accessibility */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-brand-teal" />
                <span>Preferred Platform Language</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { code: "hi", label: "हिन्दी", sub: "Hindi" },
                  { code: "ta", label: "தமிழ்", sub: "Tamil" },
                  { code: "te", label: "తెలుగు", sub: "Telugu" },
                  { code: "en", label: "English", sub: "Default" },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setSelectedLang(item.code as LanguageCode)}
                    className={`p-3.5 rounded-card border text-center transition-all ${
                      selectedLang === item.code
                        ? "border-brand-teal bg-teal-50/60 dark:bg-teal-950/30 text-brand-teal"
                        : "border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="font-bold text-base text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-teal" />
                <span>Accessibility & Assistive Features</span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-card border border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simpleMode}
                  onChange={(e) => setSimpleMode(e.target.checked)}
                  className="mt-1 w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Simple Language Mode (सरल भाषा / எளிய தமிழ்)
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Simplifies technical payroll and safety terms with visual icons and everyday speech.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-card border border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contrastMode}
                  onChange={(e) => setContrastMode(e.target.checked)}
                  className="mt-1 w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-brand-teal"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    High Contrast & Sunlight Mode
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Maximizes border contrast and text legibility for workers viewing screens under bright outdoor sunlight.
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: Pay & Confirmation */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="p-4 rounded-card bg-slate-50 dark:bg-slate-800/60 border border-surface-border dark:border-surface-darkBorder space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Profile Summary
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Name:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{fullName || "New Worker"}</p>
                </div>
                <div>
                  <span className="text-slate-500">Role:</span>
                  <p className="font-bold text-slate-900 dark:text-white capitalize">{roleType}</p>
                </div>
                <div>
                  <span className="text-slate-500">Industry:</span>
                  <p className="font-bold text-slate-900 dark:text-white capitalize">{selectedIndustry}</p>
                </div>
                <div>
                  <span className="text-slate-500">Language:</span>
                  <p className="font-bold text-slate-900 dark:text-white uppercase">{selectedLang}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Agreed Base Hourly Rate (₹ / hr)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-sm font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Transparent 1.5x Overtime Multiplier automatically applies beyond 8 hours/day.
              </p>
            </div>

            <div className="p-4 rounded-card bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
                <strong>FairShift Guarantee:</strong> All shift logs, overtime records, and safety feedback are cryptographically timestamped and isolated under strict privacy controls.
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-surface-border dark:border-surface-darkBorder mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-control border border-surface-border dark:border-surface-darkBorder text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-control bg-brand-teal text-white font-bold text-xs hover:bg-brand-tealDark transition-all shadow-appleSm active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-control bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-appleSm active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Finalizing..." : "Complete & Enter Portal"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
