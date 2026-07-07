"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "initializing ~/rohit.ananthan", status: "OK" },
  { text: "loading neural weights … 847MB", status: "OK" },
  { text: "mounting data pipelines …", status: "OK" },
  { text: "portfolio online. inference ready.", status: "OK" },
];

export default function BootLoader() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(true); // assume skip until mounted (avoids SSR flash)
  const ran = useRef(false);

  useEffect(() => {
    // Ref guard: StrictMode runs effects twice in dev — only boot once.
    if (ran.current) return;
    ran.current = true;

    // Show the boot sequence once per browser session
    if (sessionStorage.getItem("booted") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("booted", "1");
      return;
    }
    setSkip(false);
    sessionStorage.setItem("booted", "1");

    // One-shot timers, intentionally not cleared: StrictMode's fake unmount
    // would cancel them and strand the overlay. The component stays mounted
    // for the page's lifetime, and the hard cap guarantees dismissal.
    LINES.forEach((_, i) => {
      setTimeout(() => setShown(i + 1), 260 + i * 240);
    });
    setTimeout(() => setDone(true), 260 + LINES.length * 240 + 420);
    setTimeout(() => setDone(true), 2800); // hard cap — never strand the visitor
  }, []);

  if (skip) return null;

  return (
    <div className={`boot-overlay ${done ? "done" : ""}`} aria-hidden="true">
      <div className="w-[min(430px,86vw)] font-mono text-[13px]">
        <div className="min-h-[104px] space-y-1">
          {LINES.slice(0, shown).map((line, i) => (
            <div key={i} className="text-text-secondary">
              <span className="text-[#a3e635]">[ {line.status} ]</span>{" "}
              {line.text}
            </div>
          ))}
          <span className="inline-block w-2 h-4 bg-accent caret-blink align-text-bottom" />
        </div>
        <div className="mt-4 h-[3px] rounded bg-white/10 overflow-hidden">
          <div
            className="h-full rounded bg-gradient-to-r from-accent via-accent-purple to-[#c026d3] transition-all duration-300"
            style={{ width: `${(shown / LINES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
