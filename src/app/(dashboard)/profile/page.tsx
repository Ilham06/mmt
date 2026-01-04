"use client";

import {
  Box,
  Card,
  Typography,
  Stack,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

/* ================= MOCK USER DATA ================= */
const user = {
  name: "Ilham",
  joinDate: "Juni 2025",
};

export default function ProfilePage() {
  return (
    <PageWrapper
      title="Profil"
      subtitle="Kelola akun dan preferensi kamu"
    >
      {/* ================= PROFILE HEADER ================= */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 96,
              height: 96,
              fontSize: 36,
              bgcolor: "primary.main",
            }}
          >
            {user.name.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bergabung sejak {user.joinDate}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* ================= ACCOUNT SETTINGS ================= */}
      <Card sx={{ p: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Pengaturan Akun
        </Typography>

        <List disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Edit Profil"
              secondary="Nama dan informasi akun"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LockRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Keamanan"
              secondary="Password dan autentikasi"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <NotificationsNoneRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Notifikasi"
              secondary="Pengingat dan pemberitahuan"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <TuneRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Preferensi"
              secondary="Bahasa dan tampilan aplikasi"
            />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HelpOutlineRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Bantuan & Support"
              secondary="Panduan penggunaan"
            />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton sx={{ color: "error.main" }}>
            <ListItemIcon sx={{ color: "error.main" }}>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Keluar" />
          </ListItemButton>
        </List>
      </Card>
    </PageWrapper>
  );
}
