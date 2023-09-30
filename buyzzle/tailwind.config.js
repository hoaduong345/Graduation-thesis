/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      // ...
      overscrollBehavior: ["hover", "focus"],
    },
  },
  daisyui: {
    themes: ["light"],
  },
  corePlugins: {
    overscrollBehavior: false,
  },
  // theme: {
  //   extend: {},
  // },
  plugins: [require("daisyui")],
  // plugins: [],
};
