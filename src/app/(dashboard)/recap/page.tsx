"use client";

import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentNeutralRoundedIcon from "@mui/icons-material/SentimentNeutralRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

// ======================= MOCK DAILY DATA =======================
const recap = {
  date: "Senin, 15 Juli 2025",
  income: 200000,
  expense: 85000,
  questsCompleted: 2,
  questsTotal: 3,
  achievementsUnlocked: 1,
  topCategory: "Makan",
  topIcon: "🍔",
  mood: "GOOD", // GOOD | OK | BAD
};

const moodMeta: any = {
  GOOD: {
    label: "Great Day!",
    color: "success",
    icon: <SentimentSatisfiedRoundedIcon />,
    text: "Keuangan kamu aman hari ini. Nice control 👏",
  },
  OK: {
    label: "Not Bad",
    color: "warning",
    icon: <SentimentNeutralRoundedIcon />,
    text: "Masih oke, tapi ada ruang buat lebih hemat.",
  },
  BAD: {
    label: "Rough Day",
    color: "error",
    icon: <SentimentVeryDissatisfiedRoundedIcon />,
    text: "Hari yang berat. Besok bisa lebih baik 💪",
  },
};

export default function DailyRecapPage() {
  const mood = moodMeta[recap.mood];

  return (
    <PageWrapper
      title="📅 Daily Recap"
    //   subtitle="Ringkasan hari ini sebelum kamu istirahat"
    >
      {/* HERO */}
      <Card
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: "#F4F6FF",
        }}
      >
        <Stack spacing={1} alignItems="center">
          <Typography variant="h5" fontWeight={800}>
            {recap.date}
          </Typography>

          <Chip
            icon={mood.icon}
            label={mood.label}
            color={mood.color}
            sx={{ fontWeight: 700 }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            maxWidth={360}
          >
            {mood.text}
          </Typography>
        </Stack>
      </Card>

      {/* SUMMARY */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
              💚 Heal (Income)
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              Rp {recap.income.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
              💥 Damage (Expense)
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              color="error.main"
            >
              Rp {recap.expense.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
              🎯 Quests
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {recap.questsCompleted}/{recap.questsTotal} selesai
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* INSIGHT */}
      <Card sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Stack spacing={1}>
          <Typography fontWeight={700}>📊 Insight Hari Ini</Typography>
          <Typography variant="body2" color="text.secondary">
            Kategori paling sering kamu serang hari ini adalah{" "}
            <b>
              {recap.topIcon} {recap.topCategory}
            </b>
            . Coba dikontrol besok ya 😉
          </Typography>
        </Stack>
      </Card>

      {/* ACHIEVEMENT */}
      {recap.achievementsUnlocked > 0 && (
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 4,
            bgcolor: "#FFF8E1",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <EmojiEventsRoundedIcon color="warning" />
            <Box>
              <Typography fontWeight={700}>
                Achievement Unlocked!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kamu membuka {recap.achievementsUnlocked} achievement
                hari ini 🎉
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}

      {/* FOOTER ACTION */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="contained" sx={{ px: 4 }}>
          Lanjut Besok 🚀
        </Button>
        <Button variant="outlined">Share Recap</Button>
      </Stack>
    </PageWrapper>
  );
}
