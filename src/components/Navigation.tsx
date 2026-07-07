"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certs" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
    setActive(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 glass border-b border-white/5" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-sm text-accent font-semibold tracking-widest uppercase hover:text-white transition-colors"
          >
            <span className="text-white/40">{"<"}</span>RA
            <span className="text-white/40">{"/>"}</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium transition-colors animated-underline ${
                    active === link.href ? "text-accent" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Command palette trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden md:flex items-center gap-2.5 text-sm font-medium px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all duration-200 font-mono"
            aria-label="Open command palette"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-xs">Search</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-white/15 text-white/45">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/5 px-6 py-6"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-base font-medium text-text-secondary hover:text-accent transition-colors w-full text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
