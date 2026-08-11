"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Discoverability layer for the hidden features:
 * - Floating dock (bottom-right): terminal + palette buttons, works on touch
 *   devices where the ` and ⌘K shortcuts don't exist.
 * - One-time hint toast after the boot sequence, pointing at the terminal.
 */
export default function HintDock() {
  const [toast, setToast] = useState(false);
  const [pulse, setPulse] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Show the hint once per browser (not per session — it's the on-ramp
    // to the site's best feature, but nagging on every visit would be worse).
    let seen = false;
    try { seen = localStorage.getItem("hint-seen") === "1"; } catch {}
    if (!seen) {
      timers.current.push(setTimeout(() => setToast(true), 4200));
      timers.current.push(setTimeout(() => {
        setToast(false);
        try { localStorage.setItem("hint-seen", "1"); } catch {}
      }, 12000));
    }
    // Stop the attention pulse on the dock after a while either way
    timers.current.push(setTimeout(() => setPulse(false), 14000));

    const dismiss = () => {
      setToast(false);
      try { localStorage.setItem("hint-seen", "1"); } catch {}
    };
    window.addEventListener("open-terminal", dismiss);
    window.addEventListener("open-command-palette", dismiss);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("open-terminal", dismiss);
      window.removeEventListener("open-command-palette", dismiss);
    };
  }, []);

  const openTerminal = () => window.dispatchEvent(new Event("open-terminal"));
  const openPalette = () => window.dispatchEvent(new Event("open-command-palette"));

  return (
    <>
      {/* Hint toast */}
      <AnimatePresence>
        {toast && (
          <motion.button
            onClick={openTerminal}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-24 right-5 md:bottom-40 md:right-6 z-[8900] max-w-[280px] text-left rounded-2xl p-[1.5px] bg-gradient-to-r from-accent/70 to-accent-purple/70 shadow-[0_16px_50px_rgba(0,212,255,0.25)]"
          >
            <span className="block rounded-2xl bg-[#0a0a12]/95 px-4 py-3">
              <span className="block font-mono text-[12px] text-white leading-relaxed">
                <span className="text-accent">psst</span> — this site has a working
                terminal. tap <span className="text-accent">❯_</span>
                <span className="hidden md:inline"> or press <kbd className="border border-white/20 rounded px-1">`</kbd></span> to open it.
              </span>
              <span className="mt-1 block font-mono text-[10px] text-white/35">
                try &apos;neofetch&apos; · there&apos;s also a secret code…
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating dock */}
      <div className="fixed bottom-5 right-5 md:bottom-12 md:right-6 z-[8901] flex flex-col gap-2.5">
        <button
          onClick={openPalette}
          aria-label="Open command palette"
          className="group grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-[#0b0b12]/90 backdrop-blur-md text-white/60 hover:text-accent hover:border-accent/40 transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          onClick={openTerminal}
          aria-label="Open terminal"
          className={`relative grid h-11 w-11 place-items-center rounded-xl border border-accent/35 bg-[#0b0b12]/90 backdrop-blur-md font-mono text-[13px] text-accent hover:bg-accent/10 hover:border-accent transition-all duration-200 shadow-[0_8px_30px_rgba(0,0,0,0.45),0_0_24px_rgba(0,212,255,0.18)]`}
        >
          ❯_
          {pulse && (
            <span className="absolute inset-0 rounded-xl border border-accent/50 animate-ping" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
