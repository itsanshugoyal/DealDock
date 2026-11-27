import assert from "node:assert/strict";
import test from "node:test";

const origin = process.env.PREVIEW_TEST_ORIGIN || "http://127.0.0.1:3013";
const response = await fetch(new URL("/design-preview", origin));
const html = await response.text();

test("the retained preview is served successfully and excluded from indexing", () => {
  assert.equal(response.status, 200);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<meta name="theme-color" content="#f4f3ee"/);
});

test("the preview has one main landmark, labels its examples and never implies automatic sending", () => {
  assert.equal((html.match(/<main[\s>]/g) || []).length, 1);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /Nothing sends without/);
  assert.match(html, /Auto-send: off\. Always\./);
  assert.match(html, /Example inbox\./);
  assert.match(html, /Example scan with made-up numbers/);
  assert.match(html, /Example roster with made-up creators and amounts/);
  assert.match(html, /<form[\s>]/);
  assert.match(html, /Apply for the pilot/);
  assert.match(html, /First 30 days free/);
  assert.match(html, /How we use your details/);
});

test("every navigation destination and in-page anchor resolves", async () => {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(links.length > 0);
  const pages = new Map([["/design-preview", html]]);
  for (const link of new Set(links)) {
    const url = new URL(link, new URL("/design-preview", origin));
    if (url.protocol === "mailto:") {
      assert.equal(url.pathname, "hello@dealdock.io");
      continue;
    }
    assert.equal(url.origin, new URL(origin).origin);
    if (!pages.has(url.pathname)) {
      const destination = await fetch(url);
      assert.equal(destination.status, 200, `${link} should resolve`);
      pages.set(url.pathname, await destination.text());
    }
    if (url.hash) {
      assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `${link} should target a real element`);
    }
  }
});

test("all preview stylesheets load successfully", async () => {
  const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(stylesheets.length > 0);
  for (const stylesheet of stylesheets) {
    const asset = await fetch(new URL(stylesheet.replaceAll("&amp;", "&"), origin));
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("content-type"), /text\/css/);
  }
});

test("the global and India homepages render in their own currency and point to each other", async () => {
  for (const [route, price, other] of [["/", "$49", "₹4,000"], ["/in", "₹4,000", "$49"]]) {
    const page = await fetch(new URL(route, origin));
    assert.equal(page.status, 200);
    const content = await page.text();
    assert.match(content, /id="hero-heading"/);
    assert.ok(content.includes(price), `${route} should show ${price}`);
    assert.ok(!content.includes(`>${other}<`), `${route} should not show ${other} as a plan price`);
    assert.match(content, /hreflang="en-IN"[^>]*href="[^"]*\/in"/i);
    assert.match(content, /hreflang="x-default"/i);
    assert.doesNotMatch(content, /Claims, figures and testimonials are unverified/);
  }
  const legacy = await fetch(new URL("/global", origin), { redirect: "manual" });
  assert.equal(legacy.status, 308);
  const archive = await (await fetch(new URL("/original", origin))).text();
  assert.match(archive, /Claims, figures and testimonials are unverified/);
  assert.doesNotMatch(archive, /application\/ld\+json/);
});
