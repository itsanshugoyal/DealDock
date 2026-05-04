import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "DealDock — Revenue Recovery for Instagram Creators",
  description:
    "DealDock finds high-value brand deals, coaching leads, and course inquiries buried in your Instagram DMs. Sorted by rupee value. Replied in your voice. Average pilot creator recovers ₹2.4L in month one.",
  keywords: [
    "Instagram DM management",
    "creator revenue recovery",
    "brand deal inbox",
    "Instagram creator tools India",
    "DM sorting by value",
    "Hinglish AI",
    "creator commerce",
  ],
  openGraph: {
    title: "DealDock — Revenue Recovery for Instagram Creators",
    description:
      "Stop losing lakhs in your DMs. DealDock classifies, sorts, and drafts replies for every brand deal and coaching lead in your inbox.",
    type: "website",
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
    title: "DealDock — Revenue Recovery for Instagram Creators",
    description:
      "Stop losing lakhs in your DMs. DealDock classifies, sorts, and drafts replies for every brand deal and coaching lead in your inbox.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://dealdock.in"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "DealDock",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Revenue recovery system for Indian Instagram creators. Classifies DMs by rupee value, drafts replies in creator voice, tracks recovered revenue.",
      offers: [
        {
          "@type": "Offer",
          name: "Solo",
          price: "4000",
          priceCurrency: "INR",
          description: "1 Instagram account, 1 seat",
        },
        {
          "@type": "Offer",
          name: "Studio",
          price: "8000",
          priceCurrency: "INR",
          description: "1 Instagram account, 2 seats (creator + assistant)",
        },
        {
          "@type": "Offer",
          name: "Roster",
          price: "15000",
          priceCurrency: "INR",
          description: "Up to 5 Instagram accounts, multiple manager seats",
        },
      ],
    },
    {
      "@type": "Organization",
      name: "DealDock",
      url: "https://dealdock.in",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-[#fafafa] antialiased">
        {children}
      </body>
    </html>
  );
}
