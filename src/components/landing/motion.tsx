"use client";

import { useEffect } from "react";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll reveals for anything marked data-reveal inside the landing page. Content stays visible without
 * JavaScript or with reduced motion: hiding only starts once this has marked the page as ready.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-landing]");
    if (!root || reduced()) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    // Anything already on screen shows at once, so the first view never flickers.
    for (const el of items) if (el.getBoundingClientRect().top < innerHeight * 0.92) el.setAttribute("data-shown", "");
    root.setAttribute("data-reveal-ready", "");
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        io.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    items.filter(el => !el.hasAttribute("data-shown")).forEach(el => io.observe(el));
    // a soft light follows the pointer over anything marked data-spot (the plan cards, the closing line)
    const spot = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", spot, { passive: true });
    return () => { io.disconnect(); root.removeEventListener("pointermove", spot); };
  }, []);
  return null;
}
