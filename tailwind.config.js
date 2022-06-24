/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Souvenir"],
      },
      colors: {
        background: "#fcf9f4",
        brand: "#dc0909",
        subtle: "#edeae6",
        subtler: "#141e3025",
        subtlest: "#141e3005",
      },
    },
  },
  plugins: [],
};
