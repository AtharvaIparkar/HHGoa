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
}

export type FormatType = "pfp" | "builder";

export interface GeneratorState {
  currentPage: 1 | 2 | 3;
  isPreloading: boolean;
  format: FormatType;
  photoImg: HTMLImageElement | null;
  panX: number;
  panY: number;
  zoom: number;
  filter: string;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  userName: string;
  xHandle: string;
  selectedBadges: string[];
  role: string;
  builderTitle: string;
  stackLocation: string;
  perks: string[];
  theme: ThemeId;
  builderId: string;
  soundMuted: boolean;
}

export interface BuilderData {
  name: string;
  xHandle?: string;
  stack: string;
  builderTitle: string;
  idNumber?: string;
}
