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
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-[#062B1F]/95 border border-[#7CFF6B]/50 px-5 py-3 shadow-[0_0_25px_rgba(11,104,57,0.5)] backdrop-blur-md"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#7CFF6B] animate-pulse" />
          <span className="font-mono text-xs text-[#E8F3EC] font-bold tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

