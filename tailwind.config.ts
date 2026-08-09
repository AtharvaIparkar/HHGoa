import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Sunrise Signal palette — official HH Goa 2026 design system
        "deep-tide": "#0D5B35", // rich signal green, primary background
        "signal-green": "#0F7A47", // brand accent green, primary CTAs and focus states

        "sunrise-coral": "#FF6F4C", // animated gradient pair — coral sweep
        "sunrise-gold": "#FFC24B", // animated gradient pair — gold sweep
        foam: "#E8F3EC", // light text/surfaces on dark
        "terminal-lime": "#7CFF6B", // glitch/terminal accent, kinetic type only

        // Legacy / theme aliases for cross-compatibility
        monsoon: "#062B1F",
        sand: "#E8F3EC",
        sunset: "#FF6F4C",
        tide: "#7CFF6B",
        ink: "#041B13"
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo Black", "Bebas Neue", "sans-serif"],
        body: ["var(--font-body)", "Inter", "General Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Mono", "monospace"]
      },
      animation: {
        "sunrise-sweep": "sunriseSweep 20s linear infinite",
        "scan-line": "scanLine 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite"
      },
      keyframes: {
        sunriseSweep: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        scanLine: {
          "0%": { transform: "translateX(-100%)", opacity: "0.8" },
          "100%": { transform: "translateX(100%)", opacity: "0" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;

