/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins']
      },
      colors:{
        primary: '#801D2F',
        secondary: '#1A1861',
        dark: '#212121',
        gold: '#facc15'
      }
    },
  },
  plugins: [],
}