// Verifies a built (or live) DealDock site: every /blog and /tools page in the sitemap, share images, structured data,
// FAQ parity, internal links and the tracker CSV. Read-only.
// Usage: node scripts/verify-blog.mjs [base]   e.g. http://localhost:3473 (after `npm run build && npx next start -p 3473`)
//        default base is https://dealdock.io
const BASE = (process.argv[2] || "https://dealdock.io").replace(/\/$/, "");
const ORIGIN = "https://dealdock.io";
const problems = [];
const fail = (m) => { problems.push(m); console.log("FAIL", m); };
const local = (u) => u.replace(ORIGIN, BASE);
const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const pages = urls.filter((u) => /\/(blog|tools)\//.test(u));
console.log(`sitemap: ${urls.length} URLs, ${pages.length} blog/tool pages`);

const internal = new Set();
for (const url of pages) {
  const path = url.replace(ORIGIN, "");
  const res = await fetch(local(url));
  const html = await res.text();
  if (res.status !== 200) { fail(`${path} HTTP ${res.status}`); continue; }
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== url) fail(`${path} canonical is ${canonical}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) fail(`${path} is noindex`);
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { const j = JSON.parse(m[1]); return j["@graph"] || [j]; });
  const main = graph.find((n) => n["@type"] === "BlogPosting" || n["@type"] === "WebApplication");
  if (!main) fail(`${path} has no BlogPosting/WebApplication data`);
  const faq = graph.find((n) => n["@type"] === "FAQPage");
  const visible = [...html.matchAll(/<summary><span>([^<]+)<\/span>/g)].map((m) => decode(m[1]));
  if (faq && faq.mainEntity.map((q) => q.name).join("|") !== visible.join("|")) fail(`${path} FAQ data differs from visible FAQ (${faq.mainEntity.length} vs ${visible.length})`);
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (!og) fail(`${path} has no og:image`);
  else { const r = await fetch(local(og)); if (r.status !== 200 || !/image/.test(r.headers.get("content-type") || "")) fail(`${path} og:image HTTP ${r.status}`); }
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "));
  const words = text.split(/\s+/).filter(Boolean).length;
  const external = new Set([...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith(ORIGIN))).size;
  const dashes = (text.match(/—/g) || []).length;
  if (dashes) fail(`${path} contains ${dashes} em dash(es)`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) internal.add(m[1]);
  console.log(`ok ${path} | ${graph.map((n) => n["@type"]).join("+")} | lang ${main?.inLanguage ?? "-"} | FAQ ${visible.length} | ~${words} words on page | ${external} external links`);
}
for (const href of internal) {
  if (href.startsWith("/_next")) continue;
  const r = await fetch(BASE + href, { redirect: "manual" });
  if (![200, 307, 308].includes(r.status)) fail(`internal link ${href} -> HTTP ${r.status}`);
}
console.log(`checked ${internal.size} internal links`);

const csvRes = await fetch(`${BASE}/templates/dealdock-dm-enquiry-tracker.csv`);
if (csvRes.status === 200) {
  const csv = Buffer.from(await csvRes.arrayBuffer());
  const bom = csv[0] === 0xef && csv[1] === 0xbb && csv[2] === 0xbf;
  const crlf = csv.includes(Buffer.from("\r\n"));
  if (!bom || !crlf) fail(`tracker CSV BOM ${bom}, CRLF ${crlf}`);
}
console.log(problems.length ? `\n${problems.length} problem(s)` : "\nAll blog checks passed.");
if (problems.length) process.exitCode = 1;
