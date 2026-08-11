"use client";

import React, { useState, useEffect } from "react";
import {
  BuilderData,
  CardFormat,
  PhotoFilter,
  PhotoTransform,
  ThemeId
} from "@/types";
import { THEMES } from "@/lib/themes";
import { Header } from "@/components/ui/Header";
import { Preloader } from "@/components/ui/Preloader";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { FormatTabs } from "@/components/ui/FormatTabs";
import { FormPanel } from "@/components/ui/FormPanel";
import { CanvasPreview } from "@/components/ui/CanvasPreview";
import { ShowcaseStage } from "@/components/ui/ShowcaseStage";
import { HypeModal, ShareModal } from "@/components/ui/Modals";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(1);
  const [format, setFormat] = useState<CardFormat>("pfp");
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [filter, setFilter] = useState<PhotoFilter>("none");
  const [themeId, setThemeId] = useState<ThemeId>("signal");
  const [soundMuted, setSoundMuted] = useState(false);

  const [isHypeModalOpen, setIsHypeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>({
    panX: 0,
    panY: 0,
    zoom: 1.0
  });

  const [builder, setBuilder] = useState<BuilderData>({
    name: "",
    xHandle: "",
    selectedBadges: ["Next.js", "Solana", "Rust", "TypeScript", "Tailwind"],
    role: "FULLSTACK DEVELOPER",
    builderTitle: "",
    stackLocation: "",
    perks: ["HIGH-SPEED FIBER", "24/7 CAFFEINE", "OCEAN BREEZE", "RED BULL & BITES"],
    idNumber: `#GOA-${Math.floor(1000 + Math.random() * 9000)}`
  });

  const activeTheme = THEMES[themeId] || THEMES.signal;

  // Sync theme variables to root document
  useEffect(() => {
    const isDark = activeTheme.isDark;
    const root = document.documentElement;
    document.body.setAttribute("data-theme", themeId);

    root.style.setProperty("--theme-bg", activeTheme.colors.bg);
    root.style.setProperty("--theme-card-bg", activeTheme.colors.cardBg);
    root.style.setProperty("--theme-text", isDark ? (activeTheme.colors.text || "#E8F3EC") : "#FFFFFF");
    root.style.setProperty("--theme-text-muted", isDark ? (activeTheme.colors.textSecondary || "rgba(232,243,236,0.75)") : "#FFC233");
    root.style.setProperty("--theme-input-bg", isDark ? "rgba(0, 0, 0, 0.45)" : "rgba(255, 255, 255, 0.95)");
    root.style.setProperty("--theme-input-text", isDark ? (activeTheme.colors.text || "#E8F3EC") : "#1A0C06");
    root.style.setProperty("--theme-accent", activeTheme.colors.accent);
    root.style.setProperty("--theme-accent-glow", activeTheme.colors.accentGlow);
    root.style.setProperty("--theme-secondary-accent", activeTheme.colors.secondaryAccent || activeTheme.colors.accentGlow);
    root.style.setProperty("--theme-border", activeTheme.colors.border);
  }, [themeId, activeTheme]);

  const handleUpdateBuilder = (updates: Partial<BuilderData>) => {
    setBuilder((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateTransform = (updates: Partial<PhotoTransform>) => {
    setPhotoTransform((prev) => ({ ...prev, ...updates }));
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPhotoImg(img);
        setPhotoTransform({ panX: 0, panY: 0, zoom: 1.0 });
      };
      if (e.target?.result) img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleShareToX = () => {
    const tweetText = `Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa`;
    navigator.clipboard.writeText(tweetText).catch(() => {});
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
    setIsShareModalOpen(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <Preloader onComplete={() => {}} />

      <Header
        theme={activeTheme}
        soundMuted={soundMuted}
        onToggleSound={() => setSoundMuted((prev) => !prev)}
        onOpenHypeModal={() => setIsHypeModalOpen(true)}
        onGoHome={() => setCurrentPage(1)}
      />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px 80px" }}>
        <StepIndicator
          currentStep={currentPage}
          onSelectStep={(step) => setCurrentPage(step)}
        />

        {/* PAGE 1: LANDING HERO */}
        {currentPage === 1 && (
          <div className="hero-landing-container">
            <div className="hero-title-wrapper">
              <h1 className="hero-giant-title">HACKER HOUSE</h1>
              <div className="hero-floating-stamp">गोवा</div>
            </div>

            <div className="hero-subbar">
              <span>GOA, INDIA · 28 – 31 OCT 2026</span>
              <span>2:47 PM STUDIO</span>
            </div>

            <div style={{ marginTop: 40 }}>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className="pattern-border-btn hero-cta-btn"
              >
                BUILD YOUR PFP FRAME / CARD
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: CUSTOMIZATION FORM */}
        {currentPage === 2 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormatTabs
              activeFormat={format}
              onSelectFormat={(f) => setFormat(f)}
            />

            <div className="app-grid">
              <FormPanel
                format={format}
                builder={builder}
                filter={filter}
                zoom={photoTransform.zoom}
                activeTheme={themeId}
                onUpdateBuilder={handleUpdateBuilder}
                onUpdateFilter={setFilter}
                onUpdateZoom={(z) => handleUpdateTransform({ zoom: z })}
                onResetZoom={() => setPhotoTransform({ panX: 0, panY: 0, zoom: 1.0 })}
                onFileUpload={handleFileUpload}
                onSelectTheme={setThemeId}
                onGenerate={() => setCurrentPage(3)}
              />

              <CanvasPreview
                format={format}
                photoImg={photoImg}
                photoTransform={photoTransform}
                filter={filter}
                builder={builder}
                themeId={themeId}
                onUpdateTransform={handleUpdateTransform}
              />
            </div>
          </div>
        )}

        {/* PAGE 3: 3D SHOWCASE STAGE */}
        {currentPage === 3 && (
          <ShowcaseStage
            format={format}
            photoImg={photoImg}
            photoTransform={photoTransform}
            filter={filter}
            builder={builder}
            themeId={themeId}
            onBackToEdit={() => setCurrentPage(2)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}
      </main>

      <footer className="app-footer">
        <div>© 2026 Hacker House Goa — HH Goa 2026 Shortlisting Task #1</div>
        <div className="footer-links">
          <a href="https://hhgoa.com" target="_blank" rel="noreferrer">hhgoa.com</a>
          <span>•</span>
          <a href="https://twitter.com/247pmstudio" target="_blank" rel="noreferrer">@247pmstudio</a>
          <span>•</span>
          <a href="#">#FrameInGoa</a>
        </div>
      </footer>

      <HypeModal
        isOpen={isHypeModalOpen}
        onClose={() => setIsHypeModalOpen(false)}
        theme={activeTheme}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        theme={activeTheme}
        onShareToX={handleShareToX}
      />
    </div>
  );
}
