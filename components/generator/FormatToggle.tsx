"use client";

import { clsx } from "clsx";
import { useGeneratorStore, type Format } from "@/lib/store";

export function FormatToggle() {
  const format = useGeneratorStore((s) => s.format);
  const setFormat = useGeneratorStore((s) => s.setFormat);

  return (
    <div className="flex w-full rounded-2xl bg-monsoon/80 p-1.5 border border-sand/20 shadow-inner">
      <button
        type="button"
        onClick={() => setFormat("pfp-frame")}
        className={clsx(
          "flex-1 rounded-xl py-2.5 px-4 font-display text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer",
          format === "pfp-frame"
            ? "bg-tide text-ink font-bold shadow-md"
            : "text-sand/70 hover:text-sand hover:bg-sand/10"
        )}
      >
        PFP Frame (1:1)
      </button>
      <button
        type="button"
        onClick={() => setFormat("builder-card")}
        className={clsx(
          "flex-1 rounded-xl py-2.5 px-4 font-display text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer",
          format === "builder-card"
            ? "bg-tide text-ink font-bold shadow-md"
            : "text-sand/70 hover:text-sand hover:bg-sand/10"
        )}
      >
        Builder ID Card (4:5)
      </button>
    </div>
  );
}
