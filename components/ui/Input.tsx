import type { InputHTMLAttributes } from "react";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({ label, helperText, error, className, id, ...props }: InputProps) {
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wider" style={{ color: theme.colors.textSecondary }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border px-4 py-3 font-mono text-sm transition-colors focus:outline-none focus:ring-2 ${className || ""}`}
        style={{
          backgroundColor: theme.colors.bg,
          color: theme.colors.text,
          borderColor: error ? "#FF6F4C" : theme.colors.border
        }}
        {...props}
      />
      {helperText && !error && (
        <span className="font-mono text-[10px]" style={{ color: theme.colors.textSecondary }}>{helperText}</span>
      )}
      {error && (
        <span role="alert" className="font-mono text-[11px] text-[#FF6F4C]">
          {error}
        </span>
      )}
    </div>
  );
}


