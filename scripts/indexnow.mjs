// Tell Bing (and other IndexNow engines, which feed Copilot and part of ChatGPT search) about new or changed URLs.
// Usage after a deploy: node scripts/indexnow.mjs [url ...]   No URLs = every URL in the live sitemap.
const HOST = "dealdock.io";
const KEY = "110573c8c29e0ca166baf7770f4b3a1a"; // public by design: IndexNow verifies ownership through https://dealdock.io/<KEY>.txt

const keyFile = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) throw new Error("The IndexNow key file is not live yet. Deploy first, then rerun.");

const urls = process.argv.length > 2
  ? process.argv.slice(2)
  : [...(await (await fetch(`https://${HOST}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length || urls.some((u) => new URL(u).host !== HOST)) throw new Error(`Only ${HOST} URLs can be submitted.`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`); // 200 or 202 = accepted
if (!res.ok) process.exitCode = 1;
