"use client";

import React from "react";

interface Page1HeroProps {
  onStart: () => void;
}

export function Page1Hero({ onStart }: Page1HeroProps) {
  return (
    <div id="page1" className="page-view active">
      <div className="hero-landing-container">
        <div className="hero-title-wrapper">
          <h1 className="hero-giant-title">HACKER HOUSE</h1>
          <div className="hero-floating-stamp">गोवा</div>
        </div>

        <div className="hero-subbar">
          <span>GOA, INDIA · 28 – 31 OCT 2026</span>
          <span>2:47 PM STUDIO</span>
        </div>

        <div className="hero-cta-wrapper">
          <button
            className="pattern-border-btn hero-cta-btn"
            id="startBuilderBtn"
            onClick={onStart}
          >
            BUILD YOUR PFP FRAME / CARD
          </button>
        </div>
      </div>
    </div>
  );
}
