"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Timeline line draws itself as you scroll through the section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">02.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Track (faint) */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/[0.06]" />
          {/* Progress line — driven by scroll position */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-purple to-[#c026d3] origin-top shadow-[0_0_12px_rgba(0,212,255,0.5)]"
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-4 top-1 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    exp.current
                      ? "border-accent bg-accent/20 animate-pulse-glow"
                      : "border-white/20 bg-surface"
                  }`}>
                    {exp.current ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/30" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-accent/80 font-medium mt-1">{exp.company}</p>
                      <p className="text-text-secondary text-sm mt-1">
                        {exp.type} · {exp.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-text-secondary text-sm font-mono">{exp.period}</div>
                      <div className="text-white/40 text-xs mt-1">{exp.duration}</div>
                    </div>
                  </div>

                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {exp.bullets.map((b, bi) => (
                        <motion.li
                          key={bi}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.15 + bi * 0.05 }}
                          className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                        >
                          <span className="text-accent mt-1 flex-shrink-0">▸</span>
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
