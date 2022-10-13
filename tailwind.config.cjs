/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1140px",
        // => @media (min-width: 1140px) { ... }
      },
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      play: ["Play", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
