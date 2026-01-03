"use client";

import Grid from "@mui/material/Grid";
import {
  Box,
  Card,
  Typography,
  Button,
  LinearProgress,
  Stack,
  Divider,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import PageWrapper from "@/components/layouts/pageWrapper";
import IncomeExpenseChart from "@/components/ui/dashboard/IncomeExpenseChart";
import CategoryPieChart from "@/components/ui/dashboard/ExpenseByCategory";
import RecentTransactionTable from "@/components/ui/dashboard/RecentTransactionTable";

import { useGetTransactionStatsQuery } from "@/redux/slices/transactionApi";
import { useQuestProgress } from "@/hooks/useQuestProgress";

export default function DashboardPage() {
  const { data, isLoading } = useGetTransactionStatsQuery({});
  const { quests } = useQuestProgress();

  // ================= MOCK USER STATE (TETAP DIPAKAI) =================
  const player = {
    streak: 4,
  };

  const resource =
    (data?.totalIncome ?? 0) - (data?.totalExpense ?? 0);

  return (
    <PageWrapper title="Dashboard">
      <Grid container spacing={3}>
        {/* ================= HERO: SALDO HARI INI ================= */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                Halo 👋
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Ringkasan keuangan kamu hari ini
              </Typography>

              <Typography variant="h4" fontWeight={900} mt={1}>
                {isLoading
                  ? "-"
                  : `Rp ${resource.toLocaleString("id-ID")}`}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Saldo kamu masih aman hari ini 👍
              </Typography>
            </Stack>
          </Card>
        </Grid>

        {/* ================= STAT RINGKAS ================= */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={700}>
              <TrendingDownRoundedIcon fontSize="small" /> Pengeluaran
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bulan ini
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

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={700}>
              <TrendingUpRoundedIcon fontSize="small" /> Pemasukan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bulan ini
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
            <Typography fontWeight={700}>🔥 Konsistensi</Typography>
            <Typography variant="body2" color="text.secondary">
              Hari berturut-turut mencatat
            </Typography>

            <Typography variant="h5" fontWeight={800} mt={1}>
              {player.streak} hari
            </Typography>
          </Card>
        </Grid>

        {/* ================= CHART ================= */}
        <Grid size={{ xs: 12, md: 8 }}>
           <IncomeExpenseChart />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CategoryPieChart />
        </Grid>

        {/* ================= RECENT ACTIVITY ================= */}
        <Grid size={{ xs: 12 }}>
          <RecentTransactionTable />
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
