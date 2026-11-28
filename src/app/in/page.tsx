import type { Metadata, Viewport } from "next";
import { INDIA } from "@/components/site/site-content";
import { LANDING_IN } from "@/components/landing/content";
import { LandingPage } from "@/components/landing/landing-page";
import { MarketingWebsiteStructuredData } from "@/components/marketing/structured-data";
import { MARKETING_SITE_LIVE } from "@/lib/marketing-config";
import { MARKETING_SHARE_IMAGE } from "@/lib/marketing-metadata";

const title = "DealDock India: your Instagram DMs, sorted by money";
const description = "DealDock finds the brand deals and paying clients in your Instagram DMs and Gmail, estimates what each is worth in rupees, drafts replies in your voice, English or Hinglish, and tracks deals until you're paid. Nothing sends until you approve.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/in", languages: { en: "/", "en-IN": "/in", "x-default": "/" } },
  robots: { index: MARKETING_SITE_LIVE, follow: MARKETING_SITE_LIVE },
  openGraph: { title: "Your DMs, sorted by money. Meet DealDock.", description, type: "website", url: "/in", locale: "en_IN", siteName: "DealDock", images: [MARKETING_SHARE_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [MARKETING_SHARE_IMAGE] },
};
export const viewport: Viewport = { themeColor: "#FBF8F2" };

/** India: the same landing page as the global one, with rupee prices and content written for Indian creators. */
export default function IndiaLandingPage() {
  return <><MarketingWebsiteStructuredData /><LandingPage site={INDIA} c={LANDING_IN} /></>;
}
