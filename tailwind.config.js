/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0047B3',
          light: '#3385FF'
        },
        secondary: {
          DEFAULT: '#00C2FF',
          dark: '#0099CC',
          light: '#33CCFF'
        },
        dark: '#000B1F',
        light: '#FFFFFF',
        accent: '#FF3366'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://buildschool.net/assets/stars.svg')",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 102, 255, 0.5)',
        'neon-strong': '0 0 30px rgba(0, 102, 255, 0.8)',
      },
    },
  },
  plugins: [],
}