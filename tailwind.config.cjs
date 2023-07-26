/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        // => @media (min-width: 640px) { ... }
        tablet: "640px",
        // => @media (min-width: 1024px) { ... }
        laptop: "1024px",
        // => @media (min-width: 1140px) { ... }
        desktop: "1350px",
      },
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      play: ["Play", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        "km-red": "#d31931",
        "km-blue": "#3c92d3",
        "km-orange": "#fa9906",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
