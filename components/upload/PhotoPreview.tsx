"use client";

import { useGeneratorStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export function PhotoPreview() {
  const photoObjectUrl = useGeneratorStore((s) => s.photoObjectUrl);
  const photoFile = useGeneratorStore((s) => s.photoFile);
  const reset = useGeneratorStore((s) => s.reset);

  if (!photoObjectUrl) return null;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative overflow-hidden rounded-2xl border-2 border-sand/30 aspect-square w-48 shadow-lg">
        <img
          src={photoObjectUrl}
          alt="Uploaded preview"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-monsoon/80 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-2 left-2 font-mono text-[10px] text-sand/80 bg-monsoon/80 px-2 py-0.5 rounded-full border border-sand/20">
          {photoFile?.name ? photoFile.name.substring(0, 16) : "Photo uploaded"}
        </span>
      </div>

      <Button variant="ghost" size="sm" onClick={reset}>
        Change photo
      </Button>
    </div>
  );
}
