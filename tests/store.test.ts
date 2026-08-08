import { describe, expect, it, beforeEach } from "vitest";
import { useGeneratorStore } from "@/lib/store";

describe("useGeneratorStore", () => {
  beforeEach(() => {
    useGeneratorStore.getState().reset();
  });

  it("has initial state at step upload and format pfp-frame", () => {
    const state = useGeneratorStore.getState();
    expect(state.step).toBe("upload");
    expect(state.format).toBe("pfp-frame");
    expect(state.photoFile).toBeNull();
  });

  it("updates step correctly", () => {
    useGeneratorStore.getState().setStep("customize");
    expect(useGeneratorStore.getState().step).toBe("customize");
  });

  it("updates format correctly", () => {
    useGeneratorStore.getState().setFormat("builder-card");
    expect(useGeneratorStore.getState().format).toBe("builder-card");
  });

  it("updates builder details", () => {
    useGeneratorStore.getState().setBuilder({ name: "Alex", builderTitle: "Arambol Architect" });
    const { builder } = useGeneratorStore.getState();
    expect(builder.name).toBe("Alex");
    expect(builder.builderTitle).toBe("Arambol Architect");
  });
});
