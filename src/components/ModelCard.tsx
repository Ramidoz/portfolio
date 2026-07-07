"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPECS: [string, string][] = [
  ["parameters", "4+ years of production experience"],
  ["architecture", "human × (ML + GenAI + product sense)"],
  ["context_window", "always open"],
  ["training_data", "e-commerce · non-profit · enterprise"],
  ["fine_tuned_on", "GCP Vertex AI · AWS SageMaker"],
  ["inference_hardware", "coffee ☕ + RTX 4090"],
  ["temperature", "0.7 — creative but reliable"],
  ["license", "open_to_hire"],
];

const BENCHMARKS = [
  { name: "ETL latency reduction", value: 60, color: "#00d4ff" },
  { name: "Manual review time saved (RAG assistant)", value: 40, color: "#7c3aed" },
  { name: "Undetected fraud reduction (real-time)", value: 20, color: "#c026d3" },
  { name: "False positives cut (Neo4j + XGBoost)", value: 18, color: "#f59e0b" },
  { name: "Forecast accuracy gain (Vertex AI)", value: 15, color: "#10b981" },
];

const INTENDED = [
  "Shipping LLM/RAG systems to production",
  "Real-time anomaly & fraud detection",
  "Graph analytics on connected data",
  "MLOps: versioning, drift detection, CI/CD",
  "Turning ambiguous business questions into models",
];

const OUT_OF_SCOPE = [
  "Dashboards nobody looks at",
  "Models that never leave the notebook",
  "\"We'll clean the data later\"",
  "Meetings that should have been a Slack message",
];

export default function ModelCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="model-card" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">08.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Model Card</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Card header — model registry style */}
          <div className="border-b border-white/[0.07] bg-white/[0.02] px-7 py-6 flex flex-wrap items-center gap-4">
            <div className="w-11 h-11 rounded-xl grid place-items-center text-xl bg-gradient-to-br from-accent/25 to-accent-purple/25 border border-white/10">
              🤖
            </div>
            <div>
              <div className="font-mono text-lg text-white font-semibold">
                ramidoz<span className="text-white/35">/</span><span className="text-accent">data-scientist-v4</span>
              </div>
              <div className="font-mono text-[11px] text-white/35 mt-0.5">
                updated jul 2026 · deployed to production since 2021
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {["human", "production-ready", "self-improving"].map((t) => (
                <span key={t} className="font-mono text-[10.5px] px-2.5 py-1 rounded-full border border-accent/25 bg-accent/[0.06] text-accent/80">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Specs table */}
            <div className="p-7 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
              <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5">// specifications</h3>
              <dl className="space-y-3">
                {SPECS.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.4 }}
                    className="flex items-baseline gap-4 font-mono text-[13px]"
                  >
                    <dt className="w-44 flex-shrink-0 text-accent/70">{k}</dt>
                    <dd className="text-text-secondary">{v}</dd>
                  </motion.div>
                ))}
              </dl>

              {/* Intended / out of scope */}
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#a3e635]/70 mb-3">intended use</h4>
                  <ul className="space-y-2">
                    {INTENDED.map((t) => (
                      <li key={t} className="flex gap-2 text-[13px] text-text-secondary">
                        <span className="text-[#a3e635] flex-shrink-0">✓</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#fb7185]/70 mb-3">out of scope</h4>
                  <ul className="space-y-2">
                    {OUT_OF_SCOPE.map((t) => (
                      <li key={t} className="flex gap-2 text-[13px] text-text-secondary">
                        <span className="text-[#fb7185] flex-shrink-0">✗</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Benchmarks */}
            <div className="p-7">
              <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-5">
                // eval results <span className="text-white/25">(measured in production, not on a leaderboard)</span>
              </h3>
              <div className="space-y-5">
                {BENCHMARKS.map((b, i) => (
                  <div key={b.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-[13px] text-text-secondary">{b.name}</span>
                      <span className="font-mono text-[13px]" style={{ color: b.color }}>{b.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${b.value}%` } : {}}
                        transition={{ delay: 0.4 + i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${b.color}66, ${b.color})`,
                          boxShadow: `0 0 12px ${b.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Limitations, model-card style */}
              <div className="mt-8 rounded-xl border border-white/[0.07] bg-black/30 p-5">
                <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-3">known limitations</h4>
                <ul className="space-y-1.5 font-mono text-[12px] text-white/45">
                  <li>· may overfit to interesting problems</li>
                  <li>· inference quality degrades without coffee</li>
                  <li>· cannot resist optimizing a slow query</li>
                </ul>
              </div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-accent hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                deploy_this_model( ) →
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
