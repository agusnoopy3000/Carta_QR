/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌊 PALETA COSTERA CALDERA - Atardecer en el Puerto
        'ocean': {
          50: '#f0fdff',
          100: '#ccfbfe',
          200: '#99f4fd',
          300: '#5de9fa',
          400: '#22d3ee',
          500: '#06b6d4', // Océano Pacífico
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        'sunset': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c', // Atardecer Caldera
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
        },
        'sand': {
          50: '#fefdf8',
          100: '#fef9e7',
          200: '#fef3c7',
          300: '#fde68a', // Arena de Bahía Inglesa
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
        },
        'driftwood': {
          400: '#a8a29e',
          500: '#78716c', // Madera de bote
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        'seafoam': {
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7', // Espuma de mar
          400: '#34d399',
          500: '#10b981',
        },
        'coral': {
          400: '#fb7185',
          500: '#f43f5e', // Coral del Pacífico
          600: '#e11d48',
        }
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #0e7490 0%, #164e63 50%, #1e3a5f 100%)',
        'gradient-sunset': 'linear-gradient(180deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
        'gradient-sand': 'linear-gradient(180deg, #fef9e7 0%, #fde68a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'expand': 'expand 0.25s ease-out',
        'wave': 'wave 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        expand: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'coastal': '0 4px 20px -2px rgba(6, 182, 212, 0.25)',
        'sunset': '0 4px 20px -2px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}
