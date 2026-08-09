"use client";

import { clsx } from "clsx";
import { useGeneratorStore, type Format } from "@/lib/store";

export function FormatToggle() {
  const format = useGeneratorStore((s) => s.format);
  const setFormat = useGeneratorStore((s) => s.setFormat);

  return (
    <div
      role="radiogroup"
      aria-label="Graphic format selection"
      className="flex w-full rounded-2xl bg-[#062B1F]/90 p-1.5 border border-[#E8F3EC]/20 shadow-inner"
    >
      <button
        type="button"
        role="radio"
        aria-checked={format === "pfp-frame"}
        onClick={() => setFormat("pfp-frame")}
        className={clsx(
          "flex-1 rounded-xl py-3 px-4 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B]",
          format === "pfp-frame"
            ? "bg-[#0B6839] text-[#7CFF6B] border border-[#7CFF6B]/40 shadow-[0_0_15px_rgba(11,104,57,0.4)]"
            : "text-[#E8F3EC]/70 hover:text-[#E8F3EC] hover:bg-[#E8F3EC]/10"
        )}
      >
        🖼️ PFP Frame (1:1)
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={format === "builder-card"}
        onClick={() => setFormat("builder-card")}
        className={clsx(
          "flex-1 rounded-xl py-3 px-4 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B]",
          format === "builder-card"
            ? "bg-[#0B6839] text-[#7CFF6B] border border-[#7CFF6B]/40 shadow-[0_0_15px_rgba(11,104,57,0.4)]"
            : "text-[#E8F3EC]/70 hover:text-[#E8F3EC] hover:bg-[#E8F3EC]/10"
        )}
      >
        🪪 Builder ID Card (4:5)
      </button>
    </div>
  );
}

