/* eslint-disable @next/next/no-img-element -- Satori renders these share images; next/image does not apply there */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Story } from "@/components/landing/content";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "DealDock: your DMs, sorted by money. Nothing sends until you approve.";

const ROOT = process.cwd();
const INK = "#14202C", INK_2 = "#57514A", ACCENT = "#FF7A1A";

const dataUrl = (png: Buffer) => `data:image/png;base64,${png.toString("base64")}`;
// Satori reads PNG, not WebP: Docky and the mark are converted once per render, at build time.
const assets = async () => {
  const [serif, semibold, regular, mark, docky] = await Promise.all([
    readFile(join(ROOT, "src/assets/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")),
    readFile(join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(ROOT, "public/brand/d-mark-192.png")),
    sharp(join(ROOT, "public/docky/docky-wave.webp")).resize(360).png().toBuffer(),
  ]);
  return { mark: dataUrl(mark), docky: dataUrl(docky), fonts: [
    { name: "Serif", data: serif, weight: 400 as const },
    { name: "Geist", data: semibold, weight: 600 as const },
    { name: "Geist", data: regular, weight: 400 as const },
  ] };
};

/** The private card Docky sends about a brand DM, as on the landing page's phone. */
function DealCard({ story }: { story: Story }) {
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid rgba(20,32,44,0.08)", fontSize: 19 }}>
      <span style={{ color: INK_2 }}>{label}</span><span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 430, padding: "22px 24px", borderRadius: 28, background: "#FFFFFF", boxShadow: "0 30px 60px -30px rgba(60,30,10,0.45)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 17, color: INK_2 }}>
        <div style={{ display: "flex", width: 10, height: 10, borderRadius: 5, background: ACCENT }} />Docky · private to you
      </div>
      <div style={{ display: "flex", marginTop: 12, fontSize: 24, fontWeight: 600 }}>{story.brand}</div>
      <div style={{ display: "flex", marginTop: 4, fontSize: 18, color: INK_2, lineHeight: 1.35 }}>{story.rateAsk}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "16px 0 8px" }}>
        <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1.5 }}>{story.estimate}</span>
        <span style={{ fontSize: 17, color: "#9A3D06", padding: "4px 10px", borderRadius: 999, background: "#FFE9D6" }}>Brand deal</span>
      </div>
      {row("Asks", story.asks)}
      {row("Reply window", story.window)}
    </div>
  );
}

/** Every share card: the warm stage, the logo, a serif headline, and either Docky’s deal card or Docky waving. */
export async function shareImage({ title, eyebrow, story }: { title: string; eyebrow?: string; story?: Story }) {
  const { mark, docky, fonts } = await assets();
  const size = story ? 96 : title.length > 70 ? 64 : title.length > 40 ? 76 : 92;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "52px 64px", color: INK, fontFamily: "Geist", backgroundImage: "linear-gradient(160deg, #FDF0E3 0%, #FADFC6 55%, #F5CBA6 100%)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 32, fontWeight: 600, letterSpacing: -1.2 }}>
        <img src={mark} width={40} height={30} alt="" />DealDock
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: story ? 600 : 760 }}>
          {eyebrow && <div style={{ display: "flex", marginBottom: 20, fontSize: 24, color: INK_2 }}>{eyebrow}</div>}
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Serif", fontSize: size, lineHeight: 1, letterSpacing: -1.5 }}>{title.split("\n").map(line => <span key={line}>{line}</span>)}</div>
        </div>
        {story ? <DealCard story={story} /> : <img src={docky} width={300} height={306} alt="" />}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: INK_2, fontSize: 22 }}>
        <span>Nothing sends until you approve.</span><span>dealdock.io</span>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
