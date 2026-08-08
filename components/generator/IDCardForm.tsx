"use client";

import { useGeneratorStore } from "@/lib/store";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const PRESET_STACKS = ["Next.js", "Solana", "Rust", "AI", "Tailwind", "Python", "TypeScript", "Go"];

const TITLE_PHRASE_BANK = [
  "Arambol Architect",
  "Bioluminescent Hacker",
  "Sunburn Solver",
  "Anjuna Automator",
  "Tide Surfer",
  "Vagator Vector",
  "Morjim Mind",
  "Palolem Pioneer",
  "Chapora Coder",
  "Goa Fullstacker"
];

export function IDCardForm() {
  const builder = useGeneratorStore((s) => s.builder);
  const setBuilder = useGeneratorStore((s) => s.setBuilder);

  const selectedStacks = builder.stack ? builder.stack.split(" • ") : [];

  function toggleStack(tech: string) {
    let updated: string[];
    if (selectedStacks.includes(tech)) {
      updated = selectedStacks.filter((t) => t !== tech);
    } else {
      updated = [...selectedStacks, tech];
    }
    setBuilder({ stack: updated.join(" • ") });
  }

  function randomizeTitle() {
    const randomIndex = Math.floor(Math.random() * TITLE_PHRASE_BANK.length);
    const title = TITLE_PHRASE_BANK[randomIndex] || "Arambol Architect";
    setBuilder({ builderTitle: title });
  }

  return (
    <div className="flex flex-col gap-5 w-full glass-card p-6 rounded-2xl border border-sand/20 shadow-xl">
      <h3 className="font-display text-lg text-sand tracking-wide uppercase border-b border-sand/20 pb-3">
        Customize Builder Details
      </h3>

      <Input
        label="Builder Name"
        placeholder="e.g. Alex Rivera"
        value={builder.name}
        onChange={(e) => setBuilder({ name: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-wider text-sand/80">
          Tech Stack
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_STACKS.map((tech) => (
            <Badge
              key={tech}
              label={tech}
              selected={selectedStacks.includes(tech)}
              onClick={() => toggleStack(tech)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-wider text-sand/80">
            Builder Title
          </label>
          <button
            type="button"
            onClick={randomizeTitle}
            className="font-mono text-[11px] text-tide hover:underline cursor-pointer"
          >
            🎲 Randomize Title
          </button>
        </div>
        <Input
          placeholder="e.g. Arambol Architect"
          value={builder.builderTitle}
          onChange={(e) => setBuilder({ builderTitle: e.target.value })}
        />
      </div>
    </div>
  );
}
