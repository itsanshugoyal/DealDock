import { N8N_BASE_URL, N8N_API_KEY, WORKFLOW_IDS } from "@/lib/constants";

const headers = {
  "X-N8N-API-KEY": N8N_API_KEY,
  "Content-Type": "application/json",
};

const dealDockIds = new Set(Object.values(WORKFLOW_IDS));

// GET /api/n8n/workflows — list all DealDock workflows with status
export async function GET() {
  try {
    const res = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, { headers });
    if (!res.ok) {
      return Response.json(
        { error: `n8n returned ${res.status}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    const workflows = (data.data || [])
      .filter((w: { id: string }) => dealDockIds.has(w.id))
      .map(
        (w: {
          id: string;
          name: string;
          active: boolean;
          updatedAt: string;
          nodes: unknown[];
        }) => ({
          id: w.id,
          name: w.name,
          active: w.active,
          updatedAt: w.updatedAt,
          nodeCount: w.nodes?.length || 0,
        })
      );

    return Response.json({ workflows });
  } catch (err) {
    const message = err instanceof Error ? err.message : "n8n unreachable";
    return Response.json({ error: message, n8nDown: true }, { status: 502 });
  }
}

// POST /api/n8n/workflows — activate or deactivate a workflow
// Body: { id: string, active: boolean }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, active } = body as { id: string; active: boolean };

    if (!id || typeof active !== "boolean") {
      return Response.json(
        { error: "id and active (boolean) required" },
        { status: 400 }
      );
    }

    if (!dealDockIds.has(id)) {
      return Response.json(
        { error: "Not a DealDock workflow" },
        { status: 403 }
      );
    }

    const endpoint = active
      ? `${N8N_BASE_URL}/api/v1/workflows/${id}/activate`
      : `${N8N_BASE_URL}/api/v1/workflows/${id}/deactivate`;

    const res = await fetch(endpoint, { method: "POST", headers });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return Response.json(
        {
          error: `n8n returned ${res.status}`,
          detail: errData,
        },
        { status: res.status }
      );
    }

    const result = await res.json();
    return Response.json({
      id: result.id,
      name: result.name,
      active: result.active,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "n8n unreachable";
    return Response.json({ error: message }, { status: 502 });
  }
}
