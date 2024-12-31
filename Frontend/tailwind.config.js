/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whitePrimary: "#EBF3FF",
        whiteSecondary: "#F2F7FF",
        whiteThird: "#9BC3FF",
        redPrimary: "#D42115",
        blackPrimary: "#BCD2DB",
        blackSecondary: "#11233C",
        blackThird: "#1D272B",
        borderPrimary: "#BEC7D1",
      },
    },
  },
  plugins: [],
};
