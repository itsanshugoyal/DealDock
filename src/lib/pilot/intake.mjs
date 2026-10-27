import { createHash } from "node:crypto";
import { normalizeApplication } from "../../components/design-preview/application.mjs";
import { normalizeCurrency, pricingSnapshot } from "../marketing-pricing.mjs";

const MAX_BYTES = 8192;
const json = (value, status, extra = {}) => Response.json(value, { status, headers: { "cache-control": "no-store", "x-content-type-options": "nosniff", ...extra } });

/** Bounded, best-effort protection per function instance. Platform rules remain
 * necessary for distributed abuse; no raw IP address is stored in a lead record.
 * @param {{limit?:number,windowMs?:number,now?:()=>number}} options */
export function createRateLimiter({ limit = 6, windowMs = 60_000, now = Date.now } = {}) {
  const entries = new Map();
  return (key) => {
    const time = now();
    for (const [visitor, value] of entries) if (time >= value.until) entries.delete(visitor);
    const current = entries.get(key);
    if (current && current.count >= limit) return false;
    if (!current && entries.size >= 1000) return false;
    entries.set(key, { count: (current?.count || 0) + 1, until: current?.until || time + windowMs });
    return true;
  };
}

async function boundedBody(request) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) throw new RangeError("Body too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  for (;;) {
    const part = await reader.read();
    if (part.done) break;
    bytes += part.value.byteLength;
    if (bytes > MAX_BYTES) { await reader.cancel(); throw new RangeError("Body too large"); }
    text += decoder.decode(part.value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

function isSameOrigin(request) {
  // Next may construct Request.url with its internal hostname. The incoming
  // Host header identifies the visitor's destination; browsers cannot set it.
  const internal = new URL(request.url);
  const host = request.headers.get("host") || internal.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol = ["http", "https"].includes(forwardedProtocol) ? forwardedProtocol + ":" : internal.protocol;
  try {
    const origin = new URL(request.headers.get("origin") || "");
    return origin.origin === `${protocol}//${host}`;
  } catch { return false; }
}

/** @param {{configured:boolean,store?:{save:(record:Record<string,unknown>)=>Promise<unknown>},allow?:(key:string)=>boolean}} options */
export function createPilotApplicationHandler({ configured, store, allow = () => true }) {
  return async (request) => {
    if (request.method !== "POST") return json({ code: "method_not_allowed" }, 405, { Allow: "POST" });
    if (!isSameOrigin(request)) return json({ code: "origin_not_allowed", message: "Please apply from the DealDock website." }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ code: "invalid_content_type" }, 415);
    if (!configured || !store) return json({ code: "intake_unavailable", message: "Online applications aren’t available right now. You can send your details by email instead." }, 503);
    const visitor = createHash("sha256").update(request.headers.get("x-forwarded-for") || "local").digest("hex");
    if (!allow(visitor)) return json({ code: "rate_limited", message: "Please wait a minute before trying again, or use the email option." }, 429, { "retry-after": "60" });
    let body;
    try { body = await boundedBody(request); }
    catch (error) { return json({ code: error instanceof RangeError ? "body_too_large" : "invalid_body", message: "Please check your application and try again." }, error instanceof RangeError ? 413 : 400); }
    if (!body || typeof body !== "object" || Array.isArray(body) || body.company || typeof body.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.id)) return json({ code: "invalid_application", message: "Please check your application and try again." }, 400);
    const result = normalizeApplication(body);
    if (!result.valid) return json({ code: "validation", message: "Please check the highlighted fields.", errors: result.errors }, 400);
    if (body.pricingCurrency !== undefined && !normalizeCurrency(body.pricingCurrency)) return json({ code: "invalid_application", message: "Please choose INR or USD in the pilot pricing section and try again." }, 400);
    const clean = (value) => typeof value === "string" ? value.replace(/[\r\n]/g, " ").slice(0, 100) : "";
    const attribution = { source: clean(body.attribution?.source), campaign: clean(body.attribution?.campaign) };
    const pricing = body.offer === "brand_interest" ? null : pricingSnapshot(body.pricingCurrency);
    const data = { ...result.fields, attribution, ...(pricing ? { pricing } : {}) };
    const record = { id: body.id, ...data, submittedAt: new Date().toISOString(), fingerprint: createHash("sha256").update(JSON.stringify(data)).digest("hex") };
    try { await store.save(record); }
    catch (error) {
      if (error?.code === "APPLICATION_CONFLICT") return json({ code: "application_conflict", message: "Your details changed. Please start a new application." }, 409);
      return json({ code: "storage_unavailable", message: "We couldn’t confirm receipt. Your details are still here. Try again or send them by email." }, 503);
    }
    return json({ status: "received", reference: body.id, interest: body.offer === "brand_interest" ? "future_interest" : "pilot" }, 201);
  };
}
