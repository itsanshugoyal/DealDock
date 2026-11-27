// Live search-health check for dealdock.io. Read-only: GET requests only.
// Usage: node scripts/seo-health.mjs [origin]   (default https://dealdock.io)
// Checks robots.txt, every sitemap URL (status, canonical, noindex, structured data, share image),
// that search and AI crawlers get the same response as browsers, and that retired CRM routes stay closed.
const origin = (process.argv[2] || "https://dealdock.io").replace(/\/$/, "");
const problems = [];
const note = (ok, msg) => { console.log(`${ok ? "ok  " : "FAIL"} ${msg}`); if (!ok) problems.push(msg); };
const get = (url, ua) => fetch(url, { redirect: "manual", headers: ua ? { "user-agent": ua } : {} });

const robots = await (await get(`${origin}/robots.txt`)).text();
note(/Sitemap:\s*\S+\/sitemap\.xml/i.test(robots), "robots.txt points to the sitemap");
note(!/Disallow:\s*\/\s*$/m.test(robots), "robots.txt does not block the whole site");

const sitemap = await (await get(`${origin}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
note(urls.length > 0, `sitemap lists ${urls.length} URLs`);

for (const url of urls) {
  const res = await get(url);
  const html = res.status === 200 ? await res.text() : "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html) || /noindex/i.test(res.headers.get("x-robots-tag") || "");
  const types = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const problemsHere = [
    res.status !== 200 && `HTTP ${res.status}`,
    canonical && canonical.replace(/\/$/, "") !== url.replace(/\/$/, "") && `canonical ${canonical}`,
    noindex && "noindex",
    url.includes("/blog/") && !types.includes("BlogPosting") && "no BlogPosting data",
    !ogImage && "no og:image",
  ].filter(Boolean);
  if (ogImage) {
    const img = await get(ogImage);
    if (img.status !== 200) problemsHere.push(`og:image HTTP ${img.status}`);
  }
  note(problemsHere.length === 0, `${url.replace(origin, "") || "/"}${problemsHere.length ? ": " + problemsHere.join(", ") : ""}`);
}

const bots = {
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "OAI-SearchBot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
  PerplexityBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
};
for (const [name, ua] of Object.entries(bots)) note((await get(`${origin}/`, ua)).status === 200, `${name} user-agent gets 200 (spoofed UA; confirm Cloudflare AI Crawl Control too)`);

for (const path of ["/api/airtable?view=leads", "/api/setup/status"]) {
  const status = (await get(origin + path)).status;
  note(status === 410 || status === 404, `retired route ${path} closed (HTTP ${status})`);
}

console.log(problems.length ? `\n${problems.length} problem(s).` : "\nAll checks passed.");
if (problems.length) process.exitCode = 1;
