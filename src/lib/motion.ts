"use client";

import type { Variants } from "motion/react";

// Spring presets
export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
};

// Scroll-triggered section entrance
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.smooth,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.smooth,
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.smooth,
  },
};

// Container with staggered children
export const staggerContainer = (staggerDelay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

// Hero headline word-by-word stagger
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...springs.smooth, duration: 0.5 },
  },
};

// Viewport options for scroll-triggered animations
export const viewportOnce = { once: true, margin: "-80px" };

// Scale in for cards
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.smooth,
  },
};

// Bar chart bar growth
export const barGrow: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: springs.gentle,
  },
};
