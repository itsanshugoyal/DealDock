"use client";

import { useEffect, useRef, useState } from "react";

/** Rupees in the app's compact form (₹98K, ₹3.4L, ₹1.2Cr); dollars in full ($11,840). */
export function formatAmount(amount: number, currency: "USD" | "INR") {
  if (currency === "USD") return "$" + Math.round(amount).toLocaleString("en-US");
  const trim = (value: number) => String(Math.round(value * 10) / 10);
  if (amount >= 1e7) return "₹" + trim(amount / 1e7) + "Cr";
  if (amount >= 1e5) return "₹" + trim(amount / 1e5) + "L";
  if (amount >= 1e3) return "₹" + Math.round(amount / 1e3) + "K";
  return "₹" + Math.round(amount);
}

/** Renders the final value on the server; counts up once when scrolled into view, unless motion is reduced. */
export function CountUp({ value, currency }: { value: number; currency: "USD" | "INR" }) {
  const [shown, setShown] = useState(value);
  const node = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = node.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < innerHeight) return; // Already on screen: never flash a reset.
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        setShown(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={node}>{formatAmount(shown, currency)}</span>;
}
