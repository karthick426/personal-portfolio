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
        darkNav: '#040409',
        darkBg: '#040409',
        neonCyan: '#ffffff',
        neonPurple: '#d4d4d4',
        neonPink: '#737373'
      }
    },
  },
  plugins: [],
}
