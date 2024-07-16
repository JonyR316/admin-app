/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        highlight: "#a0aec0",
        bgGray: "#cbd5e0",
      },
    },
  },
  plugins: [],
};

//primary: '#5542F6',
//highlight: '#eae8fb',
//bgGray: '#fbfafd',
