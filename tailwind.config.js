/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // usar .dark no <html> ou <body>
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}