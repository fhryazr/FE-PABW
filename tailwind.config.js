/* eslint-disable no-undef */
// const flowbite = require('flowbite-react/tailwind');
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: ["light"],
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"),
    flowbite.plugin()],
  daisyui: {
    styled: true,
  },
};
