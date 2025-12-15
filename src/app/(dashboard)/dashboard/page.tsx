"use client";

import Grid from "@mui/material/Grid";
import {
  Box,
  Card,
  Typography,
  Button,
  LinearProgress,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

import PageWrapper from "@/components/layouts/pageWrapper";
import IncomeExpenseChart from "@/components/ui/dashboard/IncomeExpenseChart";
import CategoryPieChart from "@/components/ui/dashboard/ExpenseByCategory";
import RecentTransactionTable from "@/components/ui/dashboard/RecentTransactionTable";

import { useGetTransactionStatsQuery } from "@/redux/slices/transactionApi";
import QuestCard from "@/components/game/QuestCard";
import { useQuestProgress } from "@/hooks/useQuestProgress";

export default function DashboardPage() {
  const { data, isLoading } = useGetTransactionStatsQuery({});
  const { quests, completeQuest } = useQuestProgress();

  // ================= MOCK PLAYER STATE =================
  const player = {
    name: "Dompet Survivor",
    level: 3,
    xp: 120,
    nextXp: 200,
    streak: 4,
  };

  const xpPercent = (player.xp / player.nextXp) * 100;

  const resource =
    (data?.totalIncome ?? 0) - (data?.totalExpense ?? 0);

  return (
    <PageWrapper title="Game Hub">
      
      <Grid container spacing={3}>
        {/* ================= HERO PLAYER ================= */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={800}>
                Selamat datang kembali,
              </Typography>

              <Typography variant="h4" fontWeight={900}>
                {player.name}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<EmojiEventsRoundedIcon />}
                  label={`Level ${player.level}`}
                  color="secondary"
                />
                <Chip
                  icon={<LocalFireDepartmentRoundedIcon />}
                  label={`${player.streak} Hari Streak`}
                  color="warning"
                />
              </Stack>

              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mb={0.5}
                >
                  <Typography variant="caption">
                    XP Progress
                  </Typography>
                  <Typography variant="caption">
                    {player.xp}/{player.nextXp}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={xpPercent}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(255,255,255,0.3)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "secondary.main",
                    },
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                “Sedikit lagi naik level. Jangan khilaf hari ini 😎”
              </Typography>
            </Stack>
          </Card>
        </Grid>

        {/* ================= TODAY STATUS ================= */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={700}>💰 Resource</Typography>
            <Typography variant="body2" color="text.secondary">
              Uang yang masih bisa kamu pakai
            </Typography>

            <Typography variant="h5" fontWeight={800} mt={1}>
              {isLoading
                ? "-"
                : `Rp ${resource.toLocaleString("id-ID")}`}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              ± {Math.max(Math.floor(resource / 15000), 0)} kopi ☕
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={700}>
              <TrendingUpRoundedIcon fontSize="small" /> Income
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Buff masuk bulan ini
            </Typography>

            <Typography
              variant="h5"
              fontWeight={800}
              color="success.main"
              mt={1}
            >
              {isLoading
                ? "-"
                : `Rp ${data?.totalIncome.toLocaleString(
                    "id-ID"
                  )}`}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={700}>
              <TrendingDownRoundedIcon fontSize="small" /> Expense
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Damage bulan ini
            </Typography>

            <Typography
              variant="h5"
              fontWeight={800}
              color="error.main"
              mt={1}
            >
              {isLoading
                ? "-"
                : `Rp ${data?.totalExpense.toLocaleString(
                    "id-ID"
                  )}`}
            </Typography>
          </Card>
        </Grid>

        {/* ================= ACTIVE QUEST ================= */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FlagRoundedIcon color="primary" />
                <Typography fontWeight={800}>
                  Active Quest
                </Typography>
              </Stack>

              <Typography variant="h6" fontWeight={700}>
                No Jajan 3 Hari
              </Typography>

              <LinearProgress
                variant="determinate"
                value={67}
                sx={{ height: 8, borderRadius: 4 }}
              />

              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="caption">
                  Progress 67%
                </Typography>
                <Typography variant="caption">
                  Sisa 1 hari
                </Typography>
              </Stack>

              <Button
                variant="contained"
                sx={{ alignSelf: "flex-start" }}
              >
                Lihat Quest →
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{xs: 12}}>
          {quests.map((q) => (
  <QuestCard
    key={q.id}
    title={q.title}
    description={q.description}
    progress={q.progress}
    rewardXP={q.rewardXP}
    completed={q.completed}
    onComplete={() => completeQuest(q.id)}
  />
))}
        </Grid>

        {/* ================= WORLD STATS ================= */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={800} mb={1}>
              World Progress
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
            >
              Pergerakan resource kamu
            </Typography>
            <IncomeExpenseChart />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={800} mb={1}>
              Damage Source
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
            >
              Pengeluaran terbesar
            </Typography>
            <CategoryPieChart />
          </Card>
        </Grid>

        {/* ================= RECENT ACTION ================= */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={800} mb={1}>
              Recent Actions
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
            >
              Aktivitas terakhir kamu
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <RecentTransactionTable />
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
