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

  // ================= SHADOWS (TIDAK DIUBAH) =================
  shadows: [
    'none',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
    '0px 4px 24px rgba(0,0,0,0.06)',
  ],

  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundImage: 'none',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 18px',
          fontWeight: 600,
          boxShadow: 'none',
          transition:
            'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',

          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
            transform: 'translateY(-1px)',
          },

          '&:active': {
            transform: 'translateY(0)',
          },
        },

        contained: {
          boxShadow: '0px 4px 12px rgba(32,101,209,0.24)',
          '&:hover': {
            boxShadow: '0px 8px 28px rgba(32,101,209,0.32)',
          },
        },

        outlined: {
          borderColor: 'rgba(0,0,0,0.12)',
          '&:hover': {
            borderColor: 'rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(0,0,0,0.02)',
          },
        },

        text: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },

        sizeLarge: {
          padding: '12px 22px',
          fontSize: '0.95rem',
        },
      },
    },
  },

  // ================= TYPOGRAPHY (DITAMBAHKAN, BUKAN MENGGANTI) =================
  typography: {
    fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),

    /* existing – TIDAK DIUBAH */
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' },

    /* tambahan aman */
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },

    body1: {
      fontWeight: 500,
      lineHeight: 1.65,
    },
    body2: {
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#637381',
    },
    caption: {
      fontWeight: 500,
      color: '#919EAB',
    },
  },
});
