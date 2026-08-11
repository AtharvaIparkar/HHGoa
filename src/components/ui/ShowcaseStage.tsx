"use client";

import React, { useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { BuilderData, CardFormat, PhotoFilter, PhotoTransform, ThemeId } from "@/types";
import { renderPfpFrame, renderBuilderCard } from "@/lib/compositor";

interface ShowcaseStageProps {
  format: CardFormat;
  photoImg: HTMLImageElement | null;
  photoTransform: PhotoTransform;
  filter: PhotoFilter;
  builder: BuilderData;
  themeId: ThemeId;
  onBackToEdit: () => void;
  onOpenShareModal: () => void;
}

export function ShowcaseStage({
  format,
  photoImg,
  photoTransform,
  filter,
  builder,
  themeId,
  onBackToEdit,
  onOpenShareModal
}: ShowcaseStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (format === "pfp") {
      canvas.width = 1080;
      canvas.height = 1080;
      renderPfpFrame(canvas, ctx, photoImg, photoTransform, filter, themeId, builder.xHandle);
    } else {
      canvas.width = 1080;
      canvas.height = 1350;
      renderBuilderCard(canvas, ctx, photoImg, photoTransform, filter, builder, themeId);
    }

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FEE101", "#FF007A", "#00F0FF", "#FFFFFF", "#026834"]
      });
    } catch {}
  }, [format, photoImg, photoTransform, filter, builder, themeId]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `HH-Goa-2026-${format.toUpperCase()}-Pass.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = containerRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="showcase-stage-container">
      <div
        ref={containerRef}
        className="canvas-3d-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="canvas-wrapper">
          <div className="holographic-sheen" />
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <div className="showcase-actions">
        <button
          type="button"
          onClick={handleDownload}
          className="btn-primary-large"
        >
          DOWNLOAD GRAPHIC (PNG)
        </button>

        <button
          type="button"
          onClick={onOpenShareModal}
          className="btn-secondary-large"
        >
          SHARE TO X (#FrameInGoa)
        </button>

        <button
          type="button"
          onClick={onBackToEdit}
          className="btn-outline-back"
        >
          EDIT / CREATE ANOTHER GRAPHIC
        </button>
      </div>
    </div>
  );
}
