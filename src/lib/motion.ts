"use client";

import type { Variants } from "motion/react";

// Premium easing — Linear-style easeOutExpo. Fast start, soft landing, zero bounce.
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Spring presets — kept for interactive elements (hover/tap), where springs feel right.
export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
};

// Scroll entrance — small offset + blur clears as it lands. Fast enough to never
// make the reader wait, subtle enough to register as polish rather than performance.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

// Container with staggered children — tight stagger keeps groups reading as one gesture.
export const staggerContainer = (staggerDelay = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

// Hero headline word-by-word stagger
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// Viewport options for scroll-triggered animations
export const viewportOnce = { once: true, margin: "-80px" };

// Scale in for cards — barely-there scale reads premium; big zooms read cheap.
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

// Bar chart bar growth
export const barGrow: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};
