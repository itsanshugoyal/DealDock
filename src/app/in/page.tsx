import type { Metadata, Viewport } from "next";
import { INDIA } from "@/components/site/site-content";
import { LANDING_IN } from "@/components/landing/content";
import { LandingPage } from "@/components/landing/landing-page";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MARKETING_SITE_LIVE } from "@/lib/marketing-config";

const title = "DealDock India: your Instagram DMs, sorted by money";
const description = "DealDock finds brand deals and paying clients in your Instagram DMs and Gmail, values them in rupees and drafts replies in English or Hinglish. You approve every send.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/in", languages: { en: "/", "en-IN": "/in", "x-default": "/" } },
  robots: { index: MARKETING_SITE_LIVE, follow: MARKETING_SITE_LIVE },
  openGraph: { title: "Your DMs, sorted by money. Meet DealDock.", description, type: "website", url: "/in", locale: "en_IN", siteName: "DealDock" },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = { themeColor: "#FBF8F2" };

/** India: the same landing page as the global one, with rupee prices and content written for Indian creators. */
export default function IndiaLandingPage() {
  return <><MarketingWebsiteStructuredData /><LandingPage site={INDIA} c={LANDING_IN} /></>;
}
