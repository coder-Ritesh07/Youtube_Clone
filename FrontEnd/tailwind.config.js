/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      screens: {
        'xxs': '320px', // Extra Extra Small screens
        'xs': '375px', // Extra Small screens
        'custom-425': '425px', // Custom Small screens
        'sm': '640px', // Tailwind's default Small screens
        'custom-475': '475px', // Custom Medium screens
        'md': '768px', // Tailwind's default Medium screens
        'xxl': '1440px', // Extra Large screens
      },
    },
  },
  plugins: [],
};
