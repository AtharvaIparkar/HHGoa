import { create } from "zustand";
import { type ThemeId } from "./themes";

export type Format = "pfp-frame" | "builder-card";
export type StudioStep = 1 | 2 | 3 | 4 | 5; // 1: Upload, 2: Adjust, 3: Theme, 4: Details, 5: Export
export type Step = "upload" | "customize" | "generate" | "result";
export type PrimaryHashtag = "#FramedInGoa" | "#FrameInGoa";

export interface PhotoTransform {
  zoom: number; // 100 to 250 (% scale)
  pan: { x: number; y: number }; // px offset
  rotation: number; // 0, 90, 180, 270 degrees
}

interface BuilderFields {
  name: string;
  xHandle: string;
  stack: string;
  builderTitle: string;
  idNumber: string;
}

interface GeneratorState {
  studioStep: StudioStep;
  step: Step;
  format: Format;
  activeThemeId: ThemeId;
  photoFile: File | null;
  photoObjectUrl: string | null;
  transform: PhotoTransform;
  builder: BuilderFields;
  resultBlob: Blob | null;
  shareId: string | null;
  isIntroPlaying: boolean;
  hasSeenIntro: boolean;
  hashtag: PrimaryHashtag;

  setStudioStep: (step: StudioStep) => void;
  setStep: (step: Step) => void;
  setFormat: (format: Format) => void;
  setTheme: (themeId: ThemeId) => void;
  setPhoto: (file: File, objectUrl: string) => void;
  setTransform: (transform: Partial<PhotoTransform>) => void;
  resetTransform: () => void;
  setBuilder: (fields: Partial<BuilderFields>) => void;
  setResult: (blob: Blob) => void;
  setShareId: (id: string) => void;
  setIntroPlaying: (playing: boolean) => void;
  setHashtag: (tag: PrimaryHashtag) => void;
  replayIntro: () => void;
  reset: () => void;
}

const TITLE_PREFIXES = [
  "ARAMBOL", "ANJUNA", "VAGATOR", "PALOLEM", "MORJIM",
  "SHIRODA", "CHAPORA", "CALANGUTE", "AGUADA", "CANACONA"
];

const TITLE_SUFFIXES = [
  "ARCHITECT", "SHAMAN", "VALIDATOR", "KERNEL", "ALCHEMIST",
  "ENGINEER", "CYPHERPUNK", "SOLVER", "FOUNDER", "HACKER"
];

export function generateClientSideTitle(name: string, stack: string): string {
  const seed = (name + stack).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const prefix = TITLE_PREFIXES[seed % TITLE_PREFIXES.length];
  const suffix = TITLE_SUFFIXES[(seed + 3) % TITLE_SUFFIXES.length];
  return `${prefix} ${suffix}`;
}

const defaultTransform: PhotoTransform = {
  zoom: 100,
  pan: { x: 0, y: 0 },
  rotation: 0
};

const initialBuilder: BuilderFields = {
  name: "",
  xHandle: "",
  stack: "",
  builderTitle: "ARAMBOL ARCHITECT",
  idNumber: "#GOA-2026"
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  studioStep: 1,
  step: "upload",
  format: "pfp-frame",
  activeThemeId: "signal",
  photoFile: null,
  photoObjectUrl: null,
  transform: defaultTransform,
  builder: initialBuilder,
  resultBlob: null,
  shareId: null,
  isIntroPlaying: true,
  hasSeenIntro: false,
  hashtag: "#FramedInGoa",

  setStudioStep: (studioStep) => {
    // Map studioStep 1..5 to legacy step for backwards compatibility
    let step: Step = "upload";
    if (studioStep === 2 || studioStep === 3 || studioStep === 4) step = "customize";
    if (studioStep === 5) step = "result";
    set({ studioStep, step });
  },

  setStep: (step) => {
    let studioStep: StudioStep = 1;
    if (step === "upload") studioStep = 1;
    if (step === "customize") studioStep = 2;
    if (step === "result" || step === "generate") studioStep = 5;
    set({ step, studioStep });
  },

  setFormat: (format) => set({ format }),
  setTheme: (activeThemeId) => set({ activeThemeId }),

  setPhoto: (photoFile, photoObjectUrl) =>
    set({
      photoFile,
      photoObjectUrl,
      transform: defaultTransform,
      studioStep: 2,
      step: "customize"
    }),

  setTransform: (partial) =>
    set((s) => ({ transform: { ...s.transform, ...partial } })),

  resetTransform: () => set({ transform: defaultTransform }),

  setBuilder: (fields) =>
    set((s) => {
      const updated = { ...s.builder, ...fields };
      if ((fields.name !== undefined || fields.stack !== undefined) && !fields.builderTitle) {
        updated.builderTitle = generateClientSideTitle(updated.name || "GOA", updated.stack || "BUILDER");
      }
      return { builder: updated };
    }),

  setResult: (resultBlob) => set({ resultBlob, studioStep: 5, step: "result" }),
  setShareId: (shareId) => set({ shareId }),
  setIntroPlaying: (isIntroPlaying) => set({ isIntroPlaying, hasSeenIntro: true }),
  setHashtag: (hashtag) => set({ hashtag }),
  replayIntro: () => set({ isIntroPlaying: true, studioStep: 1, step: "upload" }),

  reset: () =>
    set({
      studioStep: 1,
      step: "upload",
      photoFile: null,
      photoObjectUrl: null,
      transform: defaultTransform,
      builder: {
        ...initialBuilder,
        idNumber: `#GOA-${Math.floor(1000 + Math.random() * 9000)}`
      },
      resultBlob: null,
      shareId: null
    })
}));


