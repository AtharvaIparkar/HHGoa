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
import { useGeneratorStore } from "@/lib/store";
import { motion as tokens } from "@/lib/design-tokens";

export default function Home() {
  const step = useGeneratorStore((s) => s.step);
  const setStep = useGeneratorStore((s) => s.setStep);
  const format = useGeneratorStore((s) => s.format);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
  }

  return (
    <div className="min-h-screen bg-monsoon text-sand flex flex-col items-center justify-between px-5 py-8 md:py-12">
      <main className="w-full max-w-lg flex flex-col gap-8 my-auto">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={step + "-" + format}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: tokens.base, ease: tokens.easeOut }}
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
                  className="w-full mt-2"
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
                    className="flex flex-col gap-3 w-full"
                  >
                    <div className="flex gap-3 w-full">
                      <DownloadButton onToast={triggerToast} />
                      <ShareButton onToast={triggerToast} />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("customize")}
                      className="w-full mt-1"
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
