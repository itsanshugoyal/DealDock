"use client";

import { useRef, useState, type PointerEvent } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { recordMarketingEvent } from "./marketing-analytics";
import type { SiteContent } from "./site-content";
import styles from "./preview.module.css";

const UNDO_MS = 5000;
const KNOB = 76; // The 64px knob plus its 6px inset on each side.

/** The approval gesture, at full size. A demo: nothing is sent anywhere. */
export function SlideDemo({ approve }: { approve: SiteContent["approve"] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ start: number; from: number; max: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const [undoOpen, setUndoOpen] = useState(false);
  const [status, setStatus] = useState("");

  function send() {
    if (sent) return;
    drag.current = null;
    setDragging(false);
    setX(track.current ? track.current.clientWidth - KNOB : 0);
    setSent(true);
    setUndoOpen(true);
    setStatus("Demo reply sent. In DealDock, a reply only leaves when you do this.");
    navigator.vibrate?.(12);
    recordMarketingEvent("demo_sent");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setUndoOpen(false), UNDO_MS);
  }
  function reset(message: string) {
    window.clearTimeout(timer.current);
    setSent(false); setUndoOpen(false); setX(0); setStatus(message);
  }
  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (sent || !track.current) return;
    track.current.setPointerCapture(event.pointerId);
    drag.current = { start: event.clientX, from: x, max: Math.max(1, track.current.clientWidth - KNOB) };
    setDragging(true);
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (current) setX(Math.max(0, Math.min(current.max, current.from + event.clientX - current.start)));
  }
  function onPointerUp() {
    const current = drag.current;
    if (!current) return;
    if (x >= current.max * 0.86) send();
    else { drag.current = null; setDragging(false); setX(0); }
  }

  return (
    <div className={styles.slideDemo}>
      <div className={styles.slidePreview} aria-hidden="true">
        <span className={styles.slidePreviewTo}>To {approve.to} · Brand deal · {approve.estimate}</span>
        <span>“{approve.preview}”</span>
      </div>
      <div ref={track} className={styles.slideTrack} data-sent={sent} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
        onPointerCancel={() => { drag.current = null; setDragging(false); setX(0); }}>
        <span className={styles.slideFill} style={{ width: x + KNOB - 6, transition: dragging ? "none" : undefined }} />
        <span className={styles.slideLabel} aria-hidden="true" style={{ opacity: sent ? 0 : Math.max(0, 1 - x / 160) }}>Slide to send<small>Demo · nothing leaves this page</small></span>
        {sent && <span className={styles.slideSent} aria-hidden="true">Sent. Only you can do that.</span>}
        <button type="button" className={`${styles.slideKnob} ${!sent && x === 0 ? styles.nudge : ""}`} disabled={sent}
          aria-label="Approve and send (demo)" aria-describedby="slide-demo-hint"
          style={{ transform: `translateX(${x}px)`, transition: dragging ? "none" : undefined }}
          onPointerDown={onPointerDown}
          onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); send(); } }}
          onClick={event => { if (event.detail === 0) send(); }}>
          {sent ? <Check size={26} weight="bold" aria-hidden="true" /> : <ArrowRight size={26} weight="bold" aria-hidden="true" />}
        </button>
        <span id="slide-demo-hint" className="sr-only">Demo only. Slide the button to the end, or press Enter, to approve. Nothing is really sent.</span>
      </div>
      <div className={styles.slideAfter}>
        {sent && (undoOpen
          ? <button type="button" onClick={() => reset("Demo reply unsent.")}>Undo <span className={styles.drain} style={{ animationDuration: UNDO_MS + "ms" }} /></button>
          : <button type="button" onClick={() => reset("Demo reset.")}><ArrowCounterClockwise size={16} weight="bold" aria-hidden="true" />Try again</button>)}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
