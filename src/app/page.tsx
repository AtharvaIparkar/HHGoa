"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GeneratorState } from "@/types";
import { THEMES } from "@/lib/themes";
import { Preloader } from "@/components/Preloader";
import { BackgroundVector } from "@/components/BackgroundVector";
import { Header } from "@/components/Header";
import { Page1Hero } from "@/components/Page1Hero";
import { Page2Form } from "@/components/Page2Form";
import { Page3Showcase } from "@/components/Page3Showcase";
import { HypeModal } from "@/components/HypeModal";
import { ShareModal } from "@/components/ShareModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [state, setState] = useState<GeneratorState>({
    currentPage: 1,
    isPreloading: true,
    format: "pfp",
    photoImg: null,
    panX: 0,
    panY: 0,
    zoom: 1.0,
    filter: "none",
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    userName: "",
    xHandle: "",
    selectedBadges: ["Next.js", "Solana", "Rust", "TypeScript", "Tailwind"],
    role: "FULLSTACK DEVELOPER",
    builderTitle: "",
    stackLocation: "",
    perks: ["HIGH-SPEED FIBER", "24/7 CAFFEINE", "OCEAN BREEZE", "RED BULL & BITES"],
    theme: "signal",
    builderId: `GOA-${Math.floor(1000 + Math.random() * 9000)}`,
    soundMuted: false,
  });

  const [isHypeOpen, setIsHypeOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Audio Click Sound Synthesizer
  const playClickSound = useCallback(() => {
    if (state.soundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context fallthrough
    }
  }, [state.soundMuted]);

  // Dynamic Theme CSS engine sync
  useEffect(() => {
    const theme = THEMES[state.theme] || THEMES.signal;
    const isDark = theme.isDark;
    const root = document.documentElement;

    root.style.setProperty("--theme-bg", theme.colors.bg);
    root.style.setProperty("--theme-card-bg", theme.colors.cardBg);
    root.style.setProperty("--theme-text", isDark ? theme.colors.text || "#E8F3EC" : "#1A0C06");
    root.style.setProperty("--theme-text-muted", isDark ? theme.colors.textSecondary || "rgba(232, 243, 236, 0.75)" : "#4A3428");
    root.style.setProperty("--theme-input-bg", isDark ? "rgba(0, 0, 0, 0.45)" : "rgba(255, 255, 255, 0.95)");
    root.style.setProperty("--theme-input-text", isDark ? theme.colors.text || "#E8F3EC" : "#1A0C06");
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-accent-glow", theme.colors.accentGlow);
    root.style.setProperty("--theme-secondary-accent", theme.colors.secondaryAccent || theme.colors.accentGlow);
    root.style.setProperty("--theme-border", theme.colors.border);

    document.body.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const handlePreloaderComplete = useCallback(() => {
    setState((prev) => ({ ...prev, isPreloading: false }));
  }, []);

  const handleStartBuilder = () => {
    playClickSound();
    setState((prev) => ({ ...prev, currentPage: 2 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerateGraphic = () => {
    playClickSound();
    setState((prev) => ({ ...prev, currentPage: 3 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToEdit = () => {
    playClickSound();
    setState((prev) => ({ ...prev, currentPage: 2 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    playClickSound();
    setState((prev) => ({ ...prev, currentPage: 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleSound = () => {
    setState((prev) => {
      const nextMuted = !prev.soundMuted;
      return { ...prev, soundMuted: nextMuted };
    });
  };

  return (
    <main>
      {/* Preloader Intro Overlay */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Vector Ocean Waves & Ambient Shader Background */}
      <BackgroundVector />

      {/* Navbar Header */}
      <Header
        soundMuted={state.soundMuted}
        onToggleSound={handleToggleSound}
        onOpenHypeModal={() => {
          playClickSound();
          setIsHypeOpen(true);
        }}
        onGoHome={handleGoHome}
      />

      {/* View Page Router */}
      {state.currentPage === 1 && <Page1Hero onStart={handleStartBuilder} />}

      {state.currentPage === 2 && (
        <Page2Form
          state={state}
          setState={setState}
          onGenerate={handleGenerateGraphic}
          playClickSound={playClickSound}
        />
      )}

      {state.currentPage === 3 && (
        <Page3Showcase
          state={state}
          onBackToEdit={handleBackToEdit}
          onOpenShareModal={() => {
            playClickSound();
            setIsShareOpen(true);
          }}
          playClickSound={playClickSound}
        />
      )}

      {/* Modals */}
      <HypeModal isOpen={isHypeOpen} onClose={() => setIsHypeOpen(false)} />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        playClickSound={playClickSound}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
