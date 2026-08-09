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
        "rounded-full px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-150 cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B]",
        selected
          ? "bg-[#0B6839] text-[#7CFF6B] border border-[#7CFF6B] font-bold shadow-[0_0_12px_rgba(11,104,57,0.4)]"
          : "bg-[#062B1F]/90 text-[#E8F3EC]/80 border border-[#E8F3EC]/30 hover:border-[#FFC24B] hover:text-[#FFC24B]",
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}

