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

// ======================= MOCK PLAYER DATA =======================
const player = {
  name: "Player One",
  joinDate: "Juni 2025",
  level: 5,
  xp: 420,
  nextLevelXp: 500,
  streak: 7,
  achievements: 8,
  questsCompleted: 24,
  survivalRate: "Good",
};

export default function PlayerProfilePage() {
  const progress = (player.xp / player.nextLevelXp) * 100;

  return (
    <PageWrapper
      title="🧍 Player Profile"
    //   subtitle="Ini karakter keuangan kamu"
    >
      {/* ================= HEADER ================= */}
      <Card
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "#F4F6FF",
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
              fontSize: 40,
              bgcolor: "#6366F1",
            }}
          >
            🎮
          </Avatar>

          <Box flex={1}>
            <Typography variant="h5" fontWeight={800}>
              {player.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bergabung sejak {player.joinDate}
            </Typography>

            {/* LEVEL */}
            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={0.5}
              >
                <Typography fontWeight={700}>
                  Level {player.level}
                </Typography>
                <Typography variant="caption">
                  {player.xp}/{player.nextLevelXp} XP
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
            </Box>
          </Box>
        </Stack>
      </Card>

      {/* ================= STATS ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <LocalFireDepartmentRoundedIcon color="error" />
              <Typography fontWeight={700}>
                {player.streak} Hari
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Streak Aktif
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <EmojiEventsRoundedIcon color="warning" />
              <Typography fontWeight={700}>
                {player.achievements}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Achievements
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <TrendingUpRoundedIcon color="success" />
              <Typography fontWeight={700}>
                {player.questsCompleted}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Quest Selesai
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <ShieldRoundedIcon color="primary" />
              <Typography fontWeight={700}>
                {player.survivalRate}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Survival Rating
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* ================= TRAITS ================= */}
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight={700} mb={2}>
          🧬 Player Traits
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Disiplin" color="success" />
          <Chip label="Hemat" color="primary" />
          <Chip label="Masih Khilaf 😅" />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Traits ini dibentuk dari kebiasaan transaksi dan quest kamu.
          Makin konsisten, makin kuat karaktermu 💪
        </Typography>
      </Card>
    </PageWrapper>
  );
}
