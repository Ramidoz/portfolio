"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";

interface Action {
  id: string;
  label: string;
  hint: string;
  icon: string;
  keywords: string;
  run: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setCopied(false);
  }, []);

  const scrollTo = useCallback(
    (sel: string) => {
      close();
      document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
    },
    [close]
  );

  const actions: Action[] = useMemo(
    () => [
      { id: "about", label: "Go to About", hint: "01", icon: "◈", keywords: "about bio me", run: () => scrollTo("#about") },
      { id: "experience", label: "Go to Experience", hint: "02", icon: "◈", keywords: "experience work jobs career timeline", run: () => scrollTo("#experience") },
      { id: "skills", label: "Go to Skills", hint: "03", icon: "◈", keywords: "skills stack tech tools", run: () => scrollTo("#skills") },
      { id: "projects", label: "Go to Projects", hint: "04", icon: "◈", keywords: "projects builds maez trendscope portfolio", run: () => scrollTo("#projects") },
      { id: "education", label: "Go to Education", hint: "05", icon: "◈", keywords: "education degree umd iiit school", run: () => scrollTo("#education") },
      { id: "certifications", label: "Go to Certifications", hint: "06", icon: "◈", keywords: "certifications certs aws neo4j", run: () => scrollTo("#certifications") },
      { id: "publications", label: "Go to Publications", hint: "07", icon: "◈", keywords: "publications research springer paper", run: () => scrollTo("#publications") },
      { id: "contact", label: "Go to Contact", hint: "08", icon: "◈", keywords: "contact reach hire email", run: () => scrollTo("#contact") },
      {
        id: "resume", label: "Download Resume", hint: "↓", icon: "⬇", keywords: "resume cv download docx",
        run: () => { close(); window.location.href = "/Rohit_Ananthan_Resume.docx"; },
      },
      {
        id: "email", label: "Copy Email Address", hint: "⧉", icon: "✉", keywords: "email copy mail gmail contact",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setCopied(true);
            setTimeout(close, 900);
          }).catch(close);
        },
      },
      {
        id: "github", label: "Open GitHub", hint: "↗", icon: "⌥", keywords: "github code repos ramidoz",
        run: () => { close(); window.open(profile.github, "_blank", "noopener"); },
      },
      {
        id: "linkedin", label: "Open LinkedIn", hint: "↗", icon: "in", keywords: "linkedin connect network",
        run: () => { close(); window.open(profile.linkedin, "_blank", "noopener"); },
      },
    ],
    [close, scrollTo]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.keywords.includes(q)
    );
  }, [actions, query]);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -14 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed left-1/2 top-[18vh] z-[9100] w-[min(560px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12]/95 shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_60px_rgba(0,212,255,0.08)] backdrop-blur-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <span className="font-mono text-accent text-sm">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                className="w-full bg-transparent font-mono text-sm text-white placeholder-white/30 outline-none"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {copied && (
                <div className="px-4 py-3 font-mono text-sm text-[#a3e635]">
                  ✓ {profile.email} copied to clipboard
                </div>
              )}
              {!copied && filtered.length === 0 && (
                <div className="px-4 py-6 text-center font-mono text-sm text-white/30">
                  no matches for &quot;{query}&quot;
                </div>
              )}
              {!copied &&
                filtered.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={a.run}
                    onMouseEnter={() => setIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                      i === index ? "bg-accent/10 text-white" : "text-text-secondary"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-lg border font-mono text-xs ${
                        i === index
                          ? "border-accent/40 text-accent"
                          : "border-white/10 text-white/40"
                      }`}
                    >
                      {a.icon}
                    </span>
                    <span className="flex-1 text-sm">{a.label}</span>
                    <span className="font-mono text-[10px] tracking-widest text-white/25">
                      {a.hint}
                    </span>
                  </button>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-white/[0.07] px-5 py-2.5 font-mono text-[10px] text-white/30">
              <span><kbd className="text-white/50">↑↓</kbd> navigate</span>
              <span><kbd className="text-white/50">↵</kbd> select</span>
              <span className="ml-auto text-accent/50">rohit.os v2.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
