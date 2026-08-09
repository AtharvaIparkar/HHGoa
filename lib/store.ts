import { create } from "zustand";

export type Format = "pfp-frame" | "builder-card";
export type Step = "upload" | "customize" | "generate" | "result";
export type PrimaryHashtag = "#FramedInGoa" | "#FrameInGoa";

interface BuilderFields {
  name: string;
  stack: string;
  builderTitle: string;
  idNumber: string;
}

interface GeneratorState {
  step: Step;
  format: Format;
  photoFile: File | null;
  photoObjectUrl: string | null;
  builder: BuilderFields;
  resultBlob: Blob | null;
  shareId: string | null;
  isIntroPlaying: boolean;
  hasSeenIntro: boolean;
  hashtag: PrimaryHashtag;

  setStep: (step: Step) => void;
  setFormat: (format: Format) => void;
  setPhoto: (file: File, objectUrl: string) => void;
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

const initialBuilder: BuilderFields = {
  name: "",
  stack: "",
  builderTitle: "ARAMBOL ARCHITECT",
  idNumber: "#GOA-2026"
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  step: "upload",
  format: "pfp-frame",
  photoFile: null,
  photoObjectUrl: null,
  builder: initialBuilder,
  resultBlob: null,
  shareId: null,
  isIntroPlaying: true,
  hasSeenIntro: false,
  hashtag: "#FramedInGoa",

  setStep: (step) => set({ step }),
  setFormat: (format) => set({ format }),
  setPhoto: (photoFile, photoObjectUrl) => set({ photoFile, photoObjectUrl }),
  setBuilder: (fields) =>
    set((s) => {
      const updated = { ...s.builder, ...fields };
      // Auto-generate title if name or stack changes and user hasn't typed custom title
      if ((fields.name !== undefined || fields.stack !== undefined) && !fields.builderTitle) {
        updated.builderTitle = generateClientSideTitle(updated.name || "GOA", updated.stack || "BUILDER");
      }
      return { builder: updated };
    }),
  setResult: (resultBlob) => set({ resultBlob, step: "result" }),
  setShareId: (shareId) => set({ shareId }),
  setIntroPlaying: (isIntroPlaying) => set({ isIntroPlaying, hasSeenIntro: true }),
  setHashtag: (hashtag) => set({ hashtag }),
  replayIntro: () => set({ isIntroPlaying: true, step: "upload" }),
  reset: () =>
    set({
      step: "upload",
      photoFile: null,
      photoObjectUrl: null,
      builder: {
        ...initialBuilder,
        idNumber: `#GOA-${Math.floor(1000 + Math.random() * 9000)}`
      },
      resultBlob: null,
      shareId: null
    })
}));

