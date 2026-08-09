"use client";

import { useGeneratorStore, generateClientSideTitle } from "@/lib/store";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const PRESET_STACKS = ["Next.js", "Solana", "Rust", "AI / ML", "TypeScript", "Python", "Tailwind", "Move", "Wasm"];

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
    const stackStr = updated.join(" • ");
    const newTitle = generateClientSideTitle(builder.name || "GOA", stackStr || "BUILDER");
    setBuilder({ stack: stackStr, builderTitle: newTitle });
  }

  function randomizeTitle() {
    const title = generateClientSideTitle(
      Math.random().toString(36).substring(7),
      builder.stack || "GOA"
    );
    setBuilder({ builderTitle: title });
  }

  return (
    <div className="flex flex-col gap-5 w-full glass-card p-6 rounded-3xl border border-[#E8F3EC]/20 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#E8F3EC]/15 pb-3">
        <h3 className="font-display text-lg font-black text-[#E8F3EC] tracking-wide uppercase">
          Customize Builder Pass
        </h3>
        <span className="font-mono text-[10px] text-[#7CFF6B] bg-[#0B6839]/40 border border-[#0B6839] px-2 py-0.5 rounded-full">
          INSTANT_COMPILED
        </span>
      </div>

      <Input
        label="Builder Name / Handle"
        placeholder="e.g. Satoshi Nakamoto"
        value={builder.name}
        onChange={(e) => {
          const val = e.target.value;
          const autoTitle = generateClientSideTitle(val || "GOA", builder.stack || "BUILDER");
          setBuilder({ name: val, builderTitle: autoTitle });
        }}
      />

      <div className="flex flex-col gap-2.5">
        <label className="font-mono text-xs uppercase tracking-wider text-[#E8F3EC]/80">
          Tech Stack &amp; Focus Area
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
          <label className="font-mono text-xs uppercase tracking-wider text-[#FFC24B]">
            Generated Builder Title
          </label>
          <button
            type="button"
            onClick={randomizeTitle}
            className="font-mono text-[11px] text-[#7CFF6B] hover:underline cursor-pointer"
          >
            🎲 Regenerate Title
          </button>
        </div>
        <Input
          placeholder="e.g. ARAMBOL ARCHITECT"
          value={builder.builderTitle}
          onChange={(e) => setBuilder({ builderTitle: e.target.value.toUpperCase() })}
        />
      </div>
    </div>
  );
}

