"use client";

import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

interface ZoomSliderProps {
  value: number; // 100 to 250
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export function ZoomSlider({
  value,
  onChange,
  min = 100,
  max = 250
}: ZoomSliderProps) {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  return (
    <div
      className="flex items-center gap-3 w-full border px-4 py-2.5 rounded-2xl backdrop-blur-md transition-colors duration-250"
      style={{
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.border
      }}
    >
      <span className="font-mono text-xs font-bold" style={{ color: theme.colors.text }}>
        Zoom
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Photo zoom level"
        className="w-full cursor-pointer h-2 rounded-lg appearance-none focus:outline-none"
        style={{
          accentColor: theme.colors.accentGlow,
          backgroundColor: theme.colors.bg
        }}
      />
      <span className="font-mono text-xs font-bold min-w-[45px] text-right" style={{ color: theme.colors.accentGlow }}>
        {value}%
      </span>
    </div>
  );
}

