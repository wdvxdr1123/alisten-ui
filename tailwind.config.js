/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#722ED1',
        dark: '#1E293B',
        light: '#F8FAFC',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [],
}
