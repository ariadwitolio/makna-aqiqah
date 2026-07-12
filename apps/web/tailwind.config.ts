import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F7B731',
          primaryDark: '#E7A81A',
          primaryLight: '#FFD46B',
          accent: '#FFB000',
          background: '#FFFDF8',
          surface: '#FFFFFF',
          textPrimary: '#2B2B2B',
          textSecondary: '#6B7280',
          border: '#F2E8D5',
          success: '#2E7D32',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(247, 183, 49, 0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
