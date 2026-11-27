"use client";

import { useState } from "react";
import type { SiteContent } from "./site-content";
import styles from "./preview.module.css";

/** One message, several drafts: the chips swap between scripted examples. No live AI call is made. */
export function VoiceToggle({ voice }: { voice: SiteContent["voice"] }) {
  const [index, setIndex] = useState(0);
  const tone = voice.tones[index];
  return (
    <figure className={styles.voice}>
      <p className={styles.bubbleIn}><span className={styles.from}>{voice.from}</span>{voice.incoming}</p>
      <div className={styles.toneChips} role="group" aria-label="Example draft style">
        {voice.tones.map((option, position) => (
          <button key={option.name} type="button" aria-pressed={position === index} onClick={() => setIndex(position)} lang={option.hindi ? "hi" : undefined}>{option.name}</button>
        ))}
      </div>
      <p className={styles.bubbleDraft} aria-live="polite" lang={tone.hindi ? "hi" : undefined}>{tone.text}</p>
      <p className={styles.metaRow}><span>In your voice</span><span>Not sent · waiting for you</span></p>
      <ul className={styles.notes} aria-label="What DealDock learned from your edits">
        {voice.notes.map(note => <li key={note}>{note}</li>)}
      </ul>
      <figcaption className={styles.caption}>Example drafts. Yours learn from what you send and every edit you make.</figcaption>
    </figure>
  );
}
