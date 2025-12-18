'use client';

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Badge,
  ListItemIcon,
  Divider,
  ListItemText,
  Chip,
  Stack,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';

import Link from 'next/link';
import { useState } from 'react';
import { sidebarWidth } from './Sidebar';
import { useRouter } from 'next/navigation';

export function Topbar() {
  const router = useRouter();

  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);

  const openNotif = Boolean(anchorNotif);
  const openProfile = Boolean(anchorProfile);

  // ================= MOCK PLAYER STATE (NANTI GANTI STORE) =================
  const player = {
    name: 'Dompet Survivor',
    level: 3,
    streak: 4,
    initials: 'DS',
  };

  // ================= MOCK EVENTS / NOTIFICATIONS =================
  const notifications = [
    {
      id: 1,
      title: 'Quest Progress 🎯',
      message: 'No Jajan 3 Hari hampir selesai!',
      time: 'Hari ini',
    },
    {
      id: 2,
      title: 'Streak Aman 🔥',
      message: 'Kamu berhasil jaga streak hari ini',
      time: '1 jam lalu',
    },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.push('/login');
  };

  return (
    <>
      {/* ================= APP BAR ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderRadius: 0
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* ================= LEFT ================= */}
          <Stack spacing={0.5}>
            <Typography
              variant="subtitle1"
              fontWeight={800}
              sx={{ color: 'primary.main', letterSpacing: 0.4 }}
            >
              🎮 Money Tracker
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Player Hub
            </Typography>
          </Stack>

          {/* ================= RIGHT ================= */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* PLAYER MINI STATS */}
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<EmojiEventsRoundedIcon />}
                label={`Lv ${player.level}`}
                color="primary"
                sx={{ fontWeight: 700 }}
              />
              <Chip
                size="small"
                icon={<LocalFireDepartmentRoundedIcon />}
                label={`${player.streak}🔥`}
                color="warning"
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            {/* SEARCH */}
            <IconButton>
              <SearchIcon />
            </IconButton>

            {/* NOTIFICATION */}
            <IconButton onClick={(e) => setAnchorNotif(e.currentTarget)}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* PROFILE */}
            <IconButton onClick={(e) => setAnchorProfile(e.currentTarget)}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: 'primary.main',
                  fontWeight: 700,
                }}
              >
                {player.initials}
              </Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ================= NOTIFICATION MENU ================= */}
      <Menu
        anchorEl={anchorNotif}
        open={openNotif}
        onClose={() => setAnchorNotif(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <Typography fontWeight={800} px={2} py={1}>
          Event Log
        </Typography>

        <Divider />

        {notifications.map((n) => (
          <MenuItem key={n.id} sx={{ borderRadius: 2 }}>
            <ListItemText
              primary={
                <Typography fontWeight={700} fontSize={14}>
                  {n.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {n.time}
                  </Typography>
                </>
              }
            />
          </MenuItem>
        ))}

        {notifications.length === 0 && (
          <Typography textAlign="center" py={2} color="text.secondary">
            Aman… belum ada event
          </Typography>
        )}
      </Menu>

      {/* ================= PROFILE MENU ================= */}
      <Menu
        anchorEl={anchorProfile}
        open={openProfile}
        onClose={() => setAnchorProfile(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 220,
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <MenuItem component={Link} href="/profile">
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ color: 'error.main', fontWeight: 700 }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
