/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
          lighter: "rgb(var(--primary-lighter) / <alpha-value>)",
          lightest: "rgb(var(--primary-lightest) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
          darker: "rgb(var(--primary-darker) / <alpha-value>)",
          darkest: "rgb(var(--primary-darkest) / <alpha-value>)",
        },

        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
          light: "rgb(var(--secondary-light) / <alpha-value>)",
          lighter: "rgb(var(--secondary-lighter) / <alpha-value>)",
          lightest: "rgb(var(--secondary-lightest) / <alpha-value>)",
          dark: "rgb(var(--secondary-dark) / <alpha-value>)",
          darker: "rgb(var(--secondary-darker) / <alpha-value>)",
          darkest: "rgb(var(--secondary-darkest) / <alpha-value>)",
        },
      },
    },
  },

  plugins: [],
}

export default config;