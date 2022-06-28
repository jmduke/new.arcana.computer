/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      scaffold: "38rem",
    },
    extend: {
      spacing: {
        oversize: "64rem",
      },
      fontFamily: {
        serif: ["Souvenir"],
        sans: ["IBM Plex Sans"],
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
