"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  ShieldAlert,
  Activity,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  HeartPulse,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useApp } from "@/context/AppContext";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function AdminDashboardPage() {
  const {
    allWorkers,
    safetyReports,
    payQueries,
    fatigueAlerts,
    feedbackResponses,
    sitesAndDepartments,
    policySettings,
    getPrivacySafeFeedback,
  } = useApp();

  const [selectedSiteFilter, setSelectedSiteFilter] = useState<string>("all");
  const [whyModalData, setWhyModalData] = useState<{ title: string; content: string } | null>(null);

  // Compute stats
  const activeWorkersCount = allWorkers.length || 50;
  const openSafetyReports = safetyReports.filter(
    (s) => s.status !== "verified" && s.status !== "resolved"
  );
  const pendingPayCount = payQueries.filter((q) => q.status !== "resolved").length;
  const highFatigueCount = fatigueAlerts.filter((f) => f.riskLevel === "high").length;

  // Safe sentiment
  const privacyFeedback = getPrivacySafeFeedback(
    selectedSiteFilter === "all" ? undefined : selectedSiteFilter
  );

  // Weekly attendance trend synthetic data
  const attendanceTrendData = [
    { day: "Mon", rate: 92, overtimeHrs: 34 },
    { day: "Tue", rate: 95, overtimeHrs: 42 },
    { day: "Wed", rate: 94, overtimeHrs: 56 },
    { day: "Thu", rate: 96, overtimeHrs: 62 },
    { day: "Fri", rate: 93, overtimeHrs: 48 },
    { day: "Sat", rate: 89, overtimeHrs: 74 },
    { day: "Sun", rate: 85, overtimeHrs: 30 },
  ];

  // Overtime hours by site
  const siteOvertimeData = [
    { name: "Metro Phase 4", overtime: 148, fill: "#273C75" },
    { name: "Prestige Tower B", overtime: 92, fill: "#0F766E" },
    { name: "Ward 4 & ICU", overtime: 116, fill: "#D97706" },
    { name: "General Sanitization", overtime: 64, fill: "#2563EB" },
  ];

  // Safety reports by category
  const categoryCounts: Record<string, number> = {};
  safetyReports.forEach((r) => {
    categoryCounts[r.hazardCategory] = (categoryCounts[r.hazardCategory] || 0) + 1;
  });
  const safetyCategoryData = [
    { category: "PPE Shortage", count: categoryCounts["missing_ppe"] || 3 },
    { category: "Scaffold / Equip", count: categoryCounts["unsafe_equipment"] || 2 },
    { category: "Fall / Trip", count: categoryCounts["fall_trip_hazard"] || 2 },
    { category: "Electrical", count: categoryCounts["electrical_risk"] || 1 },
    { category: "Heat / Water", count: categoryCounts["heat_dehydration"] || 1 },
    { category: "Staff Overload", count: categoryCounts["staffing_overload"] || 1 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-brand-teal">
            Operations Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Workforce Health Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time shift safety, fair overtime tracking, and anonymous sentiment signals
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-control bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSiteFilter}
              onChange={(e) => setSelectedSiteFilter(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-slate-100 font-semibold focus:outline-none"
            >
              <option value="all">All Sites & Wards (50 Workers)</option>
              {sitesAndDepartments.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <MetricCard
          label="Active Workforce"
          value={activeWorkersCount}
          subValue="Enrolled"
          trend={{ value: "100% Verified", isPositive: true }}
          icon={<Users className="w-4 h-4 text-brand-indigo" />}
          whyExplanation="Total verified workers in current organizational roster across Construction & Healthcare."
          onWhyClick={() =>
            setWhyModalData({
              title: "Active Workforce Metric",
              content:
                "Represents all frontline workers with valid employee records currently active across the 2 construction sites and 2 hospital wards.",
            })
          }
        />

        {/* Metric 2 */}
        <MetricCard
          label="Attendance Rate"
          value="94.2%"
          subValue="Today"
          trend={{ value: "+2.1% vs last week", isPositive: true }}
          icon={<Clock className="w-4 h-4 text-emerald-600" />}
          whyExplanation="Percentage of scheduled duty shifts logged via QR code geofencing or manual requests."
          onWhyClick={() =>
            setWhyModalData({
              title: "Attendance Rate Calculation",
              content:
                "Calculated as (Actual Logged Shifts / Scheduled Shifts) * 100 for today's operating cycle.",
            })
          }
        />

        {/* Metric 3 */}
        <MetricCard
          label="Open Safety Issues"
          value={openSafetyReports.length}
          subValue="Active"
          trend={{ value: "2 High Priority", isPositive: false }}
          icon={<ShieldAlert className="w-4 h-4 text-red-600" />}
          isPriority={openSafetyReports.length > 0}
          whyExplanation="Hazards reported by frontline workers awaiting resolution or worker verification."
          onWhyClick={() =>
            setWhyModalData({
              title: "Open Safety Issues",
              content:
                "Reports filed via voice note, photo, or typed report that are in Submitted, Acknowledged, or In-Progress status.",
            })
          }
        />

        {/* Metric 4 */}
        <MetricCard
          label="Fatigue Risk Signals"
          value={highFatigueCount}
          subValue="Workers"
          trend={{ value: "Non-punitive alert", isNeutral: true }}
          icon={<Activity className="w-4 h-4 text-amber-600" />}
          whyExplanation="Workers with shifts > 12h or rolling 7-day cumulative hours > 55h requiring roster review."
          onWhyClick={() =>
            setWhyModalData({
              title: "Fatigue Risk Early Warning",
              content:
                "Triggered by transparent policy rules (single shift >12h, rest interval <10h, or weekly cumulative >55h). Use this to rebalance rosters and prevent workplace accidents.",
            })
          }
        />

        {/* Metric 5 */}
        <MetricCard
          label="Pay Queries Open"
          value={pendingPayCount}
          subValue="Triage"
          trend={{ value: "48h SLA target", isNeutral: true }}
          icon={<HelpCircle className="w-4 h-4 text-blue-600" />}
          whyExplanation="Worker queries regarding overtime rates, gate scanner discrepancies, or allowances."
          onWhyClick={() =>
            setWhyModalData({
              title: "Pay Queries Triage",
              content:
                "Frontline workers who raised a question via 'Something looks incorrect?' in their pay wallet. Direct transparency reduces friction and turnover.",
            })
          }
        />

        {/* Metric 6 */}
        <MetricCard
          label="Workforce Sentiment"
          value={
            privacyFeedback.metrics
              ? `${privacyFeedback.metrics.safetyAvg}/5`
              : "Protected"
          }
          subValue={privacyFeedback.metrics ? "Pulse avg" : "<5 sample"}
          trend={{ value: "K-Anonymity (≥5)", isPositive: true }}
          icon={<Sparkles className="w-4 h-4 text-brand-teal" />}
          whyExplanation="Aggregated anonymous feedback. Data is strictly suppressed if sample size is under 5."
          onWhyClick={() =>
            setWhyModalData({
              title: "Workforce Sentiment & Privacy",
              content:
                "Anonymous pulse rating across safety, supervisor respect, and rest. If fewer than 5 responses exist for a selected department, individual scores are withheld to protect workers from retaliation.",
            })
          }
        />
      </div>

      {/* Action-Oriented "Attention Needed" Priority Section */}
      <div className="p-5 rounded-sheet bg-brand-indigo/5 dark:bg-brand-indigo/20 border border-brand-indigo/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Priority Actions Required Today
            </h2>
          </div>
          <span className="text-xs text-slate-500">Live Operation Queue</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Action 1 */}
          <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 dark:text-red-400">
                  Critical Safety Report
                </span>
                <span className="text-[10px] font-mono text-slate-400">FS-SAF-104</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                Missing Safety Helmets near Tower B Scaffolding
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sub-contractor workers on level 3 scaffolding operating without chin-straps.
              </p>
            </div>
            <Link
              href="/admin/safety"
              className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1 pt-2"
            >
              <span>Assign Safety Officer & Stock Helmets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Action 2 */}
          <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Fatigue Hotspot Warning
                </span>
                <span className="text-[10px] font-mono text-slate-400">Roster Alert</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                4 Workers with Cumulative Hours &gt; 55h This Week
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Asha Kumar (58h) & Laxman Murmu (61h) require mandatory 14h rest window.
              </p>
            </div>
            <Link
              href="/admin/insights"
              className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1 pt-2"
            >
              <span>Review Shift Roster & Add Backup Pool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Action 3 */}
          <div className="p-4 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Pay Query Awaiting Review
                </span>
                <span className="text-[10px] font-mono text-slate-400">PQ-2026-042</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                Asha Kumar: 3h Overtime on Saturday Concrete Pour
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Gate log shows 21:15 checkout; provisional wallet tracked only 1h.
              </p>
            </div>
            <Link
              href="/admin/pay-queries"
              className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1 pt-2"
            >
              <span>Verify Gate Log & Resolve Ticket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts (Spacious Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Overtime Hours by Worksite */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Overtime Duty Hours by Site / Ward
              </h3>
              <p className="text-xs text-slate-500">Cumulative overtime hours this month</p>
            </div>
            <StatusChip status="Month to Date" variant="teal" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={siteOvertimeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: number) => [`${val} Overtime Hours`, "Hours"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="overtime" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Weekly Attendance Trend */}
        <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Daily Attendance % Trend
              </h3>
              <p className="text-xs text-slate-500">7-day verified attendance consistency</p>
            </div>
            <StatusChip status="94.2% Avg" variant="success" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: number) => [`${val}% Attendance`, "Rate"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#0F766E"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0F766E" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Safety Reports by Category Chart */}
      <div className="p-6 rounded-card bg-surface-card dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-appleSm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Safety Incidents by Category
            </h3>
            <p className="text-xs text-slate-500">
              Leading root hazards reported across Construction & Healthcare
            </p>
          </div>
          <Link
            href="/admin/safety"
            className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
          >
            <span>Open Safety Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safetyCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(val: number) => [`${val} Incidents`, "Count"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#C2413B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transparent "Why?" Modal Dialog */}
      <Modal
        isOpen={Boolean(whyModalData)}
        onClose={() => setWhyModalData(null)}
        title={whyModalData?.title}
        description="Explainable operational metric logic"
      >
        <div className="space-y-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed bg-surface-muted dark:bg-surface-darkMuted p-4 rounded-control border border-surface-border dark:border-surface-darkBorder font-medium">
            {whyModalData?.content}
          </p>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setWhyModalData(null)}
              className="px-4 py-2 rounded-control font-semibold bg-brand-indigo text-white text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
