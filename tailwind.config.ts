import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "custom-background": "#07242c", // Fundo principal escuro
        "custom-foreground": "#f4f0e1", // Texto claro
        "custom-primary": "#c0964b", // Dourado/bronze
        "custom-primary-foreground": "#000508", // Texto sobre dourado
        "custom-secondary": "#006d71", // Verde-água
        "custom-secondary-foreground": "#ffffff", // Texto sobre verde-água
        "custom-accent": "#104448", // Tom médio para acentos
        "custom-accent-foreground": "#ffffff", // Texto sobre acentos
        "custom-muted": "#d3cac0", // Tom neutro para elementos secundários
        "custom-muted-foreground": "#1d1d1b", // Texto sobre elementos secundários
        "custom-border": "#ca9a63", // Bordas em tom dourado mais claro
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-bg.jpg')",
        "journey-pattern": "url('/images/journey-bg.jpg')",
        "mentor-pattern": "url('/images/mentor-bg.jpg')",
        "torn-paper": "url('/images/torn-paper.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

