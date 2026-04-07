import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          deep: "#D946EF",    // fuchsia-500
          primary: "#C026D3", // fuchsia-600
          medium: "#E879F9",  // fuchsia-400
          light: "#F0ABFC",   // fuchsia-300
          pale: "#FAE8FF",    // fuchsia-100
          soft: "#FDF4FF",    // fuchsia-50
        },
        dark: {
          bg: "#FDF4FF",
          surface: "#FAE8FF",
          surfaceHover: "#F5D0FE",
          border: "#E879F9",
          text: "#4C1D95",
          muted: "#7E22CE"
        },
        gold: {
          primary: "#FBBF24",
          light: "#FDE68A",
          dark: "#D97706",
        },
        // Keep toy aliases for backward compat but map to violet palette
        toy: {
          red: "#7C3AED",
          blue: "#8B5CF6",
          yellow: "#FBBF24",
          green: "#A78BFA",
          purple: "#5B21B6",
          pink: "#C4B5FD",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ['var(--font-fredoka)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'magic-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #171717 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
