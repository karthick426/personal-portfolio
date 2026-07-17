/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkNav: '#030712',
        darkBg: '#030712',
        neonCyan: '#38bdf8',
        neonPurple: '#818cf8',
        neonPink: '#a78bfa'
      }
    },
  },
  plugins: [],
}
