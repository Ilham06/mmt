"use client";

import {
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

// ======================= MOCK ACHIEVEMENTS =======================
const achievements = [
  {
    id: 1,
    title: "First Blood",
    desc: "Catat transaksi pertamamu",
    icon: "🩸",
    category: "Daily",
    unlocked: true,
  },
  {
    id: 2,
    title: "No Spend Day",
    desc: "1 hari tanpa expense",
    icon: "🧘",
    category: "Daily",
    unlocked: false,
  },
  {
    id: 3,
    title: "7 Days Streak",
    desc: "Catat transaksi 7 hari berturut-turut",
    icon: "🔥",
    category: "Streak",
    unlocked: false,
  },
  {
    id: 4,
    title: "Slow Spender",
    desc: "Expense di bawah budget",
    icon: "🐢",
    category: "Skill",
    unlocked: true,
  },
  {
    id: 5,
    title: "Vault Master",
    desc: "Saldo bank di atas target",
    icon: "🏦",
    category: "Wallet",
    unlocked: false,
  },
];

const categoryMeta: any = {
  Daily: {
    icon: <FlashOnRoundedIcon />,
    color: "#1976d2",
  },
  Streak: {
    icon: <LocalFireDepartmentRoundedIcon />,
    color: "#ef6c00",
  },
  Skill: {
    icon: <EmojiEventsRoundedIcon />,
    color: "#6a1b9a",
  },
  Wallet: {
    icon: <SavingsRoundedIcon />,
    color: "#2e7d32",
  },
};

export default function AchievementsPage() {
  return (
    <PageWrapper
      title="🏆 Trophy Room"
    //   subtitle="Pencapaian kecil yang bikin progres kamu nyata"
    >
      {/* NPC MESSAGE */}
      <Card
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#F4F6FF",
        }}
      >
        <Typography fontWeight={600}>🧠 DompetBot:</Typography>
        <Typography variant="body2" color="text.secondary">
          “Bukan soal banyaknya uang, tapi konsistensinya 🎯”
        </Typography>
      </Card>

      {Object.keys(categoryMeta).map((cat) => {
        const meta = categoryMeta[cat];
        const items = achievements.filter((a) => a.category === cat);

        return (
          <Box key={cat} mb={4}>
            {/* SECTION HEADER */}
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: meta.color + "22",
                  color: meta.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {meta.icon}
              </Box>
              <Typography fontWeight={700}>{cat} Achievements</Typography>
            </Stack>

            <Grid container spacing={2}>
              {items.map((a) => (
                <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      height: "100%",
                      position: "relative",
                      opacity: a.unlocked ? 1 : 0.5,
                      boxShadow: a.unlocked
                        ? "0 12px 32px rgba(0,0,0,0.12)"
                        : "0 6px 16px rgba(0,0,0,0.05)",
                      transition: "0.2s",
                      "&:hover": {
                        transform: a.unlocked
                          ? "translateY(-4px)"
                          : "none",
                      },
                    }}
                  >
                    {/* LOCK */}
                    {!a.unlocked && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          opacity: 0.6,
                        }}
                      >
                        <LockRoundedIcon fontSize="small" />
                      </Box>
                    )}

                    <Stack spacing={2}>
                      {/* ICON */}
                      <Typography fontSize={32}>
                        {a.unlocked ? a.icon : "❔"}
                      </Typography>

                      {/* TITLE */}
                      <Typography fontWeight={700}>
                        {a.title}
                      </Typography>

                      {/* DESC */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {a.desc}
                      </Typography>

                      <Divider />

                      {/* STATUS */}
                      <Chip
                        label={
                          a.unlocked ? "Unlocked ✨" : "Locked 🔒"
                        }
                        size="small"
                        color={a.unlocked ? "success" : "default"}
                        sx={{ width: "fit-content" }}
                      />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </PageWrapper>
  );
}
