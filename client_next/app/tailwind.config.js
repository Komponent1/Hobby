/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./styles/**/*.{css,scss,sass}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'steam-logo': "url('/steam-logo.png')",
      }
    },
  },
  plugins: [],
}

