import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff5f7",
          100: "#ffe4ea",
          200: "#ffc9d5",
          300: "#ff9fb3",
          400: "#ff6f8e",
          500: "#f43f6b",
          600: "#d12454",
          700: "#a81a44",
          800: "#7a1432",
          900: "#521022",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(244, 63, 107, 0.25)",
      },
      backgroundImage: {
        "romantic-gradient":
          "radial-gradient(1200px 600px at 10% 0%, #ffe4ea 0%, transparent 60%), radial-gradient(1000px 500px at 100% 100%, #fde2ff 0%, transparent 55%), linear-gradient(180deg, #fff 0%, #fff7f9 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
