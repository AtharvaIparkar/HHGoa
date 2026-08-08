/**
 * Design tokens — single source of truth.
 * Signature concept: "low tide at Anjuna" — a wave-wash reveal motif,
 * bioluminescent-plankton accent, festival-wristband layout language.
 * Tailwind config reads color names from here; keep them in sync.
 */
export const colors = {
  monsoon: "#0B3D3A", // deep teal — primary background
  sand: "#EFE3C8", // warm sand — surfaces / light text on dark
  sunset: "#FF6B4A", // coral sunset — primary accent, CTAs
  tide: "#C6FF3D", // bioluminescent lime — interactive highlight ONLY, use sparingly
  ink: "#08201E" // near-black teal — body text on sand
} as const;

export const type = {
  display: "Clash Display", // via Fontshare — condensed, high-personality headline face
  body: "General Sans", // via Fontshare — warm humanist body face
  mono: "JetBrains Mono" // captions, builder IDs, data
} as const;

export const motion = {
  // Performance budget: animate transform/opacity only, never layout props.
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  tideWash: 1.6,
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1]
} as const;
