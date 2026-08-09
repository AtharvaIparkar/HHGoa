"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UploadZone } from "@/components/upload/UploadZone";
import { FormatToggle } from "@/components/generator/FormatToggle";
import { PhotoEditorCanvas } from "@/components/generator/PhotoEditorCanvas";
import { ThemeSwatchGrid } from "@/components/generator/ThemeSwatchGrid";
import { IDCardForm } from "@/components/generator/IDCardForm";
import { FrameCompositor } from "@/components/generator/FrameCompositor";
import { ShareButton } from "@/components/generator/ShareButton";
import { DownloadButton } from "@/components/generator/DownloadButton";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AntigravitySequence } from "@/components/motion/AntigravitySequence";
import { PalmParallax } from "@/components/motion/PalmParallax";
import { ThemeAnimations } from "@/components/motion/ThemeAnimations";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";

export default function Home() {
  const step = useGeneratorStore((s) => s.step);
  const setStep = useGeneratorStore((s) => s.setStep);
  const format = useGeneratorStore((s) => s.format);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-6 md:py-10 transition-colors duration-300 overflow-x-hidden ambient-sunrise-bg"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text
      }}
    >
      {/* 4-Second Antigravity Opening Sequence */}
      <AntigravitySequence />

      {/* Signature Micro-animations & Parallax */}
      {activeThemeId === "signal" && <PalmParallax />}
      <ThemeAnimations />

      {/* Dot Matrix Halftone Corner Grids (from reference image 1) */}
      <div className="fixed top-0 left-0 w-64 h-64 pointer-events-none opacity-25 bg-[radial-gradient(#7CFF6B_1.5px,transparent_1.5px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_top_left,black_40%,transparent_80%)]" />
      <div className="fixed top-0 right-0 w-64 h-64 pointer-events-none opacity-25 bg-[radial-gradient(#7CFF6B_1.5px,transparent_1.5px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_top_right,black_40%,transparent_80%)]" />
      <div className="fixed bottom-0 left-0 w-64 h-64 pointer-events-none opacity-25 bg-[radial-gradient(#7CFF6B_1.5px,transparent_1.5px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_bottom_left,black_40%,transparent_80%)]" />
      <div className="fixed bottom-0 right-0 w-64 h-64 pointer-events-none opacity-25 bg-[radial-gradient(#7CFF6B_1.5px,transparent_1.5px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_bottom_right,black_40%,transparent_80%)]" />

      {/* Background Devanagari & Ocean Wave Linework Watermarks */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-10">
        <div className="absolute top-10 left-10 text-[160px] font-bold font-mono text-current leading-none opacity-15">
          HACKER
        </div>
        <div className="absolute bottom-10 right-10 text-[180px] font-bold font-display text-current leading-none opacity-20">
          GOA
        </div>

        {/* Devanagari गोवा Watermark */}
        <div className="absolute top-1/3 right-12 text-current opacity-15">
          <svg width="240" height="96" viewBox="0 0 125 50" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 4 8 H 120 M 18 8 V 30 C 18 36 10 36 10 30 C 10 24 18 24 18 24 M 34 8 V 46 M 50 8 V 46 M 50 8 C 42 -8 34 -8 28 -6 M 85 8 V 46 M 85 24 C 72 24 72 38 85 38 M 105 8 V 46" />
          </svg>
        </div>

        {/* Ocean Wave Bottom SVG Linework */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-32 opacity-30" viewBox="0 0 1440 120" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64" />
          <path d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32" />
        </svg>
      </div>


      <main className="relative z-10 w-full max-w-xl flex flex-col gap-6 my-auto">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {/* 1. UPLOAD */}
            {step === "upload" && <UploadZone />}

            {/* 2. CUSTOMIZE */}
            {step === "customize" && (
              <div className="flex flex-col gap-6 w-full">
                <FormatToggle />

                {/* Photo Zoom Editor with Cyber Corner Brackets */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold" style={{ color: theme.colors.accentGlow }}>
                    Photo Crop &amp; Adjustment
                  </span>
                  <PhotoEditorCanvas />
                </div>

                {/* Theme Palette Swatches (Placed AFTER image zoom as requested) */}
                <ThemeSwatchGrid />

                {/* Builder Details (Rearranged cleanly, no AI icons) */}
                {format === "builder-card" && <IDCardForm />}

                <Button
                  variant="tide"
                  size="lg"
                  onClick={() => setStep("result")}
                  className="w-full font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(124,255,107,0.4)] py-4"
                >
                  Generate Graphic →
                </Button>
              </div>
            )}

            {/* 3. RESULT (Replaces everything with final output & export buttons) */}
            {step === "result" && (
              <div className="flex flex-col gap-6 w-full">
                <FrameCompositor />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-4 w-full bg-[#062B1F]/80 border p-5 rounded-3xl backdrop-blur-md shadow-2xl"
                  style={{ borderColor: theme.colors.border }}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-center" style={{ color: theme.colors.accentGlow }}>
                    Export &amp; Share Pass
                  </span>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <DownloadButton onToast={triggerToast} />
                    <ShareButton onToast={triggerToast} />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("customize")}
                    className="w-full font-mono text-xs mt-1"
                  >
                    ← Edit Details / Change Theme
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}




