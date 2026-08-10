"use client";

import { useGeneratorStore } from "@/lib/store";
import { THEMES, type ThemeConfig, type ThemeId } from "@/lib/themes";

interface SwatchProps {
  themeConfig: ThemeConfig;
  selected: boolean;
  onSelect: () => void;
}

function ThemeSwatchItem({
  themeConfig,
  selected,
  onSelect
}: SwatchProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`Select ${themeConfig.name} theme`}
      onClick={onSelect}
      className={`relative flex items-center justify-between p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left overflow-hidden ${
        selected
          ? "scale-[1.02] shadow-lg"
          : "border-opacity-30 hover:border-opacity-70 hover:scale-[1.01]"
      }`}
      style={{
        backgroundColor: themeConfig.colors.cardBg,
        borderColor: selected ? themeConfig.colors.accentGlow : themeConfig.colors.border
      }}
    >
      <div className="flex flex-col gap-0.5 max-w-[70%]">
        <span
          className="font-mono text-xs font-bold truncate flex items-center gap-1.5"
          style={{ color: themeConfig.colors.text }}
        >
          {selected && <span style={{ color: themeConfig.colors.accentGlow }}>✓</span>}
          {themeConfig.name}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-wider truncate"
          style={{ color: themeConfig.colors.textSecondary }}
        >
          {themeConfig.subtitle}
        </span>
      </div>

      {/* Palette Color Circles */}
      <div className="flex items-center gap-1">
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
          style={{ backgroundColor: themeConfig.colors.bg }}
        />
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
          style={{ backgroundColor: themeConfig.colors.accentGlow }}
        />
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
          style={{ backgroundColor: themeConfig.colors.secondaryAccent }}
        />
      </div>
    </button>
  );
}

export function ThemeSwatchGrid() {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const setTheme = useGeneratorStore((s) => s.setTheme);
  const activeTheme = THEMES[activeThemeId] || THEMES.signal;
  const themeList = Object.values(THEMES);

  return (
    <div
      className="flex flex-col gap-2.5 w-full border p-4 rounded-3xl backdrop-blur-md shadow-xl transition-colors duration-250"
      style={{
        backgroundColor: activeTheme.colors.cardBg,
        borderColor: activeTheme.colors.border
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.colors.accentGlow }}>
          THEME PALETTES
        </span>

        <span className="font-mono text-[10px]" style={{ color: activeTheme.colors.textSecondary }}>
          6 Styles • Live Preview
        </span>
      </div>

      {/* 6 Theme Swatches Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
        {themeList.map((t) => (
          <ThemeSwatchItem
            key={t.id}
            themeConfig={t}
            selected={activeThemeId === t.id}
            onSelect={() => setTheme(t.id as ThemeId)}
          />
        ))}
      </div>
    </div>
  );
}


