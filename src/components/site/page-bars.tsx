"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { loadCurrencySuggestion } from "@/lib/marketing-pricing.mjs";
import styles from "./site.module.css";

/** Phones only: an Apply bar once the hero is out of view, hidden again while the form is on screen. */
export function StickyApply({ offer }: { offer: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const apply = document.getElementById("apply");
    if (!hero || !apply) return;
    const seen = { hero: true, apply: false };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) seen[entry.target.id as "hero" | "apply"] = entry.isIntersecting;
      setVisible(!seen.hero && !seen.apply);
    });
    observer.observe(hero);
    observer.observe(apply);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.stickyApply} data-visible={visible} aria-hidden={!visible}>
      <a href="#apply" data-marketing-cta="sticky_bar" tabIndex={visible ? 0 : -1}>Apply for the pilot<span>{offer}</span><ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
    </div>
  );
}

/** On the global page, visitors whose connection suggests India get a link to the rupee page. No redirect. */
export function IndiaBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    loadCurrencySuggestion({ signal: controller.signal })
      .then(currency => setShow(currency === "INR"))
      .finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);
  if (!show) return null;
  return <p className={styles.indiaBar}>In India? <a href="/in">See DealDock in rupees, with Hinglish examples</a></p>;
}
