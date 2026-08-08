"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion as tokens } from "@/lib/design-tokens";
import type { ReactNode } from "react";

/**
 * Signature moment: a wave of "low tide" color washes up over the finished
 * graphic and recedes, revealing the result — one orchestrated beat rather
 * than scattered micro-effects. Respects prefers-reduced-motion by
 * cross-fading instead of animating transform.
 */
export function TideReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tide/70 via-sunset/40 to-transparent"
        initial={reduceMotion ? { opacity: 1 } : { y: "0%" }}
        animate={reduceMotion ? { opacity: 0 } : { y: "-110%" }}
        transition={{
          duration: tokens.tideWash,
          ease: tokens.easeInOut,
          delay: 0.1
        }}
      />
    </div>
  );
}
