import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MARKETING_SITE_LIVE } from "@/lib/marketing-config";
import { marketingGtmId } from "@/lib/marketing-analytics-config.mjs";
import { MarketingAnalytics } from "@/components/design-preview/marketing-analytics";

// This public container is loaded only on the live marketing site. Tags and
// conversion destinations are configured in GTM; form fields must never be
// sent through the data layer.
const GOOGLE_TAG_MANAGER_ID = marketingGtmId(MARKETING_SITE_LIVE);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial accent — used italic for the emphasized word in display headlines.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false, // Used only by the original design archive.
});

// Default/fallback metadata — each locale route (/, /global) overrides
// title, description, openGraph, twitter, and alternates with its own values.
export const metadata: Metadata = {
  title: "DealDock — Revenue Recovery for Instagram Creators",
  description:
    "DealDock prioritizes Instagram buyer enquiries by estimated deal value, drafts replies in your voice, and records closed sales. You approve every send.",
  keywords: [
    "Instagram DM management",
    "creator revenue recovery",
    "coaching and course enquiries",
    "DM sorting by value",
    "creator commerce",
  ],
  robots: {
    index: MARKETING_SITE_LIVE,
    follow: MARKETING_SITE_LIVE,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://dealdock-design-review.vercel.app"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f4ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {GOOGLE_TAG_MANAGER_ID ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`}
          </Script>
        ) : null}
      </head>
      <body className="bg-[#050505] text-[#fafafa] antialiased">
        {GOOGLE_TAG_MANAGER_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {children}
        <MarketingAnalytics enabled={MARKETING_SITE_LIVE} />
      </body>
    </html>
  );
}
