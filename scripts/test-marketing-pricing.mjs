import assert from "node:assert/strict";
import test from "node:test";
import { PLAN_PRICES, PRICE_VERSION, currencyForCountry, currencySuggestionResponse, formatMoney, loadCurrencySuggestion, planPriceLabel, pricingSnapshot } from "../src/lib/marketing-pricing.mjs";
import { prepareApplication } from "../src/components/design-preview/application.mjs";
import { normalizeMarketingEvent } from "../src/lib/marketing-events.mjs";

test("hosting hints suggest INR for India, USD internationally, and neither for an unknown location", () => {
  assert.equal(currencyForCountry(" in "), "INR");
  for (const country of ["US", "GB", "CA", "AE", "AU"]) assert.equal(currencyForCountry(country), "USD");
  for (const country of [null, undefined, "", "--", "XX", "ZZ", "IND", {}, ["IN"]]) assert.equal(currencyForCountry(country), null);
});

test("country-dependent responses cannot be shared by a cache or expose visitor location", async () => {
  const request = country => new Request("https://dealdock.example/api/marketing-currency", { headers: country ? { "x-vercel-ip-country": country, "x-forwarded-for": "192.0.2.1" } : {} });
  for (const [country, expected] of [["IN", "INR"], ["US", "USD"], [null, null]]) {
    const response = currencySuggestionResponse(request(country));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("vary"), "x-vercel-ip-country");
    assert.deepEqual(await response.json(), { currency: expected });
  }
});

test("the India hint asks the currency endpoint without caching", async () => {
  assert.equal(await loadCurrencySuggestion({ fetcher: async (url, options) => {
    assert.equal(url, "/api/marketing-currency");
    assert.equal(options.cache, "no-store");
    return Response.json({ currency: "INR" });
  } }), "INR");
});

test("network, HTTP, malformed JSON, null and unsupported answers mean no hint", async () => {
  for (const fetcher of [async () => { throw new Error("Offline"); }, async () => new Response("Unavailable", { status: 503 }), async () => new Response("not JSON"), async () => Response.json({ currency: null }), async () => Response.json({ currency: "EUR" })]) {
    assert.equal(await loadCurrencySuggestion({ fetcher }), null);
  }
});

test("a timed-out hint is harmless", async () => {
  const controller = new AbortController();
  const pending = loadCurrencySuggestion({ signal: controller.signal, fetcher: async (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true })) });
  controller.abort();
  assert.equal(await pending, null);
});

test("published pilot prices and the snapshot saved with an application agree", () => {
  assert.deepEqual(PLAN_PRICES, { solo: { INR: 400000, USD: 4900 }, studio: { INR: 800000, USD: 9900 }, roster: { INR: 1500000, USD: 17900 } });
  assert.deepEqual(pricingSnapshot("USD"), { currency: "USD", version: PRICE_VERSION, monthlyMinor: { solo: 4900, studio: 9900, roster: 17900 } });
  assert.deepEqual(pricingSnapshot("INR").monthlyMinor, { solo: 400000, studio: 800000, roster: 1500000 });
  assert.equal(pricingSnapshot("EUR"), null);
  assert.equal(formatMoney(49, "USD"), "USD $49");
  assert.equal(formatMoney(49, "USD", true), "$49");
  assert.equal(formatMoney(15000, "INR"), "₹15,000");
  assert.equal(planPriceLabel("roster", null), "₹15,000 / USD $179");
});

test("email applications list the prices the page showed, without agreeing to billing", () => {
  const fields = { email: "qa@example.com", instagram: "qa_coach", offer: "coaching", pricingCurrency: "USD" };
  assert.match(prepareApplication(fields).body, /Pilot prices shown: Solo USD \$49, Studio USD \$99, Roster USD \$179 per month \(terms to be confirmed\)/);
  assert.match(prepareApplication({ ...fields, pricingCurrency: "INR" }).body, /Solo ₹4,000, Studio ₹8,000, Roster ₹15,000/);
  assert.match(prepareApplication({ ...fields, pricingCurrency: undefined }).body, /Solo ₹4,000 \/ USD \$49/);
});

test("currency measurement accepts only INR and USD and discards personal data", () => {
  assert.deepEqual(normalizeMarketingEvent("application_received", { currency: "USD", country: "US", ip: "192.0.2.1", email: "qa@example.com" }), { name: "application_received", data: { currency: "USD" } });
  assert.deepEqual(normalizeMarketingEvent("application_received", { currency: "EUR" }), { name: "application_received", data: {} });
  assert.equal(normalizeMarketingEvent("currency_selected", { currency: "USD" }), null);
});
