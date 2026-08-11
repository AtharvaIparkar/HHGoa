"use client";

import React, { useRef, useEffect } from "react";
import { ThemeConfig } from "@/types";

interface HypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
}

export function HypeModal({ isOpen, onClose, theme }: HypeModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          ✕
        </button>

        <span className="tab-badge" style={{ marginBottom: 12, display: "inline-block" }}>
          OFFICIAL TEASER
        </span>

        <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--color-green-dark)", marginBottom: 14 }}>
          Hacker House Goa 2026 Hype
        </h3>

        <div className="video-container">
          <video
            ref={videoRef}
            controls
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, display: "block" }}
          >
            <source src="Prehype.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: 18 }}>
          500 Elite Builders. High-Speed Fiber. The Ocean at your doorstep. October 28–31, 2026.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="pattern-border-btn"
          style={{ width: "100%", padding: 12 }}
        >
          CLOSE HYPE TEASER
        </button>
      </div>
    </div>
  );
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  onShareToX: () => void;
}

export function ShareModal({ isOpen, onClose, theme, onShareToX }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          ✕
        </button>

        <span
          className="tab-badge"
          style={{ background: "#e6f4ea", color: "#1b5e20", border: "1px solid #2e7d32", marginBottom: 12, display: "inline-block" }}
        >
          GRAPHIC READY TO SHARE!
        </span>

        <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--color-green-dark)", marginBottom: 12 }}>
          Post Your Pass on X
        </h3>

        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: 16 }}>
          Share your graphic on X with <strong>#FrameInGoa</strong> to get featured on the HH Goa Radar!
        </p>

        <div
          id="tweetTextPreview"
          style={{
            background: "var(--theme-subpanel-bg)",
            border: "1.5px solid var(--theme-border)",
            borderRadius: 14,
            padding: 14,
            textAlign: "left",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--theme-text)",
            marginBottom: 18,
            lineHeight: 1.45
          }}
        >
          Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            type="button"
            onClick={onShareToX}
            className="pattern-border-btn"
            style={{ width: "100%", padding: 14 }}
          >
            COPY TWEET & OPEN X
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
