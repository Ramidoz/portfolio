import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#111111",
        border: "#1a1a1a",
        accent: "#00d4ff",
        "accent-purple": "#7c3aed",
        "accent-pink": "#f43f5e",
        "accent-glow": "rgba(0, 212, 255, 0.15)",
        muted: "#6b7280",
        "text-primary": "#f0f0f0",
        "text-secondary": "#9ca3af",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 40s linear infinite",
        "aurora": "aurora 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(0,212,255,0.7), 0 0 100px rgba(0,212,255,0.2)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.45" },
          "25%": { transform: "translate(40px, -30px) scale(1.08)", opacity: "0.6" },
          "50%": { transform: "translate(-30px, 20px) scale(0.95)", opacity: "0.5" },
          "75%": { transform: "translate(20px, 40px) scale(1.05)", opacity: "0.55" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
