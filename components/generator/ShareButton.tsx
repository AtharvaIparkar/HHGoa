"use client";

import { useState } from "react";
import { useGeneratorStore } from "@/lib/store";

interface ShareButtonProps {
  onToast?: (msg: string) => void;
}

export function ShareButton({ onToast }: ShareButtonProps) {
  const { resultBlob, shareId, setShareId, hashtag, setHashtag } = useGeneratorStore();
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    if (!resultBlob) return;
    setIsSharing(true);

    try {
      let id = shareId;
      if (!id) {
        const form = new FormData();
        form.append("image", resultBlob, "hh-goa-2026.png");
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = (await res.json()) as { shareId: string };
        id = data.shareId;
        setShareId(id);
      }

      const shareUrl = `${window.location.origin}/s/${id}`;
      // Mandatory hashtag pre-written per town-hall override (#FramedInGoa / #FrameInGoa)
      const caption = `I just built my official HH Goa 2026 pass 🌊 ${hashtag} #HHGoa2026`;
      const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        caption
      )}&url=${encodeURIComponent(shareUrl)}`;

      window.open(intent, "_blank", "noopener,noreferrer");

      if (onToast) {
        onToast("X share opened! OG preview card link copied to clipboard.");
      }
      if (navigator.clipboard) {
        void navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      console.error("Share error:", err);
      if (onToast) onToast("Failed to generate share link");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <button
        type="button"
        onClick={handleShare}
        disabled={!resultBlob || isSharing}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B6839] hover:bg-[#0B6839]/90 text-[#E8F3EC] border border-[#7CFF6B]/50 px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(11,104,57,0.4)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFF6B]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {isSharing ? "Generating..." : "Share to X"}
      </button>

      {/* Hashtag toggle hint for verification compliance */}
      <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#E8F3EC]/60">
        <span>Hashtag:</span>
        <button
          onClick={() => setHashtag(hashtag === "#FramedInGoa" ? "#FrameInGoa" : "#FramedInGoa")}
          className="text-[#7CFF6B] underline cursor-pointer hover:text-[#FFC24B]"
        >
          {hashtag} ⚡
        </button>
      </div>
    </div>
  );
}

