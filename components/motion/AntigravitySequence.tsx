"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "./GlitchText";
import { OdometerCounter } from "./OdometerCounter";
import { PalmParallax } from "./PalmParallax";
import { useGeneratorStore } from "@/lib/store";

export function AntigravitySequence() {
  const isIntroPlaying = useGeneratorStore((s) => s.isIntroPlaying);
  const setIntroPlaying = useGeneratorStore((s) => s.setIntroPlaying);

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isIntroPlaying) return;

    // Fast 4-second sequence choreography timeline (ms)
    // T=0ms: Darkness & Cursor
    // T=400ms: GOA Glitch in
    // T=900ms: Sunrise sweep + Palms
    // T=1500ms: Photo Drop + CRT Scan line sweep
    // T=2200ms: Devanagari Goa + Monospace live compile
    // T=2800ms: Odometer spring counters
    // T=3400ms: Tagline: Less Noise. More Signal.
    // T=3900ms: Auto finish into interactive app state

    const t1 = setTimeout(() => setStepIndex(1), 400);
    const t2 = setTimeout(() => setStepIndex(2), 900);
    const t3 = setTimeout(() => setStepIndex(3), 1500);
    const t4 = setTimeout(() => setStepIndex(4), 2200);
    const t5 = setTimeout(() => setStepIndex(5), 2800);
    const t6 = setTimeout(() => setStepIndex(6), 3400);
    const tEnd = setTimeout(() => {
      setIntroPlaying(false);
    }, 3950);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        setIntroPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isIntroPlaying, setIntroPlaying]);

  if (!isIntroPlaying) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#062B1F] text-[#E8F3EC] overflow-hidden select-none"
      >
        {/* Parallax Palms background */}
        {stepIndex >= 2 && <PalmParallax />}

        {/* Ambient Sunrise Sweep background */}
        {stepIndex >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 ambient-sunrise-bg pointer-events-none"
          />
        )}

        {/* Top-left blinking terminal cursor */}
        <div className="absolute top-6 left-6 font-mono text-xs text-[#7CFF6B] flex items-center gap-2">
          <span className="w-2 h-4 bg-[#7CFF6B] animate-pulse" />
          <span className="tracking-widest uppercase text-[10px] text-[#7CFF6B]/70">
            {stepIndex === 0 ? "BOOT_SEQUENCE_INIT" : `SYS_GOA_2026 // STAGE_0${stepIndex}`}
          </span>
        </div>

        {/* Skip button for instant access */}
        <button
          onClick={() => setIntroPlaying(false)}
          className="absolute top-6 right-6 font-mono text-xs text-[#E8F3EC]/60 hover:text-[#7CFF6B] border border-[#E8F3EC]/20 hover:border-[#7CFF6B] px-3 py-1.5 rounded-full backdrop-blur-md transition-colors"
        >
          SKIP INTRO [ESC] ↵
        </button>

        {/* Main Content Area */}
        <div className="relative z-10 max-w-md w-full px-6 flex flex-col items-center text-center gap-6">
          
          {/* Step 1 & 2: Glitch GOA Title */}
          {stepIndex >= 1 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <GlitchText
                text="GOA"
                as="h1"
                className="text-7xl md:text-8xl font-black text-[#7CFF6B] tracking-tighter drop-shadow-[0_0_25px_rgba(124,255,107,0.4)]"
                durationMs={450}
              />
              <span className="font-mono text-xs tracking-widest text-[#FFC24B] uppercase mt-1">
                HH GOA 2026 • ANJUNA BEACH
              </span>
            </motion.div>
          )}

          {/* Step 3 & 4: Card Drop & Scan Line */}
          {stepIndex >= 3 && (
            <motion.div
              initial={{ y: -80, opacity: 0, rotate: -4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative w-64 h-80 rounded-2xl bg-[#062B1F]/90 border border-[#FFC24B]/40 p-4 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Photo Area */}
              <div className="w-full h-44 rounded-xl bg-gradient-to-tr from-[#0B6839] via-[#FF6F4C] to-[#FFC24B] relative overflow-hidden flex items-center justify-center">
                <span className="font-mono text-xs text-[#E8F3EC] bg-[#062B1F]/80 px-2 py-1 rounded">
                  SAMPLE_PHOTO.RAW
                </span>

                {/* CRT Scan Line Sweep */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#7CFF6B] to-transparent opacity-80"
                />
              </div>

              {/* Monospace live compile info */}
              <div className="flex flex-col text-left font-mono text-xs gap-1">
                <div className="flex items-center justify-between text-[#FFC24B]">
                  <span>Devanagari: गोवा</span>
                  <span>#GOA-2026</span>
                </div>
                <span className="text-[#E8F3EC] font-bold">BUILDER_PASSPORT</span>
                <span className="text-[#7CFF6B] text-[10px]">STATUS: COMPILED_CLIENT_SIDE</span>
              </div>
            </motion.div>
          )}

          {/* Step 5: Odometer Hard Spring Counters */}
          {stepIndex >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-4 w-full bg-[#062B1F]/70 border border-[#E8F3EC]/15 rounded-xl p-3 backdrop-blur-md"
            >
              <div className="flex flex-col items-center">
                <OdometerCounter value={420} suffix="+" className="text-xl font-bold text-[#7CFF6B]" />
                <span className="font-mono text-[10px] text-[#E8F3EC]/70 uppercase">BUILDERS</span>
              </div>
              <div className="flex flex-col items-center">
                <OdometerCounter value={4} suffix=" DAYS" className="text-xl font-bold text-[#FFC24B]" />
                <span className="font-mono text-[10px] text-[#E8F3EC]/70 uppercase">DURATION</span>
              </div>
              <div className="flex flex-col items-center">
                <OdometerCounter value={50} prefix="$" suffix="K+" className="text-xl font-bold text-[#FF6F4C]" />
                <span className="font-mono text-[10px] text-[#E8F3EC]/70 uppercase">BOUNTIES</span>
              </div>
            </motion.div>
          )}

          {/* Step 6: Tagline: Less Noise. More Signal. */}
          {stepIndex >= 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-sm font-bold text-[#7CFF6B] tracking-wider uppercase border-t border-[#7CFF6B]/30 pt-3"
            >
              Less Noise. More Signal.
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
