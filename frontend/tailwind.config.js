/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070A13',
        surface: {
          50: '#1e293b',
          100: '#0F172A',
          200: '#0B1120',
          300: '#070C18',
          border: 'rgba(255, 255, 255, 0.08)',
          card: 'rgba(15, 23, 42, 0.75)'
        },
        brand: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          saffron: '#FF9933',
          blue: '#3B82F6',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'scan': 'scan 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.4' },
          '50%': { transform: 'translateY(280px)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
