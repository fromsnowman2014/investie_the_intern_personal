/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        positive: '#10B981', // green-500
        negative: '#EF4444', // red-500
        neutral: '#6B7280',  // gray-500
        fear: '#EF4444',     // red-500
        greed: '#10B981',    // green-500
      },
    },
  },
  plugins: [],
};