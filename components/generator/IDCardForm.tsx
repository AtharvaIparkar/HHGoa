"use client";

import { useState } from "react";
import { useGeneratorStore, generateClientSideTitle } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const PRESET_STACKS = ["Next.js", "Solana", "Rust", "AI / ML", "TypeScript", "Python", "Tailwind", "Move", "Wasm"];

export function IDCardForm() {
  const builder = useGeneratorStore((s) => s.builder);
  const setBuilder = useGeneratorStore((s) => s.setBuilder);
  const activeThemeId = useGeneratorStore((s) => s.activeThemeId);
  const theme = THEMES[activeThemeId] || THEMES.signal;

  const [customStacks, setCustomStacks] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const selectedStacks = builder.stack ? builder.stack.split(" • ").filter(Boolean) : [];
  const allAvailableStacks = Array.from(new Set([...PRESET_STACKS, ...customStacks, ...selectedStacks]));

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

  function handleAddCustomSkill() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!customStacks.includes(trimmed)) {
      setCustomStacks((prev) => [...prev, trimmed]);
    }
    if (!selectedStacks.includes(trimmed)) {
      toggleStack(trimmed);
    }
    setCustomInput("");
  }

  function randomizeTitle() {
    const title = generateClientSideTitle(
      Math.random().toString(36).substring(7),
      builder.stack || "GOA"
    );
    setBuilder({ builderTitle: title });
  }

  return (
    <div
      className="flex flex-col gap-4 w-full glass-card p-5 rounded-3xl border shadow-xl transition-colors duration-250"
      style={{
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.border
      }}
    >
      <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: theme.colors.border }}>
        <h3 className="font-display text-sm font-black tracking-wide uppercase" style={{ color: theme.colors.text }}>
          Builder Pass Details
        </h3>
        <span
          className="font-mono text-[9px] px-2 py-0.5 rounded-full border"
          style={{
            color: theme.colors.accentGlow,
            backgroundColor: "rgba(11, 104, 57, 0.4)",
            borderColor: theme.colors.accentGlow
          }}
        >
          LIVE_RENDER
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <Input
          label="X / Twitter Handle (Optional)"
          placeholder="e.g. @satoshi"
          value={builder.xHandle}
          onChange={(e) => setBuilder({ xHandle: e.target.value })}
        />
      </div>

      {/* Tech Stack & Focus Area with Custom Input */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-wider" style={{ color: theme.colors.textSecondary }}>
          Tech Stack &amp; Focus Area
        </label>

        {/* Preset & Added Custom Skill Badges */}
        <div className="flex flex-wrap gap-1.5">
          {allAvailableStacks.map((tech) => (
            <Badge
              key={tech}
              label={tech}
              selected={selectedStacks.includes(tech)}
              onClick={() => toggleStack(tech)}
            />
          ))}
        </div>

        {/* Add Custom Skill Input */}
        <div className="flex items-center gap-2 mt-1">
          <input
            type="text"
            placeholder="Add custom skill (e.g. GraphQL, Go, ZK)..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomSkill();
              }
            }}
            className="flex-1 font-mono text-xs px-3 py-2 rounded-xl bg-[#062B1F]/80 border text-[#E8F3EC] focus:outline-none focus:ring-2 focus:ring-[#7CFF6B] placeholder-[#E8F3EC]/40"
            style={{ borderColor: theme.colors.border }}
          />
          <button
            type="button"
            onClick={handleAddCustomSkill}
            className="font-mono text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer hover:scale-105"
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.accentGlow,
              borderColor: theme.colors.accentGlow
            }}
          >
            + Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-wider" style={{ color: theme.colors.secondaryAccent }}>
            Generated Builder Title
          </label>
          <button
            type="button"
            onClick={randomizeTitle}
            className="font-mono text-[11px] hover:underline cursor-pointer"
            style={{ color: theme.colors.accentGlow }}
          >
            Reroll Title
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




