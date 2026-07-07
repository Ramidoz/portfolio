"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { publications } from "@/lib/data";

export default function Publications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="publications" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">07.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Publications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-8 relative overflow-hidden group hover:border-accent/20 transition-all"
            >
              {/* Gradient line */}
              <div className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full bg-gradient-to-b from-accent to-accent-purple opacity-60" />

              <div className="pl-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-snug max-w-2xl">
                    {pub.title}
                  </h3>
                  <span className="flex-shrink-0 text-sm font-mono text-accent/80 px-3 py-1 rounded-lg border border-accent/20 bg-accent/5">
                    {pub.publisher} · {pub.date}
                  </span>
                </div>

                <p className="text-text-secondary leading-relaxed mb-5 max-w-3xl">{pub.abstract}</p>

                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
