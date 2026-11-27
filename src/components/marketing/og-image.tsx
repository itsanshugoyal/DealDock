import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { SiteContent } from "@/components/design-preview/site-content";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "DealDock: your DMs, sorted by money. Nothing sends until you approve.";
const FONTS = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
const AVATARS = ["#C2316D", "#2F5BEA", "#5B4FD6"];

/** The social card for a homepage: the headline beside a small inbox sorted by value, in that page's currency. */
export async function marketingOgImage(content: SiteContent) {
  const [black, semibold, regular] = await Promise.all(["Geist-Black.ttf", "Geist-SemiBold.ttf", "Geist-Regular.ttf"].map(file => readFile(join(FONTS, file))));
  const rows = content.hero.rows.filter(row => row.value).slice(0, 3);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "52px 64px", background: "#F4F3EE", color: "#111111", fontFamily: "Geist" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>
        <div style={{ width: 26, height: 26, border: "3px solid #111111", borderRadius: 7, background: "#FFD43B", boxShadow: "3px 3px 0 #111111", transform: "rotate(-8deg)" }} />
        DealDock
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 100, fontWeight: 900, lineHeight: 0.98, letterSpacing: -5 }}>
          <span>Your DMs,</span>
          <span>sorted by</span>
          <div style={{ display: "flex" }}><span style={{ padding: "0 10px", margin: "0 -10px", backgroundImage: "linear-gradient(to bottom, transparent 52%, #FFD43B 52%, #FFD43B 94%, transparent 94%)" }}>money.</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 480, padding: 22, border: "3px solid #111111", borderRadius: 28, background: "#FFFFFF", boxShadow: "12px 12px 0 #FFD43B" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: 6, fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>Inbox<span style={{ color: "#66665F", fontSize: 17, fontWeight: 400, letterSpacing: 0 }}>sorted by value</span></div>
          {rows.map((row, index) => (
            <div key={row.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", border: `3px solid ${index === 0 ? "#111111" : "#FFFFFF"}`, borderRadius: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 22, background: AVATARS[index], color: "#FFFFFF", fontSize: 17, fontWeight: 600 }}>{row.name.split(" ").map(word => word[0]).join("").slice(0, 2)}</div>
              <div style={{ display: "flex", flex: 1, fontSize: 20, fontWeight: 600, lineHeight: 1.15, letterSpacing: -0.5 }}>{row.name}</div>
              <div style={{ display: "flex", padding: "6px 12px", borderRadius: 999, background: "#FFD43B", fontSize: 18, fontWeight: 600 }}>{row.value}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 4, padding: "10px 14px", borderRadius: 999, background: "#EAE8E0", color: "#4A4A45", fontSize: 16 }}>{content.hero.fold}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#4A4A45", fontSize: 24 }}><span>Nothing sends until you approve.</span><span>Instagram DMs + Gmail</span></div>
    </div>,
    { ...OG_SIZE, fonts: [{ name: "Geist", data: black, weight: 900 }, { name: "Geist", data: semibold, weight: 600 }, { name: "Geist", data: regular, weight: 400 }] },
  );
}
