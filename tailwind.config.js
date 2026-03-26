/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apex-red': '#ff4d4d',
        'apex-cyan': '#00d2d3',
        'apex-dark': '#030712',
        'apex-surface': 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'apex-gradient': 'radial-gradient(ellipse 80% 80% at 50% -5%, rgba(0,210,211,0.08), transparent), radial-gradient(ellipse 60% 60% at 80% 50%, rgba(255,77,77,0.07), transparent), linear-gradient(180deg, #02060f 0%, #030712 50%, #000000 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(255,77,77,0.35)',
        'glow-cyan': '0 0 25px rgba(0,210,211,0.35)',
        'glow-red-lg': '0 0 50px rgba(255,77,77,0.4)',
        'glow-cyan-lg': '0 0 50px rgba(0,210,211,0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,77,77,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,77,77,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
