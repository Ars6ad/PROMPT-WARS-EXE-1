"use client";

import React, { useState } from "react";
import {
  Wallet,
  Clock,
  Printer,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Building2,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatRupees } from "@/lib/utils";
import { AudioPlaybackControl } from "@/components/ui/AudioPlaybackControl";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { BottomSheet } from "@/components/ui/BottomSheet";

export default function WorkerPayPage() {
  const { currentUser, payslips, submitPayQuery, t } = useApp();

  const [selectedMonth, setSelectedMonth] = useState<string>("October 2026");
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Form states for query
  const [queryCategory, setQueryCategory] = useState<
    "missing_hours" | "incorrect_overtime" | "allowance_issue" | "deduction_clarification" | "other"
  >("incorrect_overtime");
  const [queryDescription, setQueryDescription] = useState("");
  const [querySubmittedToast, setQuerySubmittedToast] = useState<string | null>(null);

  // Filter worker payslips
  const workerPayslips = payslips.filter((p) => p.workerId === currentUser.id);
  const activePayslip =
    workerPayslips.find((p) => p.month === selectedMonth) || workerPayslips[0];

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePayslip) return;

    submitPayQuery({
      payslipId: activePayslip.id,
      month: activePayslip.month,
      category: queryCategory,
      description: queryDescription || "Overtime hours clarification requested.",
    });

    setIsQueryModalOpen(false);
    setQueryDescription("");
    setQuerySubmittedToast(t.payQuerySubmitted);
    setTimeout(() => setQuerySubmittedToast(null), 4000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Toast Feedback */}
      {querySubmittedToast && (
        <div className="p-3.5 rounded-control bg-slate-900 text-white text-xs font-semibold shadow-appleMd flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{querySubmittedToast}</span>
        </div>
      )}

      {/* Screen Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider block">
            Frontline Wage Clarity
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            {t.navPay}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified duty hours & transparent statutory breakdown
          </p>
        </div>

        {activePayslip && (
          <AudioPlaybackControl
            textToRead={activePayslip.plainLanguageExplanation}
            variant="chip"
            label="Listen Pay"
          />
        )}
      </div>

      {/* Month Toggle Tabs */}
      <div className="flex gap-2 p-1 bg-surface-muted dark:bg-surface-darkMuted rounded-control border border-surface-border dark:border-surface-darkBorder">
        {workerPayslips.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedMonth(p.month)}
            className={`flex-1 py-2 text-xs font-bold rounded-control transition-all ${
              selectedMonth === p.month
                ? "bg-surface-card dark:bg-surface-darkCard text-slate-900 dark:text-white shadow-appleSm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {p.month}
          </button>
        ))}
      </div>

      {activePayslip && (
        <>
          {/* Main Net Pay Card */}
          <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.netEstimatedPayable}
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  {formatRupees(activePayslip.netPayable)}
                </div>
              </div>

              <StatusChip
                status={activePayslip.paymentStatus.toUpperCase()}
                variant={activePayslip.paymentStatus === "paid" ? "success" : "teal"}
              />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t.paymentExpectedDate}: <strong>{activePayslip.paymentDate}</strong> •{" "}
              {activePayslip.shiftsCompleted} shifts completed
            </div>

            {/* Visual Hours vs Overtime Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700 dark:text-slate-300">
                  Regular: {activePayslip.regularHours} hrs
                </span>
                <span className="text-brand-teal font-bold">
                  Overtime: +{activePayslip.overtimeHours} hrs (1.5x)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-brand-indigo h-full"
                  style={{
                    width: `${
                      (activePayslip.regularHours /
                        (activePayslip.regularHours + activePayslip.overtimeHours)) *
                      100
                    }%`,
                  }}
                  title="Regular Hours"
                />
                <div
                  className="bg-brand-teal h-full"
                  style={{
                    width: `${
                      (activePayslip.overtimeHours /
                        (activePayslip.regularHours + activePayslip.overtimeHours)) *
                      100
                    }%`,
                  }}
                  title="Overtime Hours"
                />
              </div>
            </div>

            {/* Plain Language Explanation Section */}
            <div className="p-4 rounded-control bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-950 dark:text-teal-200 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-brand-teal dark:text-teal-300">
                <Info className="w-4 h-4" />
                <span>{t.plainPayExplanation}</span>
              </div>
              <p>{activePayslip.plainLanguageExplanation}</p>
            </div>
          </div>

          {/* Detailed Itemized Breakdown */}
          <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Itemized Earnings & Deductions
            </h2>

            {/* Earnings Rows */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-surface-border dark:border-surface-darkBorder">
                <span className="text-slate-600 dark:text-slate-300">
                  Base Wages ({activePayslip.regularHours}h @ ₹{activePayslip.baseHourlyRate}/hr)
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatRupees(activePayslip.baseWages)}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-surface-border dark:border-surface-darkBorder text-brand-teal">
                <span className="font-medium">
                  Overtime Pay ({activePayslip.overtimeHours}h @ ₹{activePayslip.overtimeRate}/hr)
                </span>
                <span className="font-bold">+{formatRupees(activePayslip.overtimePay)}</span>
              </div>

              {activePayslip.allowances.map((a, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1.5 border-b border-surface-border dark:border-surface-darkBorder text-slate-600 dark:text-slate-300"
                >
                  <span>{a.name}</span>
                  <span className="font-semibold text-emerald-600">
                    +{formatRupees(a.amount)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between py-2 font-bold text-slate-900 dark:text-white">
                <span>Gross Earnings</span>
                <span>{formatRupees(activePayslip.grossEarnings)}</span>
              </div>
            </div>

            {/* Deductions Rows */}
            <div className="pt-2 border-t border-surface-border dark:border-surface-darkBorder space-y-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Statutory Social Security Deductions
              </span>

              {activePayslip.deductions.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1.5 border-b border-surface-border dark:border-surface-darkBorder text-slate-600 dark:text-slate-300"
                >
                  <span>{d.name}</span>
                  <span className="font-semibold text-red-600">-{formatRupees(d.amount)}</span>
                </div>
              ))}

              <div className="flex justify-between py-1 text-slate-500 font-medium">
                <span>Total Deductions</span>
                <span className="text-red-600">
                  -{formatRupees(activePayslip.totalDeductions)}
                </span>
              </div>
            </div>

            {/* Net Total Row */}
            <div className="pt-3 border-t-2 border-slate-900 dark:border-white flex justify-between items-baseline font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              <span>{t.netEstimatedPayable}</span>
              <span className="text-xl sm:text-2xl text-brand-teal">
                {formatRupees(activePayslip.netPayable)}
              </span>
            </div>

            {/* Actions: Ask About Pay / Print */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsQueryModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-control font-semibold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-surface-border dark:border-surface-darkBorder flex items-center justify-center gap-2 transition-all active:scale-[0.98] min-h-[44px]"
              >
                <HelpCircle className="w-4 h-4 text-brand-indigo" />
                <span>{t.askAboutPay}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-control font-semibold text-xs bg-brand-indigo hover:bg-brand-indigoDark text-white shadow-appleSm flex items-center justify-center gap-2 transition-all active:scale-[0.98] min-h-[44px]"
              >
                <Printer className="w-4 h-4" />
                <span>{t.downloadPayslip}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Legal & Policy Disclaimer */}
      <div className="p-4 rounded-card bg-surface-muted dark:bg-surface-darkMuted/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300 block">
          Workplace Policy Disclaimer:
        </span>
        <p>{t.estimatedNotice}</p>
      </div>

      {/* Ask About Pay Modal */}
      <Modal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        title={t.askAboutPay}
        description="Raise a private clarification ticket with your site timekeeper or payroll team"
      >
        <form onSubmit={handleQuerySubmit} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Select Discrepancy Category
            </label>
            <select
              value={queryCategory}
              onChange={(e) => setQueryCategory(e.target.value as any)}
              className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            >
              <option value="incorrect_overtime">Incorrect Overtime Hours / Rate</option>
              <option value="missing_hours">Missing Duty Hours or Gate Scanner Issue</option>
              <option value="allowance_issue">Omitted Allowance (Site/Meal/Risk)</option>
              <option value="deduction_clarification">Deduction Clarification (EPF/ESIC)</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Explain What Looks Incorrect
            </label>
            <textarea
              rows={4}
              value={queryDescription}
              onChange={(e) => setQueryDescription(e.target.value)}
              placeholder="Example: I worked 3 hours overtime on Saturday after concrete pour, but only 1 hour appears."
              className="w-full p-3 rounded-control border border-surface-border dark:border-surface-darkBorder bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white"
            />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-control text-[11px] text-slate-500">
            Tickets are tracked with an audit log. Managers must investigate within 48 hours.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsQueryModalOpen(false)}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-control font-semibold bg-brand-indigo text-white hover:bg-brand-indigoDark flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Pay Inquiry</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Printable Payslip Modal (Clean HTML View) */}
      <Modal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Official Payslip View"
        description="Print or save as PDF for banking, loans, or employment verification"
        maxWidth="lg"
      >
        {activePayslip && (
          <div className="p-6 bg-white text-slate-900 rounded-card border shadow-inner space-y-6 text-xs">
            {/* Payslip Header */}
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h3 className="text-lg font-bold text-brand-indigo">
                  APEX INFRASTRUCTURE & CARE
                </h3>
                <p className="text-slate-500">Standard Workforce Wage Slip</p>
                <p className="font-mono text-[10px] mt-1">CIN: U45200KA2024PTC184920</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm block">{activePayslip.month}</span>
                <span className="text-slate-500 text-[10px] block">
                  Period: {activePayslip.payPeriod}
                </span>
                <span className="text-emerald-700 font-bold uppercase mt-1 block">
                  {activePayslip.paymentStatus}
                </span>
              </div>
            </div>

            {/* Worker Details Table */}
            <div className="grid grid-cols-2 gap-4 py-2 border-b text-[11px]">
              <div>
                <span className="text-slate-500 block">Worker Name:</span>
                <span className="font-bold">{currentUser.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Employee Code:</span>
                <span className="font-mono font-bold">
                  {"employeeCode" in currentUser ? currentUser.employeeCode : "EMP-001"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Job Designation:</span>
                <span>
                  {"jobTitle" in currentUser ? currentUser.jobTitle : "Attendant"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Location / Site:</span>
                <span>{currentUser.siteOrDepartmentName}</span>
              </div>
            </div>

            {/* Figures */}
            <div className="grid grid-cols-2 gap-6 text-[11px]">
              <div className="space-y-1.5">
                <span className="font-bold border-b pb-1 block text-slate-700">Earnings</span>
                <div className="flex justify-between">
                  <span>Base Wages ({activePayslip.regularHours}h):</span>
                  <span>{formatRupees(activePayslip.baseWages)}</span>
                </div>
                <div className="flex justify-between font-semibold text-brand-teal">
                  <span>Overtime Pay ({activePayslip.overtimeHours}h):</span>
                  <span>{formatRupees(activePayslip.overtimePay)}</span>
                </div>
                {activePayslip.allowances.map((a, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{a.name}:</span>
                    <span>{formatRupees(a.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Gross Earnings:</span>
                  <span>{formatRupees(activePayslip.grossEarnings)}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold border-b pb-1 block text-slate-700">Deductions</span>
                {activePayslip.deductions.map((d, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{d.name}:</span>
                    <span>{formatRupees(d.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Deductions:</span>
                  <span>{formatRupees(activePayslip.totalDeductions)}</span>
                </div>
              </div>
            </div>

            {/* Net Total Box */}
            <div className="p-3 bg-slate-100 rounded border flex justify-between items-center text-sm font-bold">
              <span>NET SALARY PAYABLE:</span>
              <span className="text-lg text-brand-indigo">
                {formatRupees(activePayslip.netPayable)}
              </span>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 text-center">
              System generated payroll document via FairShift • No signature required
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-control font-semibold bg-brand-indigo text-white flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
