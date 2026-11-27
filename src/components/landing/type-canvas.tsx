"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { CircleDashed } from "@phosphor-icons/react/dist/ssr/CircleDashed";
import { Clock } from "@phosphor-icons/react/dist/ssr/Clock";
import { LockSimple } from "@phosphor-icons/react/dist/ssr/LockSimple";
import { SealCheck } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle";
import { BrandMark } from "@/components/design-preview/site-chrome";
import { AppLogo } from "./app-logos";
import { LABEL_TEXT, type LandingContent } from "./content";
import s from "./landing.module.css";

type Item = LandingContent["catches"][number];
const CYCLE = 5600;
const plural = (item: Item) => LABEL_TEXT[item.label] + (item.label === "fan" ? "s and spam" : "s");
const CHECK = { ok: CheckCircle, miss: CircleDashed, bad: XCircle } as const;

/**
 * Section 2: a small inbox app on a warm canvas. The list is sorted by value, the conversation shows the message as it
 * arrived, what DealDock read from it, and the drafted reply. The kind chips underneath cycle on their own until picked.
 */
export function TypeCanvas({ items }: { items: LandingContent["catches"] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const it = items[index];

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => { if (!touched.current) setAuto(entry.isIntersecting); }, { threshold: 0.45 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIndex(i => (i + 1) % items.length), CYCLE);
    return () => clearTimeout(t);
  }, [auto, index, items.length]);

  const pick = (i: number) => { touched.current = true; setAuto(false); setIndex(i); };

  return (
    <div className={s.canvas} ref={root}>
      <div className={s.ib}>
        <div className={s.ibList}>
          <p className={s.ibListHead}><BrandMark className={s.triageMark} /><b>Inbox</b><span>Sorted by value</span></p>
          <div className={s.ibRows}>
            {items.map((r, i) => (
              <button key={r.label} type="button" className={s.ibRow} data-label={r.label} aria-current={i === index || undefined} onClick={() => pick(i)}>
                <span className={s.ibAv} style={{ background: r.av }}>{r.ini}<AppLogo app={r.app} className={s.ibApp} /></span>
                <span className={s.ibRowMain}><b><i />{r.row ?? r.name}</b><span>{r.snippet}</span></span>
                <span className={s.ibRowVal} data-tone={r.label === "scam" ? "bad" : r.label === "fan" ? "mute" : undefined}>{r.value}<small>{r.short}</small></span>
              </button>
            ))}
          </div>
        </div>

        <div className={s.ibDetail} role="tabpanel" id="triage-panel" aria-labelledby={`chip-${it.label}`} data-label={it.label}>
          <div className={s.ibHead}>
            <span className={s.ibAv} style={{ background: it.av }}>{it.ini}</span>
            <span><b>{it.name}{it.verified && <SealCheck size={15} weight="fill" className={s.ibTick} aria-label="Verified" />}</b><small><AppLogo app={it.app} className={s.ibSubApp} />{it.sub}</small></span>
            <span className={s.ibKind}><i />{LABEL_TEXT[it.label]}</span>
          </div>
          <div className={s.ibBody} key={it.label}>
            <p className={s.ibStamp}>{it.when}</p>
            <div className={s.ibMsg} data-app={it.app}><span className={s.ibAv} style={{ background: it.av }}>{it.ini}</span><p>{it.subject && <b>{it.subject}</b>}{it.text}</p></div>

            {/* Docky sends what he read as a private card, like the phone story */}
            <div className={s.ibDocky}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small static mascot */}
              <span className={s.ibDockyAv}><img src="/docky/docky.webp" alt="" /></span>
              <div className={s.ibDockyBody}>
              <p className={s.ibDockyWho}><b>Docky</b><small><LockSimple size={11} weight="bold" aria-hidden="true" />Only you can see this</small></p>
            <div className={s.ibRead} data-tone={it.label === "scam" ? "bad" : it.label === "fan" ? "quiet" : undefined}>
              <div className={s.ibWorth}>
                <small>{it.worthLabel}</small>
                <b>{it.worth}</b>
                <span><Clock size={14} weight="bold" aria-hidden="true" />{it.window}</span>
              </div>
              <ul className={s.ibChecks} aria-label="What DealDock read from the message">
                {it.checks.map(([text, state, note]) => {
                  const Icon = CHECK[state];
                  return <li key={text} data-state={state}><Icon size={17} weight={state === "miss" ? "bold" : "fill"} aria-hidden="true" /><span>{text}</span>{note && <em>{note}</em>}</li>;
                })}
              </ul>
            </div>
              </div>
            </div>

            {it.draft
              ? <div className={s.ibReply}>
                  <p className={s.ibReplyHead}><b>Your reply</b><span>Not sent</span></p>
                  <p className={s.ibReplyText}>{it.draft}</p>
                  <div className={s.ibReplyFoot}>
                    <span>Edit</span><span>Shorter</span><span>Warmer</span>
                    <span className={s.ibSlide}><i><ArrowRight size={15} weight="bold" /></i>Slide to send</span>
                  </div>
                </div>
              : <p className={s.ibQuiet}>{it.quiet}</p>}
          </div>
        </div>
      </div>

      <div className={s.chipRow} role="tablist" aria-label="Kinds of message">
        {items.map((r, i) => (
          <button key={r.label} id={`chip-${r.label}`} type="button" role="tab" aria-selected={i === index} aria-controls="triage-panel"
            className={s.typeChip} data-label={r.label} data-run={auto && i === index ? "" : undefined} onClick={() => pick(i)}
            style={{ "--cycle": `${CYCLE}ms` } as CSSProperties}>
            <i />{plural(r)}
          </button>
        ))}
      </div>
    </div>
  );
}
