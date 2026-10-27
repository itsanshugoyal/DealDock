"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { normalizeMarketingEvent, sanitizeAnalyticsEvent } from "@/lib/marketing-events.mjs";

export function recordMarketingEvent(name: string, properties: Record<string, unknown> = {}) {
  if (process.env.NEXT_PUBLIC_MARKETING_EVENTS_ENABLED !== "true") return;
  const event = normalizeMarketingEvent(name, properties);
  if (event) {
    try { track(event.name, event.data); } catch { /* Measurement must never block an application. */ }
  }
}

export function MarketingAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("[data-marketing-cta]");
      if (link) recordMarketingEvent("pilot_cta_clicked", { location: link.getAttribute("data-marketing-cta") });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);
  return enabled ? <Analytics beforeSend={sanitizeAnalyticsEvent} debug={false} /> : null;
}
