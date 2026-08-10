"use client";

import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

export function FormatToggle() {
  const format = useGeneratorStore((s) => s.format);
  const setFormat = useGeneratorStore((s) => s.setFormat);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  return (
    <div
      role="radiogroup"
      aria-label="Graphic format selection"
      className="flex w-full rounded-2xl p-1.5 border shadow-inner backdrop-blur-md transition-colors duration-250"
      style={{
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.border
      }}
    >
      <button
        type="button"
        role="radio"
        aria-checked={format === "pfp-frame"}
        onClick={() => setFormat("pfp-frame")}
        className="flex-1 rounded-xl py-3 px-4 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer border"
        style={{
          backgroundColor: format === "pfp-frame" ? theme.colors.accent : "transparent",
          color: format === "pfp-frame" ? theme.colors.accentGlow : theme.colors.textSecondary,
          borderColor: format === "pfp-frame" ? theme.colors.accentGlow : "transparent"
        }}
      >
        PFP Frame (1:1)
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={format === "builder-card"}
        onClick={() => setFormat("builder-card")}
        className="flex-1 rounded-xl py-3 px-4 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer border"
        style={{
          backgroundColor: format === "builder-card" ? theme.colors.accent : "transparent",
          color: format === "builder-card" ? theme.colors.accentGlow : theme.colors.textSecondary,
          borderColor: format === "builder-card" ? theme.colors.accentGlow : "transparent"
        }}
      >
        Builder Pass Ticket (4:5)
      </button>
    </div>
  );
}


