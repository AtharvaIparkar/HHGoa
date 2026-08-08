"use client";

import { Button } from "@/components/ui/Button";
import { useGeneratorStore } from "@/lib/store";

interface DownloadButtonProps {
  onToast?: (msg: string) => void;
}

export function DownloadButton({ onToast }: DownloadButtonProps) {
  const resultBlob = useGeneratorStore((s) => s.resultBlob);
  const format = useGeneratorStore((s) => s.format);

  function handleDownload() {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = format === "builder-card" ? "hh-goa-2026-builder-card.png" : "hh-goa-2026-pfp-frame.png";
    a.click();
    URL.revokeObjectURL(url);

    if (onToast) {
      onToast("PNG downloaded successfully!");
    }
  }

  return (
    <Button
      variant="tide"
      onClick={handleDownload}
      disabled={!resultBlob}
      className="flex-1"
    >
      Download PNG
    </Button>
  );
}
