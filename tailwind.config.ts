import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3e1673",
        secondary: "#580959",
        accentWine: "#73063a",
        accentOlive: "#526609",
        accentGreen: "#075c36",
        deepBlue: "#0b1940",
        highlight: "#b3580e"
      }
    }
  },
  plugins: []
};

export default config;
