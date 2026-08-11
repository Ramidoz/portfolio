"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  // Server and first client render must agree (hydration), so pointer-device
  // detection lives in an effect instead of an inline matchMedia check.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) setEnabled(true);
  }, []);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring lags behind with spring
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    // Track interactive elements
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], input, select, textarea").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    attach();

    // Re-attach on DOM changes (for dynamic content)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      observer.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — lags with spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 56 : clicking ? 20 : 36,
          height: hovering ? 56 : clicking ? 20 : 36,
          opacity: visible ? 1 : 0,
          borderColor: hovering
            ? "rgba(124, 58, 237, 0.7)"
            : "rgba(0, 212, 255, 0.45)",
          backgroundColor: hovering ? "rgba(124,58,237,0.06)" : "transparent",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Inner dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicking ? 4 : 6,
          height: clicking ? 4 : 6,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#7c3aed" : "#00d4ff",
          boxShadow: hovering
            ? "0 0 10px rgba(124,58,237,0.8)"
            : "0 0 10px rgba(0,212,255,0.8)",
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
