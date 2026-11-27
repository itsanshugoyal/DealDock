import type { ReactNode } from "react";
import styles from "./preview.module.css";

type Step = { title: string; body: string };

/** "How it works": the four moves side by side, each showing one object from the same example deal. */
export function Story({ steps, stages }: { steps: Step[]; stages: ReactNode[] }) {
  return (
    <ol className={styles.board}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.boardStep}>
          <div className={styles.boardStage} aria-hidden="true">{stages[index]}</div>
          <div className={styles.boardText}>
            <span className={styles.storyNum}>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
