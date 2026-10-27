import type { Metadata, Viewport } from "next";
import { MarketingDesignPreview } from "@/components/design-preview/marketing-design-preview";

export const metadata: Metadata = {
  title: "DealDock | Some DMs mean business",
  description: "Find valuable Instagram enquiries, draft in your voice, and approve every send. A design-partner pilot for coaches, course creators and cohort hosts.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Some DMs mean business. Meet DealDock.",
    description: "Your Instagram. Your business. Your approval, every time. Explore the design-partner pilot.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f3f4ef" };

export default function DesignPreviewPage() {
  return <MarketingDesignPreview />;
}
