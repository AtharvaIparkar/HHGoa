"use client";

import { motion } from "framer-motion";

interface WordmarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  live?: boolean;
  className?: string;
  waveColor?: string;
  goldColor?: string;
}

export function Wordmark({
  size = "md",
  live = false,
  className = "",
  waveColor = "#7CFF6B",
  goldColor = "#FFC24B"
}: WordmarkProps) {
  const sizeClasses = {
    sm: { hh: "text-base sm:text-lg", goa: "text-2xl sm:text-3xl", devW: 42, devH: 18, waveH: 12 },
    md: { hh: "text-xl sm:text-2xl", goa: "text-4xl sm:text-5xl", devW: 64, devH: 26, waveH: 16 },
    lg: { hh: "text-3xl sm:text-4xl", goa: "text-6xl sm:text-7xl", devW: 90, devH: 36, waveH: 22 },
    hero: { hh: "text-4xl sm:text-6xl md:text-7xl", goa: "text-7xl sm:text-8xl md:text-[100px]", devW: 120, devH: 48, waveH: 28 }
  }[size];

  return (
    <motion.div
      animate={
        live
          ? {
              scale: [1, 1.015, 1]
            }
          : undefined
      }
      transition={
        live
          ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          : undefined
      }
      className={`inline-flex flex-col items-center sm:items-start select-none ${className}`}
    >
      {/* Main Lockup Row */}
      <div className="relative inline-flex flex-wrap items-baseline gap-2 leading-none">
        {/* Monospace Bold "HACKER HOUSE" */}
        <span className={`font-mono font-black tracking-tighter text-[#E8F3EC] drop-shadow-md ${sizeClasses.hh}`}>
          HACKER HOUSE
        </span>

        {/* Display Condensed "GOA" with Neon Pink Devanagari Goa Sticker Badge */}
        <div className="relative inline-flex items-baseline">
          {/* Neon Pink Rotated Sticker Badge (from reference image 1) */}
          <div className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 -rotate-6 px-2.5 py-0.5 rounded-md bg-[#FF007A] text-[#FFE600] border border-[#FF69B4] shadow-[0_0_15px_rgba(255,0,122,0.85)] pointer-events-none font-bold text-xs sm:text-sm tracking-wider z-10 flex items-center gap-1">
            <svg
              width={sizeClasses.devW}
              height={sizeClasses.devH}
              viewBox="0 0 125 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 4 8 H 120 M 18 8 V 30 C 18 36 10 36 10 30 C 10 24 18 24 18 24 M 34 8 V 46 M 50 8 V 46 M 50 8 C 42 -8 34 -8 28 -6 M 85 8 V 46 M 85 24 C 72 24 72 38 85 38 M 105 8 V 46" />
            </svg>
          </div>

          <span className={`font-display font-black tracking-tight text-[#FFC24B] drop-shadow-lg ${sizeClasses.goa}`}>
            GOA
          </span>
        </div>

      </div>

      {/* Signal-Wave Animated Underline (Recurring Motif) */}
      <div className="w-full mt-1 overflow-hidden">
        <svg
          viewBox="0 0 300 24"
          fill="none"
          className="w-full h-auto"
          style={{ maxHeight: sizeClasses.waveH }}
        >
          <motion.path
            d="M 0 12 Q 37.5 2, 75 12 T 150 12 T 225 12 T 300 12"
            stroke={waveColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "300", strokeDashoffset: live ? "300" : "0" }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}


