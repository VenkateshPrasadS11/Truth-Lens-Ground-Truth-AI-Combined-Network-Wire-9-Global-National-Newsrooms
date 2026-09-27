import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080c14",
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          800: "#131b2e",
          850: "#0f172a",
          900: "#0b1120",
          950: "#060911",
        },
        navy: {
          800: "#162032",
          850: "#111a2a",
          900: "#0c1322",
        },
        // Sophisticated, non-neon verification colors
        verdict: {
          true: {
            bg: "#062b1e",
            border: "#0e5a3e",
            text: "#34d399",
            badge: "#047857",
            glow: "rgba(16, 185, 129, 0.15)",
          },
          misleading: {
            bg: "#2b1c05",
            border: "#6b4408",
            text: "#fbbf24",
            badge: "#b45309",
            glow: "rgba(245, 158, 11, 0.15)",
          },
          fake: {
            bg: "#2d0b13",
            border: "#6b1426",
            text: "#f87171",
            badge: "#be123c",
            glow: "rgba(225, 29, 72, 0.15)",
          },
          unverified: {
            bg: "#18202f",
            border: "#334155",
            text: "#94a3b8",
            badge: "#475569",
            glow: "rgba(100, 116, 139, 0.15)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
      },
      animation: {
        "radar-sweep": "radarSweep 3s linear infinite",
        "pulse-subtle": "pulseSubtle 2.5s ease-in-out infinite",
        "scan-line": "scanLine 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
