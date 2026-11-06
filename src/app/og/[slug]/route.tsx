import { ImageResponse } from "next/og";
import { blogPost, blogPosts } from "@/lib/blog-posts";

// Share card for each blog post, generated at build time (1200x630 PNG).
export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = blogPost((await params).slug);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#f3f4ef", color: "#191d1b", display: "flex", flexDirection: "column", padding: "58px 70px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 31, fontWeight: 700 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 9, background: "#191d1b", color: "#f9d84a", fontSize: 34, fontWeight: 800 }}>d</span>
        DealDock
      </div>
      <div style={{ display: "flex", marginTop: 60, fontSize: post.title.length > 70 ? 58 : 68, lineHeight: 1.1, fontWeight: 700, letterSpacing: -2.5, maxWidth: 1000 }}>{post.title}</div>
      <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#59615b" }}>
        <span>{post.topic}</span>
        <span style={{ display: "flex", padding: "6px 14px", borderRadius: 999, background: "#f9d84a", color: "#191d1b", fontWeight: 600 }}>dealdock.io/blog</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
