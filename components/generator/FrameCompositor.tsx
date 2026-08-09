"use client";

import { useEffect, useState } from "react";
import { compositeFrame } from "@/lib/canvas-utils";
import { useGeneratorStore } from "@/lib/store";
import { GenerationReveal } from "@/components/motion/GenerationReveal";

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
      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-3xl gap-4 w-full text-center border border-[#E8F3EC]/20 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-[#7CFF6B] border-t-transparent animate-spin" />
          <div className="absolute h-6 w-6 rounded-full bg-[#0B6839]/60 animate-ping" />
        </div>
        <p className="font-mono text-xs font-bold text-[#7CFF6B] tracking-wider uppercase">
          COMPOSITING_GRAPHIC // CLIENT_SIDE
        </p>
        <p className="font-body text-xs text-[#E8F3EC]/70">
          Zero server compute • High-DPI canvas render
        </p>
      </div>
    );
  }

  return (
    <GenerationReveal className="w-full">
      <img
        src={previewUrl!}
        alt="HH Goa 2026 composited graphic"
        className="w-full h-auto object-contain rounded-3xl"
      />
    </GenerationReveal>
  );
}

