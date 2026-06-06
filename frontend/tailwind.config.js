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
        darkNav: '#0a192f',
        neonCyan: '#64ffda'
      }
    },
  },
  plugins: [],
}
