"use client";

import { useGeneratorStore, type StudioStep } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { ProgressWave } from "@/components/ui/ProgressWave";

const STEPS: { step: StudioStep; label: string; icon: string }[] = [
  { step: 1, label: "UPLOAD", icon: "📁" },
  { step: 2, label: "ADJUST", icon: "🔍" },
  { step: 3, label: "THEME", icon: "🎨" },
  { step: 4, label: "DETAILS", icon: "✍️" },
  { step: 5, label: "EXPORT", icon: "🚀" }
];

export function Stepper() {
  const studioStep = useGeneratorStore((s) => s.studioStep);
  const setStudioStep = useGeneratorStore((s) => s.setStudioStep);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const progressPercentage = ((studioStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full flex flex-col gap-2 select-none my-2">
      {/* Signal Wave Line connecting the steps */}
      <ProgressWave progress={progressPercentage} color={theme.colors.accentGlow} className="px-2" />

      {/* Step Nodes */}
      <div className="grid grid-cols-5 gap-1 text-center">
        {STEPS.map(({ step, label, icon }) => {
          const isActive = step === studioStep;
          const isDone = step < studioStep;

          return (
            <button
              key={step}
              type="button"
              onClick={() => setStudioStep(step)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer group focus-visible:outline focus-visible:outline-2 ${
                isActive ? "scale-105" : "hover:opacity-100 opacity-70"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0B6839] text-[#7CFF6B] border-2 border-[#7CFF6B] shadow-[0_0_12px_rgba(124,255,107,0.5)]"
                    : isDone
                    ? "bg-[#0B6839]/60 text-[#E8F3EC] border border-[#7CFF6B]/40"
                    : "bg-[#062B1F]/80 text-[#E8F3EC]/50 border border-[#E8F3EC]/20"
                }`}
                style={{
                  backgroundColor: isActive ? theme.colors.accent : isDone ? "rgba(11, 104, 57, 0.4)" : undefined,
                  borderColor: isActive ? theme.colors.accentGlow : isDone ? theme.colors.accentGlow : undefined,
                  color: isActive ? theme.colors.accentGlow : theme.colors.text
                }}
              >
                {icon}
              </div>

              <span
                className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase truncate max-w-full"
                style={{
                  color: isActive ? theme.colors.accentGlow : isDone ? theme.colors.text : theme.colors.textSecondary,
                  fontWeight: isActive ? "bold" : "normal"
                }}
              >
                {step}. {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
