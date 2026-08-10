import type { ButtonHTMLAttributes } from "react";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

interface BadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
}

export function Badge({ selected = false, label, className, ...props }: BadgeProps) {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  return (
    <button
      type="button"
      className={`rounded-full px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-150 cursor-pointer select-none border ${className || ""}`}
      style={{
        backgroundColor: selected ? theme.colors.accent : theme.colors.cardBg,
        color: selected ? theme.colors.accentGlow : theme.colors.textSecondary,
        borderColor: selected ? theme.colors.accentGlow : theme.colors.border
      }}
      {...props}
    >
      {label}
    </button>
  );
}


