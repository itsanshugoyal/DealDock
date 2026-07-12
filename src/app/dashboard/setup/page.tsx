"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

interface AirtableStatus {
  ok: boolean;
  tables: string[];
  error?: string;
}

interface N8nStatus {
  ok: boolean;
  workflows: number;
  active: number;
  error?: string;
}

type EnvVarStatus = Record<string, boolean>;

interface SetupStatus {
  airtable: AirtableStatus;
  n8n: N8nStatus;
  envVars: EnvVarStatus;
}

/* ─── Manual Setup Items ─── */

const MANUAL_ITEMS = [
  {
    label: "Gmail OAuth2 credential in n8n",
    description:
      "Create an OAuth2 credential in n8n for Gmail API access. Required for email sequences (Workflow 04) and reply monitoring (Workflow 05).",
  },
  {
    label: "Slack channels + incoming webhooks",
    description:
      "Create a #dealdock-leads Slack channel and configure an incoming webhook URL. Used by Workflow 06 to post outreach drafts for review.",
  },
  {
    label: "Calendly link + webhook",
    description:
      "Set up a Calendly event type for discovery calls and configure a webhook to notify n8n when meetings are booked (Workflow 07).",
  },
  {
    label: "Apify actor configs",
    description:
      "Configure Apify actors for Instagram scraping in Workflow 01. Set target hashtags, locations, and follower count filters.",
  },
  {
    label: "Hunter.io API key",
    description:
      "Add your Hunter.io API key to n8n credentials. Used by Workflow 02 for email address discovery during lead enrichment.",
  },
  {
    label: "Anthropic API key",
    description:
      "Add your Anthropic API key to n8n credentials. Used by Workflow 03 for AI-powered lead qualification scoring.",
  },
];

/* ─── Icons ─── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 019.95 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ─── Status Badge ─── */

function StatusBadge({ ok, loading }: { ok: boolean; loading: boolean }) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-gray-500/10 text-gray-400">
        <SpinnerIcon className="w-3 h-3" />
        Checking
      </span>
    );
  }

  return ok ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400">
      <CheckIcon className="w-3 h-3" />
      Connected
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400">
      <XIcon className="w-3 h-3" />
      Error
    </span>
  );
}

/* ─── Section Components ─── */

function AirtableCard({
  status,
  loading,
}: {
  status: AirtableStatus | null;
  loading: boolean;
}) {
  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: "rgba(255, 193, 7, 0.15)", color: "#ffc107" }}
            >
              AT
            </div>
            <div>
              <p className="text-sm font-medium text-white">Airtable</p>
              <p className="text-[11px] text-gray-300">Database & CRM</p>
            </div>
          </div>
          <StatusBadge ok={status?.ok ?? false} loading={loading} />
        </div>

        {status && !loading && (
          <div className="space-y-2">
            {status.tables.length > 0 && (
              <div className="space-y-1">
                {status.tables.map((table) => (
                  <div
                    key={table}
                    className="flex items-center gap-2 text-xs text-gray-200"
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    {table}
                  </div>
                ))}
              </div>
            )}
            {status.error && (
              <p className="text-xs text-red-400 mt-2 flex items-start gap-1.5">
                <XIcon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {status.error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function N8nCard({
  status,
  loading,
}: {
  status: N8nStatus | null;
  loading: boolean;
}) {
  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: "rgba(234, 76, 137, 0.15)", color: "#ea4c89" }}
            >
              n8n
            </div>
            <div>
              <p className="text-sm font-medium text-white">n8n</p>
              <p className="text-[11px] text-gray-300">Workflow automation</p>
            </div>
          </div>
          <StatusBadge ok={status?.ok ?? false} loading={loading} />
        </div>

        {status && !loading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-200">
              {status.ok ? (
                <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              ) : (
                <XIcon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              )}
              {status.workflows}/7 DealDock workflows found
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  status.active > 0 ? "bg-green-400" : "bg-gray-500"
                )}
              />
              {status.active} workflow{status.active !== 1 ? "s" : ""} active
            </div>
            {status.error && (
              <p className="text-xs text-red-400 mt-2 flex items-start gap-1.5">
                <XIcon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                {status.error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EnvVarsCard({
  envVars,
  loading,
}: {
  envVars: EnvVarStatus | null;
  loading: boolean;
}) {
  const entries = envVars ? Object.entries(envVars) : [];
  const allSet = entries.length > 0 && entries.every(([, v]) => v);

  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold font-mono"
              style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}
            >
              ENV
            </div>
            <div>
              <p className="text-sm font-medium text-white">Environment Variables</p>
              <p className="text-[11px] text-gray-300">
                .env.local configuration
              </p>
            </div>
          </div>
          <StatusBadge ok={allSet} loading={loading} />
        </div>

        {entries.length > 0 && !loading && (
          <div className="space-y-1.5">
            {entries.map(([name, isSet]) => (
              <div
                key={name}
                className="flex items-center gap-2 text-xs"
              >
                {isSet ? (
                  <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                ) : (
                  <XIcon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                )}
                <code
                  className={cn(
                    "font-mono text-[11px] px-1.5 py-0.5 rounded",
                    isSet
                      ? "bg-green-500/5 text-green-300"
                      : "bg-red-500/5 text-red-300"
                  )}
                >
                  {name}
                </code>
                <span className={isSet ? "text-gray-400" : "text-red-400"}>
                  {isSet ? "set" : "missing"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ManualSetupCard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="card-bezel">
      <div className="card-bezel-inner p-5">
        <div className="flex items-center gap-3 mb-4">
          <WarningIcon className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-white">
              Remaining Manual Setup
            </p>
            <p className="text-[11px] text-gray-300">
              These items require manual configuration outside this app
            </p>
          </div>
        </div>

        <div className="space-y-1">
          {MANUAL_ITEMS.map((item) => {
            const isExpanded = expanded === item.label;
            return (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : item.label)
                  }
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer",
                    "hover:bg-white/[0.03]",
                    isExpanded && "bg-white/[0.03]"
                  )}
                >
                  <div className="w-4 h-4 rounded border border-gray-400/40 flex-shrink-0" />
                  <span className="text-xs text-gray-200 flex-1">
                    {item.label}
                  </span>
                  <svg
                    className={cn(
                      "w-3.5 h-3.5 text-gray-400 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="ml-9 mr-3 mb-2 mt-1">
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function SetupPage() {
  const [status, setStatus] = useState<SetupStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/setup/status");
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data: SetupStatus = await res.json();
      setStatus(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check setup status"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Summary counts
  const checks = [
    status?.airtable.ok,
    status?.n8n.ok,
    status?.envVars
      ? Object.values(status.envVars).every(Boolean)
      : false,
  ];
  const passed = checks.filter(Boolean).length;
  const total = checks.length;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-eyebrow mb-2">Configuration</p>
          <h2 className="text-h3 text-white">Setup Checker</h2>
          <p className="text-sm text-gray-300 mt-1">
            Verify that all integrations are connected and ready.
          </p>
        </div>
        <button
          onClick={fetchStatus}
          disabled={loading}
          className={cn(
            "px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer",
            "bg-gold-400/10 text-gold-400 border border-gold-400/20",
            "hover:bg-gold-400/20 hover:border-gold-400/40",
            "disabled:opacity-50"
          )}
        >
          {loading ? "Checking..." : "Re-check"}
        </button>
      </div>

      {/* ── Summary Bar ── */}
      {!loading && status && (
        <div className="card-bezel">
          <div className="card-bezel-inner p-4 flex items-center gap-4">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                passed === total
                  ? "bg-green-500/15 text-green-400"
                  : "bg-yellow-500/15 text-yellow-400"
              )}
            >
              {passed}/{total}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {passed === total
                  ? "All systems connected"
                  : `${total - passed} integration${total - passed !== 1 ? "s" : ""} need${total - passed === 1 ? "s" : ""} attention`}
              </p>
              <p className="text-[11px] text-gray-300">
                {passed === total
                  ? "Core integrations are healthy. Complete the manual setup items below to finish."
                  : "Fix the issues below and re-check."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="card-bezel">
          <div className="card-bezel-inner p-4 flex items-center gap-3">
            <XIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* ── Integration Cards ── */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">
          Integration Health
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <AirtableCard status={status?.airtable ?? null} loading={loading} />
          <N8nCard status={status?.n8n ?? null} loading={loading} />
          <EnvVarsCard envVars={status?.envVars ?? null} loading={loading} />
        </div>
      </div>

      {/* ── Manual Setup ── */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">
          Manual Configuration
        </h3>
        <ManualSetupCard />
      </div>

      {/* ── Back Link ── */}
      <div className="pt-2">
        <a
          href="/dashboard"
          className="text-xs text-gray-300 hover:text-gold-400 transition-colors"
        >
          &larr; Back to Pipeline Dashboard
        </a>
      </div>
    </div>
  );
}
