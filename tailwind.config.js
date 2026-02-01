/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jwst-black': '#0a0a0a',
        'jwst-beryllium': '#c9a227',
        'jwst-gold-light': '#d4af37',
        'jwst-white': '#f5f5f5',
      },
    },
  },
  plugins: [],
}

