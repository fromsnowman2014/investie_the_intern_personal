/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        positive: '#10B981', // green-500
        negative: '#EF4444', // red-500
        neutral: '#6B7280',  // gray-500
        fear: '#EF4444',     // red-500
        greed: '#10B981',    // green-500
      }
    },
  },
  plugins: [],
}

