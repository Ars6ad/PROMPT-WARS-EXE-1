"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Kanban,
  Table as TableIcon,
  CheckCircle2,
  Clock,
  EyeOff,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  Check,
  User,
  Calendar,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SafetyReport, SafetyStatus } from "@/types";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function AdminSafetyPage() {
  const { safetyReports, updateSafetyReportStatus } = useApp();

  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);

  // Resolution modal state
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [assignedOwnerInput, setAssignedOwnerInput] = useState("");
  const [correctiveActionInput, setCorrectiveActionInput] = useState("");
  const [actionsList, setActionsList] = useState<string[]>([]);
  const [statusToSet, setStatusToSet] = useState<SafetyStatus>("in_progress");

  const columns: { status: SafetyStatus; label: string; bg: string }[] = [
    { status: "submitted", label: "1. Submitted", bg: "bg-slate-100 dark:bg-slate-800/50" },
    { status: "acknowledged", label: "2. Acknowledged", bg: "bg-blue-50/60 dark:bg-blue-950/30" },
    { status: "in_progress", label: "3. In Progress", bg: "bg-amber-50/60 dark:bg-amber-950/30" },
    { status: "resolved", label: "4. Resolved (Awaiting Worker)", bg: "bg-teal-50/60 dark:bg-teal-950/30" },
    { status: "verified", label: "5. Verified Closed", bg: "bg-emerald-50/60 dark:bg-emerald-950/30" },
  ];

  const handleOpenTriage = (report: SafetyReport, nextStatus: SafetyStatus) => {
    setSelectedReport(report);
    setStatusToSet(nextStatus);
    setAssignedOwnerInput(report.assignedOwner || "Harish Shetty (Site Safety Lead)");
    setResolutionNote(report.resolutionNote || "");
    setActionsList(report.correctiveActions || []);
    setIsResolveModalOpen(true);
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    const finalActions = correctiveActionInput
      ? [...actionsList, correctiveActionInput]
      : actionsList;

    updateSafetyReportStatus(
      selectedReport.id,
      statusToSet,
      assignedOwnerInput,
      resolutionNote,
      finalActions
    );

    setIsResolveModalOpen(false);
    setSelectedReport(null);
    setCorrectiveActionInput("");
    setResolutionNote("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
            Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Safety Hazard Triage & SLA Tracking
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track corrective actions from frontline reporting through worker ground verification.
            Anonymous reporter identities are never revealed.
          </p>
        </div>

        {/* View Switcher: Kanban vs Table */}
        <div className="flex items-center gap-1 p-1 bg-surface-muted dark:bg-surface-darkMuted rounded-control border border-surface-border dark:border-surface-darkBorder">
          <button
            type="button"
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-1.5 rounded-control text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === "kanban"
                ? "bg-surface-card dark:bg-surface-darkCard text-slate-900 dark:text-white shadow-appleSm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-control text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === "table"
                ? "bg-surface-card dark:bg-surface-darkCard text-slate-900 dark:text-white shadow-appleSm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const reportsInCol = safetyReports.filter((r) => r.status === col.status);

            return (
              <div
                key={col.status}
                className={`p-3 rounded-card border border-surface-border dark:border-surface-darkBorder min-h-[500px] flex flex-col ${col.bg}`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border dark:border-surface-darkBorder">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {col.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-chip bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border">
                    {reportsInCol.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {reportsInCol.map((report) => {
                    const isUrgent =
                      report.severity === "critical" || report.severity === "high";

                    return (
                      <div
                        key={report.id}
                        className="p-3.5 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {report.ticketNumber}
                          </span>
                          <StatusChip
                            status={report.severity.toUpperCase()}
                            variant={isUrgent ? "danger" : "warning"}
                          />
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                          {report.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {report.description}
                        </p>

                        <div className="pt-2 border-t border-surface-border dark:border-surface-darkBorder flex items-center justify-between text-[10px] text-slate-400">
                          {report.isAnonymous ? (
                            <span className="flex items-center gap-1 text-slate-500">
                              <EyeOff className="w-3 h-3" /> Anonymous
                            </span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-300 font-medium">
                              {report.workerName}
                            </span>
                          )}

                          <span className="truncate max-w-[80px]">
                            {report.siteOrDepartmentName.split("-")[0]}
                          </span>
                        </div>

                        {/* Triage Action Button */}
                        <div className="pt-1">
                          {report.status === "submitted" && (
                            <button
                              type="button"
                              onClick={() => handleOpenTriage(report, "acknowledged")}
                              className="w-full py-1.5 rounded-control text-[11px] font-semibold bg-brand-indigo text-white hover:bg-brand-indigoDark flex items-center justify-center gap-1"
                            >
                              <span>Acknowledge & Assign</span>
                            </button>
                          )}

                          {report.status === "acknowledged" && (
                            <button
                              type="button"
                              onClick={() => handleOpenTriage(report, "in_progress")}
                              className="w-full py-1.5 rounded-control text-[11px] font-semibold bg-amber-600 text-white hover:bg-amber-700 flex items-center justify-center gap-1"
                            >
                              <span>Start Action Plan</span>
                            </button>
                          )}

                          {report.status === "in_progress" && (
                            <button
                              type="button"
                              onClick={() => handleOpenTriage(report, "resolved")}
                              className="w-full py-1.5 rounded-control text-[11px] font-semibold bg-brand-teal text-white hover:bg-teal-700 flex items-center justify-center gap-1"
                            >
                              <span>Record Resolution</span>
                            </button>
                          )}

                          {report.status === "resolved" && (
                            <div className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold text-center bg-teal-50 dark:bg-teal-950/40 py-1 rounded-control border border-teal-200 dark:border-teal-800">
                              Awaiting Worker Ground Verification
                            </div>
                          )}

                          {report.status === "verified" && (
                            <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold text-center bg-emerald-50 dark:bg-emerald-950/40 py-1 rounded-control border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Worker Verified Ground Fix</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted dark:bg-surface-darkMuted/60 border-b border-surface-border dark:border-surface-darkBorder text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Ticket & Title</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Work Location</th>
                <th className="py-3 px-4">Reporter Privacy</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Lifecycle Status</th>
                <th className="py-3 px-4">Triage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border dark:divide-surface-darkBorder text-slate-700 dark:text-slate-200">
              {safetyReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 block">
                      {report.ticketNumber}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {report.title}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusChip
                      status={report.severity.toUpperCase()}
                      variant={report.severity === "critical" ? "danger" : "warning"}
                    />
                  </td>
                  <td className="py-3 px-4 truncate max-w-xs">{report.siteOrDepartmentName}</td>
                  <td className="py-3 px-4">
                    {report.isAnonymous ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-chip">
                        <EyeOff className="w-3 h-3" /> Anonymous Worker
                      </span>
                    ) : (
                      <span>{report.workerName}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {report.assignedOwner || (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <StatusChip
                      status={report.status.replace("_", " ").toUpperCase()}
                      variant={
                        report.status === "verified"
                          ? "success"
                          : report.status === "resolved"
                          ? "teal"
                          : "warning"
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleOpenTriage(report, "in_progress")}
                      className="text-xs font-semibold text-brand-teal hover:underline"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resolution & Corrective Action Modal */}
      <Modal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title={`Safety Triage: ${selectedReport?.ticketNumber}`}
        description="Assign accountability and document corrective safety measures"
      >
        <form onSubmit={handleSaveResolution} className="space-y-4 pt-1 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Hazard Observation:
            </label>
            <p className="p-3 bg-surface-muted dark:bg-surface-darkMuted rounded-control border text-slate-800 dark:text-slate-200">
              {selectedReport?.description}
            </p>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Assigned Safety Officer / Supervisor
            </label>
            <input
              type="text"
              required
              value={assignedOwnerInput}
              onChange={(e) => setAssignedOwnerInput(e.target.value)}
              className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Update Lifecycle Status
            </label>
            <select
              value={statusToSet}
              onChange={(e) => setStatusToSet(e.target.value as SafetyStatus)}
              className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-semibold"
            >
              <option value="acknowledged">2. Acknowledged (Assign Owner)</option>
              <option value="in_progress">3. In Progress (Corrective Action Deployed)</option>
              <option value="resolved">4. Resolved (Pending Worker Ground Verification)</option>
              <option value="verified">5. Verified Closed</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Corrective Action Description / Resolution Note
            </label>
            <textarea
              rows={3}
              required
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="e.g. Scaffolding stop-work notice issued, 30 certified chin-strap helmets stocked at Gate 2 store."
              className="w-full p-3 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsResolveModalOpen(false)}
              className="px-4 py-2 text-slate-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-control font-bold bg-brand-indigo text-white hover:bg-brand-indigoDark"
            >
              Commit Safety Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
