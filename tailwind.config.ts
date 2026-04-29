import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nueva paleta primaria
        burgundy: {
          DEFAULT: "#6E1F3A",
          dark: "#9B3555",
        },
        sage: {
          DEFAULT: "#7A8C72",
          light: "#E8EDE4",
        },
        gold: {
          DEFAULT: "#B89060",
          light: "#C4A882",
          dark: "#9A7A48",
        },
        cream: {
          DEFAULT: "#F5F2EC",
          dark: "#EDE5D8",
        },
        ink: "#1A1018",
        muted: "#7A6A5A",
        // Compatibilidad con páginas fuera de scope (admin, auth, cart)
        rose: {
          DEFAULT: "#B07A84",
          light: "#F5E0E5",
          dark: "#8E3F4D",
        },
        blush: "#FAF0F2",
        teal: "#5FAF9F",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(6deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "floatReverse 9s ease-in-out infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
