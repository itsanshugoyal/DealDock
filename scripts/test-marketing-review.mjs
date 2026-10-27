import assert from "node:assert/strict";
import test from "node:test";

const origin = process.env.REVIEW_TEST_ORIGIN;
assert.ok(origin, "Set REVIEW_TEST_ORIGIN to the deployed marketing review origin");
const siteLive = process.env.REVIEW_SITE_LIVE === "true";
const canonicalOrigin = new URL(process.env.REVIEW_CANONICAL_ORIGIN || origin).origin;

test("both fixed Solo prices are readable before JavaScript and international eligibility is clear", async () => {
  for (const route of ["/", "/design-preview", "/pilot-terms"]) {
    const response = await fetch(new URL(route, origin));
    const html = await response.text();
    assert.match(html, /₹4,000/);
    assert.match(html, /USD \$49/);
    assert.match(html, /international validation pilots/);
    assert.match(html, /Show pricing in/);
  }
});

test("the currency hint is bounded, private, uncached and has no mutation method", async () => {
  const response = await fetch(new URL("/api/marketing-currency", origin));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /private.*no-store/);
  assert.match(response.headers.get("vary"), /x-vercel-ip-country/i);
  const data = await response.json();
  assert.deepEqual(Object.keys(data), ["currency"]);
  assert.ok([null, "INR", "USD"].includes(data.currency));
  assert.equal((await fetch(new URL("/api/marketing-currency", origin), { method: "POST" })).status, 405);
});

test("public pages follow launch indexing and comparison pages stay excluded", async () => {
  for (const route of ["/", "/design-preview", "/original", "/privacy", "/pilot-terms", "/contact"]) {
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200, route);
    const html = await response.text();
    if (!siteLive || ["/design-preview", "/original"].includes(route)) {
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    } else {
      assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex|nofollow/i);
      assert.match(html, /<meta name="robots" content="index, follow"/);
      assert.doesNotMatch(html, /<meta name="(?:robots|googlebot)" content="[^"]*noindex/);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical, `${route} has a canonical URL`);
      assert.equal(new URL(canonical).href, new URL(route, canonicalOrigin).href, `${route} uses the canonical domain`);
      if (route === "/") {
        const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(match => JSON.parse(match[1]));
        const graph = structuredData.flatMap(item => item["@graph"] || [item]);
        assert.ok(graph.some(item => item["@type"] === "Organization" && item.name === "DealDock"), "homepage publishes truthful Organization data");
        assert.ok(graph.some(item => item["@type"] === "WebSite" && item.url === canonicalOrigin), "homepage publishes canonical WebSite data");
      }
    }
    assert.equal((html.match(/<main[\s>]/g) || []).length, 1);
    if (["/", "/design-preview"].includes(route)) {
      assert.match(html, /DealDock never auto-sends messages/);
      assert.match(html, /No payment or Instagram connection required/);
      assert.doesNotMatch(html, /review-notice"/);
    } else if (route === "/original") {
      assert.match(html, /Claims, figures and testimonials are unverified/);
      assert.match(html, /View the accepted design/);
      assert.equal(html.includes('application/ld+json'), false, "The review copy must not publish unverified structured claims");
    }
  }
});

test("internal routes and repository files are not published", async () => {
  for (const route of ["/dashboard", "/dashboard/setup", "/api/airtable", "/api/n8n/workflows", "/api/setup/status", "/api/crm/leads", "/.env.local", "/PIPELINE.md", "/package.json", "/.pilot-data/test.json"]) {
    assert.equal((await fetch(new URL(route, origin))).status, 404, route);
  }
});

test("legacy locale links preserve attribution and the intake exposes no read route", async () => {
  const redirect = await fetch(new URL("/global?utm_source=qa", origin), {redirect:"manual"});
  assert.equal(redirect.status, 308);
  assert.match(redirect.headers.get("location"), /\/?\?utm_source=qa$/);
  assert.equal((await fetch(new URL("/api/pilot-application", origin))).status, 405);
  const foreign = await fetch(new URL("/api/pilot-application", origin), {method:"POST",headers:{origin:"https://other.example","content-type":"application/json"},body:"{}"});
  assert.equal(foreign.status, 403);
  const invalid = await fetch(new URL("/api/pilot-application", origin), {method:"POST",headers:{origin:new URL(origin).origin,"content-type":"application/json"},body:"{}"});
  assert.equal(invalid.status, 400);
});

test("launch SEO files list only public canonical routes", async () => {
  const sitemap = await (await fetch(new URL("/sitemap.xml", origin))).text();
  assert.match(sitemap, /\/about<\/loc>/);
  assert.match(sitemap, /\/privacy<\/loc>/);
  assert.match(sitemap, /\/pilot-terms<\/loc>/);
  assert.doesNotMatch(sitemap, /original|design-preview|dashboard|api\//);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(locations.length, 5);
  assert.ok(locations.every(location => new URL(location).origin === canonicalOrigin));
  const robots = await (await fetch(new URL("/robots.txt", origin))).text();
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
});

test("social preview references this deployment and returns a real PNG", async () => {
  const html = await (await fetch(new URL("/design-preview/", origin))).text();
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image, "an Open Graph image is present");
  const url = new URL(image.replaceAll("&amp;", "&"));
  assert.equal(url.origin, new URL(process.env.REVIEW_CANONICAL_ORIGIN || origin).origin);
  const response = await fetch(new URL(url.pathname + url.search, origin));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
});

test("the review page CSS and JavaScript assets resolve", async () => {
  const html = await (await fetch(new URL("/design-preview/", origin))).text();
  const assets = [...html.matchAll(/(?:href|src)="([^" ]+\.(?:css|js)(?:\?[^" ]*)?)"/g)].map(m => m[1]);
  assert.ok(assets.length > 1);
  for (const asset of new Set(assets)) {
    assert.equal((await fetch(new URL(asset.replaceAll("&amp;", "&"), origin))).status, 200, asset);
  }
});
