"use client";

import { createContext, useContext, type ReactNode } from "react";

type Currency = "INR" | "USD";
const CurrencyContext = createContext<Currency | null>(null);

/** The page's currency: USD on the global page, INR on /in. An application saves the price list the visitor saw. */
export function PilotCurrencyProvider({ currency, children }: { currency: Currency; children: ReactNode }) {
  return <CurrencyContext.Provider value={currency}>{children}</CurrencyContext.Provider>;
}

export function usePilotCurrency() {
  const currency = useContext(CurrencyContext);
  if (!currency) throw new Error("Pilot currency requires its provider");
  return { selection: { currency } };
}
