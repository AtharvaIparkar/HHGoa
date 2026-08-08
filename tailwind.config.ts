import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Design tokens — see lib/design-tokens.ts for the source of truth
        monsoon: "#0B3D3A", // deep teal — primary background
        sand: "#EFE3C8", // warm sand — surfaces / light text on dark
        sunset: "#FF6B4A", // coral sunset — primary accent / CTAs
        tide: "#C6FF3D", // bioluminescent lime — interactive highlight, used sparingly
        ink: "#08201E" // near-black teal — body text on sand
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      animation: {
        "tide-wash": "tideWash 1.6s cubic-bezier(0.65,0,0.35,1) forwards"
      },
      keyframes: {
        tideWash: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
