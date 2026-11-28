"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Bell } from "@phosphor-icons/react/dist/ssr/Bell";
import { BellRinging } from "@phosphor-icons/react/dist/ssr/BellRinging";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { HandPointing } from "@phosphor-icons/react/dist/ssr/HandPointing";
import { Question } from "@phosphor-icons/react/dist/ssr/Question";
import { Docky, type DockyMood } from "@/components/docky/docky";
import type { Story } from "./content";
import { PHONE_SYMBOLS, phoneScreens } from "./phone-screens";
import ps from "./phone-screens.module.css";
import s from "./landing.module.css";

// One brand DM, five steps. Each step: when, a short heading, one line of copy, and one callout beside the phone.
const STEPS = [
  { when: "Tuesday, 11:48 PM", title: "A brand writes at midnight.",
    sub: "Docky spots promising brand enquiries in your Instagram requests, estimates what they could be worth, and alerts you before an opportunity gets buried.",
    icon: Bell, co: ["One alert, with a price", "Only for messages that could pay."], y: "30%" },
  { when: "Wednesday, 7:02 AM", title: "Read before you wake up.",
    sub: "Every enquiry is checked for deliverables, usage rights and missing details. You see what the brand asked for, what still needs clarification, and when to reply.",
    icon: Question, co: ["What they left out", "So you know what to ask before quoting."], y: "46%" },
  { when: "Wednesday, 7:03 AM", title: "Your reply, already written.",
    sub: "Docky learns from your previous replies to draft messages that sound like you. Edit, adjust the tone, and approve before anything gets sent.",
    icon: HandPointing, co: ["Nothing sends on its own", "Review your reply, then slide to send."], y: "79%" },
  { when: "Tuesday 18 February, 6:30 PM", title: "A nudge before it's late.",
    sub: "The invoice is due tomorrow and still unpaid. Docky notices, drafts a friendly reminder with the payment link, and waits for your slide.",
    icon: BellRinging, co: ["Reminders you approve", "Polite, on time, and never sent without you."], y: "70%" },
  { when: "Wednesday 19 February, 9:41 AM", title: "Followed until it's paid.",
    sub: "Docky keeps track of follow-ups, invoices and payment status. Estimated deal values stay separate from actual money received.",
    icon: Receipt, co: ["Every deal, start to paid", "Enquiry, agreement, invoice and payment in one timeline."], y: "53%" },
];

// Docky beside the phone, one mood per step: wakes to the alert, reads, writes (typing dots), watches the invoice,
// celebrates the payment.
const MOODS: DockyMood[] = ["surprised", "focused", "thinking", "focused", "celebrating"];

const NUM = /\d[\d,]*(?:\.\d+)?/g;
const num = (s: string) => parseFloat(s.replace(/,/g, ""));

/** Counts every number in each element's data-count ("$2.5K–$5K", "$3,800") up from data-from (or zero),
 * data-at seconds in, keeping decimals and thousands commas. Returns a cleanup that puts the final text back. */
function countUp(els: HTMLElement[]) {
  const timers: ReturnType<typeof setTimeout>[] = [], frames: number[] = [];
  for (const el of els) {
    const final = el.dataset.count ?? "", from = (el.dataset.from ?? "").match(NUM) ?? [];
    const locale = final.includes("₹") ? "en-IN" : "en-US"; // ₹2,77,000, not ₹277,000
    const render = (k: number) => {
      let j = 0;
      el.textContent = final.replace(NUM, m => {
        const dec = m.split(".")[1]?.length ?? 0, a = num(from[j++] ?? "0");
        return (a + (num(m) - a) * k).toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec });
      });
    };
    render(0);
    timers.push(setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => { const p = Math.min(1, (now - t0) / 900); render(1 - Math.pow(1 - p, 3)); if (p < 1) frames.push(requestAnimationFrame(tick)); };
      frames.push(requestAnimationFrame(tick));
    }, Number(el.dataset.at ?? 0) * 1000));
  }
  return () => { timers.forEach(clearTimeout); frames.forEach(cancelAnimationFrame); els.forEach(el => { el.textContent = el.dataset.count ?? ""; }); };
}

/** The phone with all four screens stacked (desktop, cross-fading), or just screen `only` (the phone carousel).
 * A screen plays its motion while it is `active`. */
function Phone({ screens, active, z, only }: { screens: string[]; active: number; z?: number; only?: number }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pane = root.current?.querySelector<HTMLElement>("[data-on]");
    if (!pane || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return countUp([...pane.querySelectorAll<HTMLElement>("[data-count]")]);
  }, [active]);
  return (
    <div ref={root} className={`${s.pd} ${ps.ps}`} style={z ? ({ "--pz": z } as CSSProperties) : undefined} aria-hidden="true">
      {screens.map((html, i) => (only === undefined || i === only) &&
        <div key={i} className={s.pdPane} data-on={i === active || undefined} dangerouslySetInnerHTML={{ __html: html }} />)}
    </div>
  );
}

function CalloutCard({ step }: { step: (typeof STEPS)[number] }) {
  const Icon = step.icon;
  return (
    <div className={s.co} style={{ "--y": step.y } as CSSProperties}>
      <span className={s.coIcon}><Icon size={18} weight="bold" /></span>
      <span><b>{step.co[0]}</b><small>{step.co[1]}</small></span>
    </div>
  );
}

export function StoryPhone({ story }: { story: Story }) {
  const screens = useMemo(() => phoneScreens(story), [story]);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tell = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  // The story starts when it scrolls into view: the lock screen lights up and Docky wakes to the notification.
  const [seen, setSeen] = useState(false);
  const [awake, setAwake] = useState(false);
  // the phone carousel's screens play only once the carousel is on screen
  const [stripSeen, setStripSeen] = useState(false);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el || matchMedia("(max-width: 959px)").matches) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
    const f = p * STEPS.length;
    tell.current?.style.setProperty("--p", (f - Math.floor(f)).toFixed(3));
    if (f >= 1) setAwake(false);
    setActive(Math.floor(f));
  }, []);

  useEffect(() => {
    let frame = 0;
    const handler = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(onScroll); };
    addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => { removeEventListener("scroll", handler); cancelAnimationFrame(frame); };
  }, [onScroll]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold: 0.4 });
    io.observe(el);
    const mio = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStripSeen(true); }, { threshold: 0.5 });
    if (strip.current) mio.observe(strip.current);
    return () => { io.disconnect(); mio.disconnect(); };
  }, []);

  // asleep until DealDock's alert lands on the lock screen (1.5s), then surprised
  useEffect(() => {
    if (!seen || active !== 0) return;
    const t = setTimeout(() => setAwake(true), 1600);
    return () => clearTimeout(t);
  }, [seen, active]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: scrollY + r.top + (r.height - innerHeight) * (i + 0.5) / STEPS.length, behavior: reduce ? "auto" : "smooth" });
  };

  const step = STEPS[active];
  const mood = active === 0 && !awake ? "sleepy" : MOODS[active];
  return (
    <>
      <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: PHONE_SYMBOLS }} />
      <div className={s.track} ref={track}>
        <div className={s.stage} ref={stage}>
          <div className={s.tell} ref={tell}>
            <div className={s.segs} role="tablist" aria-label="Steps in the story">
              {STEPS.map((x, i) => (
                <button key={x.title} type="button" role="tab" aria-selected={i === active} aria-label={`${x.when}: ${x.title}`}
                  data-state={i < active ? "done" : i === active ? "on" : undefined} onClick={() => go(i)}><i /></button>
              ))}
            </div>
            <p className={s.tellTime}>{step.when}</p>
            <h3 className={s.tellLine} key={`h${active}`}>{step.title}</h3>
            <p className={s.tellSub} key={`p${active}`}>{step.sub}</p>
            <Docky mood={mood} look={mood === "sleepy" ? [0.3, -0.5] : [0.9, 0.25]} className={s.storyDocky} />
          </div>
          <div className={s.phoneWrap}>
            <Phone screens={screens} active={seen ? active : -1} />
            <CalloutCard key={`c${active}`} step={step} />
          </div>
          <span />
        </div>
      </div>

      <div className={s.mStrip}>
        <div className={s.mTrack} ref={strip} onScroll={e => {
          const el = e.currentTarget, w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
          setSlide(Math.min(STEPS.length - 1, Math.round(el.scrollLeft / (w + 16))));
        }}>
          {STEPS.map((x, i) => (
            <article key={x.title} className={s.mSlide} aria-label={`${x.when}: ${x.title}`}>
              <div className={s.mDevice}><Phone screens={screens} active={stripSeen && i === slide ? i : -1} z={0.86} only={i} /></div>
              <p className={s.tellTime}>{x.when}</p>
              <h3>{x.title}</h3>
              <p className={s.mBody}>{x.sub}</p>
            </article>
          ))}
        </div>
        <div className={s.mDots}>
          {STEPS.map((x, i) => (
            <button key={x.title} type="button" aria-label={`Show ${x.title}`} aria-current={i === slide ? "step" : undefined}
              onClick={() => { const el = strip.current, card = el?.children[i] as HTMLElement | undefined; if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 16, behavior: "smooth" }); }} />
          ))}
        </div>
      </div>
    </>
  );
}
