import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#080B10",
        panel: "#0D121A",
        raised: "#121923",
        ink: "#E9F0F7",
        mute: "#929EAD",
        signal: "#55D6E8",
        compute: "#527BFF",
        find: "#F0B35A",
        line: "rgba(255,255,255,0.09)",
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
