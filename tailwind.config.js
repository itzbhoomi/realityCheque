/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@aceternity/ui/dist/**/*.js"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  