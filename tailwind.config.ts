import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
        },
      },
      colors: {
        primary: {
          DEFAULT: "#FFEB3B",
        },
        secondary: {
          DEFAULT: "#00321F",
        },
        hash: {
          DEFAULT: "#19561D",
        },
        button: {
          DEFAULT: "#FF5722",
        },
      },
    },
  },
  plugins: [],
};
export default config;
