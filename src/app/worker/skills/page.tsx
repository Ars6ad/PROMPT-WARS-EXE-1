"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Download,
  Share2,
  Plus,
  Sparkles,
  QrCode,
  Calendar,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function WorkerSkillsPage() {
  const { currentUser, skillCredentials, addSkillCredential, t } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPassportCardOpen, setIsPassportCardOpen] = useState(false);

  // New skill form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"safety" | "technical" | "hygiene" | "equipment">("safety");
  const [newIssuer, setNewIssuer] = useState("");

  const mySkills = skillCredentials.filter((s) => s.workerId === currentUser.id);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addSkillCredential({
      workerId: currentUser.id,
      title: newTitle,
      industry: currentUser.industry,
      category: newCategory,
      issuer: newIssuer || "Self-Reported Frontline Experience",
      issuedDate: new Date().toISOString().substring(0, 10),
      isVerified: false, // Worker-entered starts unverified
      badgeLevel: "foundation",
    });

    setIsAddOpen(false);
    setNewTitle("");
    setNewIssuer("");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Screen Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
            Portable Career Equity
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            {t.skillPassportTitle}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified credentials and track record you can carry to any site
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPassportCardOpen(true)}
          className="px-3.5 py-2 rounded-control font-semibold text-xs bg-brand-indigo text-white shadow-appleSm flex items-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <Award className="w-4 h-4 text-brand-tealLight" />
          <span>View Passport</span>
        </button>
      </div>

      {/* Trust Distinction Banner */}
      <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Dual-Layer Trust Verification
            </span>
            <span className="text-[11px] text-slate-500">
              Gold badges are verified by accredited employers or NSDC
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="px-3 py-1.5 rounded-chip text-xs font-bold bg-teal-50 hover:bg-teal-100 text-brand-teal dark:bg-teal-950/50 dark:hover:bg-teal-900/50 border border-teal-200 dark:border-teal-800 flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skill Cards List */}
      <div className="space-y-3">
        {mySkills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-control flex items-center justify-center font-bold text-xs ${
                    skill.isVerified
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {skill.title}
                  </h3>
                  <span className="text-xs text-slate-500">{skill.issuer}</span>
                </div>
              </div>

              <StatusChip
                status={skill.isVerified ? t.verifiedBadge : t.workerEnteredBadge}
                variant={skill.isVerified ? "success" : "neutral"}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-border dark:border-surface-darkBorder text-[11px] text-slate-500">
              <span>Category: {skill.category.toUpperCase()}</span>
              <span>Issued: {skill.issuedDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Record Work Skill or Certification"
        description="Add a technical capability, machine safety certification, or on-site experience"
      >
        <form onSubmit={handleAddSkill} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Skill or Training Name
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Scaffolding Level 2, IPC Hygiene, First Aid"
              className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            >
              <option value="safety">Workplace Safety & Hazard Control</option>
              <option value="technical">Technical Trade (Masonry, Plumbing, Carpentry)</option>
              <option value="hygiene">Hygiene & Bio-Sanitization</option>
              <option value="equipment">Heavy Machinery & Equipment Handling</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Issuing Organization or Work Experience
            </label>
            <input
              type="text"
              value={newIssuer}
              onChange={(e) => setNewIssuer(e.target.value)}
              placeholder="e.g. NSDC, Apex Safety Academy, or Self-Reported 3 Years"
              className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 text-slate-600 font-medium"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-control font-bold bg-brand-indigo text-white hover:bg-brand-indigoDark"
            >
              Save to Passport
            </button>
          </div>
        </form>
      </Modal>

      {/* Shareable / Printable Worker Passport Card Modal */}
      <Modal
        isOpen={isPassportCardOpen}
        onClose={() => setIsPassportCardOpen(false)}
        title="Portable Worker Passport Card"
        description="Shareable verified credentials card for job applications and site entry"
        maxWidth="md"
      >
        <div className="p-6 rounded-card bg-gradient-to-br from-brand-indigo via-slate-900 to-slate-950 text-white shadow-2xl space-y-4 border border-indigo-500/30">
          <div className="flex justify-between items-start border-b border-indigo-400/20 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-brand-tealLight text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>FairShift Skill Passport</span>
              </div>
              <h3 className="text-xl font-extrabold mt-1">{currentUser.name}</h3>
              <p className="text-xs text-indigo-200">
                {"jobTitle" in currentUser ? currentUser.jobTitle : "Frontline Worker"}
              </p>
            </div>

            <div className="w-14 h-14 bg-white p-1 rounded-control flex items-center justify-center shrink-0">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-indigo-200 py-1">
            <div>
              <span className="text-[10px] uppercase text-indigo-400 block">Employee Code</span>
              <span className="font-mono font-bold text-white">
                {"employeeCode" in currentUser ? currentUser.employeeCode : "AI-CN-4082"}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-indigo-400 block">Industry Sector</span>
              <span className="font-bold text-white capitalize">{currentUser.industry}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase text-indigo-400 font-bold block mb-2">
              Verified Badges ({mySkills.filter((s) => s.isVerified).length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mySkills
                .filter((s) => s.isVerified)
                .map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-1 rounded-chip text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{skill.title}</span>
                  </span>
                ))}
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-400/20 flex justify-between items-center text-[10px] text-indigo-300">
            <span>Aligned with UN SDG 8 • India</span>
            <span>Scan QR for live cryptographic proof</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-control font-semibold text-xs bg-brand-indigo text-white flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Card</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
