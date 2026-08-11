import { ThemeId, ThemeConfig } from "@/types";

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
    subtitle: "Cybernetic Hacker Mode",
    isDark: true,
    colors: {
      bg: "#080C0A",
      cardBg: "rgba(8, 12, 10, 0.92)",
      text: "#00FF66",
      textSecondary: "rgba(0, 255, 102, 0.8)",
      accent: "#003311",
      accentGlow: "#00FF66",
      secondaryAccent: "#33FF99",
      border: "rgba(0, 255, 102, 0.5)",
      focus: "#00FF66",
      rimLight: "#33FF99",
      stepperActive: "#00FF66"
    }
  },
  monsoon: {
    id: "monsoon",
    name: "Monsoon",
    subtitle: "Goan Rain & Ocean Neon",
    isDark: true,
    colors: {
      bg: "#0E0B16",
      cardBg: "rgba(14, 11, 22, 0.9)",
      text: "#00E5FF",
      textSecondary: "rgba(0, 229, 255, 0.75)",
      accent: "#1A0B2E",
      accentGlow: "#00E5FF",
      secondaryAccent: "#FF007A",
      border: "rgba(0, 229, 255, 0.4)",
      focus: "#00E5FF",
      rimLight: "#FF007A",
      stepperActive: "#00E5FF"
    }
  },
  vintage: {
    id: "vintage",
    name: "Vintage Poster",
    subtitle: "Retro Portuguese Tile",
    isDark: false,
    colors: {
      bg: "#F4EFE6",
      cardBg: "#FFFDF9",
      text: "#2C1810",
      textSecondary: "rgba(44, 24, 16, 0.75)",
      accent: "#A83220",
      accentGlow: "#A83220",
      secondaryAccent: "#D4AF37",
      border: "#A83220",
      focus: "#A83220",
      rimLight: "#D4AF37",
      stepperActive: "#A83220"
    }
  },
  sakura: {
    id: "sakura",
    name: "Sakura",
    subtitle: "Cherry Blossom Sunset",
    isDark: false,
    colors: {
      bg: "#FDF2F4",
      cardBg: "#FFFFFF",
      text: "#2B0914",
      textSecondary: "rgba(43, 9, 20, 0.75)",
      accent: "#C92A54",
      accentGlow: "#C92A54",
      secondaryAccent: "#E86A92",
      border: "#C92A54",
      focus: "#C92A54",
      rimLight: "#E86A92",
      stepperActive: "#C92A54"
    }
  },
  synthwave: {
    id: "synthwave",
    name: "Synthwave",
    subtitle: "Outrun 80s Sunset Grid",
    isDark: true,
    colors: {
      bg: "#120024",
      cardBg: "rgba(18, 0, 36, 0.95)",
      text: "#FF0055",
      textSecondary: "rgba(255, 0, 85, 0.8)",
      accent: "#3A0057",
      accentGlow: "#FF0055",
      secondaryAccent: "#00F0FF",
      border: "rgba(255, 0, 85, 0.5)",
      focus: "#FF0055",
      rimLight: "#00F0FF",
      stepperActive: "#FF0055"
    }
  }
};
