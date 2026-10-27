import assert from "node:assert/strict";
import test from "node:test";
import { currencyForCountry, currencySuggestionResponse, exampleValue, loadCurrencySuggestion, mergeCurrencySuggestion, pricingSnapshot, soloPriceLabel } from "../src/lib/marketing-pricing.mjs";
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

test("a remembered manual choice wins without making a location request", async () => {
  assert.deepEqual(await loadCurrencySuggestion({ readPreference: () => "USD", fetcher: () => { throw new Error("Must not fetch"); } }), { currency: "USD", source: "choice" });
});

test("blocked preference storage and corrupt preferences still permit a location suggestion", async () => {
  for (const readPreference of [() => { throw new Error("Storage disabled"); }, () => "EUR"]) {
    assert.deepEqual(await loadCurrencySuggestion({ readPreference, fetcher: async (url, options) => {
      assert.equal(url, "/api/marketing-currency");
      assert.equal(options.cache, "no-store");
      return Response.json({ currency: "INR" });
    } }), { currency: "INR", source: "location" });
  }
});

test("network, HTTP, malformed JSON, null and unsupported suggestions leave both offers visible", async () => {
  for (const fetcher of [async () => { throw new Error("Offline"); }, async () => new Response("Unavailable", { status: 503 }), async () => new Response("not JSON"), async () => Response.json({ currency: null }), async () => Response.json({ currency: "EUR" })]) {
    const result = await loadCurrencySuggestion({ readPreference: () => null, fetcher });
    assert.deepEqual(result, { currency: null, source: "unknown" });
    assert.equal(soloPriceLabel(result.currency), "₹4,000 / USD $49");
  }
});

test("timed-out detection is harmless and retains a manual selection", async () => {
  const controller = new AbortController();
  const pending = loadCurrencySuggestion({ readPreference: () => null, signal: controller.signal, fetcher: async (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true })) });
  controller.abort();
  const result = await pending;
  assert.deepEqual(mergeCurrencySuggestion({ currency: "USD", source: "choice" }, result), { currency: "USD", source: "choice" });
});

test("a choice made while location is pending is never overwritten by its late response", async () => {
  let complete;
  const pending = loadCurrencySuggestion({ readPreference: () => null, fetcher: () => new Promise(resolve => { complete = resolve; }) });
  const chosen = { currency: "USD", source: "choice" };
  complete(Response.json({ currency: "INR" }));
  assert.equal(mergeCurrencySuggestion(chosen, await pending), chosen);
});

test("approved prices are fixed and USD sample values remain independent illustrations", () => {
  assert.equal(soloPriceLabel("INR"), "₹4,000");
  assert.equal(soloPriceLabel("USD"), "USD $49");
  assert.equal(exampleValue("course", "USD"), "USD $249");
  assert.equal(exampleValue("recorded", "USD"), "USD $229");
  assert.equal(exampleValue("coaching", "INR"), "₹18,000");
  assert.equal(pricingSnapshot("USD").monthlyMinor, 4900);
  assert.equal(pricingSnapshot("INR").monthlyMinor, 400000);
  assert.equal(pricingSnapshot("EUR"), null);
});

test("email applications identify the displayed offer without agreeing to billing or pricing brand interest", () => {
  const fields = { email: "qa@example.com", instagram: "qa_coach", offer: "coaching", pricingCurrency: "USD" };
  assert.match(prepareApplication(fields).body, /USD \$49\/month \(availability and billing terms to be confirmed\)/);
  assert.match(prepareApplication({ ...fields, pricingCurrency: undefined }).body, /₹4,000 \/ USD \$49/);
  assert.doesNotMatch(prepareApplication({ ...fields, offer: "brand_interest" }).body, /Solo pilot price|\$49/);
});

test("currency measurement accepts only INR and USD and discards personal data", () => {
  assert.deepEqual(normalizeMarketingEvent("currency_selected", { currency: "USD", country: "US", ip: "192.0.2.1", email: "qa@example.com" }), { name: "currency_selected", data: { currency: "USD" } });
  assert.deepEqual(normalizeMarketingEvent("application_received", { currency: "EUR" }), { name: "application_received", data: {} });
});
