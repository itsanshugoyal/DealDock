import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import * as application from "../src/components/site/application.mjs";
import { PRICE_VERSION } from "../src/lib/marketing-pricing.mjs";

const intakeModule = await import("../src/lib/pilot/intake.mjs").catch(() => null);
const valid = { id: "70efac01-fb3a-43b1-88ea-3a5aca9b6e38", email: "reviewer@example.com", instagram: "@example_coach", offer: "coaching", note: "Weekly package enquiries", company: "", attribution: { source: "pilot-review", campaign: "first-ten" } };
const request = (body = valid, headers = {}) => new Request("https://dealdock.example/api/pilot-application", { method: "POST", headers: { "content-type": "application/json", origin: "https://dealdock.example", ...headers }, body: JSON.stringify(body) });

function normalize(value) {
  assert.equal(typeof application.normalizeApplication, "function", "Structured application validation must exist");
  return application.normalizeApplication(value);
}

async function fixture() {
  assert.equal(typeof intakeModule?.createPilotApplicationHandler, "function", "Hosted application handler must exist");
  const directory = await mkdtemp(path.join(tmpdir(), "dealdock-intake-test-"));
  const store = { async save(record) {
    const target = path.join(directory, record.id + ".json");
    try { await writeFile(target, JSON.stringify(record), { flag: "wx" }); }
    catch (error) {
      if (error.code !== "EEXIST") throw error;
      const previous = JSON.parse(await readFile(target, "utf8"));
      if (previous.fingerprint !== record.fingerprint) throw Object.assign(new Error("Conflict"), { code: "APPLICATION_CONFLICT" });
    }
  } };
  return { directory, handler: intakeModule.createPilotApplicationHandler({ store, configured: true }) };
}

test("validation identifies individual errors without accepting oversized or unknown fields", () => {
  const result = normalize({ email: "bad", instagram: "https://instagram.com/a", offer: "unknown", note: "x".repeat(601) });
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "instagram", "note", "offer"]);
  assert.equal(normalize({ ...valid, email: "a".repeat(255) + "@example.com" }).valid, false);
});

test("valid application data is normalized and only the minimum fields survive", () => {
  const result = normalize({ ...valid, email: " reviewer@example.com ", instagram: " @example_coach ", admin: true });
  assert.equal(result.valid, true);
  assert.equal(result.fields.email, "reviewer@example.com");
  assert.equal(result.fields.instagram, "example_coach");
  assert.equal(Object.hasOwn(result.fields, "admin"), false);
});

test("a receipt is returned only after the actual application has been durably saved", async () => {
  const { handler, directory } = await fixture();
  const response = await handler(request());
  assert.equal(response.status, 201);
  const receipt = await response.json();
  assert.equal(receipt.status, "received");
  assert.equal(receipt.reference, valid.id);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(Object.keys(receipt).sort(), ["interest", "reference", "status"]);
  const record = JSON.parse(await readFile(path.join(directory, valid.id + ".json"), "utf8"));
  assert.equal(record.email, valid.email);
  assert.equal(record.instagram, "example_coach");
  assert.equal(record.attribution.source, "pilot-review");
  assert.ok(record.submittedAt);
});

test("retries of the same request cannot create duplicate applications", async () => {
  const { handler, directory } = await fixture();
  assert.equal((await handler(request())).status, 201);
  assert.equal((await handler(request())).status, 201);
  assert.equal((await readdir(directory)).length, 1);
  assert.equal((await handler(request({ ...valid, email: "different@example.com" }))).status, 409);
});

test("applications keep the server-owned price list the page showed, without trusting supplied amounts", async () => {
  for (const [currency, monthlyMinor] of [["INR", { solo: 400000, studio: 800000, roster: 1500000 }], ["USD", { solo: 4900, studio: 9900, roster: 17900 }]]) {
    const { handler, directory } = await fixture();
    const payload = { ...valid, pricingCurrency: currency, pricing: { monthlyMinor: 1, version: "fake" } };
    assert.equal((await handler(request(payload))).status, 201);
    assert.equal((await handler(request(payload))).status, 201);
    const record = JSON.parse(await readFile(path.join(directory, valid.id + ".json"), "utf8"));
    assert.deepEqual(record.pricing, { currency, version: PRICE_VERSION, monthlyMinor });
    assert.equal(Object.hasOwn(record, "country"), false);
    assert.equal((await handler(request({ ...payload, pricingCurrency: currency === "USD" ? "INR" : "USD" }))).status, 409);
  }
});

test("unsupported display currencies are rejected without saving a record", async () => {
  const { handler, directory } = await fixture();
  for (const pricingCurrency of ["EUR", "usd", ["USD"], { currency: "USD" }, null]) assert.equal((await handler(request({ ...valid, pricingCurrency }))).status, 400);
  assert.equal((await readdir(directory)).length, 0);
});

test("brand-deal creators and agencies join the same pilot with the prices they saw", async () => {
  for (const offer of ["brand", "agency"]) {
    const { handler, directory } = await fixture();
    const response = await handler(request({ ...valid, offer, pricingCurrency: "USD" }));
    assert.equal((await response.json()).interest, "pilot");
    const record = JSON.parse(await readFile(path.join(directory, valid.id + ".json"), "utf8"));
    assert.equal(record.pricing.currency, "USD");
  }
});

test("storage failure never returns a received receipt", async () => {
  assert.equal(typeof intakeModule?.createPilotApplicationHandler, "function");
  const handler = intakeModule.createPilotApplicationHandler({ configured: true, store: { async save() { throw new Error("Unavailable storage"); } } });
  const response = await handler(request());
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.status, undefined);
  assert.equal(result.code, "storage_unavailable");
});

test("unconfigured intake reports its status honestly without accepting personal data", async () => {
  assert.equal(typeof intakeModule?.createPilotApplicationHandler, "function");
  const handler = intakeModule.createPilotApplicationHandler({ configured: false });
  const response = await handler(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "intake_unavailable");
});

test("cross-origin requests, spam fields, invalid identifiers and oversized bodies are rejected", async () => {
  const { handler, directory } = await fixture();
  assert.equal((await handler(request(valid, { origin: "https://other.example" }))).status, 403);
  assert.equal((await handler(request({ ...valid, company: "spam" }))).status, 400);
  assert.equal((await handler(request({ ...valid, id: "../path" }))).status, 400);
  assert.equal((await handler(request({ ...valid, id: [valid.id] }))).status, 400);
  assert.equal((await handler(request({ ...valid, note: "x".repeat(9000) }))).status, 413);
  assert.equal((await handler(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await readdir(directory)).length, 0);
});

test("same-origin requests work behind Next's internal hostname while foreign origins stay blocked", async () => {
  const { handler } = await fixture();
  const proxied = (origin) => new Request("http://localhost:3013/api/pilot-application", {
    method: "POST", headers: { host: "dealdock.example", "x-forwarded-proto": "https", origin, "content-type": "application/json" }, body: JSON.stringify(valid),
  });
  assert.equal((await handler(proxied("https://dealdock.example"))).status, 201);
  assert.equal((await handler(proxied("https://other.example"))).status, 403);
  assert.equal((await handler(proxied("http://dealdock.example"))).status, 403);
  assert.equal((await handler(proxied("null"))).status, 403);
});

test("invalid fields return usable validation messages without writing a record", async () => {
  const { handler, directory } = await fixture();
  const response = await handler(request({ ...valid, email: "invalid", instagram: "" }));
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.deepEqual(Object.keys(body.errors).sort(), ["email", "instagram"]);
  assert.equal((await readdir(directory)).length, 0);
});

test("attribution is bounded and cannot contain arbitrary data", async () => {
  const { handler, directory } = await fixture();
  const response = await handler(request({ ...valid, offer: "brand", attribution: { source: "a\nb", campaign: "c".repeat(150), email: "private@example.com" } }));
  assert.equal((await response.json()).interest, "pilot");
  const record = JSON.parse(await readFile(path.join(directory, valid.id + ".json"), "utf8"));
  assert.equal(record.attribution.source, "a b");
  assert.equal(record.attribution.campaign.length, 100);
  assert.equal(Object.hasOwn(record.attribution, "email"), false);
});

test("the bounded per-instance rate limit expires and rejects bursts", () => {
  assert.equal(typeof intakeModule?.createRateLimiter, "function");
  let now = 0;
  const allow = intakeModule.createRateLimiter({ limit: 2, windowMs: 1000, now: () => now });
  assert.equal(allow("one-visitor"), true);
  assert.equal(allow("one-visitor"), true);
  assert.equal(allow("one-visitor"), false);
  assert.equal(allow("another-visitor"), true);
  now = 1001;
  assert.equal(allow("one-visitor"), true);
});

test("the client requires a valid matching receipt, rather than any successful HTTP response", async () => {
  assert.equal(typeof application.submitApplication, "function", "The client submission contract must exist");
  const { handler } = await fixture();
  const received = await application.submitApplication(valid, { fetcher: (_url, init) => handler(new Request("https://dealdock.example/api/pilot-application", { ...init, headers: { ...init.headers, origin: "https://dealdock.example" } })) });
  assert.equal(received.reference, valid.id);
  await assert.rejects(() => application.submitApplication(valid, { fetcher: async () => Response.json({ success: true }) }));
});

test("network failures give an actionable message instead of a browser exception", async () => {
  await assert.rejects(() => application.submitApplication(valid, { fetcher: async () => { throw new TypeError("Failed to fetch"); } }), /couldn’t connect.*Try again/);
});

test("the private Blob adapter preserves records and verifies retry contents", async () => {
  const blob = await import("../src/lib/pilot/blob-store.mjs").catch(() => null);
  assert.equal(typeof blob?.createPrivateApplicationStore, "function", "Private application storage must exist");
  const directory = await mkdtemp(path.join(tmpdir(), "dealdock-blob-adapter-test-"));
  // Replace only the remote service; real writes and reads remain observable.
  const client = {
    async put(name, data, options) {
      if (options.access !== "private" || options.allowOverwrite) throw new Error("Unsafe access");
      await writeFile(path.join(directory, path.basename(name)), data, { flag: "wx" });
    },
    async get(name, options) {
      if (options.access !== "private") throw new Error("Unsafe access");
      try { return { statusCode: 200, stream: new Response(await readFile(path.join(directory, path.basename(name)))).body }; }
      catch { return null; }
    },
  };
  const store = blob.createPrivateApplicationStore(client);
  const record = { ...valid, fingerprint: "one" };
  await store.save(record);
  await store.save(record);
  assert.equal((await readdir(directory)).length, 1);
  await assert.rejects(() => store.save({ ...record, fingerprint: "changed" }), error => error.code === "APPLICATION_CONFLICT");
  assert.equal(JSON.parse(await readFile(path.join(directory, valid.id + ".json"), "utf8")).fingerprint, "one");
});
