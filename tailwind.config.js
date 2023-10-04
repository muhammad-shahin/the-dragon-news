/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      14: "14px",
      18: "18px",
      20: "20px",
    },
    extend: {
      colors: {
        primary: "#403F3F",
        secondary: "#706F6F",
        tertiary: "#9F9F9F",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
};
