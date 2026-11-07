"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ADD_ONS, DELIVERABLES, EXTRA_REVISION, RUSH, calculate, feeFromViews, formatMoney, replySentence } from "@/lib/rate-calculator.mjs";
import styles from "./rate-calculator.module.css";

type Currency = "INR" | "USD";
type Amounts = Record<"reel" | "story" | "post", string>;
type Form = {
  currency: Currency;
  fees: Amounts;
  quantities: Amounts;
  organic: string;
  paid: string;
  exclusivity: string;
  rush: boolean;
  extraRevisions: string;
  feesEdited: boolean;
};

// Example starting values so the page shows a full quote before anyone types. Not benchmarks.
const EXAMPLE_FEES: Record<Currency, Amounts> = {
  INR: { reel: "20000", story: "5000", post: "12000" },
  USD: { reel: "1000", story: "250", post: "600" },
};
const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$" };
const COUNT_LABEL: Record<keyof Amounts, string> = { reel: "Reels", story: "Story frames", post: "Posts" };
const ADD_ON_HINT: Record<string, string> = {
  organic: "The brand reposts your content on its own accounts, website or emails without paying to promote it.",
  paid: "The brand pays to run your content as an ad, from its own account or from your handle, as with Meta’s partnership ads.",
  exclusivity: "You agree not to work with the brand’s competitors in one category for a set time.",
};

const percent = (low: number, high: number) => (low === high ? `${low}%` : `${low}–${high}%`);

export function RateCalculator() {
  const id = useId();
  const [form, setForm] = useState<Form>({
    currency: "INR",
    fees: EXAMPLE_FEES.INR,
    quantities: { reel: "1", story: "2", post: "0" },
    organic: "30",
    paid: "30",
    exclusivity: "none",
    rush: false,
    extraRevisions: "0",
    feesEdited: false,
  });
  const [dirty, setDirty] = useState(false);
  const [views, setViews] = useState({ views: "", low: "", high: "" });
  const [copied, setCopied] = useState<{ text: string; ok: boolean } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const replyRef = useRef<HTMLParagraphElement>(null);

  const update = (patch: Partial<Form>) => {
    setForm((current) => ({ ...current, ...patch }));
    setDirty(true);
  };
  const money = (amount: number) => formatMoney(amount, form.currency);
  const result = calculate(form);
  const reply = replySentence(form, result);
  const estimate = feeFromViews(views.views, views.low, views.high);
  const summary = result.ready
    ? `Suggested quote ${money(result.suggested)}. Range ${money(result.low)} to ${money(result.high)}.`
    : "Add a fee for at least one piece of content to see your quote.";

  // Announce once typing pauses, not on every keystroke or on page load.
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => setAnnouncement(summary), 700);
    return () => clearTimeout(timer);
  }, [dirty, summary]);

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied({ text: reply, ok: true });
    } catch {
      // Clipboard access can be blocked; select the text so copying by hand is one step.
      const selection = window.getSelection();
      if (replyRef.current && selection) {
        const range = document.createRange();
        range.selectNodeContents(replyRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopied({ text: reply, ok: false });
    }
  }

  const moneyInput = (value: string, onChange: (value: string) => void) => (
    <span className={styles.money}>
      <span aria-hidden="true">{SYMBOL[form.currency]}</span>
      <input type="text" inputMode="decimal" autoComplete="off" spellCheck={false} value={value} onChange={(event) => onChange(event.target.value)} />
    </span>
  );

  return (
    <div className={styles.calculator}>
      <div className={styles.inputs}>
        <fieldset className={styles.section} aria-describedby={`${id}-currency-hint`}>
          <legend className={styles.legend}>Currency</legend>
          <p id={`${id}-currency-hint`} className={styles.hint}>Switching doesn’t convert your numbers, so enter fees in the currency you’ll quote in.</p>
          <div className={styles.chips}>
            {(["INR", "USD"] as const).map((currency) => (
              <label key={currency} className={styles.chip}>
                <input type="radio" name={`${id}-currency`} value={currency} checked={form.currency === currency}
                  onChange={() => update(form.feesEdited ? { currency } : { currency, fees: EXAMPLE_FEES[currency] })} />
                <span>{SYMBOL[currency]} {currency}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.section} aria-describedby={`${id}-content-hint`}>
          <legend className={styles.legend}>Your content</legend>
          <p id={`${id}-content-hint`} className={styles.hint}>Your usual fee for making and posting each piece, before any extras. The starting numbers are only an example.</p>
          {DELIVERABLES.map(({ key, one }) => (
            <div key={key} className={styles.row}>
              <label className={styles.field}>
                <span>Fee per {one}</span>
                {moneyInput(form.fees[key], (value) => update({ fees: { ...form.fees, [key]: value }, feesEdited: true }))}
              </label>
              <label className={styles.field}>
                <span>{COUNT_LABEL[key]}</span>
                <input type="number" inputMode="numeric" min={0} max={50} step={1} value={form.quantities[key]}
                  onChange={(event) => update({ quantities: { ...form.quantities, [key]: event.target.value } })} />
              </label>
            </div>
          ))}
          <details className={styles.helper}>
            <summary>No set rate yet? Estimate a Reel fee from your views</summary>
            <div className={styles.helperBody}>
              <p className={styles.hint}>CPM is the fee per 1,000 views. The range is your own assumption, so we don’t fill one in. To work out yours, divide a fee you’ve been paid by that Reel’s views and multiply by 1,000.</p>
              <div className={styles.helperFields}>
                <label className={styles.field}>
                  <span>Average views per Reel</span>
                  <input type="text" inputMode="numeric" autoComplete="off" value={views.views} onChange={(event) => setViews({ ...views, views: event.target.value })} />
                </label>
                <label className={styles.field}>
                  <span>CPM, low</span>
                  {moneyInput(views.low, (low) => setViews({ ...views, low }))}
                </label>
                <label className={styles.field}>
                  <span>CPM, high</span>
                  {moneyInput(views.high, (high) => setViews({ ...views, high }))}
                </label>
              </div>
              {estimate ? (
                <div className={styles.helperResult}>
                  <p>At those numbers a Reel works out at {money(estimate.low)} to {money(estimate.high)}.</p>
                  <button type="button" className={styles.secondaryButton}
                    onClick={() => update({ fees: { ...form.fees, reel: String(estimate.suggested) }, feesEdited: true })}>
                    Use {money(estimate.suggested)} as my Reel fee
                  </button>
                </div>
              ) : (
                <p className={styles.hint}>Add your views and at least one CPM to see an estimate.</p>
              )}
            </div>
          </details>
        </fieldset>

        <p className={styles.extrasIntro}><strong>Extras the brand wants.</strong> Each choice adds the percentage of your base fee shown with it.</p>
        {ADD_ONS.map((group) => (
          <fieldset key={group.key} className={styles.section} aria-describedby={`${id}-${group.key}-hint`}>
            <legend className={styles.legend}>{group.label}</legend>
            <p id={`${id}-${group.key}-hint`} className={styles.hint}>{ADD_ON_HINT[group.key]}</p>
            <div className={styles.chips}>
              {group.options.map((option) => (
                <label key={option.value} className={styles.chip}>
                  <input type="radio" name={`${id}-${group.key}`} value={option.value} checked={form[group.key] === option.value}
                    onChange={() => update({ [group.key]: option.value } as Partial<Form>)} />
                  <span>{option.label}{option.high > 0 && <small>+{percent(option.low, option.high)}</small>}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <fieldset className={styles.section}>
          <legend className={styles.legend}>Timing and edits</legend>
          <label className={styles.check}>
            <input type="checkbox" checked={form.rush} onChange={(event) => update({ rush: event.target.checked })} />
            <span>The brand needs it in under 7 days <small>+{percent(RUSH.low, RUSH.high)}</small></span>
          </label>
          <label className={`${styles.field} ${styles.revisions}`}>
            <span>Extra revision rounds, beyond what your fee includes <small>+{percent(EXTRA_REVISION.low, EXTRA_REVISION.high)} each</small></span>
            <input type="number" inputMode="numeric" min={0} max={10} step={1} value={form.extraRevisions}
              onChange={(event) => update({ extraRevisions: event.target.value })} />
          </label>
        </fieldset>
      </div>

      <section className={styles.results} aria-labelledby={`${id}-results`}>
        <div className={styles.resultsInner}>
          <h2 id={`${id}-results`} className={styles.resultsTitle}>Suggested quote</h2>
          {result.ready ? (
            <>
              <p className={styles.quote}><span>{money(result.suggested)}</span></p>
              <p className={styles.range}>Range: {money(result.low)} to {money(result.high)}</p>
              <p className={styles.note}>The middle of the range, rounded. Go higher for broad usage or a crowded category, lower for light terms.</p>
              <table className={styles.breakdown}>
                <caption>How it adds up</caption>
                <thead>
                  <tr><th scope="col">Item</th><th scope="col">Low</th><th scope="col">High</th></tr>
                </thead>
                <tbody>
                  {result.parts.map((part) => (
                    <tr key={part.key}><th scope="row">{part.label} × {money(part.fee)}</th><td colSpan={2}>{money(part.amount)}</td></tr>
                  ))}
                  {result.lines.length > 0 && (
                    <tr className={styles.subtotal}><th scope="row">Base fee</th><td colSpan={2}>{money(result.base)}</td></tr>
                  )}
                  {result.lines.map((line) => (
                    <tr key={line.key}>
                      <th scope="row">{line.label}<span className={styles.share}>{percent(line.lowPct, line.highPct)} of base fee</span></th>
                      <td>{money(line.low)}</td>
                      <td>{money(line.high)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr><th scope="row">Total</th><td>{money(result.low)}</td><td>{money(result.high)}</td></tr>
                </tfoot>
              </table>
              <div className={styles.reply}>
                <p className={styles.replyLabel}>A reply you can paste into the DM</p>
                <p ref={replyRef} className={styles.replyText}>{reply}</p>
                <button type="button" className={styles.copyButton} onClick={copyReply}>Copy reply</button>
                <p className={styles.status} role="status">
                  {copied?.text === reply && (copied.ok
                    ? "Copied. Change the wording so it sounds like you, then send."
                    : "Your browser blocked copying. The reply is selected, so copy it from there.")}
                </p>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Add a fee and a number for at least one piece of content to see your quote.</p>
          )}
          <p className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">{announcement}</p>
        </div>
      </section>
    </div>
  );
}
