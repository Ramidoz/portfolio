"use client";
import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [tps, setTps] = useState(42.7);
  const [overdrive, setOverdrive] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
      // tokens/s takes a small random walk so the bar feels alive
      setTps((v) => {
        const next = v + (Math.random() - 0.48) * 3.5;
        return Math.max(18, Math.min(99, next));
      });
    };
    tick();
    const id = setInterval(tick, 1500);
    const onOd = () => setOverdrive(document.documentElement.classList.contains("overdrive"));
    window.addEventListener("overdrive-toggle", onOd);
    return () => { clearInterval(id); window.removeEventListener("overdrive-toggle", onOd); };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:flex items-center gap-5 h-7 px-4 border-t border-white/[0.07] bg-[#060609]/85 backdrop-blur-md font-mono text-[10.5px] text-white/40 select-none">
      <span className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${overdrive ? "bg-[#c026d3]" : "bg-[#a3e635]"} animate-pulse`} />
        <span className={overdrive ? "text-[#c026d3]" : ""}>
          {overdrive ? "OVERDRIVE" : "all systems nominal"}
        </span>
      </span>
      <span className="text-white/20">|</span>
      <span>rohit.os v2.1</span>
      <span className="text-white/20">|</span>
      <span>
        inference: <span className="text-accent/70 tabular-nums">{(overdrive ? tps * 2 : tps).toFixed(1)} tok/s</span>
      </span>

      <span className="ml-auto flex items-center gap-5">
        <button
          onClick={() => window.dispatchEvent(new Event("open-terminal"))}
          className="hover:text-accent transition-colors"
        >
          <kbd className="rounded border border-white/15 px-1 mr-1">`</kbd>terminal
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          className="hover:text-accent transition-colors"
        >
          <kbd className="rounded border border-white/15 px-1 mr-1">⌘K</kbd>palette
        </button>
        <span className="tabular-nums">{time} local</span>
      </span>
    </div>
  );
}
