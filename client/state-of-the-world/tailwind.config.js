/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        trebuchet: ["Trebuchet MS", "sans-serif"],
        times: ["Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
