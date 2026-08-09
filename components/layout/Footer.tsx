"use client";

import { useGeneratorStore } from "@/lib/store";

export function Footer() {
  const replayIntro = useGeneratorStore((s) => s.replayIntro);

  return (
    <footer className="w-full flex flex-col items-center justify-center gap-4 pt-8 border-t border-[#E8F3EC]/15 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-[#7CFF6B]">
        <span>🌊 #FramedInGoa</span>
        <span>•</span>
        <span>Anjuna Beach, Goa</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-xs text-[#E8F3EC]/70">
          Less Noise. More Signal.
        </p>
        <p className="font-mono text-[11px] text-[#E8F3EC]/40 uppercase tracking-wider">
          Organizer Credit: <span className="text-[#FFC24B]">2:47pm Studio</span>
        </p>
      </div>
    </footer>
  );
}

