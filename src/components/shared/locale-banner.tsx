"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/locale-context";

const DISMISS_KEY = "dealdock-locale-banner-dismissed";

export function LocaleBanner() {
  const { id, label, currencySymbol } = useLocale();
  const [suggestedOther, setSuggestedOther] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.country_code) return;
        const isIndia = data.country_code === "IN";
        // Show banner suggesting the OTHER locale than what's currently displayed
        if (id === "in" && !isIndia) setSuggestedOther(true);
        if (id === "global" && isIndia) setSuggestedOther(true);
      })
      .catch(() => {
        /* fail silently — geo lookup is a nice-to-have, not required */
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const dismiss = () => {
    setSuggestedOther(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const otherLabel = id === "in" ? "Global" : "India";
  const otherFlag = id === "in" ? "🌍" : "🇮🇳";
  const otherPath = id === "in" ? "/global" : "/";
  const otherSymbol = id === "in" ? "$" : "₹";

  return (
    <AnimatePresence>
      {suggestedOther && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="glass-pill rounded-2xl px-4 py-3 flex items-center gap-3 bg-[#111111]/95 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <span className="text-lg flex-shrink-0">{otherFlag}</span>
            <p className="text-[12px] text-[#a3a3a3] flex-1 leading-snug">
              Viewing {label} pricing ({currencySymbol}) — see{" "}
              <a href={otherPath} className="text-[#ffc107] font-semibold hover:text-[#e5a800]">
                {otherLabel} pricing ({otherSymbol}) →
              </a>
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-[#525252] hover:text-[#a3a3a3] transition-colors flex-shrink-0"
            >
              <X size={14} weight="bold" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
