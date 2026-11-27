import type { Metadata, Viewport } from "next";
import { GLOBAL } from "@/components/design-preview/site-content";
import { LANDING_GLOBAL } from "@/components/landing/content";
import { LandingPage as Landing } from "@/components/landing/landing-page";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MARKETING_DESCRIPTION, MARKETING_SITE_LIVE } from "@/lib/marketing-config";

const title = "DealDock: your Instagram DMs, sorted by money";
export const metadata: Metadata = {
  title,
  description: MARKETING_DESCRIPTION,
  alternates: { canonical: "/", languages: { en: "/", "en-IN": "/in", "x-default": "/" } },
  robots: { index: MARKETING_SITE_LIVE, follow: MARKETING_SITE_LIVE },
  openGraph: { title: "Your DMs, sorted by money. Meet DealDock.", description: MARKETING_DESCRIPTION, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description: MARKETING_DESCRIPTION },
};
export const viewport: Viewport = { themeColor: "#f4f3ee" };
export default function LandingPage() {
  return <><MarketingWebsiteStructuredData /><Landing site={GLOBAL} c={LANDING_GLOBAL} /></>;
}
