import { ThemeConfig, ThemeId } from "@/types";

export const THEMES: Record<ThemeId, ThemeConfig> = {
  signal: {
    id: "signal",
    name: "Signal",
    subtitle: "HH Goa Official Identity",
    isDark: true,
    colors: {
      bg: "#013D22",
      cardBg: "rgba(1, 45, 25, 0.95)",
      text: "#FFFFFF",
      textSecondary: "#FFC233",
      accent: "#00874E",
      accentGlow: "#7CFF6B",
      secondaryAccent: "#FFC233",
      border: "rgba(255, 194, 51, 0.7)",
      focus: "#7CFF6B",
      rimLight: "#FFC233",
      stepperActive: "#7CFF6B"
    }
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    subtitle: "Retro Hacker Green",
    isDark: true,
    colors: {
      bg: "#080C0A",
      cardBg: "rgba(10, 20, 15, 0.92)",
      text: "#00FF66",
      textSecondary: "rgba(0, 255, 102, 0.75)",
      accent: "#00FF66",
      accentGlow: "#33FF99",
      secondaryAccent: "#00E5FF",
      border: "rgba(0, 255, 102, 0.5)",
      focus: "#00FF66",
      rimLight: "#00FF66",
      stepperActive: "#00FF66"
    }
  },
  monsoon: {
    id: "monsoon",
    name: "Monsoon",
    subtitle: "Cyber Tempest Neon",
    isDark: true,
    colors: {
      bg: "#0E0B16",
      cardBg: "rgba(18, 14, 30, 0.92)",
      text: "#E0F7FA",
      textSecondary: "rgba(224, 247, 250, 0.75)",
      accent: "#00E5FF",
      accentGlow: "#FF007A",
      secondaryAccent: "#FF007A",
      border: "rgba(0, 229, 255, 0.5)",
      focus: "#00E5FF",
      rimLight: "#FF007A",
      stepperActive: "#00E5FF"
    }
  },
  vintage: {
    id: "vintage",
    name: "Vintage",
    subtitle: "Sun-Bleached Goa 1970s",
    isDark: false,
    colors: {
      bg: "#F4EFE6",
      cardBg: "rgba(255, 253, 249, 0.95)",
      text: "#2C1810",
      textSecondary: "rgba(44, 24, 16, 0.75)",
      accent: "#A83220",
      accentGlow: "#D4AF37",
      secondaryAccent: "#D4AF37",
      border: "rgba(168, 50, 32, 0.4)",
      focus: "#A83220",
      rimLight: "#D4AF37",
      stepperActive: "#A83220"
    }
  },
  sakura: {
    id: "sakura",
    name: "Sakura",
    subtitle: "Blossom Pink Matrix",
    isDark: false,
    colors: {
      bg: "#FDF2F4",
      cardBg: "rgba(255, 255, 255, 0.96)",
      text: "#2A0812",
      textSecondary: "rgba(42, 8, 18, 0.75)",
      accent: "#C92A54",
      accentGlow: "#FF85A2",
      secondaryAccent: "#E86A92",
      border: "rgba(201, 42, 84, 0.4)",
      focus: "#C92A54",
      rimLight: "#FF85A2",
      stepperActive: "#C92A54"
    }
  },
  synthwave: {
    id: "synthwave",
    name: "Synthwave",
    subtitle: "Outrun Sunset Grid",
    isDark: true,
    colors: {
      bg: "#120024",
      cardBg: "rgba(25, 5, 45, 0.92)",
      text: "#FFE500",
      textSecondary: "rgba(255, 229, 0, 0.75)",
      accent: "#FF0055",
      accentGlow: "#00F0FF",
      secondaryAccent: "#00F0FF",
      border: "rgba(255, 0, 85, 0.5)",
      focus: "#00F0FF",
      rimLight: "#FF0055",
      stepperActive: "#FF0055"
    }
  }
};
