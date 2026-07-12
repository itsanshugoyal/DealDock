import type { Metadata } from "next";
import { LandingPageBody } from "@/components/landing-page-body";
import { globalLocale } from "@/data/locales/global";

export const metadata: Metadata = {
  title: globalLocale.meta.title,
  description: globalLocale.meta.description,
  alternates: {
    canonical: "/global",
    languages: {
      en: "/global",
      "en-IN": "/",
    },
  },
  openGraph: {
    title: globalLocale.meta.title,
    description: globalLocale.meta.ogDescription,
    type: "website",
    url: "/global",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DealDock Revenue Inbox — DMs sorted by deal value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: globalLocale.meta.title,
    description: globalLocale.meta.ogDescription,
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "DealDock",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: globalLocale.meta.description,
      offers: globalLocale.pricing.tiers.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: String(tier.price),
        priceCurrency: globalLocale.currencyCode,
        description: tier.for,
      })),
    },
    {
      "@type": "Organization",
      name: "DealDock",
      url: "https://dealdock.in",
    },
  ],
};

export default function GlobalLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageBody content={globalLocale} />
    </>
  );
}
