"use client";

import { useEffect, useRef } from "react";
import d from "./docky.module.css";

export type DockyMood =
  | "happy" | "laughing" | "excited" | "curious" | "thinking" | "focused"
  | "love" | "surprised" | "wink" | "sad" | "sleepy" | "celebrating";

// Geometry measured from the HD front pose by the rig build (scratch build.py), in the 440x510 SVG space.
const EYE = "#15171C", MOUTH = "#1E0904", TONGUE = "#F7562A";
const L = 167.5, R = 275, EY = 211, MX = 222.8, MY = 231;
const P = { eye: [35.5, 52.5], arc: [57.5, 26], open: [64, 47], small: [43, 24], blush: [49, 30] } as const;

/** One raster part from the asset pack's face sheet, centred on (x, y). */
function Part({ src, x, y, size, s = 1, flip = false }: { src: string; x: number; y: number; size: readonly [number, number]; s?: number; flip?: boolean }) {
  const [w, h] = [size[0] * s, size[1] * s];
  return <image href={`/docky/face-${src}.webp`} x={x - w / 2} y={y - h / 2} width={w} height={h} transform={flip ? `rotate(180 ${x} ${y})` : undefined} />;
}

const Eyes = ({ s = 1, dx = 0, dy = 0 }: { s?: number; dx?: number; dy?: number }) => (
  <g className={d.blink}>{[L, R].map(x => <Part key={x} src="eye" x={x + dx} y={EY + dy} size={P.eye} s={s} />)}</g>
);
const Arcs = ({ flip = false }: { flip?: boolean }) => <>{[L, R].map(x => <Part key={x} src="arc" x={x} y={EY + 2} size={P.arc} s={0.82} flip={flip} />)}</>;
const Blush = () => <g opacity={0.85}>{[L - 16, R + 16].map(x => <Part key={x} src="blush" x={x} y={EY + 40} size={P.blush} s={0.8} />)}</g>;
const Open = ({ s = 1 }: { s?: number }) => <Part src="mouth-open" x={MX} y={MY + (P.open[1] * s) / 2 - 1} size={P.open} s={s} />;
const Small = () => <Part src="mouth-small" x={MX} y={MY + 14} size={P.small} />;
const O = ({ s = 1 }: { s?: number }) => <><ellipse cx={MX} cy={MY + 18 * s} rx={10 * s} ry={13 * s} fill={MOUTH} /><ellipse cx={MX} cy={MY + 24 * s} rx={6 * s} ry={5 * s} fill={TONGUE} /></>;

const stroke = { fill: "none", stroke: EYE, strokeWidth: 7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const heart = (x: number) => <path d={`M${x} ${EY + 16} C${x - 30} ${EY - 4} ${x - 14} ${EY - 28} ${x} ${EY - 10} C${x + 14} ${EY - 28} ${x + 30} ${EY - 4} ${x} ${EY + 16}Z`} fill="#F03E3E" />;

/** Faces built from the asset pack's eye, mouth and blush parts; vector only where the pack has no part. */
const FACES: Record<DockyMood, React.ReactNode> = {
  happy: <><Eyes /><Open /></>,
  laughing: <><Arcs /><Open s={1.05} /><Blush /></>,
  celebrating: <><Arcs /><Open s={1.15} /><Blush /></>,
  excited: <><g {...stroke}><path d={`M${L - 13} ${EY - 14} L${L + 11} ${EY} L${L - 13} ${EY + 14}`} /><path d={`M${R + 13} ${EY - 14} L${R - 11} ${EY} L${R + 13} ${EY + 14}`} /></g><Open s={1.1} /><Blush /></>,
  curious: <><Eyes s={1.06} /><O /></>,
  surprised: <><Eyes s={1.14} /><O s={1.25} /></>,
  // reading: eyes up and to the side, one brow lifted, a small closed mouth (no frown)
  thinking: <><Eyes dx={5} dy={-4} /><path d={`M${R - 18} ${EY - 44} Q${R} ${EY - 56} ${R + 18} ${EY - 46}`} {...stroke} strokeWidth={6} /><path d={`M${MX - 12} ${MY + 20} Q${MX} ${MY + 26} ${MX + 12} ${MY + 20}`} {...stroke} strokeWidth={5} stroke={MOUTH} /></>,
  // wary, for scams: level brows and a flat mouth, still friendly
  focused: <><Eyes s={0.94} /><g {...stroke} strokeWidth={6}><path d={`M${L - 16} ${EY - 42} L${L + 14} ${EY - 40}`} /><path d={`M${R + 16} ${EY - 42} L${R - 14} ${EY - 40}`} /></g><path d={`M${MX - 13} ${MY + 22} L${MX + 13} ${MY + 22}`} {...stroke} strokeWidth={5} stroke={MOUTH} /></>,
  love: <>{heart(L)}{heart(R)}<Small /><Blush /></>,
  wink: <><Part src="arc" x={L} y={EY + 2} size={P.arc} s={0.82} /><g className={d.blink}><Part src="eye" x={R} y={EY} size={P.eye} /></g><Small /></>,
  sad: <><g {...stroke} strokeWidth={6}><path d={`M${L - 16} ${EY - 2} Q${L} ${EY + 10} ${L + 16} ${EY - 2}`} /><path d={`M${R - 16} ${EY - 2} Q${R} ${EY + 10} ${R + 16} ${EY - 2}`} /><path d={`M${L - 16} ${EY - 22} L${L + 14} ${EY - 30}`} /><path d={`M${R + 16} ${EY - 22} L${R - 14} ${EY - 30}`} /></g><path d={`M${MX - 14} ${MY + 30} Q${MX} ${MY + 20} ${MX + 14} ${MY + 30}`} {...stroke} strokeWidth={5} stroke={MOUTH} /></>,
  sleepy: <><Arcs flip /><path d={`M${MX - 10} ${MY + 22} Q${MX} ${MY + 26} ${MX + 10} ${MY + 22}`} {...stroke} strokeWidth={5} stroke={MOUTH} /></>,
};

/**
 * Docky, the DealDock mascot, as a cut-out rig built from the HD asset pack: the front pose with its face
 * screen wiped, the pack's own eye/mouth/blush parts on top, and the wave pose swapped in to wave.
 * Reusable: size it with `className`. `look` turns the face toward a point (-1..1, y up); leave it out to follow the pointer.
 */
export function Docky({ mood = "happy", wave = false, look, className }: { mood?: DockyMood; wave?: boolean; look?: [number, number] | null; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const lx = look?.[0], ly = look?.[1];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const set = (x: number, y: number) => { el.style.setProperty("--lx", x.toFixed(3)); el.style.setProperty("--ly", y.toFixed(3)); };
    if (lx !== undefined && ly !== undefined) { set(lx, ly); return; }
    if (matchMedia("(pointer: coarse)").matches) { set(0, 0); return; }
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / (r.width * 1.3);
        const y = -(e.clientY - (r.top + r.height * 0.42)) / (r.height * 1.3);
        set(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [lx, ly]);

  return (
    <div ref={box} className={`${d.docky} ${className ?? ""}`} data-mood={mood} data-wave={wave || undefined} aria-hidden="true">
      <svg viewBox="0 0 440 540" className={d.svg} focusable="false">
        <defs>
          <radialGradient id="docky-glow"><stop offset="0" stopColor="#FF9A3C" stopOpacity="0.85" /><stop offset="1" stopColor="#FF7A1A" stopOpacity="0" /></radialGradient>
          <radialGradient id="docky-shadow"><stop offset="0" stopColor="#7A3510" stopOpacity="0.32" /><stop offset="1" stopColor="#7A3510" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse className={d.shadow} cx="220" cy="508" rx="150" ry="18" fill="url(#docky-shadow)" />
        <g className={d.bob}>
          <g className={d.hop}>
            <g className={d.front}>
              <image href="/docky/docky-body.webp" width="440" height="510" />
              <g className={d.glow}>
                <circle cx="24" cy="236" r="34" fill="url(#docky-glow)" />
                <circle cx="414" cy="236" r="34" fill="url(#docky-glow)" />
              </g>
              <g className={d.face} key={mood}>{FACES[mood]}</g>
            </g>
            <image className={d.wave} href="/docky/docky-wave.webp" x="0.2" y="25.5" width="458.5" height="467.5" />
            <g className={d.extra}>
              {mood === "curious" && <text x="356" y="92" className={d.ask}>?</text>}
              {mood === "thinking" && <g className={d.dots}><rect x="330" y="58" width="78" height="36" rx="18" fill="#fff" /><circle cx="318" cy="104" r="7" fill="#fff" /><circle cx="306" cy="120" r="4" fill="#fff" /><circle cx="350" cy="76" r="5" /><circle cx="369" cy="76" r="5" /><circle cx="388" cy="76" r="5" /></g>}
              {(mood === "excited" || mood === "surprised" || mood === "laughing") && <g className={d.rays} stroke="#FF8A1F" strokeWidth="8" strokeLinecap="round"><path d="M344 70 L356 46" /><path d="M368 88 L392 74" /><path d="M374 116 L400 114" /></g>}
              {mood === "celebrating" && <g className={d.confetti}>{[["#3B82F6", 300, 60, -20], ["#FF8A1F", 340, 40, 15], ["#F43F5E", 380, 70, 40], ["#22C55E", 96, 64, -35], ["#A855F7", 60, 110, 20], ["#FF8A1F", 130, 36, 60]].map(([c, x, y, r], i) => <rect key={i} x={x as number} y={y as number} width="8" height="20" rx="4" fill={c as string} transform={`rotate(${r} ${x} ${y})`} />)}</g>}
              {mood === "sleepy" && <text x="350" y="96" className={d.zz}>z<tspan dx="4" dy="-18" fontSize="0.7em">z</tspan></text>}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
