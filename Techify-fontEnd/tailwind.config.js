import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        bgScroll: "bgScroll 15s linear infinite",
      },
      keyframes: {
        bgScroll: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], // เปลี่ยนธีมเป็น Dark Mode
  },
};
