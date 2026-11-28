import type { ReactNode } from "react";
import t from "./two-tone-price-card.module.css";

export type PriceCardTone = "purple" | "blue" | "teal";

/**
 * A static two-tone price card: a tinted band with the label, and the price below on a near-white ground.
 * Informational only; it is never a button. Width follows the content, with a floor per tone.
 */
export function TwoTonePriceCard({ label, value, tone }: { label: ReactNode; value: ReactNode; tone: PriceCardTone }) {
  return (
    <span className={t.card} data-tone={tone}>
      <span className={t.label}>{label}</span>
      <b className={t.value}>{value}</b>
    </span>
  );
}
