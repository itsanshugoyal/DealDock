"use client";

import { useCallback, useEffect, useState } from "react";
import { WORKFLOW_META, WORKFLOW_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

interface PipelineStats {
  total: number;
  enriched: number;
  qualified: number;
  disqualified: number;
  pending: number;
  emailing: number;
  replied: number;
  warm: number;
  avgScore: number;
  sourcedToday: number;
}

interface WorkflowStatus {
  id: string;
  name: string;
  active: boolean;
  updatedAt: string;
  nodeCount: number;
}

interface Lead {
  id: string;
  ig_handle?: string;
  ig_followers?: number;
  score?: number;
  qualification_status?: string;
  enrichment_status?: string;
  email_sequence_active?: boolean;
  reply_sentiment?: string;
  niche?: string;
  date_sourced?: string;
  email?: string;
}

/* ─── Helpers ─── */

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function statusBadge(status: string | undefined) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    qualified: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      label: "Qualified",
    },
    disqualified: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      label: "Disqualified",
    },
    pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      label: "Pending",
    },
    complete: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      label: "Enriched",
    },
  };
  const s = map[status || "pending"] || map.pending;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
        s.bg,
        s.text
      )}
    >
      {s.label}
    </span>
  );
}

/* ─── Components ─── */

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-4">
        <p className="text-[11px] uppercase tracking-wider text-gray-300 mb-1">
          {label}
        </p>
        <p
          className="text-2xl font-bold tracking-tight"
          style={{ color: color || "#fafafa" }}
        >
          {value}
        </p>
        {sub && <p className="text-xs text-gray-300 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function WorkflowCard({
  slug,
  workflow,
  onToggle,
  toggling,
}: {
  slug: string;
  workflow: WorkflowStatus | null;
  onToggle: (id: string, active: boolean) => void;
  toggling: string | null;
}) {
  const meta = WORKFLOW_META[slug];
  const id = WORKFLOW_IDS[slug];
  const isActive = workflow?.active ?? false;
  const isToggling = toggling === id;

  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors"
            style={{
              backgroundColor: isActive ? meta.color : "#404040",
              boxShadow: isActive ? `0 0 8px ${meta.color}60` : "none",
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {meta.label}
            </p>
            <p className="text-[11px] text-gray-300">
              {meta.trigger}
              {workflow && (
                <span className="ml-2 text-gray-400">
                  · {workflow.nodeCount} nodes
                  {workflow.updatedAt &&
                    ` · updated ${timeAgo(workflow.updatedAt)}`}
                </span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggle(id, !isActive)}
          disabled={isToggling || !workflow}
          className={cn(
            "relative w-10 h-5 rounded-full transition-colors flex-shrink-0 cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isActive ? "bg-green-500/80" : "bg-gray-500/40"
          )}
          title={isActive ? "Deactivate" : "Activate"}
        >
          <span
            className={cn(
              "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
              isActive ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4">
        <a
          href={`https://instagram.com/${lead.ig_handle}`}
          target="_blank"
          rel="noopener"
          className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
        >
          @{lead.ig_handle}
        </a>
      </td>
      <td className="py-3 px-4 text-sm text-gray-200">
        {lead.ig_followers ? formatNumber(lead.ig_followers) : "—"}
      </td>
      <td className="py-3 px-4 text-sm text-gray-200">
        {lead.niche || "—"}
      </td>
      <td className="py-3 px-4">
        {statusBadge(
          lead.qualification_status || lead.enrichment_status || "pending"
        )}
      </td>
      <td className="py-3 px-4">
        {lead.score != null ? (
          <span
            className={cn(
              "text-sm font-mono font-bold",
              lead.score >= 8
                ? "text-green-400"
                : lead.score >= 5
                  ? "text-yellow-400"
                  : "text-gray-400"
            )}
          >
            {lead.score}/10
          </span>
        ) : (
          <span className="text-sm text-gray-500">—</span>
        )}
      </td>
      <td className="py-3 px-4 text-sm text-gray-300">
        {lead.email || "—"}
      </td>
      <td className="py-3 px-4">
        {lead.email_sequence_active ? (
          <span className="text-[10px] uppercase tracking-wider text-blue-400 font-medium">
            Active
          </span>
        ) : lead.reply_sentiment === "warm" ? (
          <span className="text-[10px] uppercase tracking-wider text-green-400 font-medium">
            Warm Reply
          </span>
        ) : (
          <span className="text-[10px] text-gray-500">—</span>
        )}
      </td>
    </tr>
  );
}

/* ─── Main Dashboard ─── */

export default function DashboardPage() {
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowStatus[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [n8nDown, setN8nDown] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, workflowsRes, leadsRes] = await Promise.allSettled([
        fetch("/api/airtable?view=stats"),
        fetch("/api/n8n/workflows"),
        fetch("/api/airtable?view=recent"),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value.ok) {
        setStats(await statsRes.value.json());
      }

      if (workflowsRes.status === "fulfilled") {
        const wData = await workflowsRes.value.json();
        if (wData.n8nDown) {
          setN8nDown(true);
        } else {
          setN8nDown(false);
          setWorkflows(wData.workflows || []);
        }
      } else {
        setN8nDown(true);
      }

      if (leadsRes.status === "fulfilled" && leadsRes.value.ok) {
        const lData = await leadsRes.value.json();
        setLeads(lData.records || []);
      }

      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAll, 30_000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  async function toggleWorkflow(id: string, active: boolean) {
    setToggling(id);
    try {
      const res = await fetch("/api/n8n/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active }),
      });
      if (res.ok) {
        const result = await res.json();
        setWorkflows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, active: result.active } : w
          )
        );
      }
    } finally {
      setToggling(null);
    }
  }

  const workflowMap = Object.fromEntries(
    workflows.map((w) => [w.id, w])
  );

  const slugs = Object.keys(WORKFLOW_META);
  const activeCount = workflows.filter((w) => w.active).length;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3 text-white">Pipeline Overview</h2>
          <p className="text-sm text-gray-300 mt-1">
            Last refreshed {timeAgo(lastRefresh.toISOString())} · auto-refresh
            30s
          </p>
        </div>
        <button
          onClick={fetchAll}
          disabled={loading}
          className={cn(
            "px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer",
            "bg-gold-400/10 text-gold-400 border border-gold-400/20",
            "hover:bg-gold-400/20 hover:border-gold-400/40",
            "disabled:opacity-50"
          )}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <StatCard
          label="Total Leads"
          value={stats?.total ?? "—"}
          sub={
            stats?.sourcedToday
              ? `+${stats.sourcedToday} today`
              : undefined
          }
          color="#ffc107"
        />
        <StatCard
          label="Enriched"
          value={stats?.enriched ?? "—"}
          sub={stats ? `${stats.pending} pending` : undefined}
          color="#3b82f6"
        />
        <StatCard
          label="Qualified"
          value={stats?.qualified ?? "—"}
          sub={
            stats?.avgScore
              ? `avg score ${stats.avgScore}`
              : undefined
          }
          color="#22c55e"
        />
        <StatCard
          label="Emailing"
          value={stats?.emailing ?? "—"}
          sub={stats?.replied ? `${stats.replied} replied` : undefined}
          color="#f97316"
        />
        <StatCard
          label="Warm Replies"
          value={stats?.warm ?? "—"}
          sub="ready for Calendly"
          color="#ec4899"
        />
      </div>

      {/* ── Pipeline Funnel ── */}
      {stats && stats.total > 0 && (
        <div className="card-bezel">
          <div className="card-bezel-inner p-5">
            <p className="text-[11px] uppercase tracking-wider text-gray-300 mb-4">
              Pipeline Funnel
            </p>
            <div className="flex items-end gap-1 h-20">
              {[
                {
                  label: "Sourced",
                  value: stats.total,
                  color: "#ffc107",
                },
                {
                  label: "Enriched",
                  value: stats.enriched,
                  color: "#3b82f6",
                },
                {
                  label: "Qualified",
                  value: stats.qualified,
                  color: "#22c55e",
                },
                {
                  label: "Emailing",
                  value: stats.emailing,
                  color: "#f97316",
                },
                {
                  label: "Replied",
                  value: stats.replied,
                  color: "#a855f7",
                },
                {
                  label: "Warm",
                  value: stats.warm,
                  color: "#ec4899",
                },
              ].map((stage) => {
                const pct =
                  stats.total > 0
                    ? Math.max(
                        4,
                        (stage.value / stats.total) * 100
                      )
                    : 4;
                return (
                  <div
                    key={stage.label}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs font-mono font-bold text-white">
                      {stage.value}
                    </span>
                    <div
                      className="w-full rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${pct}%`,
                        backgroundColor: stage.color,
                        opacity: 0.8,
                      }}
                    />
                    <span className="text-[10px] text-gray-400">
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── n8n Workflows ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            n8n Workflows
            {n8nDown ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">
                n8n offline
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium">
                {activeCount}/{slugs.length} active
              </span>
            )}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {slugs.map((slug) => (
            <WorkflowCard
              key={slug}
              slug={slug}
              workflow={workflowMap[WORKFLOW_IDS[slug]] || null}
              onToggle={toggleWorkflow}
              toggling={toggling}
            />
          ))}
        </div>
      </div>

      {/* ── Recent Leads Table ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">
            Recent Leads
          </h3>
          <a
            href="https://airtable.com/appd6MifJsQc0hBXo"
            target="_blank"
            rel="noopener"
            className="text-xs text-gray-300 hover:text-gold-400 transition-colors"
          >
            View all in Airtable ↗
          </a>
        </div>
        <div className="card-bezel">
          <div className="card-bezel-inner overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  {[
                    "Handle",
                    "Followers",
                    "Niche",
                    "Status",
                    "Score",
                    "Email",
                    "Outreach",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-[11px] uppercase tracking-wider text-gray-400 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-sm text-gray-500"
                    >
                      {loading
                        ? "Loading leads…"
                        : "No leads yet. Activate Workflow 01 to start sourcing."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
