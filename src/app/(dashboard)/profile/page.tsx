"use client";

import { useState } from "react";

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
  Grid,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import PageWrapper from "@/components/layouts/pageWrapper";
import EditProfileForm from "@/components/ui/profile/updateProfileForm";
import SecurityForm from "@/components/ui/profile/securityForm";
import NotificationSettings from "@/components/ui/profile/notificationSetting";
import PreferenceForm from "@/components/ui/profile/preferenceForm";
import HelpSupport from "@/components/ui/profile/helpSupport";
import ConfirmDialog from "@/components/common/ConfirmDialog";

/* ===== CONTENT COMPONENTS ===== */

/* ================= MOCK USER ================= */
const user = {
  name: "Ilham",
  joinDate: "Juni 2025",
  email: "ilham@email.com",
};

type MenuKey =
  | "profile"
  | "security"
  | "notification"
  | "preference"
  | "help";

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] =
    useState<MenuKey>("profile");
  const [openLogout, setOpenLogout] = useState(false);

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <EditProfileForm
            initialData={{
              name: user.name,
              email: user.email,
            }}
          />
        );
      case "security":
        return <SecurityForm />;
      case "notification":
        return <NotificationSettings />;
      case "preference":
        return <PreferenceForm />;
      case "help":
        return <HelpSupport />;
      default:
        return null;
    }
  };

  return (
    <PageWrapper
      title="Profil"
      subtitle="Kelola akun dan preferensi kamu"
    >
      {/* ================= HEADER ================= */}
      <Card
        sx={{
          p: 4,
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 88,
              height: 88,
              fontSize: 32,
              bgcolor: "primary.main",
            }}
          >
            {user.name.charAt(0)}
          </Avatar>

          <Box>
            <Typography fontWeight={800} fontSize={22}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bergabung sejak {user.joinDate}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* ================= SETTINGS ================= */}
      <Grid container spacing={2}>
        {/* LEFT MENU */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              p: 2,
              borderRadius: 4,
              position: "sticky",
              top: 88,
            }}
          >
            <List disablePadding>
              {[
                {
                  key: "profile",
                  label: "Edit Profil",
                  desc: "Nama & email",
                  icon: <PersonOutlineRoundedIcon />,
                },
                {
                  key: "security",
                  label: "Keamanan",
                  desc: "Password & autentikasi",
                  icon: <LockRoundedIcon />,
                },
                {
                  key: "notification",
                  label: "Notifikasi",
                  desc: "Pengingat & alert",
                  icon: <NotificationsNoneRoundedIcon />,
                },
                {
                  key: "preference",
                  label: "Preferensi",
                  desc: "Bahasa & tampilan",
                  icon: <TuneRoundedIcon />,
                },
                {
                  key: "help",
                  label: "Bantuan",
                  desc: "Panduan & support",
                  icon: <HelpOutlineRoundedIcon />,
                },
              ].map((item) => (
                <ListItemButton
                  key={item.key}
                  selected={activeMenu === item.key}
                  onClick={() =>
                    setActiveMenu(item.key as MenuKey)
                  }
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      bgcolor: "rgba(32,101,209,.08)",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.desc}
                  />
                </ListItemButton>
              ))}

              <Divider sx={{ my: 1 }} />

              <ListItemButton
                onClick={() => setOpenLogout(true)}
                sx={{
                  borderRadius: 2,
                  color: "error.main",
                }}
              >
                <ListItemIcon sx={{ color: "error.main" }}>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Keluar" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 8 }}>
          {renderContent()}
        </Grid>
      </Grid>

      {/* ================= LOGOUT DIALOG ================= */}
      <ConfirmDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => {
          console.log("LOGOUT ACTION");
          setOpenLogout(false);
        }}
        title="Keluar dari akun?"
        description="Kamu akan perlu login kembali untuk mengakses aplikasi."
        confirmText="Keluar"
        color="error"
      />
    </PageWrapper>
  );
}
