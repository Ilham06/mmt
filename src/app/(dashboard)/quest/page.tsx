"use client";

import {
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  Divider,
  Button,
} from "@mui/material";

import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

// ======================= MOCK QUEST DATA =======================
const quests = [
  {
    id: 1,
    title: "No Spend Day",
    desc: "Jangan keluarin duit hari ini",
    progress: 0,
    target: 1,
    status: "ACTIVE",
    icon: "🧘",
    reward: "+20 XP",
  },
  {
    id: 2,
    title: "Kopi Control",
    desc: "Jajan kopi maksimal 1x hari ini",
    progress: 1,
    target: 1,
    status: "COMPLETED",
    icon: "☕",
    reward: "+15 XP",
  },
  {
    id: 3,
    title: "Transport Hemat",
    desc: "Expense transport < 30k",
    progress: 0,
    target: 1,
    status: "FAILED",
    icon: "🚕",
    reward: "+10 XP",
  },
  {
    id: 4,
    title: "Daily Logger",
    desc: "Catat minimal 1 transaksi hari ini",
    progress: 1,
    target: 1,
    status: "ACTIVE",
    icon: "🧾",
    reward: "+10 XP",
  },
];

const statusMeta: any = {
  ACTIVE: {
    label: "Active",
    color: "primary",
    icon: <FlagRoundedIcon />,
  },
  COMPLETED: {
    label: "Completed",
    color: "success",
    icon: <CheckCircleRoundedIcon />,
  },
  FAILED: {
    label: "Failed",
    color: "error",
    icon: <CancelRoundedIcon />,
  },
};

export default function QuestBoardPage() {
  const activeQuests = quests.filter((q) => q.status === "ACTIVE");
  const completedQuests = quests.filter((q) => q.status === "COMPLETED");
  const failedQuests = quests.filter((q) => q.status === "FAILED");

  return (
    <PageWrapper
      title="🎯 Quest Board"
    //   subtitle="Tantangan kecil buat ngelatih kebiasaan finansial"
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
          “Ambil quest yang ringan dulu. Konsistensi itu kunci 🔑”
        </Typography>
      </Card>

      {/* ================= ACTIVE QUEST ================= */}
      <Box mb={4}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <LocalFireDepartmentRoundedIcon color="primary" />
          <Typography fontWeight={700}>Active Missions</Typography>
        </Stack>

        <Grid container spacing={2}>
          {activeQuests.map((q) => (
            <Grid key={q.id} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Stack spacing={2}>
                  {/* HEADER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontSize={28}>{q.icon}</Typography>
                    <Chip
                      label={statusMeta[q.status].label}
                      color={statusMeta[q.status].color}
                      size="small"
                    />
                  </Stack>

                  {/* CONTENT */}
                  <Box>
                    <Typography fontWeight={700}>{q.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {q.desc}
                    </Typography>
                  </Box>

                  {/* PROGRESS */}
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={(q.progress / q.target) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mt={0.5}
                    >
                      Progress: {q.progress}/{q.target}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* FOOTER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption">
                      Reward: {q.reward}
                    </Typography>
                    <Button size="small" disabled>
                      In Progress
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= COMPLETED QUEST ================= */}
      <Box mb={4}>
        <Typography fontWeight={700} mb={2}>
          ✅ Completed
        </Typography>

        <Grid container spacing={2}>
          {completedQuests.map((q) => (
            <Grid key={q.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  opacity: 0.9,
                  bgcolor: "#F1FFF5",
                }}
              >
                <Stack spacing={1}>
                  <Typography fontSize={24}>{q.icon}</Typography>
                  <Typography fontWeight={700}>{q.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {q.desc}
                  </Typography>
                  <Chip
                    label={`Reward claimed • ${q.reward}`}
                    size="small"
                    color="success"
                  />
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= FAILED QUEST ================= */}
      <Box>
        <Typography fontWeight={700} mb={2}>
          ❌ Failed / Expired
        </Typography>

        <Grid container spacing={2}>
          {failedQuests.map((q) => (
            <Grid key={q.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  opacity: 0.5,
                  bgcolor: "#FFF5F5",
                }}
              >
                <Stack spacing={1}>
                  <Typography fontSize={24}>❔</Typography>
                  <Typography fontWeight={700}>{q.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Quest ini gagal, coba lagi besok 😅
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageWrapper>
  );
}
