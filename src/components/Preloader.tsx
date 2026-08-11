"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setHidden(true);
          onComplete();
        }, 600);
      } else {
        setProgress(current);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`} id="preloader">
      <div className="preloader-goa-backdrop">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <path
            d="M-100,520 Q350,470 720,530 Q1100,470 1600,520 L1600,900 L-100,900 Z"
            fill="#01361b"
            opacity="0.95"
          />
          <path
            d="M-100,600 Q350,560 720,610 Q1100,560 1600,600 L1600,900 L-100,900 Z"
            fill="#011b0e"
            opacity="0.98"
          />
          <path
            d="M-100,670 Q350,640 720,675 Q1100,640 1600,670 L1600,900 L-100,900 Z"
            fill="#FFF8EB"
            opacity="0.12"
          />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <h1 className="preloader-title-main">HACKER HOUSE</h1>
          <div className="preloader-stamp-overlay">गोवा</div>
        </div>
        <div className="preloader-subtitle" style={{ marginTop: "18px" }}>
          GOA 2026 • CARD GENERATOR
        </div>

        <div className="preloader-track" style={{ margin: "24px auto 0" }}>
          <div
            className="preloader-bar"
            id="preloaderBar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
