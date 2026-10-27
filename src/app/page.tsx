import type { Metadata, Viewport } from "next";
import { MarketingDesignPreview } from "@/components/design-preview/marketing-design-preview";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MARKETING_DESCRIPTION, MARKETING_SITE_LIVE } from "@/lib/marketing-config";

export const metadata: Metadata = {
  title: "DealDock | Some DMs mean business",
  description: MARKETING_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: MARKETING_SITE_LIVE, follow: MARKETING_SITE_LIVE },
  openGraph: { title: "Some DMs mean business. Meet DealDock.", description: MARKETING_DESCRIPTION, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title: "DealDock | Some DMs mean business", description: MARKETING_DESCRIPTION },
};
export const viewport: Viewport = { themeColor: "#f3f4ef" };
export default function LandingPage() {
  return <><MarketingWebsiteStructuredData /><MarketingDesignPreview /></>;
}
