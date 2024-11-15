/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-500': '#24AE7C',   // Replaced with green-500
        'primary-600': '#0D2A1F',   // Replaced with green-600
        'secondary-500': '#24AE7C', // Replaced with green-500
        'off-white': '#E8E9E9',     // Replaced with light-200
        'red': '#F37877',           // Replaced with red-500
        'dark-1': '#0D0F10',        // Replaced with dark-200
        'dark-2': '#131619',        // Replaced with dark-300
        'dark-3': '#1A1D21',        // Replaced with dark-400
        'dark-4': '#363A3D',        // Replaced with dark-500
        'dark-5': '#363A3D',        // Replaced with dark-500
        'dark-6': '#76828D',        // Replaced with dark-500
        'dark-7': '#ABB8C4',        // Replaced with dark-500
        'light-1': '#FFFFFF',       // Keeping original
        'light-2': '#EFEFEF',       // Keeping original
        'light-3': '#76828D',       // Replaced with dark-600
        'light-4': '#ABB8C4',       // Replaced with dark-700

        'red-500': '#ef4444'
      },      
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
