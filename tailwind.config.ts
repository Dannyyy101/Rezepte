import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        '128': '32rem',
        '496': '31rem'
      },
      height: {
        '128': '32rem',
        '496': '31rem'
      }, colors: {
        'text': '#000000',
        'background': '#E4D5C6',
        'border': '#A5A3A3',
        'primary': '#f05c33',
        'secondary': '#757575',
        'accent': '#b19764',
        'error': '#FF0000',
      }
    },
  },
  plugins: [],
};
export default config;
