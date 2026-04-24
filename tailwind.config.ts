import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A5C',
          50:  '#EBF0F6',
          100: '#C8D7E9',
          200: '#92AECE',
          300: '#5C85B3',
          400: '#2E5B86',
          500: '#1B3A5C',
          600: '#152E4A',
          700: '#0F2237',
          800: '#081625',
          900: '#040B12',
        },
        'accent-blue': '#2E75B6',
        'accent-orange': '#E8943A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(27,58,92,0.08)',
        'card-hover': '0 8px 24px 0 rgba(27,58,92,0.16)',
      },
    },
  },
  plugins: [],
}

export default config
