"use client";

import { useCallback, useRef, useState } from "react";
import { normalizeToJpeg } from "@/lib/canvas-utils";
import { useGeneratorStore } from "@/lib/store";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setPhoto = useGeneratorStore((s) => s.setPhoto);
  const setStep = useGeneratorStore((s) => s.setStep);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      if (!/^image\//.test(file.type) && !/\.heic$/i.test(file.name)) {
        setError("That doesn't look like a photo. Try a JPG, PNG, or HEIC file.");
        return;
      }
      setError(null);
      const normalized = await normalizeToJpeg(file);
      const url = URL.createObjectURL(normalized);
      setPhoto(normalized, url);
      setStep("customize");
    },
    [setPhoto, setStep]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload your photo"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
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
        flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
        px-6 py-16 text-center transition-colors duration-150 cursor-pointer
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-tide
        ${isDragging ? "border-tide bg-monsoon/60" : "border-sand/40 bg-monsoon/30"}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
      <p className="font-display text-2xl text-sand">Drop your photo here</p>
      <p className="font-body text-sm text-sand/70">
        or tap to choose one — JPG, PNG, HEIC all work
      </p>
      {error && (
        <p role="alert" className="font-mono text-xs text-sunset">
          {error}
        </p>
      )}
    </div>
  );
}
