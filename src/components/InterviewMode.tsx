"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTERVIEW_CORPUS, matchQuestion, type QA, type QALink } from "@/lib/interview";

interface Turn {
  role: "visitor" | "rohit";
  text: string;
  links?: QALink[];
  typing?: boolean;
}

const OPENER: Turn = {
  role: "rohit",
  text: "Hey, I'm (a scripted) Rohit 👋 Ask me about what I'm building, my side projects, or what I think about AI — or tap a question below. Every answer here was hand-written by the real me. No tokens, no hallucinations.",
};

export default function InterviewMode() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([OPENER]);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("open-interview", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-interview", onOpen);
      window.removeEventListener("keydown", onKey);
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const respond = useCallback((qa: QA, visitorText: string) => {
    setBusy(true);
    setAsked((prev) => new Set(prev).add(qa.id));
    setTurns((t) => [...t, { role: "visitor", text: visitorText }]);

    // Brief "thinking" beat, then type the answer out
    setTimeout(() => {
      setTurns((t) => [...t, { role: "rohit", text: "", links: qa.links, typing: true }]);
      const full = qa.answer;
      let i = 0;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const step = reduced ? full.length : 3;

      typingTimer.current = setInterval(() => {
        i = Math.min(i + step, full.length);
        const done = i >= full.length;
        setTurns((t) => {
          const copy = [...t];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, text: full.slice(0, i), typing: !done };
          return copy;
        });
        if (done) {
          if (typingTimer.current) clearInterval(typingTimer.current);
          setBusy(false);
        }
      }, 16);
    }, 450);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    respond(matchQuestion(text), text);
  };

  const goto = (link: QALink) => {
    if (link.section) {
      close();
      setTimeout(() => {
        document.querySelector(link.section!)?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } else if (link.href) {
      if (link.href.startsWith("http")) window.open(link.href, "_blank", "noopener");
      else window.location.href = link.href;
    }
  };

  const suggestions = INTERVIEW_CORPUS.filter(
    (qa) => !asked.has(qa.id) && (asked.size < 2 ? qa.suggested : true)
  ).slice(0, 3);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[9150] bg-black/60 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ x: "-50%", y: "-50%" }}
            className="fixed left-1/2 top-1/2 z-[9200] flex h-[min(640px,92vh)] w-[min(680px,94vw)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a11]/97 shadow-[0_50px_140px_rgba(0,0,0,0.8),0_0_80px_rgba(0,212,255,0.07)] backdrop-blur-2xl"
            role="dialog"
            aria-label="Ask Rohit anything"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-5 py-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.png" alt="" className="h-9 w-9 rounded-full object-cover border border-white/15" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Rohit Ananthan</div>
                <div className="text-[11px] text-white/40">
                  ask me anything · hand-written answers · <span className="text-[#a3e635]">zero hallucinations</span>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Close chat"
                className="ml-auto rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/50 hover:text-white hover:border-white/25 transition-colors"
              >
                close
              </button>
            </div>

            {/* Transcript */}
            <div ref={bodyRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {turns.map((t, i) => (
                <div key={i} className={`flex ${t.role === "visitor" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                      t.role === "visitor"
                        ? "bg-gradient-to-r from-accent/90 to-accent-purple/90 text-background rounded-br-md font-medium"
                        : "bg-white/[0.05] border border-white/[0.07] text-text-primary rounded-bl-md"
                    }`}
                  >
                    {t.text}
                    {t.typing && <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent caret-blink" />}
                    {!t.typing && t.links && t.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {t.links.map((l) => (
                          <button
                            key={l.label}
                            onClick={() => goto(l)}
                            className="rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 text-[11.5px] text-accent hover:bg-accent/15 transition-colors"
                          >
                            {l.label} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested questions */}
            {!busy && suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-white/[0.05] px-5 pt-3 pb-1">
                {suggestions.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => respond(qa, qa.question)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-text-secondary hover:text-white hover:border-accent/40 transition-colors"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={submit} className="flex items-center gap-3 px-5 py-4">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something…"
                className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
                aria-label="Your question"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="rounded-xl bg-gradient-to-r from-accent to-accent-purple px-5 py-3 text-sm font-semibold text-background transition-opacity disabled:opacity-40"
              >
                Ask
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
