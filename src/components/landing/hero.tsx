"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Sparkle } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { Docky, type DockyMood } from "@/components/docky/docky";
import { openApply } from "./apply-sheet";
import { GmailLogo as Gmail, IgLogo as Ig } from "./app-logos";
import type { LandingContent } from "./content";
import s from "./landing.module.css";

type Phase = "hello" | "in" | "think" | "done" | "out";
type Field = "idle" | "focus" | "typing" | "valid" | "error";

// How long each step of the message loop lasts, in ms.
const NEXT: Record<Phase, number> = { hello: 1800, in: 1100, think: 1400, done: 3600, out: 500 };
// Two faint messages behind the card, one per inbox Docky reads. Neither is worth money, so he leaves them.
const AMBIENT = [
  { app: "ig", from: "lena.k", meta: "Instagram · 2m", text: "can you do a lighting Q&A?" },
  { app: "gmail", from: "Shopify", meta: "Gmail · 7:30 AM", text: "Your weekly summary is ready" },
] as const;
const HANDLE = /^[A-Za-z0-9._]{2,30}$/;
const clean = (v: string) => v.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/\/+$/, "");
const IgLogo = () => <Ig className={s.appLogo} />;
const GmailLogo = () => <Gmail className={s.appLogo} />;
const initials = (name: string) => name.replace(/[^A-Za-z ]/g, " ").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

/**
 * Left: a two-tone headline and the handle box (after Lindy's hero). Right: Docky stands on the page and
 * reads one example message at a time in the card above him.
 */
export function Hero({ hero }: { hero: LandingContent["hero"] }) {
  const { examples } = hero;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hello");
  const [onScreen, setOnScreen] = useState(true);
  const [field, setField] = useState<Field>("idle");
  const [value, setValue] = useState("");
  const [cheer, setCheer] = useState(false);
  const cast = useRef<HTMLElement>(null);

  const ex = examples[index];
  const typing = field === "focus" || field === "typing";

  // The loop pauses while someone types or the hero is off screen.
  useEffect(() => {
    if (phase === "done" && (!onScreen || typing)) return;
    const t = setTimeout(() => {
      if (phase === "hello") setPhase("in");
      else if (phase === "in") setPhase("think");
      else if (phase === "think") setPhase("done");
      else if (phase === "done") setPhase("out");
      else {
        setIndex(i => (i + 1) % examples.length);
        setPhase("in");
      }
    }, NEXT[phase]);
    return () => clearTimeout(t);
  }, [phase, onScreen, typing, examples]);

  useEffect(() => {
    const el = cast.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Docky watches the input while you type (further right as the handle grows), else the message he's reading.
  const look: [number, number] | null = typing ? [-1 + Math.min(value.length, 24) / 40, 0]
    : phase === "in" || phase === "think" ? [-0.8, 0.6] : phase === "done" ? [-0.7, 0.45] : null;

  const mood: DockyMood = cheer ? "celebrating" : field === "valid" ? "laughing" : field === "error" ? "focused" : typing ? "curious"
    : phase === "in" ? "curious" : phase === "think" ? "thinking"
    : phase === "done" ? "excited" : "happy";

  function change(v: string) {
    setValue(v);
    setField(!v ? "focus" : HANDLE.test(clean(v)) ? "valid" : "typing");
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const handle = clean(value);
    if (!HANDLE.test(handle)) { setField("error"); return; }
    // the apply sheet opens with the handle carried over; Docky cheers behind it
    setValue(handle);
    setCheer(true);
    setTimeout(() => setCheer(false), 2000);
    openApply(handle);
  }

  return (
    <section id="hero" className={s.hero} aria-labelledby="hero-heading">
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <h1 id="hero-heading" className={s.heroTitle}>Never miss a DM <span>that could pay&nbsp;you.</span></h1>
          <p className={s.heroSub}>{hero.sub}</p>

          <form className={s.prompt} onSubmit={submit} noValidate data-marketing-cta="hero_handle" data-state={field}>
            <label htmlFor="hero-handle" className={s.promptField}>
              <span aria-hidden="true">instagram.com/</span>
              <input id="hero-handle" value={value} onChange={e => change(e.target.value)}
                onFocus={() => setField(value ? (HANDLE.test(clean(value)) ? "valid" : "typing") : "focus")}
                onBlur={() => field !== "error" && setField("idle")}
                placeholder="yourhandle" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={60}
                aria-label="Your Instagram username" aria-invalid={field === "error"} aria-describedby="hero-handle-note" />
            </label>
            <button type="submit" className={s.btnPrimary}>Apply for the pilot<span className={s.btnArrow} aria-hidden="true"><ArrowRight size={16} weight="bold" /></span></button>
          </form>
          <p id="hero-handle-note" className={s.heroFormNote} role={field === "error" ? "alert" : undefined}>{field === "error" ? "Add your Instagram username, like maya.ortiz." : null}</p>

          <ul className={s.heroNote}>
            {hero.note.split(" · ").map(n => <li key={n}><span aria-hidden="true"><Check size={11} weight="bold" /></span>{n}</li>)}
          </ul>
        </div>

        <figure ref={cast} className={s.cast} aria-label="Example with made-up messages: new messages drift past Docky, he catches the ones that could pay, estimates what each is worth and drafts a reply.">
          <Docky mood={mood} wave={phase === "hello" || cheer} look={look} className={s.castDocky} />
          <div className={s.ambient} data-dim={(phase !== "hello" && phase !== "in") || undefined} aria-hidden="true">
            {AMBIENT.map((m, i) => (
              <span key={m.app} className={s.bubble} data-app={m.app} style={{ "--i": i } as CSSProperties}>
                <span className={s.bubbleHead}>{m.app === "ig" ? <IgLogo /> : <GmailLogo />}<b>{m.from}</b><small>{m.meta}</small></span>
                <span className={s.bubbleText}>{m.text}</span>
              </span>
            ))}
            {/* the next message drifts in with an orange outline, then flies into the card */}
            {(phase === "in" || phase === "think") && (
              <span key={index} className={`${s.bubble} ${s.incoming}`} data-app="ig" data-caught={phase === "think" || undefined}>
                <span className={s.bubbleHead}><IgLogo /><b>{ex.from}</b><small>Instagram · now</small></span>
                <span className={s.bubbleText}>{ex.text}</span>
              </span>
            )}
          </div>
          <div className={s.msgSlot}>
          {phase !== "hello" && phase !== "in" && (
            <div className={s.msg} key={index} data-phase={phase} data-label={ex.label} aria-hidden="true">
              <div className={s.msgHead}>
                <span className={s.msgAv}>{initials(ex.from)}</span>
                <span><b>{ex.from}</b><small>{ex.src}</small></span>
                <IgLogo />
              </div>
              <p className={s.msgText}>{ex.text}</p>
              <div className={s.msgTag}>
                <div>
                  <div className={s.msgTagRow}>
                    <span className={s.msgRead}><em className={s.msgStatus}><i />{ex.status}</em>{ex.intent}</span>
                    <span className={s.msgValue}><b>{ex.value}</b><small>{ex.valueLabel}</small></span>
                  </div>
                  <div className={s.msgDraft}>
                    <p className={s.msgDraftHead}><Sparkle size={14} weight="fill" />Docky drafted a reply<small>Not sent</small></p>
                    <p className={s.msgDraftText}>{ex.draft}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </figure>
      </div>
    </section>
  );
}
