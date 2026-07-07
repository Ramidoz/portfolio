"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function Overdrive() {
  const [toast, setToast] = useState<null | boolean>(null); // true = engaged, false = disengaged

  useEffect(() => {
    let progress = 0;

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[progress]) {
        progress++;
        if (progress === KONAMI.length) {
          progress = 0;
          const on = document.documentElement.classList.toggle("overdrive");
          window.dispatchEvent(new Event("overdrive-toggle"));
          setToast(on);
          setTimeout(() => setToast(null), 3200);
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {toast !== null && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 top-20 z-[9400] -translate-x-1/2"
        >
          <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-accent via-accent-purple to-[#c026d3] shadow-[0_20px_60px_rgba(0,212,255,0.35)]">
            <div className="rounded-2xl bg-[#0a0a12]/95 px-6 py-3.5 font-mono text-sm flex items-center gap-3">
              <span className="text-xl">{toast ? "🏆" : "🌙"}</span>
              <div>
                <div className="text-white font-semibold tracking-wide">
                  {toast ? "ACHIEVEMENT UNLOCKED" : "OVERDRIVE DISENGAGED"}
                </div>
                <div className="text-[11px] text-white/45">
                  {toast ? "overdrive mode — konami protocol accepted" : "all systems returning to nominal"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
