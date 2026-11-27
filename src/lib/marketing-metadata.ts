import type { Metadata } from "next";
import { MARKETING_ORIGIN } from "./marketing-config";

export const MARKETING_SHARE_IMAGE = {
  url: `${MARKETING_ORIGIN}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "DealDock: Some DMs mean business. You approve every send.",
};

export function marketingPageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, MARKETING_ORIGIN).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "DealDock", locale: "en_GB", images: [MARKETING_SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [MARKETING_SHARE_IMAGE] },
  };
}
