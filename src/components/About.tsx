"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { profile, stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

function parseStatValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function AnimatedCounter({ value, trigger }: { value: string; trigger: boolean }) {
  const { num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger || num === 0) return;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, num]);

  // Non-numeric values (e.g. "GPT-4o")
  if (num === 0) return <>{value}</>;
  return <>{display}{suffix}</>;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">01.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio */}
          <div>
            <motion.p
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={fadeUp}
              className="text-text-secondary text-lg leading-relaxed mb-6"
            >
              {profile.bio}
            </motion.p>

            <motion.p
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              variants={fadeUp}
              className="text-text-secondary leading-relaxed mb-8"
            >
              With a background spanning Engineering (B.Tech from IIIT Chennai) to
              Information Systems (MS from University of Maryland — Smith School of Business), I bring
              a rare blend of engineering rigor and business context to every data problem.
            </motion.p>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              {["Python", "GCP Vertex AI", "LLMs / RAG", "MLOps", "SQL", "Tableau"].map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </motion.div>
          </div>

          {/* Stats grid with animated counters */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            variants={fadeUp}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass rounded-2xl p-6 hover:border-accent/25 transition-colors duration-300 group"
              >
                {/* Glow blob behind number */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(0,212,255,0.06) 0%, transparent 60%)" }}
                />
                <div className="relative z-10 text-3xl font-black font-mono text-accent mb-1 tabular-nums">
                  <AnimatedCounter value={stat.value} trigger={inView} />
                </div>
                <div className="relative z-10 text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="col-span-2 glass rounded-2xl p-6 flex items-center gap-4 hover:border-accent/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-lg flex-shrink-0"
                style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
                📍
              </div>
              <div>
                <div className="text-white font-medium">United States</div>
                <div className="text-text-secondary text-sm">Open to Remote & Hybrid Roles</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-mono">Available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* profile.py terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="terminal-window rounded-2xl overflow-hidden mt-16"
        >
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-text-secondary">rohit@portfolio: ~/profile.py</span>
            <span className="ml-auto text-[10px] text-white/25 font-mono hidden sm:block">python 3.12 · venv active</span>
          </div>
          <div className="p-6 overflow-x-auto text-[13px] leading-[1.9]">
            <pre className="font-mono">
<span className="tk-kw">class</span> <span className="tk-cls">DataScientist</span>:{"\n"}
{"    "}<span className="tk-kw">def</span> <span className="tk-fn">__init__</span>(<span className="tk-var">self</span>):{"\n"}
{"        "}<span className="tk-var">self</span>.name      = <span className="tk-str">&quot;Rohit Ananthan&quot;</span>{"\n"}
{"        "}<span className="tk-var">self</span>.focus     = [<span className="tk-str">&quot;GenAI &amp; RAG&quot;</span>, <span className="tk-str">&quot;MLOps&quot;</span>, <span className="tk-str">&quot;Graph ML&quot;</span>, <span className="tk-str">&quot;Product Analytics&quot;</span>]{"\n"}
{"        "}<span className="tk-var">self</span>.stack     = {"{"}<span className="tk-str">&quot;lang&quot;</span>: <span className="tk-str">&quot;Python&quot;</span>, <span className="tk-str">&quot;cloud&quot;</span>: [<span className="tk-str">&quot;GCP&quot;</span>, <span className="tk-str">&quot;AWS&quot;</span>], <span className="tk-str">&quot;llm&quot;</span>: <span className="tk-str">&quot;GPT-4o&quot;</span>{"}"}{"\n"}
{"        "}<span className="tk-var">self</span>.education = [<span className="tk-str">&quot;MS InfoSys @ UMD&quot;</span>, <span className="tk-str">&quot;B.Tech @ IIIT Chennai&quot;</span>]{"\n"}
{"\n"}
{"    "}<span className="tk-kw">def</span> <span className="tk-fn">mission</span>(<span className="tk-var">self</span>) -&gt; <span className="tk-cls">Impact</span>:{"\n"}
{"        "}<span className="tk-cmt"># raw data in → business impact out</span>{"\n"}
{"        "}<span className="tk-kw">return</span> <span className="tk-fn">bridge</span>(technology, business_value)  <span className="tk-cmt"># converged ✓</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
