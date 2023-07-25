/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        custom: {
          50: "#fffdf2",
          100: "#fefadd",
          500: "#989580",
          600: "#cbc7aa",
          800: "#4c4b40",
          900: "#191915",
        },
      },
    },
  },
  plugins: [],
};
