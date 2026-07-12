import { AIRTABLE_BASE_ID, AIRTABLE_PAT } from "@/lib/constants";

const AIRTABLE_API = "https://api.airtable.com/v0";
const headers = {
  Authorization: `Bearer ${AIRTABLE_PAT}`,
  "Content-Type": "application/json",
};

// GET /api/airtable?view=leads|stats|recent
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "stats";

  try {
    if (view === "stats") {
      return await getStats();
    }
    if (view === "leads") {
      const limit = parseInt(searchParams.get("limit") || "50");
      const offset = searchParams.get("offset") || undefined;
      return await getLeads(limit, offset);
    }
    if (view === "recent") {
      return await getRecentLeads();
    }
    return Response.json({ error: "Invalid view" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}

async function getStats() {
  // Fetch all leads to compute stats (Airtable doesn't have aggregation API)
  const allLeads: Record<string, unknown>[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(
      `${AIRTABLE_API}/${AIRTABLE_BASE_ID}/Leads`
    );
    url.searchParams.set(
      "fields[]",
      "qualification_status"
    );
    // Add multiple fields via append
    ["enrichment_status", "email_sequence_active", "reply_sentiment", "score", "date_sourced"].forEach(
      (f) => url.searchParams.append("fields[]", f)
    );
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), { headers });
    const data = await res.json();
    allLeads.push(
      ...((data.records || []) as { fields: Record<string, unknown> }[]).map(
        (r: { fields: Record<string, unknown> }) => r.fields
      )
    );
    offset = data.offset;
  } while (offset);

  const total = allLeads.length;
  const enriched = allLeads.filter(
    (l) => l.enrichment_status === "complete"
  ).length;
  const qualified = allLeads.filter(
    (l) => l.qualification_status === "qualified"
  ).length;
  const disqualified = allLeads.filter(
    (l) => l.qualification_status === "disqualified"
  ).length;
  const emailing = allLeads.filter(
    (l) => l.email_sequence_active === true
  ).length;
  const replied = allLeads.filter(
    (l) =>
      l.reply_sentiment === "warm" ||
      l.reply_sentiment === "lukewarm" ||
      l.reply_sentiment === "not_interested"
  ).length;
  const warm = allLeads.filter(
    (l) => l.reply_sentiment === "warm"
  ).length;
  const avgScore =
    qualified > 0
      ? allLeads
          .filter((l) => typeof l.score === "number")
          .reduce((s, l) => s + (l.score as number), 0) /
        allLeads.filter((l) => typeof l.score === "number").length
      : 0;

  // Leads sourced today
  const today = new Date().toISOString().slice(0, 10);
  const sourcedToday = allLeads.filter(
    (l) =>
      typeof l.date_sourced === "string" &&
      (l.date_sourced as string).startsWith(today)
  ).length;

  return Response.json({
    total,
    enriched,
    qualified,
    disqualified,
    pending: total - enriched,
    emailing,
    replied,
    warm,
    avgScore: Math.round(avgScore * 10) / 10,
    sourcedToday,
  });
}

async function getLeads(limit: number, offsetParam?: string) {
  const url = new URL(
    `${AIRTABLE_API}/${AIRTABLE_BASE_ID}/Leads`
  );
  url.searchParams.set("pageSize", String(Math.min(limit, 100)));
  url.searchParams.set("sort[0][field]", "date_sourced");
  url.searchParams.set("sort[0][direction]", "desc");
  if (offsetParam) url.searchParams.set("offset", offsetParam);

  const res = await fetch(url.toString(), { headers });
  const data = await res.json();

  return Response.json({
    records: (data.records || []).map(
      (r: { id: string; fields: Record<string, unknown> }) => ({
        id: r.id,
        ...r.fields,
      })
    ),
    offset: data.offset || null,
  });
}

async function getRecentLeads() {
  const url = new URL(
    `${AIRTABLE_API}/${AIRTABLE_BASE_ID}/Leads`
  );
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("sort[0][field]", "date_sourced");
  url.searchParams.set("sort[0][direction]", "desc");

  const res = await fetch(url.toString(), { headers });
  const data = await res.json();

  return Response.json({
    records: (data.records || []).map(
      (r: { id: string; fields: Record<string, unknown> }) => ({
        id: r.id,
        ...r.fields,
      })
    ),
  });
}
