import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.serif],
      },

      colors: {
        light_ivory: "#fffff2",
        ivory: "#F2E3D5",
      },
    },
  },
  plugins: [],
}) satisfies Config;
