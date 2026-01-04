'use client';

import { ReactNode, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from '@mui/material';

import { theme } from '@/config/theme';

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {children}
      </Box>
    </ThemeProvider>
  );
}
