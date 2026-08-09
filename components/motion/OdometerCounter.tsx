"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface OdometerCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
}

export function OdometerCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  durationMs = 900
}: OdometerCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    // Hard spring easing simulation: fast acceleration, hard snap
    const springEase = (t: number) => {
      // Cubic overshoot snap
      return Math.sin((t * Math.PI) / 2) * (1 + 0.1 * Math.sin(t * Math.PI * 2.5));
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      if (progress < 1) {
        const easedProgress = Math.min(springEase(progress), 1);
        setDisplayValue(Math.floor(easedProgress * value));
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, durationMs]);

  return (
    <span ref={ref} className={`font-mono inline-flex items-center tracking-tight ${className}`}>
      {prefix}
      <span>{displayValue.toLocaleString()}</span>
      {suffix}
    </span>
  );
}
