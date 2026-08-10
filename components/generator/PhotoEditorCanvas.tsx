"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { ZoomSlider } from "./ZoomSlider";
import { Button } from "@/components/ui/Button";

export function PhotoEditorCanvas() {
  const photoObjectUrl = useGeneratorStore((s) => s.photoObjectUrl);
  const transform = useGeneratorStore((s) => s.transform);
  const setTransform = useGeneratorStore((s) => s.setTransform);
  const resetTransform = useGeneratorStore((s) => s.resetTransform);
  const format = useGeneratorStore((s) => s.format);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Redraw canvas smoothly
  const requestRedraw = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const img = loadedImageRef.current;
      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const isCard = format === "builder-card";
      const width = 600;
      const height = isCard ? 750 : 600;
      canvas.width = width;
      canvas.height = height;

      // 1. Background
      ctx.fillStyle = theme.colors.bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Photo transform render
      ctx.save();
      const zoom = transform.zoom / 100;
      const centerX = width / 2 + transform.pan.x;
      const centerY = height / 2 + transform.pan.y;

      ctx.translate(centerX, centerY);
      if (transform.rotation !== 0) {
        ctx.rotate((transform.rotation * Math.PI) / 180);
      }

      const imgRatio = img.width / img.height;
      const boxRatio = width / height;
      let drawW = width * zoom;
      let drawH = height * zoom;

      if (imgRatio > boxRatio) {
        drawW = drawH * imgRatio;
      } else {
        drawH = drawW / imgRatio;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // 3. Unique Cyber/Signal Corner Brackets & Accent Frame
      ctx.save();
      ctx.strokeStyle = theme.colors.accentGlow;
      ctx.lineWidth = 4;
      const cLen = 32;

      // Top-Left Corner Bracket
      ctx.beginPath();
      ctx.moveTo(16, 16 + cLen);
      ctx.lineTo(16, 16);
      ctx.lineTo(16 + cLen, 16);
      ctx.stroke();

      // Top-Right Corner Bracket
      ctx.beginPath();
      ctx.moveTo(width - 16 - cLen, 16);
      ctx.lineTo(width - 16, 16);
      ctx.lineTo(width - 16, 16 + cLen);
      ctx.stroke();

      // Bottom-Left Corner Bracket
      ctx.beginPath();
      ctx.moveTo(16, height - 16 - cLen);
      ctx.lineTo(16, height - 16);
      ctx.lineTo(16 + cLen, height - 16);
      ctx.stroke();

      // Bottom-Right Corner Bracket
      ctx.beginPath();
      ctx.moveTo(width - 16 - cLen, height - 16);
      ctx.lineTo(width - 16, height - 16);
      ctx.lineTo(width - 16, height - 16 - cLen);
      ctx.stroke();

      // Inner Accent Rim
      ctx.strokeStyle = theme.colors.secondaryAccent;
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 24, width - 48, height - 48);

      ctx.font = "bold 13px monospace";
      ctx.fillStyle = theme.colors.accentGlow;
      ctx.fillText("[+] LIVE CROP FRAME", 32, 48);
      ctx.restore();

    });
  }, [format, theme, transform]);

  // Load image once in memory when photoObjectUrl changes
  useEffect(() => {
    if (!photoObjectUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImageRef.current = img;
      requestRedraw();
    };
    img.src = photoObjectUrl;
  }, [photoObjectUrl, requestRedraw]);


  function scaleToBox(w: number, h: number, iw: number, ih: number) {
    const r = iw / ih;
    const br = w / h;
    return r > br ? 1 : 1;
  }

  // Trigger redraw on transform/theme/format changes
  useEffect(() => {
    requestRedraw();
  }, [transform, format, theme, requestRedraw]);

  // Pan Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - transform.pan.x,
      y: e.clientY - transform.pan.y
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    const maxOffset = 350;
    setTransform({
      pan: {
        x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, newY))
      }
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture release error
    }
  };

  // Scroll Wheel Zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 6 : -6;
      const newZoom = Math.max(100, Math.min(250, transform.zoom + delta));
      setTransform({ zoom: newZoom });
    },
    [transform.zoom, setTransform]
  );

  // Rotate 90°
  const handleRotate = () => {
    setTransform({ rotation: (transform.rotation + 90) % 360 });
  };

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 3D Tilt calculation on hover
  const handleCanvasPointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handlePointerMove(e);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsDragging(false);
  };

  if (!photoObjectUrl) return null;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Interactive Editor Canvas Viewport with 3D Tilt Effect */}
      <div
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
        className={`relative overflow-hidden rounded-3xl border-2 shadow-2xl cursor-grab active:cursor-grabbing select-none transition-transform duration-150 ease-out w-full ${
          isDragging ? "ring-2" : ""
        }`}
        style={{
          touchAction: "none",
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.cardBg,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-h-[460px] object-contain rounded-3xl"
        />


        {/* Floating Pan & Zoom Hint */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full font-mono text-[10px] backdrop-blur-md border shadow-md"
          style={{
            backgroundColor: "rgba(6, 43, 31, 0.85)",
            color: theme.colors.accentGlow,
            borderColor: theme.colors.border
          }}
        >
          🖐 Drag to Pan • Scroll/Pinch to Zoom
        </div>

        {/* 90° Rotate Button */}
        <button
          type="button"
          onClick={handleRotate}
          title="Rotate 90 degrees"
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer border shadow-md"
          style={{
            backgroundColor: "rgba(6, 43, 31, 0.85)",
            color: theme.colors.secondaryAccent,
            borderColor: theme.colors.border
          }}
        >
          🔄 90°
        </button>
      </div>

      {/* Companion Zoom Slider & Controls */}
      <div className="flex flex-col gap-3 w-full">
        <ZoomSlider
          value={transform.zoom}
          onChange={(val) => setTransform({ zoom:val })}
        />

        <div className="flex gap-3 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTransform}
            className="flex-1 font-mono text-xs"
          >
            ↺ Reset Crop
          </Button>
        </div>
      </div>
    </div>
  );
}
