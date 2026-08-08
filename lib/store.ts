import { create } from "zustand";

export type Format = "pfp-frame" | "builder-card";
export type Step = "upload" | "customize" | "generate" | "result";

interface BuilderFields {
  name: string;
  stack: string;
  builderTitle: string;
}

interface GeneratorState {
  step: Step;
  format: Format;
  photoFile: File | null;
  photoObjectUrl: string | null;
  builder: BuilderFields;
  resultBlob: Blob | null;
  shareId: string | null;
  setStep: (step: Step) => void;
  setFormat: (format: Format) => void;
  setPhoto: (file: File, objectUrl: string) => void;
  setBuilder: (fields: Partial<BuilderFields>) => void;
  setResult: (blob: Blob) => void;
  setShareId: (id: string) => void;
  reset: () => void;
}

const initialBuilder: BuilderFields = { name: "", stack: "", builderTitle: "" };

export const useGeneratorStore = create<GeneratorState>((set) => ({
  step: "upload",
  format: "pfp-frame",
  photoFile: null,
  photoObjectUrl: null,
  builder: initialBuilder,
  resultBlob: null,
  shareId: null,
  setStep: (step) => set({ step }),
  setFormat: (format) => set({ format }),
  setPhoto: (photoFile, photoObjectUrl) => set({ photoFile, photoObjectUrl }),
  setBuilder: (fields) =>
    set((s) => ({ builder: { ...s.builder, ...fields } })),
  setResult: (resultBlob) => set({ resultBlob, step: "result" }),
  setShareId: (shareId) => set({ shareId }),
  reset: () =>
    set({
      step: "upload",
      photoFile: null,
      photoObjectUrl: null,
      builder: initialBuilder,
      resultBlob: null,
      shareId: null
    })
}));
