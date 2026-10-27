import assert from "node:assert/strict";
import test from "node:test";

const events = await import("../src/lib/marketing-events.mjs").catch(() => null);
const config = await import("../src/lib/marketing-analytics-config.mjs").catch(() => null);
test("analytics URLs discard query strings and fragments and exclude internal routes", () => {
  assert.equal(typeof events?.sanitizeAnalyticsEvent, "function", "Analytics privacy filtering must exist");
  const event = events.sanitizeAnalyticsEvent({ type: "pageview", url: "https://dealdock.example/?email=private@example.com#apply" });
  assert.equal(event.url, "https://dealdock.example/");
  assert.equal(events.sanitizeAnalyticsEvent({ type: "pageview", url: "https://dealdock.example/dashboard" }), null);
  assert.equal(events.sanitizeAnalyticsEvent({ type: "pageview", url: "https://dealdock.example/privacy?ref=private#choices" })?.url, "https://dealdock.example/privacy");
});

test("GTM is never mounted on preview or private deployments", () => {
  assert.equal(config?.marketingGtmId(false), null);
  assert.equal(config?.marketingGtmId(true), "GTM-MXV6HLJT");
});

test("custom marketing events allow only known names and categorical properties", () => {
  assert.equal(typeof events?.normalizeMarketingEvent, "function");
  assert.equal(events.normalizeMarketingEvent("made_up", {}), null);
  assert.deepEqual(events.normalizeMarketingEvent("pilot_cta_clicked", { location: "hero", email: "private@example.com", note: "Sensitive message" }), { name: "pilot_cta_clicked", data: { location: "hero" } });
  assert.deepEqual(events.normalizeMarketingEvent("application_received", { offer: "coaching", reference: "secret", email: "private@example.com" }), { name: "application_received", data: { offer: "coaching" } });
});
