"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`preloader ${progress >= 100 ? "hidden" : ""}`}>
      <div className="preloader-title-main">HACKER HOUSE</div>
      <div className="preloader-stamp-overlay">गोवा</div>
      <div className="preloader-subtitle" style={{ marginTop: 24 }}>
        OCTOBER 28–31, 2026 • GOA, INDIA
      </div>

      <div className="preloader-track" style={{ marginTop: 20 }}>
        <div className="preloader-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
