/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7B42',
          100: '#FFE6DB',
          200: '#FFC2A8',
          300: '#FF9E75',
          400: '#FF7B42',
          500: '#FF570F',
          600: '#DB4100',
          700: '#A83200',
          800: '#752300',
          900: '#421400',
          light: '#FF9E75',
          dark: '#E06432',
        },
<<<<<<< HEAD
        banana: {
          DEFAULT: '#FBE065',
          100: '#FEFAE6',
          200: '#FDF0B4',
          300: '#FCE683',
          400: '#FBE065',
          500: '#FBDB51',
          600: '#7C6603',
          700: '#7C6603',
          800: '#4B3D02',
          900: '#191401',
        },
=======
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
        secondary: {
          DEFAULT: '#8A69FC',
          100: '#EBE6FE',
          200: '#D8CDFE',
          300: '#B19BFD',
          400: '#8A69FC',
          500: '#6337FB',
          600: '#3004C8',
          700: '#240396',
          800: '#180264',
          900: '#0C0132',
          light: '#A48AFD',
          dark: '#6F4DE0',
        },
        neutral: {
          DEFAULT: '#9F9EA4',
          100: '#EDEDEE',
          200: '#D3D2D5',
          300: '#B9B8BC',
          400: '#9F9EA4',
          500: '#84828A',
          600: '#6C6A71',
          700: '#535157',
          800: '#3A393D',
          900: '#212022',
          light: '#BBBAC0',
          dark: '#7A797F',
        },
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444',
        background: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Prompt', 'sans-serif'],
        display: ['"Prompt"', 'sans-serif'],
      },
<<<<<<< HEAD
      fontSize: {
        xs: '13px',
        sm: '16px'
      },
=======
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
