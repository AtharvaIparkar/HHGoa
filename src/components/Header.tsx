"use client";

import React from "react";
import { Wordmark } from "./ui/Wordmark";

interface HeaderProps {
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenHypeModal: () => void;
  onGoHome: () => void;
}

export function Header({
  soundMuted,
  onToggleSound,
  onOpenHypeModal,
  onGoHome,
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-container">
        <a
          href="#"
          className="studio-logo"
          id="logoHomeBtn"
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
        >
          <span>2:47PM STUDIO</span>
          <span className="studio-subtitle">HH GOA 2026</span>
        </a>

        {/* Center Wordmark Lockup */}
        <Wordmark size="sm" />

        <div className="header-nav">
          {/* Sound Toggle */}
          <button
            className="icon-btn-toggle"
            id="soundToggleBtn"
            title="Toggle Sound FX"
            onClick={onToggleSound}
          >
            {soundMuted ? "MUTED" : "SOUND ON"}
          </button>

          {/* Check Hype Modal Button */}
          <button
            className="nav-link"
            id="checkHypeBtn"
            onClick={onOpenHypeModal}
          >
            CHECK HYPE
          </button>
        </div>
      </div>
    </header>
  );
}
