/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          300: '#c8b5ff',
          400: '#a78bfa',
          900: '#1e0436',
        },
        neutral: {
          700: '#2b2b2b',
          800: '#1f1f1f',
          900: '#0b0b0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [
    // form and typography helpers
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
