/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        primary: "#D41B3D",
        secondary: "#58B7D3",
        tertiary: "",
        quaternart: "",
        dark: "#212121",
        gold: "#facc15",
      },
    },
  },
  plugins: [],
};
