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
  Drawer,
  useTheme,
  useMediaQuery,
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

// ================= MENU =================
const menu = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },

  { label: "Transaksi", href: "/transaction", icon: <BarChartIcon /> },

  // { label: "Target Harian", href: "/quest", icon: <FlagIcon />, badge: "NEW" },

  { label: "Anggaran", href: "/budgets", icon: <FavoriteIcon /> },

  {
    label: "Aset",
    icon: <WalletIcon />,
    children: [
      { label: "Dompet", href: "/wallets", icon: <WalletIcon /> },
      { label: "Kategori", href: "/categories", icon: <CategoryIcon /> },
    ],
  },

  // { label: "Pencapaian", href: "/archivement", icon: <EmojiEventsIcon /> },

  { label: "Ringkasan Harian", href: "/recap", icon: <CalendarTodayIcon /> },

  { label: "Profil", href: "/profile", icon: <PersonIcon /> },

  { label: "Pengaturan", href: "/setting", icon: <SettingsIcon /> },
];


export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  // auto open submenu if active
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

  const toggleMenu = (label: string) =>
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (href: string) => pathname.startsWith(href);

  const content = (
    <Box
      sx={{
        width: sidebarWidth,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* BRAND */}
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

      {/* MENU */}
      <List sx={{ px: 1 }}>
        {menu.map((item) => {
          if (item.children) {
            const openSub = openMenu[item.label];

            return (
              <Fragment key={item.label}>
                <ListItemButton
                  onClick={() => toggleMenu(item.label)}
                  sx={{ borderRadius: 2, px: 2, py: 1.2 }}
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
                  {openSub ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>

                <Collapse in={openSub} unmountOnExit>
                  {item.children.map((child) => {
                    const active = isActive(child.href);

                    return (
                      <ListItemButton
                        key={child.href}
                        component={Link}
                        href={child.href}
                        selected={active}
                        onClick={onClose}
                        sx={{
                          pl: 5,
                          py: 1,
                          borderRadius: 2,
                          ...(active && {
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
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
                            fontWeight: active ? 700 : 500,
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </Collapse>
              </Fragment>
            );
          }

          const active = item.href && isActive(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active ? true : false}
              onClick={() => {
                isMobile ? onClose() : null
              }}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.2,
                ...(active && {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                }),
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                }}
              />
              {/* {item.badge && (
                <Chip size="small" label={item.badge} color="error" />
              )} */}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  // ================= MOBILE =================
  if (isMobile) {
    return (
      <Drawer open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
        {content}
      </Drawer>
    );
  }

  // ================= DESKTOP =================
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: theme.zIndex.drawer,
      }}
    >
      {content}
    </Box>
  );
}
