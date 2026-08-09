"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UploadZone } from "@/components/upload/UploadZone";
import { PhotoPreview } from "@/components/upload/PhotoPreview";
import { FormatToggle } from "@/components/generator/FormatToggle";
import { IDCardForm } from "@/components/generator/IDCardForm";
import { FrameCompositor } from "@/components/generator/FrameCompositor";
import { ShareButton } from "@/components/generator/ShareButton";
import { DownloadButton } from "@/components/generator/DownloadButton";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AntigravitySequence } from "@/components/motion/AntigravitySequence";
import { PalmParallax } from "@/components/motion/PalmParallax";
import { useGeneratorStore } from "@/lib/store";

export default function Home() {
  const step = useGeneratorStore((s) => s.step);
  const setStep = useGeneratorStore((s) => s.setStep);
  const format = useGeneratorStore((s) => s.format);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
  }

  return (
    <div className="relative min-h-screen bg-[#062B1F] text-[#E8F3EC] flex flex-col items-center justify-between px-4 sm:px-6 py-8 md:py-12 ambient-sunrise-bg">
      {/* 4-Second Antigravity Opening Sequence */}
      <AntigravitySequence />

      {/* Layer 2: Palm Parallax background */}
      <PalmParallax />

      <main className="relative z-10 w-full max-w-lg flex flex-col gap-8 my-auto">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={step + "-" + format}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {/* Step 1: Upload */}
            {step === "upload" && <UploadZone />}

            {/* Step 2: Customize */}
            {step === "customize" && (
              <div className="flex flex-col gap-6 w-full">
                <FormatToggle />
                <PhotoPreview />
                {format === "builder-card" && <IDCardForm />}
                <Button
                  variant="tide"
                  size="lg"
                  onClick={() => setStep("generate")}
                  className="w-full mt-2 text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(124,255,107,0.4)]"
                >
                  Generate Graphic →
                </Button>
              </div>
            )}

            {/* Step 3: Generate & Result */}
            {(step === "generate" || step === "result") && (
              <div className="flex flex-col gap-6 w-full">
                <FrameCompositor />

                {step === "result" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-4 w-full"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <DownloadButton onToast={triggerToast} />
                      <ShareButton onToast={triggerToast} />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("customize")}
                      className="w-full mt-1 font-mono text-xs"
                    >
                      ← Edit details / change format
                    </Button>
                  </motion.div>
                )}
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

