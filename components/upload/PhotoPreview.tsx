"use client";

import { useGeneratorStore } from "@/lib/store";

export function PhotoPreview() {
  const photoObjectUrl = useGeneratorStore((s) => s.photoObjectUrl);
  const photoFile = useGeneratorStore((s) => s.photoFile);
  const reset = useGeneratorStore((s) => s.reset);

  if (!photoObjectUrl) return null;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#FFC24B]/40 aspect-square w-48 shadow-xl">
        <img
          src={photoObjectUrl}
          alt="Uploaded preview"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062B1F]/90 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-[#7CFF6B] bg-[#062B1F]/90 px-2.5 py-0.5 rounded-full border border-[#7CFF6B]/30">
          {photoFile?.name ? photoFile.name.substring(0, 16) : "Photo ready"}
        </span>
      </div>

      <button
        type="button"
        onClick={reset}
        className="font-mono text-xs text-[#E8F3EC]/70 hover:text-[#7CFF6B] border border-[#E8F3EC]/20 hover:border-[#7CFF6B]/50 px-3 py-1 rounded-full transition-colors cursor-pointer"
      >
        ← Change Photo
      </button>
    </div>
  );
}

