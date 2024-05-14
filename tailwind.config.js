/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: ["light"],
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui", "flowbite/plugin")],
  daisyui: {
    styled: true,
  },
};
