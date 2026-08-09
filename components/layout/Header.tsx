"use client";

import { useGeneratorStore } from "@/lib/store";
import { OdometerCounter } from "@/components/motion/OdometerCounter";

export function Header() {
  const step = useGeneratorStore((s) => s.step);
  const reset = useGeneratorStore((s) => s.reset);

  const steps = [
    { id: "upload", label: "1. UPLOAD" },
    { id: "customize", label: "2. CUSTOMIZE" },
    { id: "result", label: "3. RESULT" }
  ];

  const currentStepIndex = step === "upload" ? 0 : step === "customize" || step === "generate" ? 1 : 2;

  return (
    <header className="w-full flex flex-col gap-5 border-b border-[#E8F3EC]/15 pb-6">
      {/* Brand Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Devanagari गोवा Thin Gold Linework Mark */}
          <div className="flex items-center gap-2 border border-[#FFC24B]/40 bg-[#062B1F]/80 px-2.5 py-1 rounded-full backdrop-blur-md">
            <span className="font-mono text-xs font-bold text-[#FFC24B] tracking-widest uppercase">
              HACKER HOUSE GOA 2026
            </span>
          </div>
        </div>

        {step !== "upload" && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-xs text-[#E8F3EC]/70 hover:text-[#7CFF6B] transition-colors cursor-pointer border border-[#E8F3EC]/20 hover:border-[#7CFF6B]/50 px-3 py-1 rounded-full"
          >
            ← Start Over
          </button>
        )}
      </div>

      {/* Main Title & Live Stats */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-[#E8F3EC] tracking-tight leading-none uppercase">
            Frame / ID Card
          </h1>
          <p className="font-mono text-xs text-[#7CFF6B] mt-1.5 flex items-center gap-2">
            <span>LESS NOISE. MORE SIGNAL.</span>
          </p>
        </div>
      </div>

      {/* Step Indicator Bar */}
      <div className="grid grid-cols-3 gap-2.5 mt-1">
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isDone = idx < currentStepIndex;
          return (
            <div key={s.id} className="flex flex-col gap-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#7CFF6B] shadow-[0_0_12px_rgba(124,255,107,0.6)]"
                    : isDone
                    ? "bg-[#0B6839]"
                    : "bg-[#062B1F]/80 border border-[#E8F3EC]/20"
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  isActive ? "text-[#7CFF6B] font-bold" : isDone ? "text-[#0B6839]" : "text-[#E8F3EC]/40"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

