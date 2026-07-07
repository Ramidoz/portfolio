"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-ananthan/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "#0077b5",
    desc: "Connect with me",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ramidoz",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: "#f0f0f0",
    desc: "View my projects",
  },
  {
    label: "Email",
    href: "mailto:rohitananthan123@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: "#00d4ff",
    desc: "Send me a message",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm tracking-widest">08.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Contact</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </motion.div>

        <div className="max-w-3xl mx-auto text-center">
          {/* ML terminal header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-accent/50 mb-4 tracking-widest"
          >
            <span className="text-accent/30">$</span>
            <span>model.deploy(env=&quot;production&quot;, candidate=&quot;rohit&quot;)</span>
            <span className="w-2 h-4 bg-accent/40 animate-pulse" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
          >
            Ready to{" "}
            <span className="gradient-text">deploy</span>?<br />
            Let&apos;s ship something intelligent.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-secondary text-lg mb-12 leading-relaxed"
          >
            Training complete — now seeking inference in the real world. Open to{" "}
            <span className="text-white/70">Data Scientist</span>,{" "}
            <span className="text-white/70">AI Engineer</span>, and{" "}
            <span className="text-white/70">ML Engineer</span> roles. Whether you
            have a full-time opportunity or just want to talk about model architectures —
            my context window is open.
          </motion.p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-4 glass rounded-2xl transition-all duration-200 group"
                style={{ "--link-color": link.color } as React.CSSProperties}
              >
                <span className="transition-colors" style={{ color: link.color }}>
                  {link.icon}
                </span>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{link.label}</div>
                  <div className="text-text-secondary text-xs">{link.desc}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Direct transmission form */}
          <ContactForm inView={inView} />

          {/* Availability banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent/20"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-white/80 font-mono">
              status: <span className="text-accent font-semibold">&quot;open_to_hire&quot;</span>
              <span className="text-white/40 mx-2">·</span>
              <span className="text-white/50">DS · DE · AI Eng</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-24 pt-8 border-t border-white/5 text-center"
      >
        <p className="text-text-secondary text-sm font-mono">
          Designed &amp; built by{" "}
          <span className="text-accent">Rohit Ananthan</span>
          {" · "}
          <span className="text-white/40">{new Date().getFullYear()}</span>
          <span className="text-white/20 mx-2">·</span>
          <span className="text-white/25 text-xs">no_grad() · no_bugs() 🤞</span>
        </p>
      </motion.footer>
    </section>
  );
}

function ContactForm({ inView }: { inView: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:rohitananthan123@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10),0_0_24px_rgba(0,212,255,0.12)]";

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="glass mx-auto mb-16 max-w-2xl rounded-2xl p-7 text-left"
    >
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent/60 tracking-widest">
        <span className="text-accent/30">$</span>
        <span>send_message --to rohit --priority high</span>
      </div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your_name"
          className={inputCls}
          aria-label="Your name"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={inputCls}
          aria-label="Your email"
        />
      </div>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="// describe your mission…"
        rows={5}
        className={`${inputCls} mb-5 resize-y`}
        aria-label="Your message"
      />
      <button
        type="submit"
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-purple px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,212,255,0.35)]"
      >
        <span className="relative z-10">Transmit Message ⟶</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
      <p className="mt-3 text-center font-mono text-[11px] text-white/25">
        transmission routed via your default mail client
      </p>
    </motion.form>
  );
}
