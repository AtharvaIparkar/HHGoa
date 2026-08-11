"use client";

import React, { useRef, useEffect } from "react";
import { BuilderData, CardFormat, PhotoFilter, PhotoTransform, ThemeId } from "@/types";
import { renderPfpFrame, renderBuilderCard } from "@/lib/compositor";

interface CanvasPreviewProps {
  format: CardFormat;
  photoImg: HTMLImageElement | null;
  photoTransform: PhotoTransform;
  filter: PhotoFilter;
  builder: BuilderData;
  themeId: ThemeId;
  onUpdateTransform: (updates: Partial<PhotoTransform>) => void;
}

export function CanvasPreview({
  format,
  photoImg,
  photoTransform,
  filter,
  builder,
  themeId,
  onUpdateTransform
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
  }, [format, photoImg, photoTransform, filter, builder, themeId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!photoImg) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    onUpdateTransform({
      panX: photoTransform.panX + dx * 2.2,
      panY: photoTransform.panY + dy * 2.2
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "sticky", top: 90 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 20,
          overflow: "hidden",
          border: "3.5px solid var(--color-yellow)",
          boxShadow: "var(--shadow-md)",
          cursor: photoImg ? "grab" : "default"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <span className="live-preview-badge">Live Canvas Preview</span>
    </section>
  );
}
