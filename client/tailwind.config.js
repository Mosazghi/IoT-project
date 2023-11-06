const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom text shadow sizes
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      // Custom orange gradient
      gradientColorStops: {
        'orange-gradient': {
          start: '#D92B04',
          end: '#F27405',
        },
      },
      // Custom box shadow
      boxShadow: {
        'inner-max': 'inset 0 4px 12px 0 rgb(0 0 0 / 0.6)', // Adjust the rgba values for your stronger shadow
      },
      
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const textShadows = theme('textShadow');
      const newUtilities = {};
      Object.keys(textShadows).forEach(key => {
        const value = textShadows[key];
        const className = `.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`;
        newUtilities[className] = { textShadow: value };
      });
      addUtilities(newUtilities);
    }),
  ],
};
