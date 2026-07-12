"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  stagger?: boolean;
};

export function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
  stagger = false,
}: SectionWrapperProps) {
  const containerVariants = stagger ? staggerContainer() : fadeUp;

  return (
    <motion.section
      id={id}
      className={cn("py-24 lg:py-36", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className={cn("section-container", innerClassName)}>{children}</div>
    </motion.section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-14 lg:mb-20",
        centered && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="text-eyebrow mb-4">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className="text-h1">
        {headline}
      </motion.h2>
      {subhead && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-5 text-body-lg text-[#a3a3a3] max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {subhead}
        </motion.p>
      )}
    </div>
  );
}
