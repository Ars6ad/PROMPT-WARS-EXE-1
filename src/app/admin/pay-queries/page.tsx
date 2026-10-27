"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Building2,
  HeartPulse,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PayQuery } from "@/types";
import { formatRupees, formatDate } from "@/lib/utils";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function AdminPayQueriesPage() {
  const { payQueries, respondToPayQuery } = useApp();

  const [search, setSearch] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<PayQuery | null>(null);
  const [adminResponseText, setAdminResponseText] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredQueries = payQueries.filter(
    (q) =>
      q.workerName.toLowerCase().includes(search.toLowerCase()) ||
      q.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenQuery = (query: PayQuery) => {
    setSelectedQuery(query);
    setAdminResponseText(query.adminResponse || "");
    setAdjustmentAmount(query.adjustedAmount || 0);
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery) return;

    respondToPayQuery(
      selectedQuery.id,
      adminResponseText || "Verified with shift register and resolved.",
      adjustmentAmount > 0 ? adjustmentAmount : undefined
    );

    setSelectedQuery(null);
    setToastMessage(`Pay query ${selectedQuery.ticketNumber} resolved and audit log recorded.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-control bg-slate-900 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
          Payroll Transparency & Triage
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          Worker Pay Clarification Tickets ({payQueries.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review wage queries, overtime discrepancies, and gate scanner sync issues. Every response
          creates an immutable audit log.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search by worker name, ticket number, or issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-card dark:bg-surface-darkCard text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
        />
      </div>

      {/* Data Table */}
      <div className="rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted dark:bg-surface-darkMuted/60 border-b border-surface-border dark:border-surface-darkBorder text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Ticket & Worker</th>
                <th className="py-3 px-4">Month / Cycle</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Worker Inquiry</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Triage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border dark:divide-surface-darkBorder text-slate-700 dark:text-slate-200">
              {filteredQueries.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => handleOpenQuery(q)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-medium">
                    <span className="font-mono text-[10px] font-bold text-slate-400 block">
                      {q.ticketNumber}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                      {q.workerName}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold">{q.month}</td>

                  <td className="py-3.5 px-4 capitalize">
                    {q.category.replace("_", " ")}
                  </td>

                  <td className="py-3.5 px-4 max-w-sm truncate text-slate-600 dark:text-slate-300">
                    {q.description}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusChip
                      status={q.status.replace("_", " ").toUpperCase()}
                      variant={q.status === "resolved" ? "success" : "warning"}
                    />
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Triage & Resolution Modal */}
      <Modal
        isOpen={Boolean(selectedQuery)}
        onClose={() => setSelectedQuery(null)}
        title={`Pay Query: ${selectedQuery?.ticketNumber}`}
        description={`Inquiry from ${selectedQuery?.workerName} • ${selectedQuery?.month}`}
      >
        {selectedQuery && (
          <form onSubmit={handleResolve} className="space-y-4 pt-1 text-xs">
            <div className="p-3.5 rounded-control bg-surface-muted dark:bg-surface-darkMuted border space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Worker Description:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedQuery.description}
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Admin Investigation & Response Note:
              </label>
              <textarea
                rows={3}
                required
                value={adminResponseText}
                onChange={(e) => setAdminResponseText(e.target.value)}
                placeholder="e.g. Cross-verified with supervisor concrete pour register. Additional hours approved."
                className="w-full p-3 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Approved Wage Adjustment (Optional in ₹)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full p-2.5 rounded-control border bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Adjusted amount will be credited into worker provisional wallet.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedQuery(null)}
                className="px-4 py-2 text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-control font-bold bg-brand-indigo text-white hover:bg-brand-indigoDark flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Resolve Query & Audit</span>
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
