"use client";

import React, { useRef, useState, useEffect } from "react";
import { FormatType, GeneratorState, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";
import { renderBuilderCard, renderPfpFrame } from "@/lib/canvas-renderer";

interface Page2FormProps {
  state: GeneratorState;
  setState: React.Dispatch<React.SetStateAction<GeneratorState>>;
  onGenerate: () => void;
  playClickSound: () => void;
}

const PRESET_TITLES = [
  "ARAMBOL ARCHITECT",
  "ANJUNA ALCHEMIST",
  "PALOLEM PROTOCOL DEV",
  "VAGATOR VECTOR ENGINEER",
  "CALANGUTE CYPHERPUNK",
  "PANJIM PIXEL MAKER",
  "CANDOLIM CODE WIZARD",
  "CHAPORA CORE BUILDER"
];

export function Page2Form({
  state,
  setState,
  onGenerate,
  playClickSound
}: Page2FormProps) {
  const [customSkill, setCustomSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live Canvas Render Effect
  useEffect(() => {
    const canvas = liveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (state.format === "builder") {
      canvas.width = 1080;
      canvas.height = 1350;
      renderBuilderCard(canvas, ctx, state);
    } else {
      canvas.width = 1080;
      canvas.height = 1080;
      renderPfpFrame(canvas, ctx, state);
    }
  }, [state]);

  const handleFormatChange = (fmt: FormatType) => {
    playClickSound();
    setState((prev) => ({ ...prev, format: fmt }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        setState((prev) => ({
          ...prev,
          photoImg: img,
          panX: 0,
          panY: 0,
          zoom: 1.0
        }));
      };
      img.src = evt.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    playClickSound();
    setState((prev) => ({
      ...prev,
      photoImg: null,
      panX: 0,
      panY: 0,
      zoom: 1.0
    }));
  };

  const handleFilterChange = (filterVal: string) => {
    playClickSound();
    setState((prev) => ({ ...prev, filter: filterVal }));
  };

  const handleZoomChange = (zoomVal: number) => {
    setState((prev) => ({ ...prev, zoom: zoomVal }));
  };

  const handleBadgeToggle = (tech: string) => {
    playClickSound();
    setState((prev) => {
      const exists = prev.selectedBadges.includes(tech);
      const updated = exists
        ? prev.selectedBadges.filter((b) => b !== tech)
        : [...prev.selectedBadges, tech];
      return {
        ...prev,
        selectedBadges: updated,
        stackLocation: updated.length > 0 ? updated.join(" • ") : ""
      };
    });
  };

  const handleAddCustomSkill = () => {
    if (!customSkill.trim()) return;
    playClickSound();
    const newTech = customSkill.trim();
    setState((prev) => {
      const exists = prev.selectedBadges.includes(newTech);
      const updated = exists ? prev.selectedBadges : [...prev.selectedBadges, newTech];
      return {
        ...prev,
        selectedBadges: updated,
        stackLocation: updated.length > 0 ? updated.join(" • ") : ""
      };
    });
    setCustomSkill("");
  };

  const handleRerollTitle = () => {
    playClickSound();
    const randomTitle = PRESET_TITLES[Math.floor(Math.random() * PRESET_TITLES.length)];
    setState((prev) => ({ ...prev, builderTitle: randomTitle }));
  };

  const handlePerkToggle = (perkVal: string) => {
    playClickSound();
    setState((prev) => {
      const exists = prev.perks.includes(perkVal);
      const updated = exists
        ? prev.perks.filter((p) => p !== perkVal)
        : [...prev.perks, perkVal];
      return { ...prev, perks: updated };
    });
  };

  const handleThemeSelect = (tId: ThemeId) => {
    playClickSound();
    setState((prev) => ({ ...prev, theme: tId }));
  };

  return (
    <div id="page2" className="page-view active">
      {/* Step Progress Bar */}
      <div className="step-indicator-bar">
        <span className="step-node completed">1. WELCOME</span>
        <span>•</span>
        <span className="step-node active">2. CUSTOMIZE GRAPHIC</span>
        <span>•</span>
        <span className="step-node">3. YOUR PASS</span>
      </div>

      {/* Format Switcher Tabs */}
      <div className="format-tabs-container">
        <button
          type="button"
          className={`tab-btn ${state.format === "pfp" ? "active" : ""}`}
          onClick={() => handleFormatChange("pfp")}
        >
          <span>PFP FRAME OVERLAY</span>
          <span className="tab-badge">1:1 X/PFP</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${state.format === "builder" ? "active" : ""}`}
          onClick={() => handleFormatChange("builder")}
        >
          <span>BUILDER ID PASS</span>
          <span className="tab-badge">SOCIAL PASS</span>
        </button>
      </div>

      {/* Main Grid: Form Controls Left + Live Canvas Right */}
      <div className="app-grid">
        {/* Form Panel */}
        <section className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Customize Details</h2>
            <span className="form-hint">Near-Instant Preview</span>
          </div>

          {/* Photo Dropzone */}
          <div className="form-group">
            <label className="form-label">
              <span>1. Upload Photo</span>
              <span className="form-hint">JPG, PNG, WEBP</span>
            </label>

            <div
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <div style={{ fontWeight: 800 }}>Click or Drag & Drop Photo Here</div>
              <div style={{ fontSize: "0.78rem", opacity: 0.8, marginTop: "4px" }}>
                Supports off-center photos & auto-crops cleanly
              </div>
            </div>
          </div>

          {/* Photo Controls Card */}
          <div className="controls-card">
            <div className="controls-row">
              <span style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                Photo Zoom & Filter
              </span>
              {state.photoImg && (
                <button
                  type="button"
                  className="btn-icon-sm"
                  onClick={handleResetPhoto}
                >
                  Reset
                </button>
              )}
            </div>

            <div className="zoom-slider-row">
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={state.zoom}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                className="zoom-slider"
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                {state.zoom.toFixed(2)}x
              </span>
            </div>

            <div className="form-group" style={{ marginTop: "6px" }}>
              <label className="form-label" htmlFor="filterSelect">
                Photo Filter
              </label>
              <select
                id="filterSelect"
                className="form-select"
                value={state.filter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="none">Original Crisp</option>
                <option value="sunset">Warm Sunset Glow</option>
                <option value="cyber">Cyber Matrix Cyan</option>
                <option value="bw">B&W Tech Contrast</option>
              </select>
            </div>
          </div>

          {/* Format B Specific Fields */}
          {state.format === "builder" && (
            <div
              id="formatBFields"
              className="form-group"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Builder Name & Handle */}
              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="userNameInput">
                    2. Builder Name / Handle
                  </label>
                  <input
                    type="text"
                    id="userNameInput"
                    className="form-input"
                    value={state.userName}
                    placeholder="e.g. Satoshi Nakamoto"
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, userName: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="xHandleInput">
                    X / Twitter Handle (Optional)
                  </label>
                  <input
                    type="text"
                    id="xHandleInput"
                    className="form-input"
                    value={state.xHandle}
                    placeholder="e.g. @satoshi"
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, xHandle: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="form-group">
                <label className="form-label">
                  <span>3. Tech Stack & Focus Area</span>
                  <span className="form-hint">Click badges to toggle</span>
                </label>

                <div className="stack-badges-grid">
                  {[
                    "Next.js",
                    "Solana",
                    "Rust",
                    "AI / ML",
                    "TypeScript",
                    "Python",
                    "Tailwind",
                    "Move",
                    "Wasm"
                  ].map((tech) => {
                    const isActive = state.selectedBadges.includes(tech);
                    return (
                      <button
                        type="button"
                        key={tech}
                        className={`badge-btn ${isActive ? "active" : ""}`}
                        onClick={() => handleBadgeToggle(tech)}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>

                <div className="custom-skill-row">
                  <input
                    type="text"
                    className="form-input custom-skill-input"
                    placeholder="Add custom skill (e.g. GraphQL, Go, ZK)..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddCustomSkill();
                    }}
                  />
                  <button
                    type="button"
                    className="btn-add-skill"
                    onClick={handleAddCustomSkill}
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Primary Role */}
              <div className="form-group">
                <label className="form-label" htmlFor="roleSelect">
                  4. Primary Role / Stack
                </label>
                <select
                  id="roleSelect"
                  className="form-select"
                  value={state.role}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, role: e.target.value }))
                  }
                >
                  <option value="FULLSTACK DEVELOPER">FULLSTACK DEVELOPER</option>
                  <option value="SOLANA & WEB3 ARCHITECT">
                    SOLANA & WEB3 ARCHITECT
                  </option>
                  <option value="AI / LLM ENGINEER">AI / LLM ENGINEER</option>
                  <option value="RUST & SYSTEMS DEV">RUST & SYSTEMS DEV</option>
                  <option value="UI/UX DESIGNER & CREATOR">
                    UI/UX DESIGNER & CREATOR
                  </option>
                  <option value="FOUNDER & PRODUCT MAKER">
                    FOUNDER & PRODUCT MAKER
                  </option>
                </select>
              </div>

              {/* Generated Title & Reroll */}
              <div className="form-group">
                <label className="form-label" htmlFor="titleInput">
                  5. Generated Builder Title
                </label>
                <div className="title-reroll-group">
                  <input
                    type="text"
                    id="titleInput"
                    className="form-input"
                    value={state.builderTitle}
                    placeholder="e.g. ARAMBOL ARCHITECT"
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        builderTitle: e.target.value
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="btn-reroll"
                    onClick={handleRerollTitle}
                  >
                    Reroll
                  </button>
                </div>
              </div>

              {/* Stack & Location Line */}
              <div className="form-group">
                <label className="form-label" htmlFor="locationInput">
                  6. Stack & Location Line
                </label>
                <input
                  type="text"
                  id="locationInput"
                  className="form-input"
                  value={state.stackLocation}
                  placeholder="e.g. ANJUNA BEACH • NEXT.JS • TYPESCRIPT • TAILWIND"
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      stackLocation: e.target.value
                    }))
                  }
                />
              </div>

              {/* Perks Checklist */}
              <div className="form-group">
                <label className="form-label">7. Beach Bag & Perks</label>
                <div className="perks-grid">
                  {[
                    "HIGH-SPEED FIBER",
                    "24/7 CAFFEINE",
                    "OCEAN BREEZE",
                    "RED BULL & BITES"
                  ].map((perk) => {
                    const isChecked = state.perks.includes(perk);
                    return (
                      <label key={perk} className="perk-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handlePerkToggle(perk)}
                        />{" "}
                        {perk}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 6 Theme Swatch Grid */}
          <div className="theme-swatch-panel">
            <div className="theme-panel-header">
              <span className="theme-panel-title">THEME PALETTES</span>
              <span className="theme-panel-subtitle">6 Styles • Live Preview</span>
            </div>

            <div className="theme-swatches-grid">
              {(Object.keys(THEMES) as ThemeId[]).map((tId) => {
                const themeItem = THEMES[tId];
                const isActive = state.theme === tId;
                return (
                  <button
                    key={tId}
                    type="button"
                    className={`theme-swatch-card ${isActive ? "active" : ""}`}
                    data-theme={tId}
                    onClick={() => handleThemeSelect(tId)}
                  >
                    <div className="swatch-info">
                      <span className="swatch-name">{themeItem.name}</span>
                      <span className="swatch-sub">{themeItem.subtitle}</span>
                    </div>
                    <div className="swatch-dots">
                      <span
                        className="dot"
                        style={{ backgroundColor: themeItem.colors.bg }}
                      />
                      <span
                        className="dot"
                        style={{ backgroundColor: themeItem.colors.accent }}
                      />
                      <span
                        className="dot"
                        style={{ backgroundColor: themeItem.colors.accentGlow }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            className="pattern-border-btn"
            id="generateCardBtn"
            style={{ width: "100%", padding: "16px", marginTop: "10px" }}
            onClick={onGenerate}
          >
            GENERATE GRAPHIC
          </button>
        </section>

        {/* Right Column Live Preview */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "sticky",
            top: "90px"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "440px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "3.5px solid var(--color-yellow)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <canvas
              id="formRenderCanvas"
              ref={liveCanvasRef}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <span className="live-preview-badge">Live Canvas Preview</span>
        </section>
      </div>
    </div>
  );
}
