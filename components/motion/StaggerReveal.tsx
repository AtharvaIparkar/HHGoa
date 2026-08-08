"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function StaggerReveal({ children, delay = 0, className }: StaggerRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
