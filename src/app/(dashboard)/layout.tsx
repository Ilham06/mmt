// src/app/layout.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material';
import { theme } from '@/config/theme';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Topbar } from '@/components/layouts/Topbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
          <CssBaseline />
          <Sidebar />
          <Topbar />
          <Box
            component="main"
            sx={{
              ml: '240px',
              mt: '64px',
              p: 3,
              minHeight: '100vh',
              bgcolor: 'background.default',
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
  );
}
