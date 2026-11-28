const routes = new Set(["/", "/in", "/privacy", "/pilot-terms", "/security", "/about", "/contact", "/blog", "/tools"]);
const eventNames = new Set(["pilot_cta_clicked", "form_started", "application_attempted", "application_received", "application_failed", "email_fallback_prepared", "demo_sent"]);
const categories = {
  location: new Set(["navigation", "hero", "leak_scan", "agencies", "pricing_solo", "pricing_studio", "pricing_roster", "sticky_bar"]),
  offer: new Set(["brand", "coaching", "course", "cohort", "mixed", "agency", "other"]),
  reason: new Set(["validation", "network", "unavailable", "rate_limited", "unconfirmed"]),
  currency: new Set(["INR", "USD"]),
};

/** @template {{url:string}} T @param {T} event @returns {T|null} */
export function sanitizeAnalyticsEvent(event) {
  try {
    const url = new URL(event.url);
    if (!routes.has(url.pathname.replace(/\/$/, "") || "/")) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: url.href };
  } catch { return null; }
}

/** @param {string} name @param {Record<string,unknown>} properties */
export function normalizeMarketingEvent(name, properties = {}) {
  if (!eventNames.has(name)) return null;
  /** @type {Record<string,string>} */
  const data = {};
  for (const [key, allowed] of Object.entries(categories)) {
    if (typeof properties[key] === "string" && allowed.has(properties[key])) data[key] = properties[key];
  }
  return { name, data };
}
