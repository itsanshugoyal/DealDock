import assert from "node:assert/strict";
import test from "node:test";

const origin = process.env.PREVIEW_TEST_ORIGIN || "http://127.0.0.1:3013";
const response = await fetch(new URL("/design-preview", origin));
const html = await response.text();

test("the retained preview is served successfully and excluded from indexing", () => {
  assert.equal(response.status, 200);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<meta name="theme-color" content="#f3f4ef"/);
});

test("the preview has one main landmark and labels the unsent illustrative content", () => {
  assert.equal((html.match(/<main[\s>]/g) || []).length, 1);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /DealDock never auto-sends messages/);
  assert.match(html, /Illustrative workflow/);
  assert.match(html, /No messages are sent from this example/);
  assert.match(html, /<form[\s>]/);
  assert.match(html, /Apply for the pilot/);
  assert.match(html, /No payment or Instagram connection required/);
  assert.match(html, /How we use your details/);
});

test("every navigation destination and in-page anchor resolves", async () => {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(links.length > 0);
  const pages = new Map([["/design-preview", html]]);
  for (const link of new Set(links)) {
    const url = new URL(link, new URL("/design-preview", origin));
    if (url.protocol === "mailto:") {
      assert.equal(url.pathname, "itsanshugoyal2@gmail.com");
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

test("the accepted homepage renders the preview and the archive is labeled", async () => {
  for (const route of ["/", "/global"]) {
    const page = await fetch(new URL(route, origin));
    assert.equal(page.status, 200);
    const content = await page.text();
    assert.match(content, /id="preview-heading"/);
    assert.doesNotMatch(content, /Claims, figures and testimonials are unverified/);
  }
  const archive = await (await fetch(new URL("/original", origin))).text();
  assert.match(archive, /Claims, figures and testimonials are unverified/);
  assert.doesNotMatch(archive, /application\/ld\+json/);
});
