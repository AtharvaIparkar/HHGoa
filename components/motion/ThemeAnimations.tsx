"use client";

import { useEffect, useState } from "react";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";


export function ThemeAnimations() {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic Cursor Spotlight Effect (hhgoa.com style interactive aura) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.colors.accentGlow}15, transparent 70%)`
        }}
      />



      {/* Sakura Drift: Falling Petals */}
      {activeThemeId === "sakura" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-tr-full rounded-bl-full bg-[#C92A54]/40"
              style={{
                left: `${(i * 7) + 2}%`,
                top: `-20px`,
                animation: `fallingPetal ${5 + (i % 4)}s linear infinite`,
                animationDelay: `${(i * 0.5)}s`
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
      )}

      {/* Monsoon Neon: Rain Streaks */}
      {activeThemeId === "monsoon" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
          <div className="w-full h-full bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
        </div>
      )}

      {/* Synthwave Tide: Grid Horizon */}
      {activeThemeId === "synthwave" && (
        <div className="fixed inset-x-0 bottom-0 h-48 pointer-events-none overflow-hidden z-0 opacity-30">
          <div className="w-full h-full bg-[linear-gradient(to_right,#00F0FF_1px,transparent_1px),linear-gradient(to_bottom,#FF0055_1px,transparent_1px)] [background-size:24px_24px] [perspective:100px] [transform:rotateX(60deg)]" />
        </div>
      )}

      {/* Vintage Boarding: Paper Grain overlay */}
      {activeThemeId === "vintage" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15 mix-blend-multiply">
          <div className="w-full h-full bg-[radial-gradient(#2C1810_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>
      )}

      {/* Terminal Midnight: Scan lines */}
      {activeThemeId === "terminal" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] [background-size:100%_4px]" />
      )}
    </>
  );
}

