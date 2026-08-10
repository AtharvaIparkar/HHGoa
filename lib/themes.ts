export type ThemeId =
  | "signal"
  | "terminal"
  | "monsoon"
  | "vintage"
  | "sakura"
  | "synthwave";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  isDark: boolean;
  colors: {
    bg: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentGlow: string;
    secondaryAccent: string;
    border: string;
    focus: string;
    rimLight: string;
    stepperActive: string;
  };
  signatureMotion: string;
  description: string;
}

export class ThemeSystem {
  static defaultTheme: ThemeId = "signal";
}


export const THEMES: Record<ThemeId, ThemeConfig> = {
  signal: {
    id: "signal",
    name: "Signal",
    subtitle: "HH Goa Official Identity",
    isDark: true,
    colors: {
      bg: "#0D5B35",
      cardBg: "rgba(13, 91, 53, 0.85)",
      text: "#E8F3EC",
      textSecondary: "rgba(232, 243, 236, 0.75)",
      accent: "#0F7A47",
      accentGlow: "#7CFF6B",
      secondaryAccent: "#FFC24B",
      border: "rgba(255, 194, 75, 0.4)",
      focus: "#7CFF6B",
      rimLight: "#FFC24B",
      stepperActive: "#7CFF6B"
    },

    signatureMotion: "Ambient Sunrise Gradient Sweep & Palm Parallax",
    description: "Deep tide green, sunrise coral/gold, signal green accents"
  },
  terminal: {
    id: "terminal",
    name: "Terminal Midnight",
    subtitle: "Developer Hacker Culture",
    isDark: true,
    colors: {
      bg: "#080C0A",
      cardBg: "rgba(10, 16, 12, 0.9)",
      text: "#7CFF6B",
      textSecondary: "rgba(124, 255, 107, 0.7)",
      accent: "#00FF66",
      accentGlow: "#00FF66",
      secondaryAccent: "#33FF99",
      border: "rgba(0, 255, 102, 0.4)",
      focus: "#00FF66",
      rimLight: "#00FF66",
      stepperActive: "#00FF66"
    },
    signatureMotion: "Matrix Glitch Scan & CRT Refresh Scan-Lines",
    description: "Near-black terminal, kinetic lime type, CRT scanlines"
  },
  monsoon: {
    id: "monsoon",
    name: "Monsoon Neon",
    subtitle: "Anjuna Night Rain",
    isDark: true,
    colors: {
      bg: "#0E0B16",
      cardBg: "rgba(22, 17, 36, 0.85)",
      text: "#E2F1FF",
      textSecondary: "rgba(226, 241, 255, 0.7)",
      accent: "#00E5FF",
      accentGlow: "#FF007A",
      secondaryAccent: "#FF007A",
      border: "rgba(0, 229, 255, 0.4)",
      focus: "#00E5FF",
      rimLight: "#FF007A",
      stepperActive: "#00E5FF"
    },
    signatureMotion: "Animated Rain Streaks & Electric Glow Pulses",
    description: "Ink purple, electric cyan blue, magenta rim light"
  },
  vintage: {
    id: "vintage",
    name: "Vintage Boarding",
    subtitle: "Retro Goan Stamp",
    isDark: false,
    colors: {
      bg: "#F4EFE6",
      cardBg: "rgba(255, 252, 247, 0.95)",
      text: "#2C1810",
      textSecondary: "rgba(44, 24, 16, 0.8)",
      accent: "#A83220",
      accentGlow: "#801B0E",
      secondaryAccent: "#B45309",
      border: "rgba(168, 50, 32, 0.45)",
      focus: "#A83220",
      rimLight: "#D4AF37",
      stepperActive: "#A83220"
    },
    signatureMotion: "Paper Grain Texture & Ticket Stub Tear Line Reveal",
    description: "Cream parchment, oxblood red, vintage brass details"
  },
  sakura: {
    id: "sakura",
    name: "Sakura Drift",
    subtitle: "Sunrise Blossom",
    isDark: false,
    colors: {
      bg: "#FDF2F4",
      cardBg: "rgba(255, 245, 247, 0.95)",
      text: "#4A2E35",
      textSecondary: "rgba(74, 46, 53, 0.8)",
      accent: "#E86A92",
      accentGlow: "#C92A54",
      secondaryAccent: "#D97706",
      border: "rgba(201, 42, 84, 0.45)",
      focus: "#E86A92",
      rimLight: "#F7B267",
      stepperActive: "#C92A54"
    },
    signatureMotion: "Falling Petal Particles (CSS-only ~12 particles)",
    description: "Blush pink, warm gold, cream blossom accents"
  },

  synthwave: {
    id: "synthwave",
    name: "Synthwave Tide",
    subtitle: "80s Anjuna Cyber-Beach",
    isDark: true,
    colors: {
      bg: "#120024",
      cardBg: "rgba(30, 5, 55, 0.9)",
      text: "#FF77A9",
      textSecondary: "rgba(255, 119, 169, 0.75)",
      accent: "#00F0FF",
      accentGlow: "#FF0055",
      secondaryAccent: "#FFE600",
      border: "rgba(255, 0, 85, 0.5)",
      focus: "#00F0FF",
      rimLight: "#00F0FF",
      stepperActive: "#FF0055"
    },
    signatureMotion: "Animated Grid Horizon Parallax & Chromatic Flicker",
    description: "Deep synth navy, neon magenta, cyan grid horizon"
  }
};
