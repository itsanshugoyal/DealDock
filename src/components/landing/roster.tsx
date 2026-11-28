"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Eye } from "@phosphor-icons/react/dist/ssr/Eye";
import { ShieldWarning } from "@phosphor-icons/react/dist/ssr/ShieldWarning";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";
import type { Creator } from "./content";
import s from "./landing.module.css";
import r from "./roster.module.css";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
// beams: each creator's messages leave 3s apart on a 9s cycle; a beam takes 2.6s end to end and is 150px long
const CYCLE = 9, TRAVEL = 2.6, BEAM = 150;

// What the diagram can't show on its own.
const FACTS = [
  { icon: Eye, text: "Creators see every reply sent in their name" },
  { icon: ShieldWarning, text: "Possible scams stop in the queue" },
  { icon: UsersThree, text: "Manager seats for your team" },
];

function Face({ c }: { c: Creator }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={r.flowFace} style={{ background: c.tone }} aria-hidden="true">{c.name.split(" ").map(w => w[0]).join("")}</span>;
  // eslint-disable-next-line @next/next/no-img-element -- remote stock portraits; images are unoptimized site-wide
  return <img className={r.flowFace} src={c.img} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

/** The managers section: five inboxes run into one queue, biggest first, then back out in each creator's voice. */
export function RosterSection({ creators }: { creators: Creator[] }) {
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/\W/g, "");
  const [size, setSize] = useState({ w: 1100, h: 440 });

  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(([e]) => setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }));
    ro.observe(el);
    // the dots only move while the diagram is on screen
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) svg.current?.unpauseAnimations(); else svg.current?.pauseAnimations(); });
    io.observe(el);
    // lines draw in once, when the diagram first scrolls into view; nothing is hidden without JavaScript or with reduced motion
    let seen: IntersectionObserver | undefined;
    if (!reduced() && el.getBoundingClientRect().top > innerHeight * 0.8) {
      el.setAttribute("data-armed", "");
      seen = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.setAttribute("data-seen", ""); seen?.disconnect(); } }, { threshold: 0.3 });
      seen.observe(el);
    }
    return () => { ro.disconnect(); io.disconnect(); seen?.disconnect(); };
  }, []);

  const { w, h } = size, n = creators.length, tall = w < 640;
  const at = (i: number) => (i + 0.5) / n;
  // lines run along one axis (x when wide, y when tall) from `start` to `end`; the queue's near edge is at `stop`
  let lines: { full: string; half: string; from: number[]; to: number[] }[], vars: Record<string, string>, start: number, end: number, stop: number[];
  if (!tall) {
    const aL = 236, aR = w - 300, cx = (aL + aR) / 2, cy = h / 2, hw = Math.min(150, (aR - aL) / 2 - 80), hL = cx - hw, hR = cx + hw, k = (hL - aL) * 0.62;
    lines = creators.map((_, i) => {
      const y = at(i) * h, inPart = `M${aL} ${y}C${aL + k} ${y} ${hL - k} ${cy} ${hL} ${cy}`;
      return { full: `${inPart}H${hR}C${hR + k} ${cy} ${aR - k} ${y} ${aR} ${y}`, half: `${inPart}H${cx}`, from: [aL, y], to: [aR, y] };
    });
    vars = { "--aL": `${aL}px`, "--aR": `${aR}px`, "--cx": `${cx}px`, "--cy": `${cy}px`, "--hubW": `${hw * 2}px`, "--hubH": "84px" };
    [start, end, stop] = [aL, aR, [hL, cy]];
  } else {
    const top = 72, bot = h - 72, cx = w / 2, cy = h / 2, hh = 44, hT = cy - hh, hB = cy + hh, k = (hT - top) * 0.62;
    lines = creators.map((_, i) => {
      const x = at(i) * w, inPart = `M${x} ${top}C${x} ${top + k} ${cx} ${hT - k} ${cx} ${hT}`;
      return { full: `${inPart}V${hB}C${cx} ${hB + k} ${x} ${bot - k} ${x} ${bot}`, half: `${inPart}V${cy}`, from: [x, top], to: [x, bot] };
    });
    vars = { "--cx": `${cx}px`, "--cy": `${cy}px`, "--hubW": `${Math.min(300, w - 24)}px`, "--hubH": `${hh * 2}px` };
    [start, end, stop] = [top, bot, [cx, hT]];
  }
  // Each queued message is a beam of light: a gradient band slid along its line. One SMIL clock drives the beams and
  // the pings, so they stay in step (and pause together off screen). Every 3s each creator sends their next message.
  const run = end - start + BEAM, axis = (d: number) => (tall ? `0 ${d}` : `${d} 0`);
  const headAt = (d: number) => +(TRAVEL * (d + 0.15 * BEAM) / run).toFixed(2); // seconds until the beam's head is d px along
  const beams = creators.flatMap((c, i) => c.labels.map((label, j) => ({ id: `${uid}b${i}${j}`, i, label, begin: i * 0.6 + j * 3 })));
  const ping = (key: string, [x, y]: number[], label: string, at: number) => (
    <circle key={key} cx={x} cy={y} r={3} opacity={0} className={r.ping} style={{ stroke: `var(--c-${label})` }}>
      <animate attributeName="r" values="3;14;14" keyTimes={`0;${(0.9 / CYCLE).toFixed(3)};1`} dur={`${CYCLE}s`} begin={`${at}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0;0" keyTimes={`0;${(0.9 / CYCLE).toFixed(3)};1`} dur={`${CYCLE}s`} begin={`${at}s`} repeatCount="indefinite" />
    </circle>
  );

  return (
    <div className={s.wrap}>
      <div className={r.center}>
        <h2 id="agency-heading" className={s.h2}>Run up to five creators from one inbox.</h2>
        <p className={s.lede}>Roster puts every creator’s paying messages in one queue, biggest first. You reply in each creator’s own voice, and they see everything you sent for them.</p>
      </div>
      <div ref={box} className={r.flow} data-tall={tall || undefined} style={vars as CSSProperties} role="img"
        aria-label="Diagram: messages from five creators’ inboxes run into one queue sorted by value, then go back out as replies in each creator’s own voice. A possible scam stops in the queue.">
        <svg ref={svg} key={`${w}x${h}`} className={r.flowSvg} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <defs>
            {beams.map(b => (
              <linearGradient key={b.id} id={b.id} gradientUnits="userSpaceOnUse" x1={tall ? 0 : start - BEAM} x2={tall ? 0 : start} y1={tall ? start - BEAM : 0} y2={tall ? start : 0}>
                <stop offset="0" style={{ stopColor: `var(--c-${b.label})`, stopOpacity: 0 }} />
                <stop offset="0.85" style={{ stopColor: `var(--c-${b.label})` }} />
                <stop offset="1" style={{ stopColor: `var(--c-${b.label})`, stopOpacity: 0 }} />
                <animateTransform attributeName="gradientTransform" type="translate" values={`0 0;${axis(run)};${axis(run)}`} keyTimes={`0;${(TRAVEL / CYCLE).toFixed(3)};1`}
                  dur={`${CYCLE}s`} begin={`${b.begin}s`} repeatCount="indefinite" />
              </linearGradient>
            ))}
          </defs>
          {lines.map(({ full }, i) => <path key={i} d={full} pathLength={1} className={r.flowLine} />)}
          <g className={r.moving}>
            {beams.map(b => <path key={b.id} d={b.label === "scam" ? lines[b.i].half : lines[b.i].full} className={r.beam} style={{ stroke: `url(#${b.id})` }} />)}
            {beams.map(b => [
              ping(`${b.id}i`, lines[b.i].from, b.label, b.begin + headAt(0)),
              // a scam stops at the queue with a red flash; everything else goes out to the creator
              b.label === "scam" ? ping(`${b.id}s`, stop, b.label, b.begin + headAt((tall ? stop[1] : stop[0]) - start))
                : ping(`${b.id}o`, lines[b.i].to, b.label, b.begin + headAt(end - start)),
            ])}
          </g>
          {lines.map(({ from, to }, i) => [from, to].map(([x, y], k) => <circle key={`${i}${k}`} cx={x} cy={y} r={3.5} className={r.port} />))}
        </svg>
        {creators.map((c, i) => (
          <div key={c.id} className={r.in} style={{ "--y": `${at(i) * h}px`, "--x": `${at(i) * w}px` } as CSSProperties}>
            <span><b>{c.first}</b><small>{c.niche}</small></span>
            <Face c={c} />
          </div>
        ))}
        <div className={r.hub}>
          {/* eslint-disable-next-line @next/next/no-img-element -- small static mascot */}
          <img src="/docky/docky.webp" alt="" width={64} height={64} />
          <span><b>One queue</b><small>Biggest first, all five creators</small></span>
        </div>
        {creators.map((c, i) => (
          <div key={c.id} className={r.out} style={{ "--y": `${at(i) * h}px`, "--x": `${at(i) * w}px` } as CSSProperties}>
            <Face c={c} />
            <span><b><span className={r.voiceWord}>In </span>{c.first}<span className={r.voiceWord}>’s voice</span></b><small>“{c.voice}”</small></span>
          </div>
        ))}
      </div>
      <div className={r.close}>
        <ul className={r.facts}>
          {FACTS.map(({ icon: Icon, text }) => <li key={text}><span><Icon size={17} weight="bold" aria-hidden="true" /></span>{text}</li>)}
        </ul>
        <a href="#pricing" className={s.textLink} data-marketing-cta="agencies">See the Roster plan<ArrowRight size={15} weight="bold" aria-hidden="true" /></a>
      </div>
    </div>
  );
}
