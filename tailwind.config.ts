import type { Config } from "tailwindcss";
import "tailwindcss-radix";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        overlayShow: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        overlayShow: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        contentShow: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-radix")],
};
export default config;
