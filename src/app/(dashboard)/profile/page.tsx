"use client";

import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

/* ================= MOCK USER DATA ================= */
const user = {
  name: "Ilham",
  joinDate: "Juni 2025",
  level: 5,
  xp: 420,
  nextLevelXp: 500,
  streak: 7,
  achievements: 8,
  records: 24,
  financialHealth: "Baik",
};

export default function ProfilePage() {
  const progress = (user.xp / user.nextLevelXp) * 100;

  return (
    <PageWrapper title="Profil">
      {/* ================= PROFILE HEADER ================= */}
      <Card
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.default",
        }}
      >
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

          <Box flex={1}>
            <Typography variant="h5" fontWeight={800}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bergabung sejak {user.joinDate}
            </Typography>

            {/* PROGRESS */}
            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={0.5}
              >
                <Typography fontWeight={700}>
                  Progress Konsistensi
                </Typography>
                <Typography variant="caption">
                  {user.xp}/{user.nextLevelXp}
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                mt={0.5}
                display="block"
              >
                Terus jaga kebiasaan baik untuk meningkatkan progres ini
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Card>

      {/* ================= SUMMARY STATS ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
              <LocalFireDepartmentRoundedIcon color="error" />
              <Typography fontWeight={700}>
                {user.streak} hari
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Konsistensi Aktif
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
              <EmojiEventsRoundedIcon color="warning" />
              <Typography fontWeight={700}>
                {user.achievements}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Pencapaian
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
              <TrendingUpRoundedIcon color="success" />
              <Typography fontWeight={700}>
                {user.records}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Catatan Keuangan
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
              <ShieldRoundedIcon color="primary" />
              <Typography fontWeight={700}>
                {user.financialHealth}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Kondisi Finansial
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* ================= PERSONAL INSIGHT ================= */}
      <Card sx={{ p: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Karakter Finansial
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Disiplin" color="success" />
          <Chip label="Terencana" color="primary" />
          <Chip label="Perlu Konsistensi" />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Karakter ini terbentuk dari kebiasaan mencatat transaksi dan menjaga konsistensi.
          Perubahan kecil yang dilakukan rutin akan berdampak besar dalam jangka panjang.
        </Typography>
      </Card>
    </PageWrapper>
  );
}
