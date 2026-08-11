"use client";

import React from "react";
import { Wordmark } from "./Wordmark";
import { ThemeConfig } from "@/types";

interface HeaderProps {
  theme: ThemeConfig;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenHypeModal: () => void;
  onGoHome: () => void;
}

export function Header({
  theme,
  soundMuted,
  onToggleSound,
  onOpenHypeModal,
  onGoHome
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left Studio Brand Logo */}
        <button
          type="button"
          onClick={onGoHome}
          className="studio-logo text-left cursor-pointer bg-transparent border-none p-0"
        >
          <span>2:47PM STUDIO</span>
          <span class="studio-subtitle">HH GOA 2026</span>
        </button>

        {/* Center Hacker House Goa Wordmark Lockup */}
        <Wordmark size="sm" waveColor={theme.colors.accentGlow} />

        {/* Right Navigation Actions */}
        <div className="header-nav">
          <button
            type="button"
            onClick={onToggleSound}
            className="icon-btn-toggle"
            title="Toggle Sound FX"
          >
            {soundMuted ? "MUTED" : "SOUND ON"}
          </button>

          <button
            type="button"
            onClick={onOpenHypeModal}
            className="nav-link"
          >
            CHECK HYPE
          </button>
        </div>
      </div>
    </header>
  );
}
