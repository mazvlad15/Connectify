import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B1E54",
        secondary: "#9B7EBD",
        purple: "#D4BEE4",
        background: "#EEEEEE",
      }
    },
  },
  plugins: [
    daisyui,
  ],
};
