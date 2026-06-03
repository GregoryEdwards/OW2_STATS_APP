/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ow: {
          orange: '#f99e1a',
          blue: '#218ffe',
          dark: '#0d1117',
          panel: '#161b22',
          border: '#283039',
        },
        role: {
          support: '#43c59e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
