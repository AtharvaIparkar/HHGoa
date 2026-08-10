"use client";

import { useCallback, useRef, useState } from "react";
import { normalizeToJpeg } from "@/lib/canvas-utils";
import { useGeneratorStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";


export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const setPhoto = useGeneratorStore((s) => s.setPhoto);
  const setStep = useGeneratorStore((s) => s.setStep);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      if (!/^image\//.test(file.type) && !/\.heic$/i.test(file.name)) {
        setError("That doesn't look like a photo. Try a JPG, PNG, or HEIC file.");
        setStatusMessage("Upload error: invalid file type.");
        return;
      }
      setError(null);
      setStatusMessage("Photo added. Processing compositing...");
      
      try {
        const normalized = await normalizeToJpeg(file);
        const url = URL.createObjectURL(normalized);
        setPhoto(normalized, url);
        setStatusMessage("Photo ready. Proceeding to customization.");
        setStep("customize");
      } catch (err) {
        console.error("File processing failed:", err);
        setError("Failed to process photo. Please try another image.");
      }
    },
    [setPhoto, setStep]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload your photo for HH Goa 2026 frame"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        void handleFile(e.dataTransfer.files[0]);
      }}
      className={`
        relative flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed
        px-6 py-16 text-center transition-all duration-200 cursor-pointer overflow-hidden backdrop-blur-md shadow-xl
        ${isDragging ? "scale-[1.01]" : "hover:scale-[1.005]"}
      `}
      style={{
        backgroundColor: theme.colors.cardBg,
        borderColor: isDragging ? theme.colors.accentGlow : theme.colors.border
      }}
    >
      {/* SVG Marching dash animated segment highlight on dragover */}
      {isDragging && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl">
          <rect
            x="3"
            y="3"
            width="98%"
            height="98%"
            rx="20"
            fill="none"
            stroke={theme.colors.accentGlow}
            strokeWidth="3"
            strokeDasharray="16 16"
            className="marching-dash"
          />
        </svg>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      <div
        className="w-16 h-16 rounded-full border flex items-center justify-center shadow-inner"
        style={{
          backgroundColor: theme.colors.bg,
          borderColor: theme.colors.accentGlow,
          color: theme.colors.accentGlow
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-black tracking-tight" style={{ color: theme.colors.text }}>
          Drop your photo here
        </h2>
        <p className="font-body text-sm max-w-xs" style={{ color: theme.colors.textSecondary }}>
          or click to select — JPG, PNG, HEIC (iPhone) supported. No login or signup required.
        </p>
      </div>

      {error && (
        <p role="alert" className="font-mono text-xs text-[#FF6F4C] bg-[#FF6F4C]/10 border border-[#FF6F4C]/30 px-3 py-1.5 rounded-lg">
          {error}
        </p>
      )}

      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="polite">
        {statusMessage}
      </div>
    </div>
  );
}


