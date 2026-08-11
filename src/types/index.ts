export type ThemeId =
  | "signal"
  | "terminal"
  | "monsoon"
  | "vintage"
  | "sakura"
  | "synthwave";

export interface ThemeColors {
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
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  isDark: boolean;
  colors: ThemeColors;
}

export interface PhotoTransform {
  panX: number;
  panY: number;
  zoom: number;
}

export type PhotoFilter = 'none' | 'sunset' | 'cyber' | 'bw';

export type CardFormat = 'pfp' | 'builder';

export interface BuilderData {
  name: string;
  xHandle?: string;
  selectedBadges: string[];
  role: string;
  builderTitle: string;
  stackLocation: string;
  perks: string[];
  idNumber: string;
}

export interface GeneratorState {
  currentPage: 1 | 2 | 3;
  isPreloading: boolean;
  format: CardFormat;
  photoImg: HTMLImageElement | null;
  photoTransform: PhotoTransform;
  filter: PhotoFilter;
  isDragging: boolean;
  dragStart: { x: number; y: number };
  builder: BuilderData;
  theme: ThemeId;
  soundMuted: boolean;
}
