"use client";

import { createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";
import { CURRENCY_PREFERENCE_KEY, exampleValue, loadCurrencySuggestion, mergeCurrencySuggestion, soloPriceLabel } from "@/lib/marketing-pricing.mjs";
import { recordMarketingEvent } from "./marketing-analytics";
import styles from "./preview.module.css";

type Currency = "INR" | "USD";
type Selection = { currency: Currency | null; source: "unknown" | "location" | "choice" };
const CurrencyContext = createContext<{ selection: Selection; choose: (currency: Currency) => void } | null>(null);

export function PilotCurrencyProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ currency: null, source: "unknown" });
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 2500);
    loadCurrencySuggestion({ readPreference: () => localStorage.getItem(CURRENCY_PREFERENCE_KEY), signal: controller.signal })
      .then(suggestion => { if (active) setSelection(current => mergeCurrencySuggestion(current, suggestion)); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);

  function choose(currency: Currency) {
    setSelection({ currency, source: "choice" });
    try { localStorage.setItem(CURRENCY_PREFERENCE_KEY, currency); } catch { /* The choice still works for this visit. */ }
    recordMarketingEvent("currency_selected", { currency });
  }
  return <CurrencyContext.Provider value={{ selection, choose }}>{children}</CurrencyContext.Provider>;
}

export function usePilotCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("Pilot currency requires its provider");
  return context;
}

export function CurrencySelector() {
  const { selection, choose } = usePilotCurrency();
  const id = useId();
  return <fieldset className={styles.currencySelector} aria-describedby={id + "-help"}>
    <legend>Show pricing in</legend>
    <div className={styles.currencyOptions}>
      {(["INR", "USD"] as const).map(currency => <label key={currency}>
        <input type="radio" name={id + "-currency"} value={currency} checked={selection.currency === currency} onChange={() => choose(currency)} />
        <span>{currency === "INR" ? "INR · ₹" : "USD · $"}</span>
      </label>)}
    </div>
    <p id={id + "-help"} className={styles.currencyHint} role="status">
      {selection.source === "location" ? "Suggested from your location. You can change it." : selection.source === "choice" ? "Your choice is saved on this browser when available." : "Both prices are shown. Choose the currency you prefer."}
    </p>
  </fieldset>;
}

export function SoloPrice({ card = false }: { card?: boolean }) {
  const { selection } = usePilotCurrency();
  if (!card) return <span>{soloPriceLabel(selection.currency)}/month</span>;
  return <div className={styles.priceDisplay} aria-live="polite" aria-atomic="true">
    <div className={styles.price}>{soloPriceLabel(selection.currency || "INR")}<span>/ month</span></div>
    <p className={styles.priceAlternative}>{!selection.currency ? "International: USD $49 / month" : selection.currency === "USD" ? "Selected international validation pilots" : "India pilot offer"}</p>
  </div>;
}

export function ExampleMoney({ kind }: { kind: "course" | "coaching" | "cohort" | "recorded" }) {
  const { selection } = usePilotCurrency();
  return <>{exampleValue(kind, selection.currency)}</>;
}

export function PricingAnswer() {
  const { selection } = usePilotCurrency();
  return <>{soloPriceLabel(selection.currency)} per month for one creator and one Instagram account. No setup fee or annual commitment. The first invoice comes after one full week of active use. We confirm what it covers, billing currency and applicable taxes before onboarding. You can cancel anytime; pilot pricing is retained while you remain subscribed. Applying starts no subscription.</>;
}
