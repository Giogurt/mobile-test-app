/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
      "poppins-medium": ["poppins-medium", "sans-serif"],
    },
    extend: {
      colors: {
        doia: {
          primary: { DEFAULT: "#EADDC5", dark: "#A49B8A" },
          secondary: "#F2F2F2",
          tertiary: "#F9F9F9",
          dark: "#454954",
        },
      },
    },
  },
  plugins: [],
};
