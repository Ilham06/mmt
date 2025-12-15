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
  Chip,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WalletIcon from '@mui/icons-material/Wallet';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, Fragment, useEffect } from 'react';

export const sidebarWidth = 240;

// ========================= GAME MODE MENU =========================
const menu = [
  {
    label: 'Game Hub',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Activity Log',
    href: '/transaction',
    icon: <BarChartIcon />,
  },
  {
    label: 'Daily Quests',
    href: '/quests',
    icon: <FlagIcon />,
    badge: 'NEW',
  },
  {
    label: 'Survival Mode',
    href: '/budget',
    icon: <FavoriteIcon />,
  },

  {
    label: 'Inventory',
    icon: <WalletIcon />,
    children: [
      {
        label: 'Wallets',
        href: '/wallets',
        icon: <WalletIcon />,
      },
      {
        label: 'Skills',
        href: '/categories',
        icon: <CategoryIcon />,
      },
    ],
  },

  {
    label: 'Achievements',
    href: '/achievements',
    icon: <EmojiEventsIcon />,
  },
  {
    label: 'Daily Recap',
    href: '/recap',
    icon: <CalendarTodayIcon />,
  },
  {
    label: 'Player Profile',
    href: '/profile',
    icon: <PersonIcon />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  // Auto open submenu if child active
  useEffect(() => {
    menu.forEach((item) => {
      if (item.children) {
        const activeChild = item.children.some((c) =>
          pathname.startsWith(c.href)
        );
        if (activeChild) {
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
      }}
    >
      {/* ================= BRAND ================= */}
      <Toolbar sx={{ px: 2, py: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={900}>
            MoneyQuest
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Financial Game Mode
          </Typography>
        </Box>
      </Toolbar>

      {/* ================= MENU ================= */}
      <List sx={{ px: 1, mt: 1 }}>
        {menu.map((item) => {
          // ---------- SUBMENU ----------
          if (item.children) {
            const open = openMenu[item.label] || false;

            return (
              <Fragment key={item.label}>
                <ListItemButton
                  onClick={() => toggleMenu(item.label)}
                  sx={{
                    mb: 0.5,
                    borderRadius: 2,
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 700,
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
                            pl: 5,
                            pr: 2,
                            py: 1,
                            borderRadius: 2,
                            mb: 0.3,
                            ...(activeChild && {
                              bgcolor: 'primary.lighter',
                              color: 'primary.main',
                              fontWeight: 700,
                            }),
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {child.icon}
                          </ListItemIcon>

                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: activeChild ? 700 : 500,
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

          // ---------- MAIN ITEM ----------
          const active = item.href && isActive(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active ? true : false}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                px: 2,
                py: 1.2,
                ...(active && {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  fontWeight: 700,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: active ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                }}
              />

              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color="error"
                  sx={{ height: 18, fontSize: 10, fontWeight: 700 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
