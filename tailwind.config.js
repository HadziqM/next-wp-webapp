/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      gold: "#cb9b27",
      blue: "#1fb6ff",
      "dark-blue": "#000088",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      black: "#000000",
      white: "#ffffff",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {
      backgroundImage: {
        profile3: "url(/profile3.jpg)",
        profile4: "url(/profile4.jpg)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
