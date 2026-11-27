"use client";

import { useId, useRef, useState } from "react";
import { calculateQuote, contentTypes, defaultRateInput, estimateFromViews, extras, money, type Currency, type RateInput } from "@/lib/tools/rate-calculator";
import styles from "./calculator.module.css";

export function RateCalculator() {
  const id = useId();
  const [input, setInput] = useState<RateInput>(() => defaultRateInput());
  const [feesEdited, setFeesEdited] = useState(false);
  const [views, setViews] = useState({ views: "", low: "", high: "" });
  const [copyStatus, setCopyStatus] = useState("");
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const quote = calculateQuote(input);
  const estimate = estimateFromViews(views.views, views.low, views.high);
  const update = (patch: Partial<RateInput>) => { setInput(current => ({ ...current, ...patch })); setCopyStatus(""); };
  const changeCurrency = (currency: Currency) => update({ currency, ...(!feesEdited ? { fees: defaultRateInput(currency).fees } : {}) });
  async function copyReply() {
    try { await navigator.clipboard.writeText(quote.reply); setCopyStatus("Reply copied."); }
    catch { replyRef.current?.focus(); replyRef.current?.select(); setCopyStatus("Select the reply and copy it manually."); }
  }
  function reset() { setInput(defaultRateInput(input.currency)); setFeesEdited(false); setViews({ views: "", low: "", high: "" }); setCopyStatus(""); }
  return <div className={styles.calculator} id="calculator">
    <div className={styles.controls}>
      <fieldset className={styles.fieldset}><legend>Currency</legend><div className={styles.currency}>{(["INR", "USD"] as const).map(currency => <label key={currency}><input type="radio" name={`${id}-currency`} checked={input.currency === currency} onChange={() => changeCurrency(currency)} /><span>{currency === "INR" ? "₹ INR" : "$ USD"}</span></label>)}</div><p className={styles.hint}>Starting fees are examples. Switching currencies does not convert fees you have entered.</p></fieldset>
      <fieldset className={styles.fieldset}><legend>Your content</legend><p className={styles.hint}>Your usual creation and posting fee, before extras.</p>
        {contentTypes.map(item => <div className={styles.feeRow} key={item.key}>
          <label htmlFor={`${id}-${item.key}-fee`}>Fee per {item.one}<span className={styles.moneyInput}><span aria-hidden="true">{input.currency === "INR" ? "₹" : "$"}</span><input id={`${id}-${item.key}-fee`} type="number" inputMode="decimal" min="0" max="1000000000" step="1" value={input.fees[item.key]} onChange={event => { setFeesEdited(true); update({ fees: { ...input.fees, [item.key]: event.target.value } }); }} /></span></label>
          <label htmlFor={`${id}-${item.key}-qty`}>{item.key === "post" ? "Posts" : item.many}<input id={`${id}-${item.key}-qty`} type="number" inputMode="numeric" min="0" max="50" step="1" value={input.quantities[item.key]} onChange={event => update({ quantities: { ...input.quantities, [item.key]: event.target.value } })} /></label>
        </div>)}
      </fieldset>
      <details className={styles.viewsHelper}><summary>No set rate yet? Estimate from your views</summary><p className={styles.hint}>Enter a CPM (fee per 1,000 views) from your own past deals. We don’t assume one for you.</p><div className={styles.helperFields}>
        {([{ key: "views", label: "Average views per Reel" }, { key: "low", label: `CPM, low (${input.currency})` }, { key: "high", label: `CPM, high (${input.currency})` }] as const).map(field => <label key={field.key} htmlFor={`${id}-cpm-${field.key}`}>{field.label}<input id={`${id}-cpm-${field.key}`} type="number" min="0" max="1000000000" inputMode="decimal" value={views[field.key]} onChange={event => setViews(current => ({ ...current, [field.key]: event.target.value }))} /></label>)}
      </div>{estimate ? <div><p>Reel estimate: <strong>{money(estimate.low, input.currency)}–{money(estimate.high, input.currency)}</strong></p><button type="button" className={styles.secondaryButton} onClick={() => { setFeesEdited(true); update({ fees: { ...input.fees, reel: String(estimate.suggested) } }); }}>Use estimate for Reel fee</button></div> : <p className={styles.hint}>Add your views and at least one CPM to see an estimate.</p>}</details>
      <fieldset className={styles.fieldset}><legend>Extras the brand wants</legend>
        {extras.map(extra => <label className={styles.extra} htmlFor={`${id}-${extra.key}`} key={extra.key}><strong>{extra.label}</strong><span>{extra.description}</span><select id={`${id}-${extra.key}`} value={input[extra.key]} onChange={event => update({ [extra.key]: event.target.value })}>{extra.options.map(option => <option key={option.value} value={option.value}>{option.label}{option.value !== "none" ? ` (+${option.low}–${option.high}%)` : ""}</option>)}</select></label>)}
      </fieldset>
      <fieldset className={styles.fieldset}><legend>Timing and edits</legend><label className={styles.checkbox}><input type="checkbox" checked={input.rush} onChange={event => update({ rush: event.target.checked })} /><span>The brand needs it in under 7 days <small>+20–50% of base fee</small></span></label><label htmlFor={`${id}-revisions`}>Extra revision rounds <small>+10–25% each, beyond what your fee includes</small><input id={`${id}-revisions`} type="number" min="0" max="10" step="1" value={input.extraRevisions} onChange={event => update({ extraRevisions: event.target.value })} /></label></fieldset>
      <button className={styles.reset} type="button" onClick={reset}>Reset to example</button>
    </div>
    <section className={styles.result} aria-labelledby={`${id}-result-heading`}>
      <p className={styles.eyebrow} id={`${id}-result-heading`}>Suggested quote</p>
      <div aria-live="polite" aria-atomic="true"><p className={styles.amount}>{money(quote.suggested, input.currency)}</p><p className={styles.range}>{quote.ready ? `Range: ${money(quote.low, input.currency)} to ${money(quote.high, input.currency)}` : "Add a fee and quantity to see your quote."}</p></div>
      <p className={styles.hint}>A rounded midpoint to help you choose a starting quote. This is an estimate, not a market valuation.</p>
      <h2>How it adds up</h2><div className={styles.breakdown} tabIndex={0} role="region" aria-label="Quote breakdown"><table><caption className={styles.srOnly}>Content fees and extras</caption><thead><tr><th scope="col">Item</th><th scope="col">Low</th><th scope="col">High</th></tr></thead><tbody>
        {quote.parts.map(part => <tr key={part.key}><th scope="row">{part.label} × {money(part.fee, input.currency)}</th><td colSpan={2}>{money(part.amount, input.currency)}</td></tr>)}
        <tr className={styles.base}><th scope="row">Base fee</th><td colSpan={2}>{money(quote.base, input.currency)}</td></tr>
        {quote.lines.map(line => <tr key={line.label}><th scope="row">{line.label}<small>{line.lowPct}–{line.highPct}% of base</small></th><td>{money(line.low, input.currency)}</td><td>{money(line.high, input.currency)}</td></tr>)}
        <tr className={styles.total}><th scope="row">Total</th><td>{money(quote.low, input.currency)}</td><td>{money(quote.high, input.currency)}</td></tr>
      </tbody></table></div>
      <label className={styles.replyLabel} htmlFor={`${id}-reply`}>A reply you can paste into the DM</label><textarea id={`${id}-reply`} ref={replyRef} rows={6} readOnly value={quote.reply} placeholder="Your reply will appear here once you add a fee and quantity." />
      <button className={styles.primaryButton} type="button" onClick={copyReply} disabled={!quote.ready}>Copy reply</button><p role="status" className={styles.copyStatus}>{copyStatus}</p>
      <a href="#methodology">See the assumptions and sources ↓</a>
    </section>
  </div>;
}
