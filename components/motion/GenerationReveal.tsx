"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GenerationRevealProps {
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
}

export function GenerationReveal({
  children,
  onComplete,
  className = ""
}: GenerationRevealProps) {
  const [phase, setPhase] = useState<"scanning" | "fading" | "rimlight" | "complete">("scanning");

  useEffect(() => {
    // Reduced motion check
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("complete");
      onComplete?.();
      return;
    }

    const timer1 = setTimeout(() => setPhase("fading"), 350);
    const timer2 = setTimeout(() => setPhase("rimlight"), 750);
    const timer3 = setTimeout(() => {
      setPhase("complete");
      onComplete?.();
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border transition-colors duration-500 ${
      phase === "complete" || phase === "rimlight"
        ? "border-[#FFC24B]/50 shadow-[0_0_30px_rgba(11,104,57,0.35)]"
        : "border-[#0B6839]/40"
    } ${className}`}>
      
      {/* Composited graphic reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: phase === "scanning" ? 0.3 : 1,
          scale: 1
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* CRT Signal-Green Scan Line (left -> right sweep) */}
      {(phase === "scanning" || phase === "fading") && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-y-0 w-24 pointer-events-none bg-gradient-to-r from-transparent via-[#7CFF6B] to-transparent opacity-80 mix-blend-screen shadow-[0_0_20px_#7CFF6B]"
        />
      )}

      {/* Animated thin gold rim-light around frame's edge */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl"
        style={{ zIndex: 10 }}
      >
        <rect
          x="2"
          y="2"
          width="99%"
          height="99%"
          rx="22"
          fill="none"
          stroke="url(#sunriseGoldGrad)"
          strokeWidth="3"
          className={`transition-all duration-700 ${
            phase === "rimlight" || phase === "complete"
              ? "opacity-100 stroke-dashoffset-0"
              : "opacity-0 stroke-dasharray-1000"
          }`}
        />
        <defs>
          <linearGradient id="sunriseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC24B" />
            <stop offset="50%" stopColor="#0B6839" />
            <stop offset="100%" stopColor="#FF6F4C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
