/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#122620',
          DEFAULT: '#1f7a4d',
          light: '#2f9e63',
        },
      },
    },
  },
  plugins: [],
}
