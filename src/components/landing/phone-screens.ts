// Static markup for the five story phone screens (styles in phone-screens.module.css), filled from a Story.
// shortcut: hand-authored HTML rendered with dangerouslySetInnerHTML; port to JSX if the screens need live data.
// Example content: the creator, brands, messages and amounts are made up.
// Screens 2-5 are the creator's own Instagram thread with the brand; Docky adds cards only she can see.
// Look and motion follow Lindy's phones: a status chip works through its stages with a spinner and flips to its
// result, card rows tick one by one, the draft types out, money counts up (data-count / data-from, run by
// story-phone.tsx). Times are seconds after the screen becomes active.

import type { Story } from "./content";

const SB = (time: string) => `<span class="island"></span><div class="sb"><span>${time}</span><svg viewBox="0 0 54 12" width="54"><use href="#pp-sig"/></svg></div>`;
const ICON = (id: string, size = 15) => `<svg width="${size}" height="${size}"><use href="#pp-${id}"/></svg>`;
const SPIN = `<i class="spin"></i>`;
const DOCKY = `<span class="dky"><img src="/docky/docky.webp" alt=""></span>`;

/** Working stages, each shown with a spinner from its start time until the next one starts (or `end`). */
const WORK = (stages: [string, number][], end: number) => stages.map(([text, t], i) =>
  `<span class="w" style="--w0:${t}s;--len:${+((stages[i + 1]?.[1] ?? end) - t).toFixed(2)}s">${SPIN}${text}</span>`).join("");
/** The thread's top bar with its status chip: works through `stages`, then flips to `done` at `end`. */
const BAR = (stages: [string, number][], done: string, end: number, tone: "ok" | "wait" = "ok") =>
  `<div class="bar"><b>${ICON("ig", 16)}Inbox</b><p class="chip" style="--a:${stages[0][1]}s;--b:${end}s">${WORK(stages, end)}<span class="d ${tone}">${tone === "ok" ? ICON("okfill", 13) : `<i class="dot"></i>`}${done}</span></p></div>`;
/** A message in the thread arriving at `t`: avatar, name, meta, then the body HTML. */
const MSG = (av: string, who: string, meta: string, body: string, t: number, cls = "") =>
  `<div class="msg ${cls}" style="--t:${t}s">${av}<div class="bd"><p class="who">${who}<small>${meta}</small></p>${body}</div></div>`;
/** Docky's private card in the thread, arriving at `t` as his message and opening at `g`. */
const CARD = (title: string, body: string, t: number, g: number) =>
  MSG(DOCKY, "Docky", `${ICON("lock", 9)}Only you can see this`, `<div class="ddc" style="--g:${g}s"><div class="ddh"><b>${title}</b></div>${body}</div>`, t, "dd");
/** A card row: appears at `t` with a spinner and ticks `k` seconds later. */
const ROW = (icon: string, label: string, value: string, t: number, cls = "", k = 0.35) =>
  `<div class="row ${cls}" style="--t:${t}s;--k:${k}s"><span class="tk">${SPIN}${ICON(icon, 14)}</span><span>${label}</span><b>${value}</b></div>`;
/** Text DealDock writes, revealed one character at a time from `start`. */
const TYPE = (text: string, start: number) =>
  `<span class="tw" style="--s:${start}s">${[...text].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join("")}</span>`;
/** A lock-screen notification from another app, already there at `t`; `stacked` adds the iOS stack peeking behind it. */
const NOISE = (app: string, from: string, text: string, ago: string, t: number, stacked = false) =>
  `<div class="nfGroup${stacked ? " stacked" : ""}" style="--t:${t}s"><div class="nf q"><span class="nfApp">${ICON(app, 32)}</span><div class="nfBody"><div class="nfTop"><h5>${from}</h5><span>${ago}</span></div><p>${text}</p></div></div></div>`;

export const PHONE_SYMBOLS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="pp-o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFA04A"/><stop offset=".55" stop-color="#FF6A00"/><stop offset="1" stop-color="#EE5600"/></linearGradient>
<linearGradient id="pp-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1E2"/><stop offset="1" stop-color="#F6C9A2"/></linearGradient>
<linearGradient id="pp-igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEC053"/><stop offset=".35" stop-color="#F2203E"/><stop offset=".7" stop-color="#B729A8"/><stop offset="1" stop-color="#5342D6"/></linearGradient>
<clipPath id="pp-k"><path d="M0 172L320 160V260H0Z"/></clipPath>
<symbol id="pp-dd" viewBox="-8 -8 316 248"><g stroke-linejoin="round" stroke-width="14"><path d="M8 216L58 104H116L66 216Z" fill="url(#pp-o)" stroke="url(#pp-o)"/><path d="M76 12H188A106 106 0 0 1 188 224H96L120 170H186A52 52 0 0 0 186 66H52Z" fill="url(#pp-o)" stroke="url(#pp-o)"/><path d="M76 12H188A106 106 0 0 1 188 224H96L120 170H186A52 52 0 0 0 186 66H52Z" fill="url(#pp-c)" stroke="url(#pp-c)" clip-path="url(#pp-k)"/></g></symbol>
<symbol id="pp-ig" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="url(#pp-igg)"/><rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="16" cy="16" r="3.8" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="20.6" cy="11.4" r="1.2" fill="#fff"/></symbol>
<symbol id="pp-gm" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/><path d="M7 11.5v10.5h3.6v-7.6l5.4 4 5.4-4V22H25V11.5l-1.8-1.4L16 15.4l-7.2-5.3z" fill="#EA4335"/></symbol>
<symbol id="pp-sig" viewBox="0 0 54 12"><g fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/><path d="M28 3.2a9 9 0 0 1 11.6 0l-1.2 1.4a7 7 0 0 0-9.2 0zm2.4 2.8a5.4 5.4 0 0 1 6.8 0l-1.2 1.4a3.6 3.6 0 0 0-4.4 0zm3.4 2.4l1.6 1.8-1.6 1.6-1.6-1.6z"/><rect x="42" y=".8" width="11" height="10.4" rx="3" fill="none" stroke="currentColor" stroke-opacity=".5"/><rect x="43.6" y="2.4" width="7.8" height="7.2" rx="1.6"/></g></symbol>
<symbol id="pp-okfill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7.4" fill="#1E9E57"/><path d="M4.9 8.2l2.1 2.1 4.1-4.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="pp-askfill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7.4" fill="#E39A12"/><path d="M8 4.4v4.3" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/><circle cx="8" cy="11.4" r="1.05" fill="#fff"/></symbol>
<symbol id="pp-lock" viewBox="0 0 10 12"><rect x="1" y="5" width="8" height="6.5" rx="1.6" fill="currentColor"/><path d="M3 5.2V3.6a2 2 0 0 1 4 0v1.6" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
</defs></svg>`;



/** The five screens of the phone story, filled from one brand deal (the content's Story). */
export function phoneScreens(st: Story): string[] {
  const GS = `<span class="av" style="background:#E3EEE9;color:#2F5D50">${st.brandIni}</span>`;
  const YOU = `<span class="av you">${st.creator[0]}</span>`;
  return [
  // 1 · midnight, after the current iOS lock screen: a tall glass clock and glass notifications; other apps' sit
  // stacked under the clock, then DealDock's alert drops in at the top with the price on it
  `<div class="screen lock"><div class="wall"></div>${SB("11:48")}<div class="col">
    <div class="lockTop"><small>${st.lockDate}</small><strong>11:48</strong></div>
    <div class="stack">
      <div class="nfSlot" style="--t:1.5s"><div class="nf alert"><span class="nfIcon"><svg viewBox="-8 -8 316 248"><use href="#pp-dd"/></svg></span>
        <div class="nfBody"><div class="nfTop"><h5>Potential brand deal</h5><span>now</span></div>
        <p>${st.alert}</p>
        <p class="nfVal"><b>${st.estimate}</b> estimated value</p></div></div></div>
      ${st.noise.map(([app, from, text, ago], i) => NOISE(app, from, text, ago, 0.25 + i * 0.2, i === 0)).join("\n      ")}
    </div>
    <div class="lockFoot"><span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M8 3h8l-1 6H9z"/><path d="M9 9l1 12h4l1-12"/></svg></span><span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-3h3L15 7"/></svg></span></div>
  </div><span class="home"></span></div>`,

  // 2 · morning: the request in her inbox; Docky sends her a private brief under it that fills in row by row
  `<div class="screen">${SB("7:02")}<div class="col">
    ${BAR([["Reading the message", 0.2]], "Brief ready · 7:02 AM", 2.2)}
    <div class="feed">
      ${MSG(GS, st.brand, "11:48 PM", `<p>${st.message}</p>`, 0.1)}
      ${CARD("Deal brief", `<div class="rows">
          ${ROW("okfill", "Asks for", st.asks, 0.75)}
          ${ROW("okfill", "Usage", st.usage, 1.1)}
          ${ROW("askfill", "Missing", st.missing, 1.45, "ask")}
        </div>
        <div class="val" style="--t:2s"><div><b data-count="${st.estimate}" data-at="2.05">${st.estimate}</b><small>Estimated deal value</small></div></div>
        <div class="window" style="--t:2.3s">Reply window<i></i><b>${st.window}</b></div>`, 0.5, 0.6)}
    </div>
  </div><span class="home"></span></div>`,

  // 3 · the reply: her draft types out in her voice under the request; sending stays her move
  `<div class="screen">${SB("7:03")}<div class="col">
    ${BAR([["Checking your rate card", 0.2], ["Drafting in your voice", 0.9]], "Needs your OK", 3.5, "wait")}
    <div class="feed">
      ${MSG(GS, st.brand, "11:48 PM", `<p>${st.message}</p>`, 0.1)}
      ${MSG(YOU, st.creator, "(you) · draft", `<p class="draft">${TYPE(st.draft, 1.1)}</p><span class="tagY">Written like your last 14 replies</span>`, 0.9, "mine")}
    </div>
    <div class="approve">
      <div class="tone">Tone<span>Shorter</span><span class="on">${ICON("okfill", 11)}Yours</span><span>Warmer</span></div>
      <div class="send"><span class="knob"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h11M10 4.5L14.5 9 10 13.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Slide to send<span class="chev">›››</span></div>
      <p class="note">Nothing sends without you · 5 seconds to undo</p>
    </div>
  </div><span class="home"></span></div>`,

  // 4 · reminder: the invoice is due tomorrow and unpaid; Docky's card shows where it stands, her reminder types out
  `<div class="screen">${SB("6:30")}<div class="col">
    ${BAR([[`Checking invoice ${st.invoice}`, 0.2]], "Reminder ready", 3.4, "wait")}
    <div class="feed">
      ${CARD("Invoice due tomorrow", `<div class="val" style="--t:.5s"><div><b>${st.rate}</b><small>${st.invoice} · ${st.brandShort}</small></div><span class="st"><span class="due">Due ${st.dates.paid}</span></span></div>
        <div class="rows">
          ${ROW("okfill", "Invoice sent", st.dates.invoiced, 0.6)}
          ${ROW("okfill", `Seen by ${st.brandShort}`, st.dates.seen, 0.95)}
          ${ROW("askfill", "Payment", "Not yet", 1.3, "ask")}
        </div>`, 0.3, 0.35)}
      ${MSG(YOU, st.creator, "(you) · draft", `<p class="draft">${TYPE(st.reminder, 1.9)}</p>`, 1.7, "mine")}
    </div>
    <div class="approve" style="--ap:3.4s">
      <div class="send"><span class="knob"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h11M10 4.5L14.5 9 10 13.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Slide to send<span class="chev">›››</span></div>
      <p class="note">Nothing sends without you · 5 seconds to undo</p>
    </div>
  </div><span class="home"></span></div>`,

  // 5 · paid: the same thread, the day after the reminder; Docky's card ticks the deal through to payment, the status flips,
  // and only then does the month's paid total count up (estimates stay out of it)
  `<div class="screen">${SB("9:41")}<div class="col">
    ${BAR([["Checking for payment", 0.2]], "Payment received", 1.8)}
    <div class="feed">
      ${MSG(GS, st.brand, "9:38 AM", `<p>${st.paidReply}</p>`, 0.25)}
      ${CARD("Deal progress", `<div class="val" style="--t:.5s"><div><b>${st.rate}</b><small>${st.received ?? st.asks}</small></div><span class="st"><span class="was" style="--x:1.8s">Due ${st.dates.paid}</span><span class="d" style="--b:1.8s">${ICON("okfill", 11)}Paid ${st.dates.paid}</span></span></div>
        <div class="rows">
          ${ROW("okfill", "Enquiry received", st.dates.enquiry, 0.6)}
          ${ROW("okfill", "Deal agreed", st.dates.agreed, 0.75)}
          ${ROW("okfill", "Invoice sent", st.dates.invoiced, 0.9)}
          ${ROW("okfill", "Reminder sent", st.dates.reminded, 1.05)}
          ${ROW("okfill", "Payment received", st.dates.paid, 1.2, "", 0.6)}
        </div>
        <p class="mo" style="--t:1.9s"><span>${st.month.label}</span><b data-count="${st.month.total}" data-from="${st.month.from}" data-at="2">${st.month.total}</b></p>`, 0.4, 0.45)}
    </div>
  </div><span class="home"></span></div>`,
  ];
}
