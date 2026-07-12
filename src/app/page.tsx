import type { Metadata } from "next";
import { LandingPageBody } from "@/components/landing-page-body";
import { inLocale } from "@/data/locales/in";

export const metadata: Metadata = {
  title: inLocale.meta.title,
  description: inLocale.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      en: "/global",
    },
  },
  openGraph: {
    title: inLocale.meta.title,
    description: inLocale.meta.ogDescription,
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DealDock Revenue Inbox — DMs sorted by rupee value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: inLocale.meta.title,
    description: inLocale.meta.ogDescription,
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
      description: inLocale.meta.description,
      offers: inLocale.pricing.tiers.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: String(tier.price),
        priceCurrency: inLocale.currencyCode,
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

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageBody content={inLocale} />
    </>
  );
}
