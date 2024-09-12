/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-modal": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-out-modal": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-modal": "fade-in-modal 0.5s ease-out",
        "fade-out-modal": "fade-out-modal 0.5s ease-out",
      },

      colors: {
        "black-dark": "#1B1B1B",
        "black-light": "#323232",
        "blue-dark": "#1F7CFB",
        "gray-primary": "#8A8A8A",
      },
    },
  },
  plugins: [],
};
