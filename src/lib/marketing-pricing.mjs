export const PRICE_VERSION = "pilot-2026-11-05";
/** Monthly pilot prices in minor units, published on the site and saved with applications. */
export const PLAN_PRICES = Object.freeze({
  solo: Object.freeze({ INR: 400000, USD: 4900 }),
  studio: Object.freeze({ INR: 800000, USD: 9900 }),
  roster: Object.freeze({ INR: 1500000, USD: 17900 }),
});
/** The pilot offer, worded once. If the founders choose different terms, change them here. */
export const PILOT_OFFER = Object.freeze({ short: "First 30 days free" });
const locales = { INR: "en-IN", USD: "en-US" };

/** @param {unknown} value @returns {"INR"|"USD"|null} */
export function normalizeCurrency(value) {
  return value === "INR" || value === "USD" ? value : null;
}

/** A hosting country hint suggests display currency; it is not billing eligibility.
 * @param {unknown} country @returns {"INR"|"USD"|null} */
export function currencyForCountry(country) {
  if (typeof country !== "string") return null;
  const code = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || ["XX", "ZZ"].includes(code)) return null;
  return code === "IN" ? "INR" : "USD";
}

/** "USD $49" keeps dollars unambiguous in sentences; `plain` drops the code for a price display.
 * @param {number} amount @param {"INR"|"USD"} currency @param {boolean} [plain] */
export function formatMoney(amount, currency, plain = false) {
  const formatted = new Intl.NumberFormat(locales[currency], { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  return currency === "USD" && !plain ? "USD " + formatted : formatted;
}

/** @param {keyof typeof PLAN_PRICES} plan @param {"INR"|"USD"|null} currency */
export function planPriceLabel(plan, currency) {
  const prices = PLAN_PRICES[plan];
  return currency ? formatMoney(prices[currency] / 100, currency) : formatMoney(prices.INR / 100, "INR") + " / " + formatMoney(prices.USD / 100, "USD");
}

/** Server-owned snapshot of the price list a visitor saw. Browser-supplied amounts are never trusted.
 * @param {unknown} currency */
export function pricingSnapshot(currency) {
  const selected = normalizeCurrency(currency);
  if (!selected) return null;
  const monthlyMinor = Object.fromEntries(Object.entries(PLAN_PRICES).map(([plan, prices]) => [plan, prices[selected]]));
  return { currency: selected, version: PRICE_VERSION, monthlyMinor };
}

/** @param {Request} request */
export function currencySuggestionResponse(request) {
  return Response.json({ currency: currencyForCountry(request.headers.get("x-vercel-ip-country")) }, {
    headers: { "cache-control": "private, no-store", "vary": "x-vercel-ip-country", "x-content-type-options": "nosniff" },
  });
}

/** The visitor's likely currency from the hosting country hint, or null when unknown, blocked or slow.
 * @param {{fetcher?:typeof fetch,signal?:AbortSignal}} [options] @returns {Promise<"INR"|"USD"|null>} */
export async function loadCurrencySuggestion({ fetcher = fetch, signal } = {}) {
  try {
    const response = await fetcher("/api/marketing-currency", { cache: "no-store", signal });
    if (!response.ok) throw new Error("Unavailable currency hint");
    return normalizeCurrency((await response.json())?.currency);
  } catch { return null; }
}
