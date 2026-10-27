export const CURRENCY_PREFERENCE_KEY = "dealdock-marketing-currency";
export const SOLO_PRICE_VERSION = "solo-pilot-2026-10-14";
export const SOLO_PRICES = Object.freeze({ INR: 400000, USD: 4900 });
const locales = { INR: "en-IN", USD: "en-US" };
// Independent sample offer values, not FX conversions or customer results.
const examples = {
  INR: { course: 8500, coaching: 18000, cohort: 12000, recorded: 7500 },
  USD: { course: 249, coaching: 599, cohort: 399, recorded: 229 },
};

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

/** @param {number} amount @param {"INR"|"USD"} currency */
export function formatMoney(amount, currency) {
  const formatted = new Intl.NumberFormat(locales[currency], { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  return currency === "USD" ? "USD " + formatted : formatted;
}

/** @param {"INR"|"USD"|null} currency */
export function soloPriceLabel(currency) {
  return currency ? formatMoney(SOLO_PRICES[currency] / 100, currency) : "₹4,000 / USD $49";
}

/** @param {keyof typeof examples.INR} kind @param {"INR"|"USD"|null} currency */
export function exampleValue(kind, currency) {
  const selected = currency || "INR";
  return formatMoney(examples[selected][kind], selected);
}

/** Server-owned offer snapshot. Browser-supplied amounts are never trusted.
 * @param {unknown} currency */
export function pricingSnapshot(currency) {
  const selected = normalizeCurrency(currency);
  return selected ? { plan: "solo", currency: selected, monthlyMinor: SOLO_PRICES[selected], version: SOLO_PRICE_VERSION } : null;
}

/** @param {Request} request */
export function currencySuggestionResponse(request) {
  return Response.json({ currency: currencyForCountry(request.headers.get("x-vercel-ip-country")) }, {
    headers: { "cache-control": "private, no-store", "vary": "x-vercel-ip-country", "x-content-type-options": "nosniff" },
  });
}

/** @typedef {{currency:"INR"|"USD"|null,source:"unknown"|"location"|"choice"}} CurrencySelection */
/** @param {CurrencySelection} current @param {CurrencySelection} suggestion */
export function mergeCurrencySuggestion(current, suggestion) {
  return current.source === "choice" ? current : suggestion;
}

/** Stored visitor choices take precedence; failure leaves both prices visible.
 * @param {{readPreference:()=>unknown,fetcher?:typeof fetch,signal?:AbortSignal}} options
 * @returns {Promise<CurrencySelection>} */
export async function loadCurrencySuggestion({ readPreference, fetcher = fetch, signal }) {
  try {
    const saved = normalizeCurrency(readPreference());
    if (saved) return { currency: saved, source: "choice" };
  } catch { /* Storage can be unavailable in private browsing. */ }
  try {
    const response = await fetcher("/api/marketing-currency", { cache: "no-store", signal });
    if (!response.ok) throw new Error("Unavailable currency hint");
    const body = await response.json();
    const currency = normalizeCurrency(body?.currency);
    return { currency, source: currency ? "location" : "unknown" };
  } catch { return { currency: null, source: "unknown" }; }
}
