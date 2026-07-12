"use client";

import { createContext, useContext } from "react";
import type { LocaleContent } from "@/data/locales/types";

const LocaleContext = createContext<LocaleContent | null>(null);

export function LocaleProvider({
  content,
  children,
}: {
  content: LocaleContent;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={content}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContent {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

/** Shared RupeeCounter props derived from the active locale's money format. */
export function useMoneyFormat() {
  const { currencySymbol, moneyFormat } = useLocale();
  return moneyFormat === "lakh"
    ? { prefix: currencySymbol, decimals: 1, format: "decimal" as const }
    : { prefix: currencySymbol, decimals: 0, format: "comma" as const };
}
