import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#1E2A4A",
          indigoDark: "#131C31",
          indigoLight: "#2E3E6D",
          teal: "#0F766E",
          tealLight: "#14B8A6",
          tealMuted: "#CCFBF1",
          amber: "#D97706",
          amberLight: "#FDE68A",
          amberMuted: "#FEF3C7",
          safetyRed: "#C2413B",
          safetyRedMuted: "#FEE2E2",
          green: "#15803D",
          greenMuted: "#DCFCE7",
          blue: "#2563EB",
          blueMuted: "#DBEAFE",
        },
        surface: {
          light: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
          border: "#E2E8F0",
          dark: "#0F172A",
          darkCard: "#1E293B",
          darkMuted: "#334155",
          darkBorder: "#334155",
        },
      },
      borderRadius: {
        chip: "10px",
        control: "14px",
        card: "20px",
        sheet: "28px",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Noto Sans Tamil",
          "Noto Sans Devanagari",
          "Noto Sans Telugu",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        appleSm: "0 1px 2px rgba(15, 23, 42, 0.04)",
        appleMd: "0 8px 24px rgba(15, 23, 42, 0.06)",
        appleHover: "0 12px 32px rgba(15, 23, 42, 0.09)",
      },
    },
  },
  plugins: [],
};

export default config;
