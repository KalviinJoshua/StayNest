/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ivory: '#FBF8F3',
        pine: {
          DEFAULT: '#1F3D34',
          50: '#EAF0EE',
          100: '#CFDDD8',
          400: '#3E6459',
          600: '#1F3D34',
          700: '#182F28',
          900: '#0F1E1A',
        },
        clay: {
          DEFAULT: '#C1652F',
          50: '#FBEEE5',
          100: '#F4D6C1',
          400: '#D17E43',
          500: '#C1652F',
          600: '#A6521F',
        },
        gold: {
          DEFAULT: '#D4A24C',
          100: '#F5E6C8',
        },
        sage: {
          DEFAULT: '#E7EDE3',
          200: '#DCE6D6',
        },
        ink: '#2B2B28',
      },
      boxShadow: {
        card: '0 1px 2px rgba(43,43,40,0.06), 0 8px 24px -8px rgba(43,43,40,0.12)',
        soft: '0 2px 10px rgba(43,43,40,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
