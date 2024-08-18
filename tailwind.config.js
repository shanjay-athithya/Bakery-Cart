/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#ffcbcb',
        pastelBlue: '#c9d6ff',
        pastelMint: '#a8e6cf',
        pastelYellow: '#ffd3b6',
        babyBlue: '#89CFF0',
        pgreen: "#2D7D46",
        pyellow: "#f5cb24",
        pred:"#D0273E",
        byellow: "#fae89e",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        royal: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
