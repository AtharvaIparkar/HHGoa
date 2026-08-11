"use client";

import React from "react";

interface WordmarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  live?: boolean;
  className?: string;
  waveColor?: string;
  goldColor?: string;
}

export function Wordmark({
  size = "md",
  className = "",
  waveColor = "#7CFF6B",
}: WordmarkProps) {
  const sizeClasses = {
    sm: { hh: "text-base sm:text-lg", goa: "text-2xl sm:text-3xl", devW: 42, devH: 18, waveH: 12 },
    md: { hh: "text-xl sm:text-2xl", goa: "text-4xl sm:text-5xl", devW: 64, devH: 26, waveH: 16 },
    lg: { hh: "text-3xl sm:text-4xl", goa: "text-6xl sm:text-7xl", devW: 90, devH: 36, waveH: 22 },
    hero: { hh: "text-4xl sm:text-6xl md:text-7xl", goa: "text-7xl sm:text-8xl md:text-[100px]", devW: 120, devH: 48, waveH: 28 }
  }[size];

  return (
    <div className={`wordmark-lockup ${className}`}>
      <div className="wordmark-row">
        <span className="wordmark-hh">HACKER HOUSE</span>
        <div className="wordmark-goa-wrapper">
          <div className="wordmark-sticker-badge">
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
          <span className="wordmark-goa">GOA</span>
        </div>
      </div>
      <div className="wordmark-wave-wrapper">
        <svg viewBox="0 0 300 24" fill="none" className="wordmark-wave-svg">
          <path
            d="M 0 12 Q 37.5 2, 75 12 T 150 12 T 225 12 T 300 12"
            stroke={waveColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="wordmark-wave-path"
          />
        </svg>
      </div>
    </div>
  );
}
