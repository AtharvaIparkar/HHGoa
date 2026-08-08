import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "tide";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary: "bg-sunset text-ink font-semibold hover:bg-sunset/90 shadow-md shadow-sunset/20",
  secondary: "bg-sand text-ink font-semibold hover:bg-sand/90 shadow-md shadow-sand/10",
  ghost: "bg-transparent text-sand border border-sand/30 hover:border-sand/60 hover:bg-sand/10",
  tide: "bg-tide text-ink font-bold hover:bg-tide/90 tide-glow"
} as const;

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
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
        "inline-flex items-center justify-center gap-2 rounded-full font-display tracking-wider uppercase transition-all duration-200",
        "active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-tide cursor-pointer",
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
