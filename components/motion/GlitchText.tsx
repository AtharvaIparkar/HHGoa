"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%/<>[]{}";

interface GlitchTextProps {
  text: string;
  className?: string;
  durationMs?: number;
  as?: "h1" | "h2" | "h3" | "span" | "div" | "p";
}

export function GlitchText({
  text,
  className = "",
  durationMs = 550,
  as: Component = "span"
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasResolved, setHasResolved] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      setHasResolved(true);
      return;
    }

    if (hasResolved) return;

    let frameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      if (progress < 1) {
        const charCount = text.length;
        const resolvedCount = Math.floor(progress * charCount);

        let scrambled = "";
        for (let i = 0; i < charCount; i++) {
          if (i < resolvedCount || text[i] === " " || text[i] === "\n") {
            scrambled += text[i];
          } else {
            const randIdx = Math.floor(Math.random() * GLITCH_CHARS.length);
            scrambled += GLITCH_CHARS[randIdx];
          }
        }

        setDisplayText(scrambled);
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setHasResolved(true);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [text, durationMs, hasResolved]);

  return (
    <Component className={`font-mono transition-colors ${className}`}>
      {displayText}
    </Component>
  );
}
