import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    primary: {
      main: "#0E94E7",
      light: "#34A4EB",
    },
    secondary: {
      main: "#ED5B2D",
      light: "#FF8A65",
    },
    other: {
      gray: "#D9D9D9",
      black: "#1B1B1B",
      white: "#FFFFFF",
    },
  },
});
