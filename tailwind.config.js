/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenish: '#bfde42',
        blueish: '#42b4ca',
      },
      boxShadow: {
        greenish: '0 0 10px 1px #bfde42',
        blueish: '0 0 30px 1px #42b4ca',
      },
      fontFamily: {
        WubbaLubbaDubDub: ['WubbaLubbaDubDub', 'system ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
