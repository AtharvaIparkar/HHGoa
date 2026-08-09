"use client";

import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

export function ThemeAnimations() {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  // Sakura Drift: ~12 CSS Falling Petals
  if (activeThemeId === "sakura") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-tr-full rounded-bl-full bg-[#FFB7C5]/40 animate-pulse"
            style={{
              left: `${(i * 8.3) + 4}%`,
              top: `-20px`,
              animation: `fallingPetal ${6 + (i % 5)}s linear infinite`,
              animationDelay: `${(i * 0.7)}s`
            }}
          />
        ))}
        <style jsx>{`
          @keyframes fallingPetal {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
            100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  // Monsoon Neon: Rain Streaks
  if (activeThemeId === "monsoon") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        <div className="w-full h-full bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
      </div>
    );
  }

  // Synthwave Tide: Grid Horizon
  if (activeThemeId === "synthwave") {
    return (
      <div className="fixed inset-x-0 bottom-0 h-48 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="w-full h-full bg-[linear-gradient(to_right,#00F0FF_1px,transparent_1px),linear-gradient(to_bottom,#FF0055_1px,transparent_1px)] [background-size:24px_24px] [perspective:100px] [transform:rotateX(60deg)]" />
      </div>
    );
  }

  // Vintage Boarding: Paper Grain overlay
  if (activeThemeId === "vintage") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15 mix-blend-multiply">
        <div className="w-full h-full bg-[radial-gradient(#2C1810_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>
    );
  }

  // Terminal Midnight: Scan lines
  if (activeThemeId === "terminal") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] [background-size:100%_4px]" />
    );
  }

  return null;
}
