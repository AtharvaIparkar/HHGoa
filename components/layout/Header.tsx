"use client";

import { useGeneratorStore } from "@/lib/store";

export function Header() {
  const step = useGeneratorStore((s) => s.step);
  const reset = useGeneratorStore((s) => s.reset);

  const steps = [
    { id: "upload", label: "1. Upload" },
    { id: "customize", label: "2. Customize" },
    { id: "result", label: "3. Result" }
  ];

  const currentStepIndex = step === "upload" ? 0 : step === "customize" || step === "generate" ? 1 : 2;

  return (
    <header className="w-full flex flex-col gap-4 border-b border-sand/15 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-tide tide-glow animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-tide">
            HH Goa 2026
          </span>
        </div>

        {step !== "upload" && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-xs text-sand/60 hover:text-tide transition-colors cursor-pointer"
          >
            ← Start Over
          </button>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-sand tracking-tight leading-tight">
            Build your frame
          </h1>
          <p className="font-body text-xs text-sand/70 mt-1">
            Low tide at Anjuna • Official builder card &amp; avatar generator
          </p>
        </div>
      </div>

      {/* Step Indicator Bar */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isDone = idx < currentStepIndex;
          return (
            <div key={s.id} className="flex flex-col gap-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-tide shadow-sm shadow-tide/50"
                    : isDone
                    ? "bg-sunset"
                    : "bg-monsoon/60 border border-sand/20"
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  isActive ? "text-tide font-bold" : isDone ? "text-sunset" : "text-sand/40"
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
