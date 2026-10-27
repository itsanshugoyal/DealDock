"use client";

import { useState } from "react";
import styles from "./preview.module.css";
import { ExampleMoney } from "./pilot-currency";

const examples = [
  {
    label: "Course",
    type: "Course enquiry",
    quote: "Is your course right for someone just starting out?",
    value: 8500,
    draft: "Hey! Happy to help you figure out if it’s a good fit. What are you hoping to work on?",
    initials: "CQ",
  },
  {
    label: "Coaching",
    type: "Coaching enquiry",
    quote: "I’m ready to get started. How does your 1:1 coaching work?",
    value: 18000,
    draft: "Love that you’re ready to get started. Tell me a bit about your goals, and I’ll walk you through it.",
    initials: "CE",
  },
  {
    label: "Cohort",
    type: "Cohort enquiry",
    quote: "When does the next group start? I’d love to join.",
    value: 12000,
    draft: "Hey! I’d love to hear what you’re hoping to work on. Then I can share the next intake details and help you decide.",
    initials: "CH",
  },
];

export function EnquiryExample() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return (
    <figure className={styles.example} aria-labelledby="example-caption">
      <figcaption id="example-caption" className={styles.exampleCaption}>
        <span>Hidden in the everyday.</span><span>Illustrative workflow</span>
      </figcaption>
      <div className={styles.exampleStage}>
        <div className={styles.noise} aria-hidden="true">
          <span className={styles.noiseAvatar}>↗</span><span>Reacted to your story</span><span>just now</span>
        </div>
        <div className={styles.noiseBack} aria-hidden="true">
          <span>Love this post!</span><span>♡</span>
        </div>
        <div className={styles.exampleContent} aria-live="polite" aria-atomic="true">
          <div className={styles.lead}>
            <div className={styles.leadTop}>
              <span className={styles.leadAvatar} aria-hidden="true">{example.initials}</span>
              <span>{example.type}<small>A buying conversation</small></span>
              <span className={styles.bookmark} aria-hidden="true">↗</span>
            </div>
            <blockquote>“{example.quote}”</blockquote>
            <div className={styles.valueRow}>
              <span>Worth a closer look</span>
              <span className={styles.value}><ExampleMoney kind={example.label.toLowerCase() as "course" | "coaching" | "cohort"} /><small>estimated value</small></span>
            </div>
          </div>
          <div className={styles.draft}>
            <div className={styles.draftHeading}><span className={styles.pencil} aria-hidden="true">↳</span><strong>Your voice. A first draft.</strong><span>NOT SENT</span></div>
            <p>“{example.draft}”</p>
            <div className={styles.reviewNote}><span aria-hidden="true">□</span>Ready for your eyes. Waiting for your approval.</div>
          </div>
        </div>
        <div className={styles.exampleSwitcher} role="group" aria-label="Choose an example enquiry">
          {examples.map((item, index) => (
            <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>
              {item.label}<span aria-hidden="true">{selected === index ? "↗" : "+"}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={styles.exampleNote}>Try a different enquiry. Sample conversations and estimates.<br />No messages are sent from this example.</p>
    </figure>
  );
}
