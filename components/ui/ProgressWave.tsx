"use client";

import { motion } from "framer-motion";

interface ProgressWaveProps {
  progress?: number; // 0 to 100
  color?: string;
  className?: string;
}

export function ProgressWave({
  progress = 50,
  color = "#7CFF6B",
  className = ""
}: ProgressWaveProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 20" fill="none" className="w-full h-5">
        {/* Background faint wave */}
        <path
          d="M 0 10 Q 50 2, 100 10 T 200 10 T 300 10 T 400 10"
          stroke="rgba(232, 243, 236, 0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Animated active wave pulse */}
        <motion.path
          d="M 0 10 Q 50 2, 100 10 T 200 10 T 300 10 T 400 10"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
