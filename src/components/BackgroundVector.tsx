"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundVector() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    let offset = 0;
    const render = () => {
      offset += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 16;
      ctx.fillStyle = "#FEE101";

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dist = Math.sin(x * 0.01 + offset) + Math.cos(y * 0.01 + offset);
          const radius = Math.abs(dist) * 1.5;
          if (radius > 0.5) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Halftone Canvas Overlay */}
      <canvas id="halftoneCanvas" ref={canvasRef} />

      {/* Vector Backdrop */}
      <div className="goa-vector-backdrop">
        <svg
          className="vector-svg-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Ocean Vector Base Wave */}
          <path
            className="wave-svg-path"
            d="M-100,520 Q350,470 720,530 Q1100,470 1600,520 L1600,900 L-100,900 Z"
            fill="#01361b"
            opacity="0.95"
          />

          {/* Foreground Shore Wave Layer */}
          <path
            className="wave-svg-path"
            d="M-100,600 Q350,560 720,610 Q1100,560 1600,600 L1600,900 L-100,900 Z"
            fill="#011b0e"
            opacity="0.98"
          />

          {/* White Sandy Beach Shore */}
          <path
            d="M-100,670 Q350,640 720,675 Q1100,640 1600,670 L1600,900 L-100,900 Z"
            fill="#FFF8EB"
            opacity="0.12"
          />
        </svg>

        {/* Vintage Poster Texture Overlay */}
        <div className="poster-texture-overlay" />
      </div>

      {/* Dynamic Ambient Light Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
    </>
  );
}
