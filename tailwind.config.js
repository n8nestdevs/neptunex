/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0A192F", 800: "#172A45", 700: "#303C55" },
        teal: { 500: "#64FFDA", 400: "#78ffee" },
        slate: { 400: "#8892B0", 200: "#CCD6F6" }
      }
    }
  },
  plugins: [],
}