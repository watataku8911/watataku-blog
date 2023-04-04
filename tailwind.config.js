/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // --------------------------------------------------
      // custom settings
      // --------------------------------------------------

      maxsp: { max: "481px" },
      tbpc: { min: "482px", max: "1025px" },
      maxpc: { max: "1026px" },
      pc: "1026px",
      // --------------------------------------------------
      // tailwind default
      // --------------------------------------------------
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      // フォントを追加
      fontFamily: {
        badScript: ["Bad Script", "cursive"],
      },
    },
  },
  plugins: [],
};
