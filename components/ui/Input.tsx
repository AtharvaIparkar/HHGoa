import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({ label, helperText, error, className, id, ...props }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wider text-[#E8F3EC]/80">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "w-full rounded-xl bg-[#062B1F]/90 border px-4 py-3 font-mono text-sm text-[#E8F3EC] placeholder:text-[#E8F3EC]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7CFF6B] focus:border-transparent",
          error ? "border-[#FF6F4C]" : "border-[#E8F3EC]/30 hover:border-[#FFC24B]",
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <span className="font-mono text-[10px] text-[#E8F3EC]/50">{helperText}</span>
      )}
      {error && (
        <span role="alert" className="font-mono text-[11px] text-[#FF6F4C]">
          {error}
        </span>
      )}
    </div>
  );
}

