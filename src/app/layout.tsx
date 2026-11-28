import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MARKETING_SITE_LIVE } from "@/lib/marketing-config";
import { marketingGtmId } from "@/lib/marketing-analytics-config.mjs";
import { MarketingAnalytics } from "@/components/site/marketing-analytics";

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
  preload: true, // Section labels on every page.
});

// Hindi examples only: unicode-range means it downloads when Devanagari is on screen.
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
});

// The display serif for every headline.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Default/fallback metadata: each page overrides
// title, description, openGraph, twitter, and alternates with its own values.
export const metadata: Metadata = {
  title: "DealDock: your Instagram DMs, sorted by money",
  description:
    "DealDock sorts your Instagram DMs by what they're worth, drafts each reply in your voice, and tracks deals until you're paid. Nothing sends until you approve.",
  keywords: [
    "Instagram DM inbox for creators",
    "brand deal inbox",
    "creator payment reminders",
    "coaching leads Instagram",
    "talent manager tools India",
  ],
  robots: {
    index: MARKETING_SITE_LIVE,
    follow: MARKETING_SITE_LIVE,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://dealdock.io"),
  openGraph: { type: "website", siteName: "DealDock", title: "Your DMs, sorted by money. Meet DealDock.", description: "Prioritize Instagram buyer enquiries, draft replies in your voice and approve every send." },
  twitter: { card: "summary_large_image", title: "Your DMs, sorted by money. Meet DealDock.", description: "Prioritize Instagram buyer enquiries, draft replies in your voice and approve every send." },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF8F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${devanagari.variable}`}
    >
      <head>
        {GOOGLE_TAG_MANAGER_ID ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`}
          </Script>
        ) : null}
      </head>
      <body>
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
