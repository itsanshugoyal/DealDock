import type { Metadata } from "next";
import { MARKETING_ORIGIN } from "./marketing-config";

export function marketingPageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, MARKETING_ORIGIN).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "DealDock", locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description },
  };
}
