"use client";

import { useState, type CSSProperties } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Avatar, LABELS, Verified } from "./primitives";
import type { SiteContent } from "./site-content";
import styles from "./preview.module.css";

const ROW = 58; // px between rows; the sorted list, fold pill and draft are laid out on this grid.

/** The hero: an inbox that sorts itself once, in CSS alone. Reduced motion shows the sorted end state. */
export function HeroSort({ hero }: { hero: SiteContent["hero"] }) {
  const [run, setRun] = useState(0);
  const money = hero.rows.filter(row => row.value);
  const words = hero.draft.split(" ");
  let rank = 0;
  return (
    <figure className={styles.heroDemo} aria-label={`Example inbox sorting itself by estimated value. ${money.map(row => `${row.name}: ${row.value}`).join("; ")}. Fans and spam move aside. A reply to ${money[0].name} is drafted in your voice and waits for you to slide.`}>
      <div className={styles.hphone}>
        <div className={styles.hscreen} key={run} aria-hidden="true">
          <p className={styles.hbar}><b>Inbox</b><span>{hero.count} · sorted by value</span></p>
          <div className={styles.hstage} style={{ "--row": `${ROW}px` } as CSSProperties}>
            {hero.rows.map((row, index) => {
              const isMoney = Boolean(row.value);
              const to = isMoney ? rank++ * ROW : 4 * ROW;
              return (
                <div key={row.name} className={styles.hrow} data-noise={isMoney ? undefined : ""} data-top={isMoney && to === 0 ? "" : undefined}
                  style={{ "--i": index, "--from": `${index * ROW}px`, "--to": `${to}px`, "--m": isMoney ? to / ROW : 0 } as CSSProperties}>
                  <Avatar name={row.name} tone={row.tone} size={36} />
                  <span className={styles.hrowText}><b>{row.name}{row.verified && <Verified />}</b><span lang={row.hindi ? "hi" : undefined}>{row.text}</span></span>
                  {isMoney
                    ? <span className={styles.hchip}><i style={{ background: LABELS[row.label].color }} />{row.value}</span>
                    : <span className={styles.hnoise}>{LABELS[row.label].text}</span>}
                </div>
              );
            })}
            <p className={styles.hfold}>{hero.fold}</p>
            <div className={styles.hdraft}>
              <p className={styles.hbubble}>{words.map((word, index) => <span key={index} style={{ "--w": index } as CSSProperties}>{word} </span>)}</p>
              <p className={styles.hmeta}><span>In your voice</span><span>Not sent · waiting for you</span></p>
              <p className={styles.hslide}><span className={styles.hknob}><ArrowRight size={18} weight="bold" /></span>Slide to send</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.heroCaption}>
        Example inbox.
        <button type="button" onClick={() => setRun(value => value + 1)}><ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />Replay</button>
      </figcaption>
    </figure>
  );
}
