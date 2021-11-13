const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      purple: colors.purple,
      blue: colors.blue,
      orange: colors.orange,
      sky: colors.sky,
      darkGray: "#1d2129",
      darkBlue: "#223c53",
    },
    extend: {},
  },
  variants: {
    extend: { margin: ["last", "first"] },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
