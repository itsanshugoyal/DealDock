import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stage = process.argv[2] ? path.resolve(process.argv[2]) : await mkdtemp(path.join(tmpdir(), "dealdock-pilot-website-"));
assert.ok(stage.startsWith(path.resolve(tmpdir()) + path.sep) && path.basename(stage).startsWith("dealdock-pilot-website-"), "Use an isolated DealDock pilot directory under the system temp directory");
const allowlist = [
  "package.json", "package-lock.json", "tsconfig.json", "postcss.config.mjs", "eslint.config.mjs",
  "src/app/layout.tsx", "src/app/globals.css", "src/app/page.tsx", "src/app/global",
  "src/app/about", "src/app/privacy", "src/app/pilot-terms", "src/app/contact", "src/app/original", "src/app/guides",
  "src/app/design-preview", "src/app/robots.ts", "src/app/sitemap.ts",
  "src/app/favicon.ico", "src/app/icon.svg", "src/app/apple-icon.png", "src/app/opengraph-image.tsx",
  "src/app/api/pilot-application", "src/app/api/marketing-currency", "src/components/design-preview", "src/components/marketing",
  "src/components/landing-page-body.tsx", "src/components/sections", "src/components/shared", "src/components/mockups", "src/data/locales",
  "src/lib/utils.ts", "src/lib/motion.ts", "src/lib/locale-context.tsx", "src/lib/apply-modal-context.tsx",
  "src/lib/pilot", "src/lib/marketing-config.ts", "src/lib/marketing-events.mjs", "src/lib/marketing-pricing.mjs", "src/lib/marketing-guides.ts", "src/lib/marketing-analytics-config.mjs",
];
for (const relative of allowlist) {
  const target = path.join(stage, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(path.join(root, relative), target, { recursive: true });
}
try { await symlink(path.join(root, "node_modules"), path.join(stage, "node_modules"), "junction"); }
catch (error) { if (error.code !== "EEXIST") throw error; }
await writeFile(path.join(stage, "next.config.ts"), `import type { NextConfig } from "next";
const review = process.env.MARKETING_SITE_LIVE !== "true";
const nextConfig: NextConfig = {
  images: { unoptimized: true }, reactStrictMode: true,
  async redirects() { return [{source:"/global",destination:"/",permanent:true}]; },
  async headers() { return [
    {source:"/:path*",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin"},{key:"X-Frame-Options",value:"DENY"},...(review ? [{key:"X-Robots-Tag",value:"noindex, nofollow"}] : [])]},
    {source:"/design-preview/:path*",headers:[{key:"X-Robots-Tag",value:"noindex, nofollow"}]},
    {source:"/original/:path*",headers:[{key:"X-Robots-Tag",value:"noindex, nofollow"}]},
  ]; },
};
export default nextConfig;
`);
await writeFile(path.join(stage, "vercel.json"), JSON.stringify({ framework: "nextjs", installCommand: "npm ci", buildCommand: "npm run build", regions: ["sin1"] }, null, 2));
await writeFile(path.join(stage, ".vercelignore"), "node_modules\n.next\n.env*\n.pilot-data\n.git\n*.md\n");
console.log(stage);
