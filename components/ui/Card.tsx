import { clsx } from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ticket" | "glow";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 transition-all duration-300",
        variant === "default" && "glass-card shadow-xl",
        variant === "ticket" && "glass-card border-dashed border-sand/40 relative overflow-hidden",
        variant === "glow" && "glass-card tide-glow border-tide/50",
        className
      )}
    >
      {children}
    </div>
  );
}
