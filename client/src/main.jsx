import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const partyTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff4081", // Hot pink glow
    },
    secondary: {
      main: "#00e5ff", // Electric blue
    },
    background: {
      default: "#0a0a0f", // Deep dark base
      paper: "#12121a",   // Slightly lighter for cards
    },
    text: {
      primary: "#fff",
      secondary: "#cfcfcf",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          transition: "0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 0 20px #ff4081",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(145deg, rgba(18,18,26,1) 0%, rgba(25,25,35,1) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 20px rgba(255,64,129,0.1)",
          transition: "0.4s",
          "&:hover": {
            boxShadow: "0 0 25px rgba(255,64,129,0.4)",
            transform: "translateY(-6px)",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={partyTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
