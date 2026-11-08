import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f7f4ff",
        ink: "#241b4b",
        pu: "#6c4bf4",
        pk: "#ff5d8f",
        ye: "#ffc83d",
        gr: "#1fb58f",
        bl: "#2d9cdb",
      },
    },
  },
  plugins: [],
} satisfies Config;
