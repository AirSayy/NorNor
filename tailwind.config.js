/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./.{ejs,js,html}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

