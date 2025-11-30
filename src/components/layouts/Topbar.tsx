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
  Paper,
  ListItemText,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Link from 'next/link';
import { useState } from 'react';
import { sidebarWidth } from './Sidebar';


export function Topbar() {
  const [openSearch, setOpenSearch] = useState(false);

  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);

  const openNotif = Boolean(anchorNotif);
  const openProfile = Boolean(anchorProfile);

  const handleNotifOpen = (e: any) => setAnchorNotif(e.currentTarget);
  const handleNotifClose = () => setAnchorNotif(null);

  const handleProfileOpen = (e: any) => setAnchorProfile(e.currentTarget);
  const handleProfileClose = () => setAnchorProfile(null);

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      title: 'Interview Reminder',
      message: 'User interview with John Doe at 3 PM',
      time: '2h ago',
    },
    {
      id: 2,
      title: 'New Applicant',
      message: 'Jane Smith applied for Backend Engineer',
      time: '5h ago',
    },
  ];

  return (
    <>
      {/* =============================== */}
      {/* APP BAR */}
      {/* =============================== */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
          borderRadius: 0
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          {/* =============================== */}
          {/* LEFT SECTION */}
          {/* =============================== */}
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: 'primary.main', letterSpacing: 0.3 }}
          >
            Money Tracker Dashboard
          </Typography>

          {/* =============================== */}
          {/* RIGHT SECTION (ICONS) */}
          {/* =============================== */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            {/* SEARCH */}
            <IconButton onClick={() => setOpenSearch(true)}>
              <SearchIcon />
            </IconButton>

            {/* NOTIFICATIONS */}
            <IconButton onClick={handleNotifOpen}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* SETTINGS */}
            <IconButton component={Link} href="/settings">
              <SettingsIcon />
            </IconButton>

            {/* PROFILE */}
            <IconButton onClick={handleProfileOpen}>
              <Avatar sx={{ width: 34, height: 34 }}>IM</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* =============================== */}
      {/* SEARCH MODAL */}
      {/* =============================== */}
      {/* <GlobalApplicantSearch open={openSearch} onClose={() => setOpenSearch(false)} /> */}

      {/* =============================== */}
      {/* NOTIFICATION MENU */}
      {/* =============================== */}
      <Menu
        anchorEl={anchorNotif}
        open={openNotif}
        onClose={handleNotifClose}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            borderRadius: 2,
            maxHeight: 400,
            overflowY: 'auto',
            p: 1,
          },
        }}
      >
        <Typography
          fontWeight={700}
          px={2}
          py={1}
          fontSize={15}
          color="text.primary"
        >
          Notifications
        </Typography>

        <Divider />

        {notifications.map((n) => (
          <MenuItem
            key={n.id}
            sx={{ borderRadius: 2, py: 1.5 }}
            onClick={handleNotifClose}
          >
            <ListItemIcon>
              <MoreHorizIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontWeight={600} fontSize={14}>
                  {n.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'block', fontSize: 13 }}
                  >
                    {n.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: 'block' }}
                  >
                    {n.time}
                  </Typography>
                </>
              }
            />
          </MenuItem>
        ))}

        {notifications.length === 0 && (
          <Typography textAlign="center" py={2} color="text.secondary">
            No notifications
          </Typography>
        )}
      </Menu>

      {/* =============================== */}
      {/* PROFILE MENU */}
      {/* =============================== */}
      <Menu
        anchorEl={anchorProfile}
        open={openProfile}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            mt: 1,
            width: 200,
            borderRadius: 2,
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
          onClick={() => alert('Logged out')}
          sx={{ color: 'error.main', fontWeight: 600 }}
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
