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
        darkNav: '#080816',
        darkBg: '#040409',
        neonCyan: '#a78bfa',
        neonPurple: '#8b5cf6',
        neonPink: '#f43f5e'
      }
    },
  },
  plugins: [],
}
