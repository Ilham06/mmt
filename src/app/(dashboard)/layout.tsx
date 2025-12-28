'use client';

import { ReactNode, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from '@mui/material';

import { theme } from '@/config/theme';
import { Sidebar, sidebarWidth } from '@/components/layouts/Sidebar';
import { Topbar } from '@/components/layouts/Topbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* TOPBAR */}
      <Topbar
        sidebarOpen={!isMobile && sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          ml: !isMobile && sidebarOpen ? `${sidebarWidth}px` : 0,
          mt: '64px',
          p: { xs: 2, md: 3 },
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'margin-left .2s ease',
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}
