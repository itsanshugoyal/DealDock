import { ImageResponse } from "next/og";

// Share card in the same style as the blog cards (src/app/og/[slug]/route.tsx).
export const alt = "DealDock brand deal rate calculator: price usage rights, paid ads, exclusivity and rush fees on top of your rate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#f3f4ef", color: "#191d1b", display: "flex", flexDirection: "column", padding: "58px 70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 31, fontWeight: 700 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 9, background: "#191d1b", color: "#f9d84a", fontSize: 34, fontWeight: 800 }}>d</span>
        DealDock
      </div>
      <div style={{ display: "flex", marginTop: 60, fontSize: 68, lineHeight: 1.1, fontWeight: 700, letterSpacing: -2.5, maxWidth: 1000 }}>Brand deal rate calculator</div>
      <div style={{ display: "flex", marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "#59615b", maxWidth: 940 }}>Price usage rights, paid ads, exclusivity and rush fees on top of your rate.</div>
      <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#59615b" }}>
        <span>Free tool · USD and INR</span>
        <span style={{ display: "flex", padding: "6px 14px", borderRadius: 999, background: "#f9d84a", color: "#191d1b", fontWeight: 600 }}>dealdock.io</span>
      </div>
    </div>,
    size,
  );
}
