'use client';

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WalletIcon from '@mui/icons-material/Wallet';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, Fragment, useEffect } from 'react';

export const sidebarWidth = 240;

// ========================= MENU CONFIG =========================
const menu = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Transaction',
    href: '/transaction',
    icon: <BarChartIcon />,
  },

  // SUBMENU SECTION
  {
    label: 'Master Data',
    icon: <SettingsIcon />,
    children: [
      { label: 'Wallets', href: '/wallets' },
      { label: 'Categories', href: '/categories' },
      { label: 'Budgets', href: '/budgets' },
    ],
  },

  {
    label: 'Users',
    href: '/users',
    icon: <PeopleIcon />,
  },
];
  
export function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  // Auto open parent submenu if child is active
  useEffect(() => {
    menu.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((c) => pathname.startsWith(c.href));
        if (isChildActive) {
          setOpenMenu((prev) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname.startsWith(href);

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
      {/* Logo / brand */}
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
          // ==================== SUBMENU ITEM ====================
          if (item.children) {
            const open = openMenu[item.label] || false;

            return (
              <Fragment key={item.label}>
                <ListItemButton
                  onClick={() => toggleMenu(item.label)}
                  sx={{
                    mb: 0.3,
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  />

                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => {
                      const activeChild = isActive(child.href);

                      return (
                        <ListItemButton
                          key={child.href}
                          component={Link}
                          href={child.href}
                          selected={activeChild}
                          sx={{
                            pl: 6,
                            pr: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 0.3,
                            position: 'relative',
                            transition: '0.2s',
                            ...(activeChild && {
                              bgcolor: 'primary.lighter',
                              color: 'primary.main',
                              fontWeight: 600,
                            }),
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: activeChild ? 600 : 500,
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Fragment>
            );
          }

          // ==================== MAIN MENU ITEM ====================
          const active = item.href && isActive(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active ? true : false}
              sx={{
                mb: 0.3,
                borderRadius: 1,
                px: 2,
                py: 1,
                transition: '0.2s ease',
                ...(active && {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  fontWeight: 600,
                }),
                '&:hover': { bgcolor: 'action.hover' },
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
