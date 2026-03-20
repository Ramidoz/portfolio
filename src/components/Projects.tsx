"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={i} project={project} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  project,
  i,
  inView,
}: {
  project: (typeof projects)[0];
  i: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card glass rounded-2xl p-7 flex flex-col gap-5 group h-full"
        style={{ transition: "transform 0.12s ease-out, border-color 0.3s ease" }}
      >
        {/* Color glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top left, ${project.color}12 0%, transparent 60%)`,
          }}
        />

        {/* Top accent line animates in */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
          className="absolute top-0 left-6 right-6 h-[1.5px] origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, ${project.color}80, transparent)` }}
        />

        {/* Top row — icon + links */}
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
          >
            {project.icon}
          </div>
          <div className="flex items-center gap-1 -mr-2 -mt-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-secondary hover:text-white transition-all duration-200 p-2 opacity-50 group-hover:opacity-100"
                aria-label="Live Demo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-text-secondary hover:text-white transition-all duration-200 p-2 opacity-50 group-hover:opacity-100"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Title + description */}
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5 mt-auto relative z-10">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
