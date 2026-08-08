"use client";

import { useEffect, useState } from "react";
import { compositeFrame } from "@/lib/canvas-utils";
import { useGeneratorStore } from "@/lib/store";
import { TideReveal } from "@/components/motion/TideReveal";
import { motion } from "framer-motion";

export function FrameCompositor() {
  const photoObjectUrl = useGeneratorStore((s) => s.photoObjectUrl);
  const format = useGeneratorStore((s) => s.format);
  const builder = useGeneratorStore((s) => s.builder);
  const setResult = useGeneratorStore((s) => s.setResult);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "working" | "done">("idle");

  useEffect(() => {
    if (!photoObjectUrl) return;

    setStatus("working");

    const frameSrc =
      format === "pfp-frame"
        ? "/assets/frames/pfp-frame.svg"
        : "/assets/frames/builder-card.svg";

    let active = true;

    compositeFrame({
      photoSrc: photoObjectUrl,
      format,
      frameSrc,
      builder
    })
      .then((blob) => {
        if (!active) return;
        setResult(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setStatus("done");
      })
      .catch((err) => {
        console.error("Compositing failed:", err);
        setStatus("idle");
      });

    return () => {
      active = false;
    };
  }, [photoObjectUrl, format, builder, setResult]);

  if (status === "idle") return null;

  if (status === "working") {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl gap-3 w-full text-center">
        <div className="h-8 w-8 rounded-full border-2 border-tide border-t-transparent animate-spin" />
        <motion.p
          className="font-mono text-sm text-sand/80"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
        >
          compositing your Goa graphic…
        </motion.p>
      </div>
    );
  }

  return (
    <TideReveal>
      <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-sand/20">
        <img
          src={previewUrl!}
          alt="Your HH Goa 2026 branded graphic"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>
    </TideReveal>
  );
}
