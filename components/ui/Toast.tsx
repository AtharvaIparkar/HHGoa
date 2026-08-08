"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-ink/90 border border-tide/50 px-5 py-2.5 shadow-2xl backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-tide animate-pulse" />
          <span className="font-mono text-xs text-sand font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
