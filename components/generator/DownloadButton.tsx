"use client";

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
      onToast("PNG downloaded successfully! Ready to upload to X.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!resultBlob}
      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#FFC24B] bg-[#062B1F]/60 text-[#FFC24B] hover:bg-[#FFC24B]/10 hover:border-[#FFC24B] px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download PNG
    </button>
  );
}

