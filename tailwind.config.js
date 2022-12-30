/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#263844",
        gold: "#C3962C",
        gray: "#BDBEC2",
        white: "#FFFFFF",
        'navy-light': "#293a45",
        'gold-dark': "#b38a29",
      },
    },
    fontFamily: {
      // set all to railway
      sans: ["Railway", "sans-serif"],
      serif: ["Railway", "serif"],
      mono: ["Railway", "monospace"],
      display: ["Railway", "sans-serif"],
      body: ["Railway", "sans-serif"],

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};