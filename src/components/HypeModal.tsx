"use client";

import React, { useRef, useEffect } from "react";

interface HypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HypeModal({ isOpen, onClose }: HypeModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" id="hypeModal">
      <div className="modal-card">
        <button
          className="modal-close-btn"
          id="closeHypeIconBtn"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>
        <span className="tab-badge" style={{ marginBottom: "12px", display: "inline-block" }}>
          OFFICIAL TEASER
        </span>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--color-green-dark)", marginBottom: "14px" }}>
          Hacker House Goa 2026 Hype
        </h3>

        <div className="video-container">
          <video
            ref={videoRef}
            id="hypeVideo"
            controls
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px", display: "block" }}
          >
            <source src="/Prehype.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "18px" }}>
          500 Elite Builders. High-Speed Fiber. The Ocean at your doorstep. October 28–31, 2026.
        </p>

        <button
          className="pattern-border-btn"
          id="closeHypeBtn"
          style={{ width: "100%", padding: "12px" }}
          onClick={onClose}
        >
          CLOSE HYPE TEASER
        </button>
      </div>
    </div>
  );
}
