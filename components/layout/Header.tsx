"use client";

import { useGeneratorStore, type Step } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { Wordmark } from "@/components/ui/Wordmark";

const STEPS: { id: Step; label: string }[] = [
  { id: "upload", label: "1. UPLOAD" },
  { id: "customize", label: "2. CUSTOMIZE" },
  { id: "result", label: "3. RESULT" }
];

export function Header() {
  const step = useGeneratorStore((s) => s.step);
  const setStep = useGeneratorStore((s) => s.setStep);
  const photoObjectUrl = useGeneratorStore((s) => s.photoObjectUrl);
  const reset = useGeneratorStore((s) => s.reset);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const currentStepIndex = step === "upload" ? 0 : step === "customize" ? 1 : 2;

  return (
    <header className="w-full flex flex-col gap-4 border-b pb-5 transition-colors duration-250" style={{ borderColor: theme.colors.border }}>
      {/* Brand Top Lockup */}
      <div className="flex items-center justify-between gap-3">
        <Wordmark size="sm" waveColor={theme.colors.accentGlow} goldColor={theme.colors.secondaryAccent} />

        {photoObjectUrl && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-xs hover:underline cursor-pointer border px-3 py-1 rounded-full transition-all"
            style={{
              color: theme.colors.textSecondary,
              borderColor: theme.colors.border
            }}
          >
            ← Start Over
          </button>
        )}
      </div>

      {/* Main Title & Subtitle (Exact layout from user reference image) */}
      <div className="flex flex-col gap-1 mt-1">
        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#E8F3EC] uppercase leading-none">
          FRAME / ID CARD
        </h1>
        <p className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color: theme.colors.accentGlow }}>
          LESS NOISE. MORE SIGNAL.
        </p>
      </div>

      {/* 3-Step Progress Indicator (Exact layout from user reference image) */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {STEPS.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isDone = idx < currentStepIndex;
          return (
            <button
              key={s.id}
              type="button"
              disabled={!photoObjectUrl && s.id !== "upload"}
              onClick={() => setStep(s.id)}
              className="flex flex-col gap-2 text-left cursor-pointer group disabled:cursor-not-allowed"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "shadow-[0_0_12px_rgba(124,255,107,0.7)]"
                    : isDone
                    ? "opacity-80"
                    : "opacity-25"
                }`}
                style={{
                  backgroundColor: isActive ? theme.colors.accentGlow : isDone ? theme.colors.accent : theme.colors.border
                }}
              />
              <span
                className="font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                style={{
                  color: isActive ? theme.colors.accentGlow : isDone ? theme.colors.text : theme.colors.textSecondary
                }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
}




