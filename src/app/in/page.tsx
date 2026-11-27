import type { Metadata, Viewport } from "next";
import { MarketingDesignPreview } from "@/components/design-preview/marketing-design-preview";
import { INDIA } from "@/components/design-preview/site-content";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MARKETING_SITE_LIVE } from "@/lib/marketing-config";

const title = "DealDock India: your Instagram DMs, sorted by money";
const description = "DealDock sorts your Instagram DMs and brand emails by what they're worth in rupees, drafts replies in your voice, Hinglish included, and tracks deals until you're paid. Nothing sends until you approve.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/in", languages: { en: "/", "en-IN": "/in", "x-default": "/" } },
  robots: { index: MARKETING_SITE_LIVE, follow: MARKETING_SITE_LIVE },
  openGraph: { title: "Your DMs, sorted by money. Meet DealDock.", description, type: "website", url: "/in", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = { themeColor: "#f4f3ee" };
export default function IndiaLandingPage() {
  return <><MarketingWebsiteStructuredData /><MarketingDesignPreview content={INDIA} /></>;
}
