"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type RupeeCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
  style?: React.CSSProperties;
  /** "decimal" (default) = prefix + N.NN + suffix. "comma" = prefix + comma-grouped whole number + suffix (e.g. $3,200). */
  format?: "decimal" | "comma";
};

export function RupeeCounter({
  value,
  suffix = "",
  prefix = "₹",
  decimals = 0,
  className,
  duration = 1.5,
  style,
  format = "decimal",
}: RupeeCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          const formatted =
            format === "comma"
              ? Math.round(latest).toLocaleString("en-US")
              : latest.toFixed(decimals);
          ref.current.textContent = prefix + formatted + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, prefix, suffix, motionValue, format]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
