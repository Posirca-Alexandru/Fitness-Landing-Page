const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./dist/**/*.html"],
  theme: {
    screens: {
      md: "768px",
      lg: "1025px",
      xl: "1440px"
    },
    colors: {
      "white-main": "#FAFAF9",
      "black-main": "#171717",
      "gray-dark": {
        100: "#EFEDE8a6",
        200: "#303030",
      },
      "gray-light": {
        100: "#323443", 
        200: "#232532",
      },
      "orange": {
        100: "#EFA082",
        200: "#EF8964",
        300: "#EF8963",
        400: "#E6533C",
      },
      "purple": "#7A29DC",
      "blue": "#0070C9",
    },
    fontFamily: {
      inter: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}

