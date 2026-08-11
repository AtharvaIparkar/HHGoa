"use client";

import React from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClickSound: () => void;
}

export function ShareModal({ isOpen, onClose, playClickSound }: ShareModalProps) {
  if (!isOpen) return null;

  const tweetText = `Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa`;

  const handleCopyAndOpenTweet = () => {
    playClickSound();
    navigator.clipboard.writeText(tweetText).catch(() => {});
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
    onClose();
  };

  return (
    <div className="modal-backdrop active" id="shareModal">
      <div className="modal-card">
        <button
          className="modal-close-btn"
          id="closeShareIconBtn"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>
        <span
          className="tab-badge"
          style={{
            background: "#e6f4ea",
            color: "#1b5e20",
            border: "1px solid #2e7d32",
            marginBottom: "12px",
            display: "inline-block"
          }}
        >
          GRAPHIC READY TO SHARE!
        </span>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--color-green-dark)", marginBottom: "12px" }}>
          Post Your Pass on X
        </h3>

        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "16px" }}>
          Share your graphic on X with <strong>#FrameInGoa</strong> to get featured on the HH Goa Radar!
        </p>

        <div
          id="tweetTextPreview"
          style={{
            background: "var(--color-cream)",
            border: "1.5px solid rgba(2,104,52,0.25)",
            borderRadius: "14px",
            padding: "14px",
            textAlign: "left",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-green-dark)",
            marginBottom: "18px",
            lineHeight: 1.45
          }}
        >
          {tweetText}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="pattern-border-btn"
            id="copyAndOpenTweetBtn"
            style={{ width: "100%", padding: "12px" }}
            onClick={handleCopyAndOpenTweet}
          >
            COPY TWEET & OPEN X
          </button>
          <button
            className="btn-outline-back"
            id="closeShareBtn"
            style={{ width: "100%", height: "42px", borderColor: "var(--color-green-dark)", color: "var(--color-green-dark)" }}
            onClick={onClose}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
