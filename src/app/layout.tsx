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

// Default/fallback metadata — each locale route (/, /global) overrides
// title, description, openGraph, twitter, and alternates with its own values.
export const metadata: Metadata = {
  title: "DealDock — Revenue Recovery for Instagram Creators",
  description:
    "DealDock finds high-value brand deals, coaching leads, and course inquiries buried in your Instagram DMs. Sorted by value. Replied in your voice.",
  keywords: [
    "Instagram DM management",
    "creator revenue recovery",
    "brand deal inbox",
    "DM sorting by value",
    "creator commerce",
  ],
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
      <body className="bg-[#050505] text-[#fafafa] antialiased">
        {children}
      </body>
    </html>
  );
}
