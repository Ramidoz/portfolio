"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certs" },
  { id: "publications", label: "Publications" },
  { id: "model-card", label: "Model Card" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${label}`}
          >
            <span
              className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/10 bg-[#0b0b12]/90 px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${
                isActive
                  ? "opacity-0 group-hover:opacity-100 text-accent"
                  : "opacity-0 group-hover:opacity-100 text-white/60"
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-6 w-1.5 bg-gradient-to-b from-accent to-accent-purple shadow-[0_0_12px_rgba(0,212,255,0.6)]"
                  : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
