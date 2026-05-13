import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff5f1",
          100: "#ffe5da",
          200: "#ffc4ad",
          300: "#ff9c78",
          400: "#ff7849",
          500: "#ff5a2c",
          600: "#ed4216",
          700: "#c43210",
          800: "#9c2810",
          900: "#7e2210",
        },
        save: {
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        ink: {
          950: "#08090a",
          900: "#111214",
          800: "#1c1d20",
          700: "#2b2c30",
          600: "#3e4046",
          500: "#646770",
          400: "#8a8e98",
          300: "#b6b9c0",
          200: "#dfe1e5",
          100: "#eef0f3",
          50:  "#f7f8fa",
          25:  "#fafbfc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out both",
        "ken-burns": "kenBurns 18s ease-in-out infinite alternate",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          "0%":   { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(207,160,62,0.18) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
