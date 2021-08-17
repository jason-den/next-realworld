module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        primary: '#5CB85C'
      },
      text: { '5xl': '3.5rem' }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
