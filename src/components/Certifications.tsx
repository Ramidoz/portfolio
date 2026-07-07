"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/lib/data";

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" ref={ref} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">06.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Certifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group cursor-default"
            >
              {/* Glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle at top left, ${cert.color}15, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
              >
                {cert.icon}
              </div>

              <h3 className="text-white font-semibold leading-snug mb-2">{cert.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{cert.issuer}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono px-2 py-1 rounded"
                  style={{ color: cert.color, background: `${cert.color}10`, border: `1px solid ${cert.color}20` }}
                >
                  Issued {cert.date}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: cert.color, boxShadow: `0 0 8px ${cert.color}` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
