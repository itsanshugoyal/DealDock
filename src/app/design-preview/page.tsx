import type { Metadata, Viewport } from "next";
import { MarketingDesignPreview } from "@/components/design-preview/marketing-design-preview";

// Kept so earlier review links still open; the homepage is canonical.
export const metadata: Metadata = {
  title: "DealDock design preview",
  description: "Review copy of the DealDock homepage.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f4f3ee" };

export default function DesignPreviewPage() {
  return <MarketingDesignPreview />;
}
