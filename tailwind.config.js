module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Custom primary color
        secondary: '#fbbf24', // Custom secondary color
        accent: '#3b82f6', // Custom accent color
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Custom sans-serif font
        serif: ['Georgia', 'serif'], // Custom serif font
      },
      spacing: {
        72: '18rem', // Custom spacing size
        84: '21rem', // Custom spacing size
        96: '24rem', // Custom spacing size
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
