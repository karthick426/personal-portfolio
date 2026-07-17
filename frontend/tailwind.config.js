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
        darkNav: '#121212',
        darkBg: '#0A0A0A',
        neonCyan: '#10B981',
        neonPurple: '#34D399',
        neonPink: '#A1A1AA'
      }
    },
  },
  plugins: [],
}
