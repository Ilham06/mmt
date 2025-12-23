'use client';

import { ReactNode, useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '@/config/theme';
import { Sidebar, sidebarWidth } from '@/components/layouts/Sidebar';
import { Topbar } from '@/components/layouts/Topbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* SIDEBAR – hanya render kalau open */}
      {sidebarOpen && <Sidebar />}

      {/* TOPBAR */}
      <Topbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          ml: sidebarOpen ? `${sidebarWidth}px` : 0,
          mt: '64px',
          p: 3,
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
