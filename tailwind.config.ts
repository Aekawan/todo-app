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
        "custom-gradient": 'linear-gradient(to bottom, #ffffff, #e0c3fc, #8ec5fc)',
        'header-gradient': 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4))',
        'footer-gradient': 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
        'purple-pink-gradient': 'linear-gradient(45deg, #8e2de2, #f84b93)',
        'blue-gradient': 'linear-gradient(45deg, #36d1dc, #5b86e5)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
