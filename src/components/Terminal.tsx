"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Line {
  text: string;
  kind: "in" | "out" | "ok" | "err" | "accent" | "dim";
}

const out = (text: string): Line => ({ text, kind: "out" });
const ok = (text: string): Line => ({ text, kind: "ok" });
const err = (text: string): Line => ({ text, kind: "err" });
const accent = (text: string): Line => ({ text, kind: "accent" });
const dim = (text: string): Line => ({ text, kind: "dim" });

const WELCOME: Line[] = [
  accent("rohit.os v2.1 — interactive shell"),
  dim("type 'help' to list commands. type 'exit' or press ESC to close."),
  out(""),
];

const HELP: Line[] = [
  accent("available commands:"),
  out("  whoami        who is rohit?"),
  out("  neofetch      system information"),
  out("  skills        tech stack, grouped"),
  out("  projects      featured builds"),
  out("  experience    employment history"),
  out("  contact       open a channel"),
  out("  resume        download resume (.docx)"),
  out("  overdrive     toggle overdrive mode"),
  out("  matrix        follow the white rabbit"),
  out("  sudo hire rohit    (recommended)"),
  out("  clear · exit"),
];

const NEOFETCH: Line[] = [
  accent("  ██████╗  █████╗      visitor@rohit.os"),
  accent("  ██╔══██╗██╔══██╗     ─────────────────"),
  accent("  ██████╔╝███████║     OS:       rohit.os v2.1 (neural-dark)"),
  accent("  ██╔══██╗██╔══██║     Host:     rohit-portfolio.vercel.app"),
  accent("  ██║  ██║██║  ██║     Kernel:   human-4.2-ml"),
  accent("  ╚═╝  ╚═╝╚═╝  ╚═╝     Uptime:   4+ years in production"),
  out("                       Shell:    python 3.12 (venv: always active)"),
  out("                       DE:       GenAI · RAG · Graph ML"),
  out("                       CPU:      Caffeine × 8 cores"),
  out("                       GPU:      RTX 4090 (running Maez)"),
  out("                       Memory:   persistent, self-evolving"),
  out("                       License:  open_to_hire"),
];

function runCommand(raw: string): { lines: Line[]; action?: string } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return { lines: HELP };
    case "whoami":
      return {
        lines: [
          ok("Rohit Ananthan — Data Scientist & AI Engineer"),
          out("4+ years shipping production ML: LLM apps, RAG pipelines,"),
          out("real-time fraud detection, and graph analytics."),
          dim("stack: Python · PySpark · GCP Vertex AI · AWS · Neo4j · GPT-4o"),
        ],
      };
    case "neofetch":
      return { lines: NEOFETCH };
    case "skills":
      return {
        lines: [
          accent("ml & ai"), out("  LLMs · GPT-4o · RAG · XGBoost · Deep Learning · Causal Inference"),
          accent("data engineering"), out("  Airflow · Dataflow · Pub/Sub · DBT · MLflow · CI/CD"),
          accent("cloud"), out("  GCP Vertex AI · AWS SageMaker · BigQuery · Snowflake · Docker"),
          accent("graph & search"), out("  Neo4j · Pinecone · LangChain · LlamaIndex · Vector DBs"),
        ],
      };
    case "projects":
      return {
        lines: [
          accent("maez") , out("  a digital companion — local LLM with persistent memory → maez.live"),
          accent("trendscope"), out("  ReAct agent for YouTube content strategy"),
          accent("fraud-detection"), out("  Neo4j + XGBoost · 5M+ daily txns · 18% fewer false positives"),
          dim("  scroll to #projects for the full archive"),
        ],
      };
    case "experience":
      return {
        lines: [
          ok("2026–now   Data Scientist Consultant @ Invision Global Tech"),
          out("2025–2026  Data Scientist @ Community Dreams Foundation"),
          out("2024       Technical Consultant @ University of Maryland"),
          out("2021–2023  Data Scientist @ Kameleon Technologies"),
        ],
      };
    case "contact":
      return {
        lines: [
          out("email     rohitananthan123@gmail.com"),
          out("linkedin  linkedin.com/in/rohit-ananthan"),
          out("github    github.com/Ramidoz"),
        ],
      };
    case "resume":
      return { lines: [ok("fetching Rohit_Ananthan_Resume.docx …")], action: "resume" };
    case "overdrive":
      return { lines: [], action: "overdrive" };
    case "matrix":
      return { lines: [dim("wake up, neo…")], action: "matrix" };
    case "sudo hire rohit":
    case "hire rohit":
    case "hire":
      return {
        lines: [
          dim("[sudo] password for visitor: ••••••••"),
          ok("ACCESS GRANTED"),
          out("initiating hire sequence …"),
          ok("→ opening secure channel to rohit"),
        ],
        action: "hire",
      };
    case "rm -rf /":
      return { lines: [err("nice try. this portfolio is immutable infrastructure.")] };
    case "ls":
      return { lines: [out("about/  experience/  skills/  projects/  model-card/  contact/")] };
    case "exit":
    case "quit":
      return { lines: [], action: "exit" };
    case "clear":
      return { lines: [], action: "clear" };
    default:
      return { lines: [err(`command not found: ${cmd}`), dim("try 'help'")] };
  }
}

/* Full-screen matrix rain, self-dismissing */
function MatrixRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const glyphs = "アイウエオカキクケコ01λΣ∂∇xyzRA";
    let raf: number;

    const draw = () => {
      ctx.fillStyle = "rgba(8,8,8,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        ctx.fillStyle = Math.random() > 0.975 ? "#e8fdf5" : "#00d4ff";
        ctx.fillText(ch, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(onDone, 5200);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [onDone]);

  return (
    <motion.canvas
      ref={ref}
      className="fixed inset-0 z-[9300] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    />
  );
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Global triggers: backtick key + custom event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target?.tagName);
      if (e.key === "`" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, open]);

  const submit = () => {
    const raw = input;
    setInput("");
    setHistIdx(-1);
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50));

    const echo: Line = { text: `visitor@rohit.os:~$ ${raw}`, kind: "in" };
    const { lines: outLines, action } = runCommand(raw);

    if (action === "clear") { setLines([]); return; }
    if (action === "exit") { close(); return; }

    setLines((l) => [...l, echo, ...outLines]);

    if (action === "resume") {
      setTimeout(() => { window.location.href = "/Rohit_Ananthan_Resume.docx"; }, 400);
    } else if (action === "hire") {
      setTimeout(() => {
        window.location.href =
          "mailto:rohitananthan123@gmail.com?subject=" +
          encodeURIComponent("Hire sequence initiated 🚀");
      }, 1200);
    } else if (action === "matrix") {
      setMatrix(true);
    } else if (action === "overdrive") {
      const on = document.documentElement.classList.toggle("overdrive");
      window.dispatchEvent(new Event("overdrive-toggle"));
      setLines((l) => [
        ...l,
        on ? ok("OVERDRIVE ENGAGED — all systems at maximum") : dim("overdrive disengaged. returning to nominal."),
      ]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, history.length - 1);
      if (history[i] !== undefined) { setHistIdx(i); setInput(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = histIdx - 1;
      if (i < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(i); setInput(history[i]); }
    } else if (e.key === "Escape") {
      close();
    }
  };

  const color = (k: Line["kind"]) =>
    k === "in" ? "text-white"
    : k === "ok" ? "text-[#a3e635]"
    : k === "err" ? "text-[#fb7185]"
    : k === "accent" ? "text-accent"
    : k === "dim" ? "text-white/35"
    : "text-text-secondary";

  return (
    <>
      <AnimatePresence>{matrix && <MatrixRain onDone={() => setMatrix(false)} />}</AnimatePresence>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[9150] bg-black/55 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 z-[9200] w-[min(760px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#07070c]/95 shadow-[0_50px_140px_rgba(0,0,0,0.8),0_0_80px_rgba(0,212,255,0.07)] backdrop-blur-2xl"
              role="dialog"
              aria-label="Interactive terminal"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-5 py-3">
                <button onClick={close} className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-label="Close terminal" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-text-secondary">rohit@portfolio: ~/rohit.sh</span>
                <kbd className="ml-auto rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/40">ESC</kbd>
              </div>

              <div ref={bodyRef} className="h-[380px] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-[1.75]">
                {lines.map((l, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${color(l.kind)}`}>{l.text || " "}</div>
                ))}
                <div className="flex items-center text-white">
                  <span className="text-[#a3e635]">visitor@rohit.os</span>
                  <span className="text-white/40">:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent caret-[#00d4ff] outline-none"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
