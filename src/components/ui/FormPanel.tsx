"use client";

import React, { useState } from "react";
import { BuilderData, CardFormat, PhotoFilter, ThemeId } from "@/types";
import { THEMES } from "@/lib/themes";

interface FormPanelProps {
  format: CardFormat;
  builder: BuilderData;
  filter: PhotoFilter;
  zoom: number;
  activeTheme: ThemeId;
  onUpdateBuilder: (updates: Partial<BuilderData>) => void;
  onUpdateFilter: (filter: PhotoFilter) => void;
  onUpdateZoom: (zoom: number) => void;
  onResetZoom: () => void;
  onFileUpload: (file: File) => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onGenerate: () => void;
}

const PRESET_BADGES = [
  "Next.js",
  "Solana",
  "Rust",
  "AI / ML",
  "TypeScript",
  "Python",
  "Tailwind",
  "Move",
  "Wasm"
];

const ROLES = [
  "FULLSTACK DEVELOPER",
  "SOLANA & WEB3 ARCHITECT",
  "AI / LLM ENGINEER",
  "RUST & SYSTEMS DEV",
  "UI/UX DESIGNER & CREATOR",
  "FOUNDER & PRODUCT MAKER"
];

const TITLES = [
  "ARAMBOL ARCHITECT",
  "PALOLEM PROTOCOL DEV",
  "ANJUNA ALGORITHMIST",
  "VAGATOR VECTOR DEV",
  "CANDOLIM CODE MAKER",
  "CALANGUTE CYBER ARCHITECT",
  "PANJIM PIXEL DEV",
  "BA GA BYTE BUILDER"
];

const PERKS_OPTIONS = [
  "HIGH-SPEED FIBER",
  "24/7 CAFFEINE",
  "OCEAN BREEZE",
  "RED BULL & BITES"
];

export function FormPanel({
  format,
  builder,
  filter,
  zoom,
  activeTheme,
  onUpdateBuilder,
  onUpdateFilter,
  onUpdateZoom,
  onResetZoom,
  onFileUpload,
  onSelectTheme,
  onGenerate
}: FormPanelProps) {
  const [customSkill, setCustomSkill] = useState("");
  const [badges, setBadges] = useState<string[]>(builder.selectedBadges);

  const handleToggleBadge = (badge: string) => {
    let updated: string[];
    if (badges.includes(badge)) {
      updated = badges.filter((b) => b !== badge);
    } else {
      updated = [...badges, badge];
    }
    setBadges(updated);
    onUpdateBuilder({
      selectedBadges: updated,
      stackLocation: updated.join(" • ")
    });
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !badges.includes(trimmed)) {
      const updated = [...badges, trimmed];
      setBadges(updated);
      onUpdateBuilder({
        selectedBadges: updated,
        stackLocation: updated.join(" • ")
      });
      setCustomSkill("");
    }
  };

  const handleRerollTitle = () => {
    const randomIndex = Math.floor(Math.random() * TITLES.length);
    const newTitle = TITLES[randomIndex];
    onUpdateBuilder({ builderTitle: newTitle });
  };

  const handleTogglePerk = (perk: string) => {
    let updated: string[];
    if (builder.perks.includes(perk)) {
      updated = builder.perks.filter((p) => p !== perk);
    } else {
      updated = [...builder.perks, perk];
    }
    onUpdateBuilder({ perks: updated });
  };

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2 className="panel-title">Customize Details</h2>
        <span className="form-hint">Near-Instant Preview</span>
      </div>

      {/* 1. Photo Upload & Controls */}
      <div className="form-group">
        <label className="form-label">
          <span>1. Upload Photo</span>
          <span className="form-hint">JPG, PNG, WEBP</span>
        </label>

        <div
          className="dropzone"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e: any) => {
              const file = e.target.files?.[0];
              if (file) onFileUpload(file);
            };
            input.click();
          }}
        >
          <div style={{ fontWeight: 800 }}>Click or Drag & Drop Photo Here</div>
          <div style={{ fontSize: "0.78rem", opacity: 0.8 }}>
            Supports off-center photos & auto-crops cleanly
          </div>
        </div>

        <div className="controls-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>Photo Zoom & Filter</span>
            <button
              type="button"
              onClick={onResetZoom}
              className="btn-icon-sm"
            >
              Reset
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => onUpdateZoom(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 800 }}>
              {zoom.toFixed(1)}x
            </span>
          </div>

          <div style={{ marginTop: 12 }}>
            <select
              value={filter}
              onChange={(e) => onUpdateFilter(e.target.value as PhotoFilter)}
              className="form-select"
            >
              <option value="none">Original Crisp</option>
              <option value="sunset">Warm Sunset Glow</option>
              <option value="cyber">Cyber Matrix Cyan</option>
              <option value="bw">B&W Tech Contrast</option>
            </select>
          </div>

          <div style={{ fontSize: "0.76rem", color: "var(--color-text-muted)", marginTop: 8 }}>
            Drag photo directly on canvas to reposition.
          </div>
        </div>
      </div>

      {/* Format B Specific Fields */}
      {format === "builder" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label" htmlFor="userNameInput">
                2. Builder Name / Handle
              </label>
              <input
                type="text"
                id="userNameInput"
                className="form-input"
                value={builder.name}
                onChange={(e) => onUpdateBuilder({ name: e.target.value })}
                placeholder="e.g. Satoshi Nakamoto"
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
                value={builder.xHandle || ""}
                onChange={(e) => onUpdateBuilder({ xHandle: e.target.value })}
                placeholder="e.g. @satoshi"
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
              {PRESET_BADGES.concat(badges.filter((b) => !PRESET_BADGES.includes(b))).map((badge) => {
                const isActive = badges.includes(badge);
                return (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => handleToggleBadge(badge)}
                    className={`badge-btn ${isActive ? "active" : ""}`}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>

            <div className="custom-skill-row" style={{ marginTop: 10 }}>
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomSkill()}
                className="form-input custom-skill-input"
                placeholder="Add custom skill (e.g. GraphQL, Go, ZK)..."
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="btn-add-skill"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div className="form-group">
            <label className="form-label" htmlFor="roleSelect">
              4. Primary Role / Stack
            </label>
            <select
              id="roleSelect"
              value={builder.role}
              onChange={(e) => onUpdateBuilder({ role: e.target.value })}
              className="form-select"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Generated Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="titleInput">
              5. Generated Builder Title
            </label>
            <div className="title-reroll-group">
              <input
                type="text"
                id="titleInput"
                className="form-input"
                value={builder.builderTitle}
                onChange={(e) => onUpdateBuilder({ builderTitle: e.target.value })}
                placeholder="e.g. ARAMBOL ARCHITECT"
              />
              <button
                type="button"
                onClick={handleRerollTitle}
                className="btn-reroll"
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
              value={builder.stackLocation}
              onChange={(e) => onUpdateBuilder({ stackLocation: e.target.value })}
              placeholder="e.g. ANJUNA BEACH • NEXT.JS • TYPESCRIPT • TAILWIND"
            />
          </div>

          {/* Beach Bag Perks */}
          <div className="form-group">
            <label className="form-label">7. Beach Bag & Perks</label>
            <div className="perks-grid">
              {PERKS_OPTIONS.map((perk) => {
                const isChecked = builder.perks.includes(perk);
                return (
                  <label key={perk} className="perk-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTogglePerk(perk)}
                    />
                    {perk}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6-Theme Palette Swatch Grid */}
      <div className="theme-swatch-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span className="theme-panel-title">THEME PALETTES</span>
          <span className="theme-panel-subtitle">6 Styles • Live Preview</span>
        </div>

        <div className="theme-swatches-grid">
          {(Object.keys(THEMES) as ThemeId[]).map((id) => {
            const t = THEMES[id];
            const isActive = activeTheme === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectTheme(id)}
                className={`theme-swatch-card ${isActive ? "active" : ""}`}
              >
                <div>
                  <div className="swatch-name">{t.name}</div>
                  <div className="swatch-sub">{t.subtitle}</div>
                </div>
                <div className="swatch-dots">
                  <span className="dot" style={{ backgroundColor: t.colors.bg }} />
                  <span className="dot" style={{ backgroundColor: t.colors.accent }} />
                  <span className="dot" style={{ backgroundColor: t.colors.secondaryAccent }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={onGenerate}
        className="pattern-border-btn"
        style={{ width: "100%", padding: 16, marginTop: 10 }}
      >
        GENERATE GRAPHIC
      </button>
    </div>
  );
}
