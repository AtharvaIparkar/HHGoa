"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useGeneratorStore } from "@/lib/store";

interface ShareButtonProps {
  onToast?: (msg: string) => void;
}

export function ShareButton({ onToast }: ShareButtonProps) {
  const { resultBlob, shareId, setShareId } = useGeneratorStore();
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
      const caption = "I just built my HH Goa 2026 builder card 🌊 #FrameInGoa";
      const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        caption
      )}&url=${encodeURIComponent(shareUrl)}`;

      window.open(intent, "_blank", "noopener,noreferrer");

      if (onToast) {
        onToast("X share opened! Link saved to clipboard.");
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
    <Button
      variant="secondary"
      onClick={handleShare}
      disabled={!resultBlob || isSharing}
      className="flex-1"
    >
      {isSharing ? "Sharing..." : "Share to X"}
    </Button>
  );
}
