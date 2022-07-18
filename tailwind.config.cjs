const konstaConfig = require('konsta/config')

const config = konstaConfig({
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '#a7cb49',
          DEFAULT: '#93b734',
          dark: '#79972b',
        }
      }
    },
  },
  plugins: [require("daisyui")],
})

module.exports = config
