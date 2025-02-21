import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cta: "#b8b8fd",
      },
      fontFamily: {
        urbanist: "var(--font-sans)",
        silkscreen: "var(--font-silkscreen)",
        pixel: "var(--font-pixelify-sans)",
      }
    },
  },
  plugins: [],
} satisfies Config;
