import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealDock — Pipeline Dashboard",
  description: "Track and control the DealDock lead acquisition pipeline",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-50 glass-pill border-b border-white/[0.06]">
        <div className="section-container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <h1 className="font-semibold text-sm tracking-tight text-white">
              DealDock Pipeline
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-xs text-gold-400 hover:text-gold-300 transition-colors font-medium"
            >
              Overview
            </a>
            <a
              href="/dashboard/setup"
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              Setup
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a
              href="http://localhost:5678"
              target="_blank"
              rel="noopener"
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              n8n ↗
            </a>
            <a
              href="https://airtable.com/appd6MifJsQc0hBXo"
              target="_blank"
              rel="noopener"
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              Airtable ↗
            </a>
            <a
              href="/"
              className="text-xs text-gray-300 hover:text-white transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </header>
      <main className="section-container py-6">{children}</main>
    </div>
  );
}
