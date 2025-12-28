// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2065D1',
    },
    secondary: {
      main: '#3366FF',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },

  shape: {
    borderRadius: 8,
  },

  // MUI requires exactly 25 items here
  shadows: [
    'none', // 0
    '0px 4px 24px rgba(0,0,0,0.06)', // 1 – Paper default
    '0px 4px 24px rgba(0,0,0,0.06)', // 2
    '0px 4px 24px rgba(0,0,0,0.06)', // 3
    '0px 4px 24px rgba(0,0,0,0.06)', // 4
    '0px 4px 24px rgba(0,0,0,0.06)', // 5
    '0px 4px 24px rgba(0,0,0,0.06)', // 6
    '0px 4px 24px rgba(0,0,0,0.06)', // 7
    '0px 4px 24px rgba(0,0,0,0.06)', // 8
    '0px 4px 24px rgba(0,0,0,0.06)', // 9
    '0px 4px 24px rgba(0,0,0,0.06)', // 10
    '0px 4px 24px rgba(0,0,0,0.06)', // 11
    '0px 4px 24px rgba(0,0,0,0.06)', // 12
    '0px 4px 24px rgba(0,0,0,0.06)', // 13
    '0px 4px 24px rgba(0,0,0,0.06)', // 14
    '0px 4px 24px rgba(0,0,0,0.06)', // 15
    '0px 4px 24px rgba(0,0,0,0.06)', // 16
    '0px 4px 24px rgba(0,0,0,0.06)', // 17
    '0px 4px 24px rgba(0,0,0,0.06)', // 18
    '0px 4px 24px rgba(0,0,0,0.06)', // 19
    '0px 4px 24px rgba(0,0,0,0.06)', // 20
    '0px 4px 24px rgba(0,0,0,0.06)', // 21
    '0px 4px 24px rgba(0,0,0,0.06)', // 22
    '0px 4px 24px rgba(0,0,0,0.06)', // 23
    '0px 4px 24px rgba(0,0,0,0.06)', // 24
  ],

  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 1, // All Paper uses shadow[1]
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
    /* ================= BUTTON ================= */
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 18px",
          fontWeight: 600,
          boxShadow: "none",
          transition:
            "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",

          "&:hover": {
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
          },

          "&:active": {
            transform: "translateY(0)",
          },
        },

        /* CONTAINED */
        contained: {
          boxShadow: "0px 4px 12px rgba(32,101,209,0.24)",
          "&:hover": {
            boxShadow: "0px 8px 28px rgba(32,101,209,0.32)",
          },
        },

        /* OUTLINED */
        outlined: {
          borderColor: "rgba(0,0,0,0.12)",
          "&:hover": {
            borderColor: "rgba(0,0,0,0.2)",
            backgroundColor: "rgba(0,0,0,0.02)",
          },
        },

        /* TEXT */
        text: {
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        },

        /* SIZE */
        sizeLarge: {
          padding: "12px 22px",
          fontSize: "0.95rem",
        },
      },
    },
  },

  typography: {
    fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {textTransform: 'none'}
  },
});
