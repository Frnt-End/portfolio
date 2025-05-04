/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: [`"Inter"`, "sans-serif"],
        ppe: [`"PPEditorialNew"`, "serif"],
        fancy: [`"DM Serif Text"`, "serif"],
        general: ["general", "sans-serif"]
      }
    }
  },
  plugins: []
};
