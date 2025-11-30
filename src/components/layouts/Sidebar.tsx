'use client';

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const sidebarWidth = 240;

const menu = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Applicants', href: '/applicants', icon: <PeopleIcon /> },
  { label: 'Calendar', href: '/calendar', icon: <CalendarMonthIcon /> },
  { label: 'Statistics', href: '/stats', icon: <BarChartIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        borderRight: '1px solid rgba(145,158,171,0.12)',
        bgcolor: 'background.paper',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        pt: 1,
      }}
    >
      <Toolbar sx={{ px: 2, mb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 0.3 }}
        >
          MT Panel
        </Typography>
      </Toolbar>

      <List sx={{ px: 1, mt: 1 }}>
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              sx={{
                mb: 0.3,
                borderRadius: 1,
                position: 'relative',
                px: 2,
                py: 1,
                transition: '0.2s ease',
                ...(active && {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  fontWeight: 600,
                }),
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >

              <ListItemIcon
                sx={{
                  color: active ? 'primary.main' : 'text.secondary',
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
