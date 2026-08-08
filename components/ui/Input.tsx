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
        <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wider text-sand/80">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "w-full rounded-xl bg-monsoon/80 border px-4 py-3 font-body text-sm text-sand placeholder:text-sand/40 transition-colors focus:outline-none focus:ring-2 focus:ring-tide focus:border-transparent",
          error ? "border-sunset" : "border-sand/30 hover:border-sand/50",
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <span className="font-mono text-[10px] text-sand/50">{helperText}</span>
      )}
      {error && (
        <span role="alert" className="font-mono text-[11px] text-sunset">
          {error}
        </span>
      )}
    </div>
  );
}
