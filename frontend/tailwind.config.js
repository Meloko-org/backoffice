/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    // "./src/*.{js,ts,jsx,tsx}",
    // "./src/features/products/components/*.{js,ts,jsx,tsx}",
    // "./src/features/products/pages/*.{js,ts,jsx,tsx}",
    // "./src/layout/*.{js,ts,jsx,tsx}",
    // "./src/pages/admin/*.{js,ts,jsx,tsx}",
    // "./src/pages/public/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#98B66E",
        secondary: "#262E20",
        lightbg: "#FCFFF0",
        darkbg: "#262E20",
        tertiary: "#444C3D",
        danger: "#942911",
        warning: "#D16014",
        success: "#0081A7",
        night: "#0A090B",
        premium: "#FAA200",
        premiumbg: "#686B65",
        greener: "#006045",
        pending: "#0C0A09",
        partialValidated: "#51344d",
        validated: "#6F5060",
        partialWithdrawn: "#488286",
        withdrawn: "#60A4A9",
        partialCanceled: "#BA2D0B",
        canceled: "#EA2B1F",
      },
      // fontFamily: {
      //   caveat: ["Caveat_400Regular"],
      //   caveatMedium: ["Caveat_500Medium"],
      //   caveatSemiBold: ["Caveat_600SemiBold"],
      //   caveatBold: ["Caveat_700Bold"],
      // },
    },
  },
  plugins: [],
};
