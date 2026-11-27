"use client";

import { useState } from "react";
import { Docky, type DockyMood } from "@/components/docky/docky";

const MOODS: DockyMood[] = ["happy", "laughing", "excited", "curious", "thinking", "focused", "love", "surprised", "wink", "sad", "sleepy", "celebrating"];

export function DockySheet() {
  const [mood, setMood] = useState<DockyMood>("happy");
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", gap: 24, padding: "40px max(16px, 4vw)", background: "radial-gradient(40% 40% at 50% 45%, #FFE2BF, #FBF8F2 70%)", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
      <Docky mood={mood} wave={mood === "happy" || mood === "celebrating"} className="docky-sheet" />
      <div role="group" aria-label="Mood" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
        {MOODS.map(m => (
          <button key={m} type="button" aria-pressed={m === mood} onClick={() => setMood(m)}
            style={{ height: 36, padding: "0 14px", border: 0, borderRadius: 999, cursor: "pointer", font: "inherit", fontWeight: 600, background: m === mood ? "#14202C" : "#fff", color: m === mood ? "#fff" : "#14202C", boxShadow: "inset 0 0 0 1px rgba(20,32,44,.15)" }}>{m}</button>
        ))}
      </div>
      <style>{`.docky-sheet { width: min(420px, 80vw); }`}</style>
    </main>
  );
}
