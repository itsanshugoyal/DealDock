import { ImageResponse } from "next/og";

export const alt = "DealDock: Some DMs mean business. You approve every send. Always.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#f3f4ef", color: "#191d1b", display: "flex", flexDirection: "column", padding: "58px 70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 31, fontWeight: 700 }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 8, color: "#f9d84a", background: "#191d1b" }}>d</span>DealDock</div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 68, fontSize: 92, lineHeight: 1.06, fontWeight: 700, letterSpacing: -5 }}><span>Some DMs</span><span style={{ background: "#f9d84a", padding: "0 12px 12px", alignSelf: "flex-start", marginLeft: -12 }}>mean business.</span></div>
      <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", fontSize: 22 }}><span>You approve every send. Always.</span><span>Design-partner pilot</span></div>
    </div>, size,
  );
}
