"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Building2,
  HeartPulse,
  Award,
  Clock,
  Activity,
  ArrowRight,
  ShieldCheck,
  Phone,
  Calendar,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { WorkerProfile } from "@/types";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function AdminWorkersPage() {
  const { allWorkers, sitesAndDepartments, skillCredentials, fatigueAlerts } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [healthFilter, setHealthFilter] = useState<string>("all");
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  // Filter workers
  const filteredWorkers = allWorkers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      industryFilter === "all" || worker.industry === industryFilter;

    const matchesHealth =
      healthFilter === "all" || worker.healthSignal === healthFilter;

    return matchesSearch && matchesIndustry && matchesHealth;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
          Workforce Directory
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          Frontline Staff Roster ({allWorkers.length} Workers)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Search employment profiles, duty health indicators, and verified skills.
          Anonymous feedback is strictly isolated from personnel records.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, code, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-card dark:bg-surface-darkCard text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-3 py-2 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-card dark:bg-surface-darkCard text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="all">All Industries</option>
            <option value="construction">Construction</option>
            <option value="hospital">Hospital Care</option>
          </select>

          {/* Health Signal Filter */}
          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="px-3 py-2 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-card dark:bg-surface-darkCard text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <option value="all">All Health Signals</option>
            <option value="stable">Stable</option>
            <option value="needs_attention">Needs Attention</option>
            <option value="high_risk">High Fatigue Risk</option>
          </select>
        </div>
      </div>

      {/* Workers Data Table */}
      <div className="rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted dark:bg-surface-darkMuted/60 border-b border-surface-border dark:border-surface-darkBorder text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Worker & Employee ID</th>
                <th className="py-3 px-4">Sector / Designation</th>
                <th className="py-3 px-4">Assigned Location</th>
                <th className="py-3 px-4">Weekly Duty</th>
                <th className="py-3 px-4">Health Signal</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border dark:divide-surface-darkBorder text-slate-700 dark:text-slate-200">
              {filteredWorkers.map((worker) => (
                <tr
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-indigo/10 text-brand-indigo dark:text-indigo-300 font-bold flex items-center justify-center shrink-0">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {worker.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {worker.employeeCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {worker.industry === "construction" ? (
                        <Building2 className="w-3.5 h-3.5 text-amber-600" />
                      ) : (
                        <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                      )}
                      <span>{worker.jobTitle}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs truncate">
                    {worker.siteOrDepartmentName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {worker.weeklyHours} hrs
                    </span>
                    <span className="text-[10px] text-slate-400 block">Rolling 7-day</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusChip
                      status={
                        worker.healthSignal === "stable"
                          ? "Stable"
                          : worker.healthSignal === "needs_attention"
                          ? "Attention"
                          : "High Risk"
                      }
                      variant={
                        worker.healthSignal === "stable"
                          ? "success"
                          : worker.healthSignal === "needs_attention"
                          ? "warning"
                          : "danger"
                      }
                    />
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-control text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worker Detail Drawer / Modal */}
      <Modal
        isOpen={Boolean(selectedWorker)}
        onClose={() => setSelectedWorker(null)}
        title={selectedWorker?.name}
        description={`Employment Dossier • ${selectedWorker?.employeeCode}`}
        maxWidth="md"
      >
        {selectedWorker && (
          <div className="space-y-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-control bg-surface-muted dark:bg-surface-darkMuted space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Designation:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedWorker.jobTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Industry:</span>
                <span className="font-bold capitalize">{selectedWorker.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Work Location:</span>
                <span className="font-semibold">{selectedWorker.siteOrDepartmentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shift Supervisor:</span>
                <span className="font-semibold">{selectedWorker.supervisorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Base Hourly Rate:</span>
                <span className="font-bold text-brand-teal">
                  ₹{selectedWorker.hourlyRate}/hour (1.5x OT)
                </span>
              </div>
            </div>

            {/* Fatigue Health Signal Banner */}
            <div className="p-3.5 rounded-control border space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold">Workforce Health Signal:</span>
                <StatusChip
                  status={selectedWorker.healthSignal.replace("_", " ").toUpperCase()}
                  variant={selectedWorker.healthSignal === "stable" ? "success" : "warning"}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                {selectedWorker.healthSignal === "high_risk"
                  ? "Alert: Worker logged over 55 duty hours in rolling 7-day period. Roster review advised."
                  : selectedWorker.healthSignal === "needs_attention"
                  ? "Warning: Extended shifts recorded. Verify turnaround rest window before overtime."
                  : "All duty parameters are within standard healthy limits."}
              </p>
            </div>

            {/* Skills & Verified Badges */}
            <div>
              <span className="font-bold block text-slate-800 dark:text-slate-200 mb-2">
                Recorded Skills & Badges ({selectedWorker.skillsCount})
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-chip text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Site Safety Basics (Verified)
                </span>
                <span className="px-2.5 py-1 rounded-chip text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {selectedWorker.industry === "construction" ? "Scaffold Assistant" : "IPC Hygiene Attendant"}
                </span>
              </div>
            </div>

            {/* Privacy Separation Note */}
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-control text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Personal employment record strictly separated from anonymous safety reports.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedWorker(null)}
                className="w-full py-2.5 rounded-control font-semibold bg-brand-indigo text-white text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
