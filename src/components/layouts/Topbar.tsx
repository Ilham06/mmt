"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sidebarWidth } from "./Sidebar";

export function Topbar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] =
    useState<null | HTMLElement>(null);

  const openNotif = Boolean(anchorNotif);
  const openProfile = Boolean(anchorProfile);

  // ================= MOCK USER =================
  const user = {
    name: "Ilham",
    initials: "IM",
  };

  // ================= MOCK NOTIFICATIONS =================
  const notifications = [
    {
      id: 1,
      title: "Pengeluaran hari ini",
      message: "Pengeluaran kamu masih aman 👍",
      time: "Hari ini",
    },
    {
      id: 2,
      title: "Catatan konsisten",
      message: "Kamu mencatat transaksi 4 hari berturut-turut",
      time: "1 jam lalu",
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <>
      {/* ================= APP BAR ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: !isMobile && sidebarOpen ? `${sidebarWidth}px` : 0,
          width:
            !isMobile && sidebarOpen
              ? `calc(100% - ${sidebarWidth}px)`
              : "100%",
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: "all .2s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* ================= LEFT ================= */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton onClick={onToggleSidebar}>
              <MenuIcon />
            </IconButton>

            {!isMobile ? (
              <Stack spacing={0}>
                <Typography
                  fontWeight={800}
                  letterSpacing={0.3}
                >
                  Money Tracker
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Kelola keuangan harianmu
                </Typography>
              </Stack>
            ) : (
              <Typography fontWeight={800}>
                Money
              </Typography>
            )}
          </Stack>

          {/* ================= RIGHT ================= */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* NOTIFICATION */}
            <IconButton
              onClick={(e) => setAnchorNotif(e.currentTarget)}
            >
              <Badge
                badgeContent={notifications.length}
                color="error"
              >
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* PROFILE */}
            <IconButton
              onClick={(e) =>
                setAnchorProfile(e.currentTarget)
              }
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "primary.main",
                  fontWeight: 700,
                }}
              >
                {user.initials}
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
            width: isMobile ? "90vw" : 320,
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <Typography fontWeight={800} px={2} py={1}>
          Notifikasi
        </Typography>

        <Divider />

        {notifications.length === 0 ? (
          <Typography
            textAlign="center"
            py={2}
            color="text.secondary"
          >
            Belum ada notifikasi
          </Typography>
        ) : (
          notifications.map((n) => (
            <MenuItem
              key={n.id}
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              <ListItemText
                primary={
                  <Typography fontWeight={700} fontSize={14}>
                    {n.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {n.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {n.time}
                    </Typography>
                  </>
                }
              />
            </MenuItem>
          ))
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
          <ListItemText>Profil</ListItemText>
        </MenuItem>

        <MenuItem component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pengaturan</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ color: "error.main", fontWeight: 700 }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Keluar</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
