"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

/* Magnetic wrapper — children drift toward the cursor while hovered */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}

function scramble(el: HTMLElement, finalText: string, duration = 1200) {
  let frame = 0;
  const totalFrames = Math.round(duration / 16);
  const interval = setInterval(() => {
    el.textContent = finalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (frame / totalFrames > i / finalText.length) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");
    frame++;
    if (frame >= totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 16);
}

// Floating ML code snippets
const ML_SNIPPETS = [
  "model.fit(X_train, y_train)",
  "loss: 0.0231 ↓",
  "accuracy: 98.47%",
  "gradient_descent(lr=1e-3)",
  "epoch 47/100",
  "F.softmax(logits, dim=-1)",
  "import torch",
  "nn.TransformerEncoder()",
  "optimizer.zero_grad()",
  "loss.backward()",
  "XGBClassifier(n_estimators=300)",
  "df.groupby('cluster').agg()",
  "precision: 0.94 | recall: 0.91",
  "wandb.log({'val_loss': 0.02})",
  "checkpoint.save('best_model')",
  "pipeline.fit_transform(X)",
  "GridSearchCV(cv=5)",
  "confusion_matrix(y_test, ŷ)",
  "torch.cuda.is_available()",
  "scaler.fit_transform(X_train)",
];

// Neural network architecture
const LAYERS = [4, 6, 8, 8, 6, 4];
const LAYER_COLORS = [
  "#00d4ff", // input  — cyan
  "#38b6ff", // h1     — light blue
  "#7c3aed", // h2     — purple
  "#9333ea", // h3     — violet
  "#c026d3", // h4     — fuchsia
  "#f59e0b", // output — amber
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  /* ── Neural network + floating snippets canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    // ── Node type ──────────────────────────────────
    interface Node {
      x: number;
      y: number;
      layer: number;
      color: string;
      glow: number;       // activated glow [0-1], decays each frame
      glowDecay: number;
      breath: number;     // idle phase for ambient pulse
      breathSpeed: number;
    }

    // ── Pulse type ─────────────────────────────────
    interface Pulse {
      fromLayer: number;
      fromIdx: number;
      toIdx: number;
      t: number;          // progress 0→1
      speed: number;
      color: string;
      alpha: number;
    }

    // ── Snippet type ───────────────────────────────
    interface Snippet {
      text: string;
      x: number;
      y: number;
      vy: number;
      alpha: number;
      size: number;
    }

    let nodeGrid: Node[][] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };
    const MOUSE_RADIUS = 150;

    // Build node positions based on current canvas size
    const buildNodes = (): Node[][] => {
      const grid: Node[][] = [];
      const padX = canvas.width * 0.10;
      const usableW = canvas.width - padX * 2;
      const layerGap = usableW / (LAYERS.length - 1);

      for (let l = 0; l < LAYERS.length; l++) {
        const count = LAYERS[l];
        const layerNodes: Node[] = [];
        const cx = padX + l * layerGap;
        const nodeGap = Math.min((canvas.height * 0.62) / (count + 1), 72);
        const totalH = nodeGap * (count - 1);
        const startY = canvas.height / 2 - totalH / 2;

        for (let n = 0; n < count; n++) {
          layerNodes.push({
            x: cx,
            y: startY + n * nodeGap,
            layer: l,
            color: LAYER_COLORS[l],
            glow: Math.random() * 0.3,
            glowDecay: 0.014 + Math.random() * 0.008,
            breath: Math.random() * Math.PI * 2,
            breathSpeed: 0.008 + Math.random() * 0.006,
          });
        }
        grid.push(layerNodes);
      }
      return grid;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodeGrid = buildNodes();
      pulses.length = 0; // clear stale pulses on resize
    };
    resize();
    window.addEventListener("resize", resize);

    // Cursor proximity lights up nearby nodes; a click fires a fresh cascade
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onPointerDown = () => spawnCascade();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    // Spawn floating snippets
    const snippets: Snippet[] = ML_SNIPPETS.map((text) => ({
      text,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(0.18 + Math.random() * 0.22),
      alpha: 0.012 + Math.random() * 0.018,
      size: 9 + Math.random() * 4,
    }));

    // Spawn a new cascade from a random input node
    const spawnCascade = () => {
      if (nodeGrid.length === 0) return;
      const fromIdx = Math.floor(Math.random() * LAYERS[0]);
      nodeGrid[0][fromIdx].glow = 1;
      const toIdx = Math.floor(Math.random() * LAYERS[1]);
      pulses.push({
        fromLayer: 0,
        fromIdx,
        toIdx,
        t: 0,
        speed: 0.010 + Math.random() * 0.006,
        color: LAYER_COLORS[0],
        alpha: 0.90,
      });
    };

    // Stagger initial cascades
    const initTimers = [0, 700, 1400, 2100].map((delay) =>
      setTimeout(spawnCascade, delay)
    );

    const spawnInterval = setInterval(() => {
      if (pulses.length < 18) spawnCascade();
    }, 900);

    // ── Draw loop ──────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Floating ML snippets (behind everything)
      for (const s of snippets) {
        s.y += s.vy;
        if (s.y < -24) {
          s.y = canvas.height + 20;
          s.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "#00d4ff";
        ctx.font = `${s.size}px "JetBrains Mono", monospace`;
        ctx.fillText(s.text, s.x, s.y);
      }
      ctx.globalAlpha = 1;

      // 2. Connection lines
      for (let l = 0; l < LAYERS.length - 1; l++) {
        for (let n = 0; n < LAYERS[l]; n++) {
          for (let m = 0; m < LAYERS[l + 1]; m++) {
            const from = nodeGrid[l]?.[n];
            const to = nodeGrid[l + 1]?.[m];
            if (!from || !to) continue;
            const activation = (from.glow + to.glow) * 0.5;
            const baseAlpha = 0.035 + activation * 0.09;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.strokeStyle = `rgba(124,58,237,${baseAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // 3. Update + draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;

        const from = nodeGrid[p.fromLayer]?.[p.fromIdx];
        const to = nodeGrid[p.fromLayer + 1]?.[p.toIdx];
        if (!from || !to) { pulses.splice(i, 1); continue; }

        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;
        const fade = 1 - p.t * 0.25;

        // Connection highlight trail
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(px, py);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.18 * fade;
        ctx.stroke();

        // Pulse glow blob
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 7);
        gr.addColorStop(0, `${p.color}ff`);
        gr.addColorStop(0.4, `${p.color}aa`);
        gr.addColorStop(1, `${p.color}00`);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.globalAlpha = p.alpha * fade;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Pulse arrived at destination
        if (p.t >= 1) {
          const destNode = nodeGrid[p.fromLayer + 1][p.toIdx];
          destNode.glow = Math.min(1, destNode.glow + 0.85);

          // Cascade to next layer
          if (p.fromLayer + 1 < LAYERS.length - 1 && pulses.length < 22) {
            const numForward = Math.random() < 0.45 ? 2 : 1;
            for (let k = 0; k < numForward; k++) {
              const nextTo = Math.floor(Math.random() * LAYERS[p.fromLayer + 2]);
              pulses.push({
                fromLayer: p.fromLayer + 1,
                fromIdx: p.toIdx,
                toIdx: nextTo,
                t: 0,
                speed: 0.010 + Math.random() * 0.006,
                color: LAYER_COLORS[p.fromLayer + 1],
                alpha: p.alpha * 0.88,
              });
            }
          }
          pulses.splice(i, 1);
        }
      }

      // 4. Nodes
      for (let l = 0; l < LAYERS.length; l++) {
        for (let n = 0; n < LAYERS[l]; n++) {
          const nd = nodeGrid[l]?.[n];
          if (!nd) continue;

          // Decay activation glow
          nd.glow = Math.max(0, nd.glow - nd.glowDecay);
          // Idle breath
          nd.breath += nd.breathSpeed;
          const breathVal = (Math.sin(nd.breath) * 0.5 + 0.5) * 0.12;
          // Cursor proximity boost — nodes light up as the pointer approaches
          const dm = Math.hypot(nd.x - mouse.x, nd.y - mouse.y);
          const mouseBoost = dm < MOUSE_RADIUS ? (1 - dm / MOUSE_RADIUS) * 0.85 : 0;
          const totalGlow = Math.max(nd.glow, breathVal, mouseBoost);

          const baseR = 3.5;
          const glowR = baseR + totalGlow * 14;

          // Outer aura
          if (totalGlow > 0.02) {
            const aura = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, glowR * 3);
            const hex = Math.round(totalGlow * 55).toString(16).padStart(2, "0");
            aura.addColorStop(0, `${nd.color}${hex}`);
            aura.addColorStop(1, `${nd.color}00`);
            ctx.beginPath();
            ctx.arc(nd.x, nd.y, glowR * 3, 0, Math.PI * 2);
            ctx.fillStyle = aura;
            ctx.fill();
          }

          // Core dot
          const coreR = baseR + nd.glow * 5;
          const core = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, coreR);
          const coreAlpha = Math.round((0.55 + nd.glow * 0.45) * 255).toString(16).padStart(2, "0");
          core.addColorStop(0, `${nd.color}ff`);
          core.addColorStop(0.5, `${nd.color}${coreAlpha}`);
          core.addColorStop(1, `${nd.color}22`);
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, coreR, 0, Math.PI * 2);
          ctx.fillStyle = core;
          ctx.fill();
        }
      }

      // 5. Layer labels (very faint)
      const labelNames = ["input", "h₁", "h₂", "h₃", "h₄", "output"];
      for (let l = 0; l < LAYERS.length; l++) {
        const topNode = nodeGrid[l]?.[0];
        if (!topNode) continue;
        const labelY = topNode.y - 22;
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = LAYER_COLORS[l];
        ctx.font = `9px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText(labelNames[l], topNode.x, labelY);
      }
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      initTimers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  /* ── Scramble text on mount ── */
  useEffect(() => {
    const t1 = setTimeout(() => {
      if (nameRef.current) scramble(nameRef.current, "Rohit Ananthan", 1400);
    }, 400);
    const t2 = setTimeout(() => {
      if (titleRef.current) scramble(titleRef.current, "Data Scientist & AI Engineer", 1000);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Scanline sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="scanline absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* ML-style status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-accent text-sm font-mono overflow-hidden"
          style={{
            border: "1px solid rgba(0,212,255,0.3)",
            background: "rgba(0,212,255,0.04)",
          }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)",
              width: "50%",
            }}
          />
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse relative z-10" />
          <span className="relative z-10">
            {'{ status: "open_to_hire", roles: ["DS", "DE", "AI Eng"] }'}
          </span>
        </motion.div>

        {/* Name with scramble */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none tracking-tight"
        >
          <span ref={nameRef} className="gradient-text-animated">
            {"R#hît @nànt#àn"}
          </span>
        </motion.h1>

        {/* Title with scramble */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-xl md:text-3xl font-light text-text-secondary mb-6 font-mono tracking-widest uppercase"
        >
          <span ref={titleRef}>{"D@ta $c!ent!st & A! Eng!neer"}</span>
        </motion.h2>

        {/* ML-flavored tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Model trained on 4+ years of real-world data — converging on{" "}
          <span className="text-accent font-mono">AI/ML</span>,{" "}
          <span className="text-accent font-mono">product analytics</span> &{" "}
          <span className="text-accent font-mono">GenAI</span>{" "}
          problems with GCP, AWS, LLMs &amp; real-time inference pipelines.{" "}
          <span className="text-white/25 font-mono text-sm">val_loss → 0.0000 ✓</span>
        </motion.p>

        {/* Stats as ML metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-10 mb-12"
        >
          {[
            { v: "4+",     l: "epochs (yrs)" },
            { v: "GPT-4o", l: "backbone LLM"  },
            { v: "60%↓",   l: "ETL latency"   },
            { v: "40%↓",   l: "review time"   },
          ].map((s) => (
            <div key={s.l} className="text-center group">
              <div className="text-2xl font-bold text-accent font-mono group-hover:text-glow transition-all duration-300">
                {s.v}
              </div>
              <div className="text-xs text-text-secondary mt-1 tracking-wide uppercase font-mono">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <button
              onClick={scrollToAbout}
              className="relative px-8 py-3.5 rounded-xl bg-accent text-background font-semibold text-sm tracking-wide overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-white transition-colors">
                View My Work
              </span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderRadius: "inherit" }}
              />
              <div className="absolute inset-0 glow-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href="/Rohit_Ananthan_Resume.docx"
              download
              className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center gap-2 transition-all duration-300 group"
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.4)",
                color: "#c4b5fd",
              }}
            >
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-y-0.5 transition-transform"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="group-hover:text-white transition-colors">Download Resume</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://www.linkedin.com/in/rohit-ananthan/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-white/15 text-white/70 font-semibold text-sm tracking-wide hover:border-accent/50 hover:text-accent transition-all duration-300 block"
            >
              LinkedIn →
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors group"
      >
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.button>
    </section>
  );
}
