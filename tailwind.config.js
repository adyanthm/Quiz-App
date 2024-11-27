/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kahoot-purple": "var(--kahoot-purple)",
        "kahoot-white": "var(--kahoot-white)",
      },
      keyframes: {
        vibrate: {
          "0%, 100%": { transform: "translate(0)" },
          "25%": { transform: "translate(-4px, 4px)" },
          "50%": { transform: "translate(4px, -4px)" },
          "75%": { transform: "translate(-4px, -4px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        vibrate: "vibrate 0.15s linear infinite",
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
