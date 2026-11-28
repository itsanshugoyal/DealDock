import assert from "node:assert/strict";
import test from "node:test";

const origin = process.env.REVIEW_TEST_ORIGIN;
assert.ok(origin, "Set REVIEW_TEST_ORIGIN to the deployed marketing review origin");
const siteLive = process.env.REVIEW_SITE_LIVE === "true";
const canonicalOrigin = new URL(process.env.REVIEW_CANONICAL_ORIGIN || origin).origin;

test("pilot prices are readable before JavaScript, in each homepage's currency", async () => {
  for (const [route, prices] of [["/", [/\$49/, /\$99/, /\$179/, /USD per month/]], ["/in", [/₹4,000/, /₹8,000/, /₹15,000/]], ["/pilot-terms", [/USD \$49/, /₹4,000/, /First 30 days free|first 30 days are free/i]]]) {
    const html = await (await fetch(new URL(route, origin))).text();
    for (const price of prices) assert.match(html, price, `${route} shows ${price}`);
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

test("public pages follow launch indexing", async () => {
  for (const route of ["/", "/in", "/privacy", "/pilot-terms", "/security", "/about", "/contact"]) {
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200, route);
    const html = await response.text();
    if (!siteLive) {
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
    if (["/", "/in"].includes(route)) {
      assert.match(html, /Nothing sends without your approval/);
      assert.match(html, /Free for 30 days/);
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
  assert.match(sitemap, /\/in<\/loc>/);
  assert.match(sitemap, /\/security<\/loc>/);
  assert.match(sitemap, /\/about<\/loc>/);
  assert.match(sitemap, /\/privacy<\/loc>/);
  assert.match(sitemap, /\/pilot-terms<\/loc>/);
  assert.doesNotMatch(sitemap, /original|design-preview|dashboard|guides|api\//);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  for (const route of ["/in", "/security", "/blog", "/tools"]) assert.ok(locations.some(location => new URL(location).pathname === route), route);
  assert.ok(locations.every(location => new URL(location).origin === canonicalOrigin));
  const robots = await (await fetch(new URL("/robots.txt", origin))).text();
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
});

test("social previews reference this deployment and return real PNGs", async () => {
  for (const route of ["/", "/in"]) {
  const html = await (await fetch(new URL(route, origin))).text();
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image, `${route} has an Open Graph image`);
  const url = new URL(image.replaceAll("&amp;", "&"));
  assert.equal(url.origin, new URL(process.env.REVIEW_CANONICAL_ORIGIN || origin).origin);
  const response = await fetch(new URL(url.pathname + url.search, origin));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  }
});

test("the homepage CSS and JavaScript assets resolve", async () => {
  const html = await (await fetch(new URL("/", origin))).text();
  const assets = [...html.matchAll(/(?:href|src)="([^" ]+\.(?:css|js)(?:\?[^" ]*)?)"/g)].map(m => m[1]);
  assert.ok(assets.length > 1);
  for (const asset of new Set(assets)) {
    assert.equal((await fetch(new URL(asset.replaceAll("&amp;", "&"), origin))).status, 200, asset);
  }
});
