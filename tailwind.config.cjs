const konstaConfig = require('konsta/config')

const config = konstaConfig({
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
})

module.exports = config
