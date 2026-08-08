import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface BadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
}

export function Badge({ selected = false, label, className, ...props }: BadgeProps) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-full px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-150 cursor-pointer select-none",
        selected
          ? "bg-tide text-ink font-bold shadow-sm"
          : "bg-monsoon/90 text-sand/80 border border-sand/30 hover:border-tide hover:text-tide",
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}
