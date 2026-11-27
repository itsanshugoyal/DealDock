import { cp, mkdir, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Build outside the working tree. Only the static out/ directory is deployable.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stage = await mkdtemp(path.join(tmpdir(), "dealdock-marketing-review-"));
const origin = new URL(process.argv[2] || "https://dealdock-design-review.vercel.app").origin;
const files = [
  "package.json", "tsconfig.json", "postcss.config.mjs",
  "src/app/layout.tsx", "src/app/globals.css", "src/app/favicon.ico",
  "src/app/design-preview", "src/components/design-preview",
  "src/components/landing-page-body.tsx", "src/components/sections",
  "src/components/shared", "src/components/mockups", "src/data/locales",
  "src/lib/utils.ts", "src/lib/motion.ts", "src/lib/locale-context.tsx",
  "src/lib/apply-modal-context.tsx",
];
for (const relative of files) {
  const target = path.join(stage, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(path.join(root, relative), target, { recursive: true });
}
async function put(relative, text) {
  await mkdir(path.dirname(path.join(stage, relative)), { recursive: true });
  await writeFile(path.join(stage, relative), text);
}
await symlink(path.join(root, "node_modules"), path.join(stage, "node_modules"), "junction");
await put("next.config.ts", `import type { NextConfig } from "next";
const config: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true }, reactStrictMode: true };
export default config;
`);
let layout = await readFile(path.join(stage, "src/app/layout.tsx"), "utf8");
layout = layout.replace('index: true', 'index: false').replace('follow: true', 'follow: false')
  .replace('process.env.SITE_URL || "https://dealdock.in"', JSON.stringify(origin));
await put("src/app/layout.tsx", layout);

// The original design stays intact in the repository. Its public review copy is
// explicitly labeled; unconfigured forms must never pretend an email was sent.
for (const [route, locale] of [["", "in"], ["global/", "global"]]) {
  const variable = locale === "in" ? "inLocale" : "globalLocale";
  await put(`src/app/${route}page.tsx`, `import type { Metadata } from "next";
import { LandingPageBody } from "@/components/landing-page-body";
import { ${variable} } from "@/data/locales/${locale}";
export const metadata: Metadata = {
  title: "DealDock | Original design concept",
  description: "An original landing-page design for feedback. Figures and testimonials are unverified examples.",
  robots: { index: false, follow: false },
};
export default function Page() { return <LandingPageBody content={${variable}} />; }
`);
}
let body = await readFile(path.join(stage, "src/components/landing-page-body.tsx"), "utf8");
body = body.replace(/import \{ LocaleBanner \} from "@\/components\/shared\/locale-banner";\r?\n/, "")
  .replace(/\s*<LocaleBanner \/>/, "")
  .replace("<main>", `<aside className="review-notice" aria-label="Design review notice">Original design concept. Claims, figures and testimonials are unverified. <a href="/design-preview/">Compare the new design ↗</a></aside><main style={{paddingBottom: 100}}>`);
await put("src/components/landing-page-body.tsx", body);
let faq = await readFile(path.join(stage, "src/components/sections/faq.tsx"), "utf8");
faq = faq.replace(/  const faqJsonLd = \{[\s\S]*?\r?\n  \};\r?\n/, "")
  .replace(/\s*<script\s+type="application\/ld\+json"[\s\S]*?\/>/, "");
await put("src/components/sections/faq.tsx", faq);
await put("src/components/sections/apply-modal.tsx", `"use client";
import { useEffect, useRef } from "react";
import { useApplyModal } from "@/lib/apply-modal-context";
export function ApplyModal() {
  const { isOpen, closeModal } = useApplyModal();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen && !dialog.current?.open) dialog.current?.showModal();
    if (!isOpen && dialog.current?.open) dialog.current?.close();
  }, [isOpen]);
  return <dialog ref={dialog} className="review-dialog" onCancel={closeModal} onClose={closeModal} aria-labelledby="review-dialog-title">
    <h2 id="review-dialog-title">This is the original design concept.</h2>
    <p>The current pilot details and application are on the new page. Applying prepares an email for you to review and send to Anshu.</p>
    <a href="/design-preview/#apply">View the pilot application ↗</a>
    <button type="button" onClick={closeModal}>Keep reviewing this design</button>
  </dialog>;
}
`);
const css = await readFile(path.join(stage, "src/app/globals.css"), "utf8");
await put("src/app/globals.css", css + `
.review-notice {position:fixed;z-index:1000;bottom:0;left:0;right:0;padding:12px 20px;background:#f9d84a;color:#191d1b;text-align:center;font-size:12px;line-height:1.6;border-top:1px solid #191d1b;}
.review-notice a {display:inline-block;font-weight:700;text-decoration:underline;margin-left:10px;}
.review-dialog {margin:auto;width:min(90vw,480px);padding:30px;border:1px solid #c4cbbf;border-radius:10px;background:#f3f4ef;color:#191d1b;}
.review-dialog::backdrop {background:#000b;}
.review-dialog h2 {font-size:25px;font-weight:650;line-height:1.2;}
.review-dialog p {font-size:15px;line-height:1.8;margin:20px 0;}
.review-dialog a {display:block;background:#191d1b;color:white;padding:15px;border-radius:5px;text-align:center;}
.review-dialog button {display:block;min-height:44px;margin:12px auto 0;font-size:13px;text-decoration:underline;cursor:pointer;}
.review-dialog :focus-visible,.review-notice a:focus-visible {outline:3px solid #8b6e00;outline-offset:4px;}
`);
// Let crawlers read the noindex headers and let social clients fetch the image.
await put("public/robots.txt", "User-agent: *\nAllow: /\n");
await put("public/vercel.json", JSON.stringify({
  framework: null, buildCommand: "", installCommand: "", outputDirectory: ".",
  cleanUrls: true, trailingSlash: true,
  headers: [{source: "/(.*)", headers: [
    {key: "X-Robots-Tag", value: "noindex, nofollow"},
    {key: "X-Content-Type-Options", value: "nosniff"},
    {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
  ]}],
}, null, 2));
console.log(stage);
