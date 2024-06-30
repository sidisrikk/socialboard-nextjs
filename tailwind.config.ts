import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite GB S"', "sans-serif"],
      },
    },
    colors: {
      "green-100": "#d8e9e4",
      "green-300": "#2b5f44",
      "green-500": "#243831",
      success: "#49a569",
      white: "#ffffff",
      black: "#000000",
      "gray-100": "#bbc2c0",
      "gray-300": "#939494",
      golden: "#c5a365",
    },
  },
  plugins: [daisyui],
};
export default config;
