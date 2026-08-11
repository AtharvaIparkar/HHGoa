"use client";

import React from "react";
import { CardFormat } from "@/types";

interface FormatTabsProps {
  activeFormat: CardFormat;
  onSelectFormat: (format: CardFormat) => void;
}

export function FormatTabs({ activeFormat, onSelectFormat }: FormatTabsProps) {
  return (
    <div className="format-tabs-container">
      <button
        type="button"
        onClick={() => onSelectFormat('pfp')}
        className={`tab-btn ${activeFormat === 'pfp' ? 'active' : ''}`}
      >
        <span>Format A: PFP Frame</span>
        <span className="tab-badge">1:1 X/PFP</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectFormat('builder')}
        className={`tab-btn ${activeFormat === 'builder' ? 'active' : ''}`}
      >
        <span>Format B: Builder Pass</span>
        <span className="tab-badge">SOCIAL PASS</span>
      </button>
    </div>
  );
}
