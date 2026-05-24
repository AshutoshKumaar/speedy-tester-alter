/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mooli: ["Mooli", "sans-serif"],
        fun: ["Mooli", "sans-serif"],
      },
      colors: {
        theme: {
          main: "var(--theme-main)",
          dark: "var(--theme-dark)",
          soft: "var(--theme-soft)",
          accent: "var(--theme-accent)",
        },
        blue: {
          brand: "#2798c9",
          dark: "#176e9c",
        },
        ink: "#3f434a",
        muted: "#707986",
        line: "#d9dfe5",
        panel: "#ffffff",
        page: "#f3f3f3",
      },
    },
  },
  plugins: [],
}
