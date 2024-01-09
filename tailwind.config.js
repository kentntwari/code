/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["League Spartan", "sans-serif"],
    },
    extend: {
      fontSize: {
        L: [
          "36px",
          {
            lineHeight: "33px",
            letterSpacing: "-1px",
            fontWeight: "700",
          },
        ],
        M: [
          "24px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.75px",
            fontWeight: "700",
          },
        ],
        S: [
          "15px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.25px",
            fontWeight: "700",
          },
        ],
        SV: [
          "15px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "700",
          },
        ],

        base: [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.1px",
            fontWeight: "500",
          },
        ],
        baseV: [
          "13px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "500",
          },
        ],
      },
      colors: {
        violet: {
          primary: "rgb(var(--color-violet-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-violet-secondary) / <alpha-value>)",
        },
        slate: {
          primary: "rgb(var(--color-slate-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-slate-secondary) / <alpha-value>)",
        },
        gray: {
          primary: "rgb(var(--color-gray-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-gray-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-gray-tertiary) / <alpha-value>)",
        },
        zinc: {
          primary: "rgb(var(--color-zinc-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-zinc-secondary) / <alpha-value>)",
        },
        red: {
          primary: "rgb(var(--color-red-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-red-secondary) / <alpha-value>)",
        },
        black: {
          site: "rgb(var(--color-black-site) / <alpha-value>)",
        },
        status: {
          paid: "rgb(var(--color-status-paid) / <alpha-value>)",
          draft: "rgb(var(--color-status-draft) / <alpha-value>)",
          pending: "rgb(var(--color-status-pending) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
