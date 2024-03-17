import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
const { lightBlue } = require('@mui/material/colors')

const config: Config = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
    extend: {
      colors: {
        primary: lightBlue,
      },
      font: {
        inter: 'Inter',
        public: 'Public Sans',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
export default config
