"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { GeneratorState } from "@/types";
import { renderBuilderCard, renderPfpFrame } from "@/lib/canvas-renderer";

interface Page3ShowcaseProps {
  state: GeneratorState;
  onBackToEdit: () => void;
  onOpenShareModal: () => void;
  playClickSound: () => void;
}

export function Page3Showcase({
  state,
  onBackToEdit,
  onOpenShareModal,
  playClickSound
}: Page3ShowcaseProps) {
  const showcaseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = showcaseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (state.format === "builder") {
      canvas.width = 1080;
      canvas.height = 1350;
      renderBuilderCard(canvas, ctx, state);
    } else {
      canvas.width = 1080;
      canvas.height = 1080;
      renderPfpFrame(canvas, ctx, state);
    }

    // Launch Confetti Celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [state]);

  const handleDownload = () => {
    playClickSound();
    const canvas = showcaseCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `HH-Goa-2026-${state.format.toUpperCase()}-Pass.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div id="page3" className="page-view active">
      {/* Step Progress Bar */}
      <div className="step-indicator-bar">
        <span className="step-node completed">1. WELCOME</span>
        <span>•</span>
        <span className="step-node completed">2. CUSTOMIZE GRAPHIC</span>
        <span>•</span>
        <span className="step-node active">3. YOUR PASS</span>
      </div>

      {/* 3D Showcase Stage */}
      <div className="showcase-stage-container">
        <div className="canvas-3d-container" id="canvas3dWrapper">
          <div className="canvas-wrapper">
            <canvas id="showcaseCanvas" ref={showcaseCanvasRef} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="showcase-actions">
          <button
            type="button"
            className="btn-primary-large"
            id="downloadBtn"
            onClick={handleDownload}
          >
            DOWNLOAD GRAPHIC (PNG)
          </button>
          <button
            type="button"
            className="btn-secondary-large"
            id="shareBtn"
            onClick={onOpenShareModal}
          >
            SHARE TO X (#FrameInGoa)
          </button>
          <button
            type="button"
            className="btn-outline-back"
            id="backToEditBtn"
            onClick={onBackToEdit}
          >
            EDIT / CREATE ANOTHER GRAPHIC
          </button>
        </div>
      </div>
    </div>
  );
}
