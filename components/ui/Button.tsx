import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "tide";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary: "bg-[#0B6839] text-[#E8F3EC] font-bold border border-[#7CFF6B]/50 hover:bg-[#0B6839]/90 shadow-[0_0_20px_rgba(11,104,57,0.4)]",
  secondary: "border-2 border-[#FFC24B] bg-[#062B1F]/60 text-[#FFC24B] font-bold hover:bg-[#FFC24B]/10",
  ghost: "bg-transparent text-[#E8F3EC]/70 hover:text-[#7CFF6B] border border-[#E8F3EC]/20 hover:border-[#7CFF6B]/40",
  tide: "bg-[#7CFF6B] text-[#062B1F] font-bold hover:bg-[#7CFF6B]/90 shadow-[0_0_20px_rgba(124,255,107,0.4)]"
} as const;

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base"
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-mono tracking-wider uppercase transition-all duration-200",
        "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B] cursor-pointer",
        "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

