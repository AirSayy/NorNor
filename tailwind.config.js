/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./.{ejs,js,html}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px green',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  
}

