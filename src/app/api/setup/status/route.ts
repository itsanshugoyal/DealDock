import {
  AIRTABLE_BASE_ID,
  AIRTABLE_PAT,
  N8N_BASE_URL,
  N8N_API_KEY,
  WORKFLOW_IDS,
} from "@/lib/constants";

const REQUIRED_TABLES = ["Leads", "Calls", "Daily Counters"];

const ENV_VARS_TO_CHECK = [
  "AIRTABLE_PAT",
  "AIRTABLE_BASE_ID",
  "N8N_API_KEY",
  "N8N_BASE_URL",
] as const;

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

async function checkAirtable(): Promise<AirtableStatus> {
  const pat = process.env.AIRTABLE_PAT || AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID || AIRTABLE_BASE_ID;

  if (!pat || !baseId) {
    return { ok: false, tables: [], error: "Missing AIRTABLE_PAT or AIRTABLE_BASE_ID" };
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        headers: { Authorization: `Bearer ${pat}` },
      }
    );

    if (!res.ok) {
      return {
        ok: false,
        tables: [],
        error: `Airtable API returned ${res.status}`,
      };
    }

    const data = await res.json();
    const tables: { name: string; fields: unknown[] }[] = data.tables || [];

    // Check that required tables exist, include field count
    const found: string[] = [];
    const missing: string[] = [];

    for (const required of REQUIRED_TABLES) {
      const match = tables.find((t) => t.name === required);
      if (match) {
        found.push(`${match.name} (${match.fields?.length ?? 0} fields)`);
      } else {
        missing.push(required);
      }
    }

    return {
      ok: missing.length === 0,
      tables: found,
      error:
        missing.length > 0
          ? `Missing tables: ${missing.join(", ")}`
          : undefined,
    };
  } catch (err) {
    return {
      ok: false,
      tables: [],
      error: err instanceof Error ? err.message : "Airtable unreachable",
    };
  }
}

async function checkN8n(): Promise<N8nStatus> {
  const baseUrl = process.env.N8N_BASE_URL || N8N_BASE_URL;
  const apiKey = process.env.N8N_API_KEY || N8N_API_KEY;

  if (!baseUrl || !apiKey) {
    return { ok: false, workflows: 0, active: 0, error: "Missing N8N_BASE_URL or N8N_API_KEY" };
  }

  try {
    const res = await fetch(`${baseUrl}/api/v1/workflows`, {
      headers: {
        "X-N8N-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        ok: false,
        workflows: 0,
        active: 0,
        error: `n8n API returned ${res.status}`,
      };
    }

    const data = await res.json();
    const allWorkflows: { id: string; active: boolean }[] = data.data || [];
    const dealDockIds = new Set(Object.values(WORKFLOW_IDS));

    const ddWorkflows = allWorkflows.filter((w) => dealDockIds.has(w.id));
    const activeCount = ddWorkflows.filter((w) => w.active).length;

    const expectedCount = Object.keys(WORKFLOW_IDS).length;

    return {
      ok: ddWorkflows.length === expectedCount,
      workflows: ddWorkflows.length,
      active: activeCount,
      error:
        ddWorkflows.length < expectedCount
          ? `Found ${ddWorkflows.length}/${expectedCount} DealDock workflows`
          : undefined,
    };
  } catch (err) {
    return {
      ok: false,
      workflows: 0,
      active: 0,
      error: err instanceof Error ? err.message : "n8n unreachable",
    };
  }
}

function checkEnvVars(): EnvVarStatus {
  const result: EnvVarStatus = {};
  for (const varName of ENV_VARS_TO_CHECK) {
    result[varName] = Boolean(process.env[varName]?.trim());
  }
  return result;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const [airtable, n8n] = await Promise.all([checkAirtable(), checkN8n()]);
  const envVars = checkEnvVars();

  const status: SetupStatus = { airtable, n8n, envVars };

  return Response.json(status);
}
