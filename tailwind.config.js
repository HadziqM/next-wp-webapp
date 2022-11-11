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
    extend: {
      backgroundImage: {
        profile3: "url(/profile3.jpg)",
        profile4: "url(/profile4.jpg)",
      },
      colors: {
        gold: "#cb9b27",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
