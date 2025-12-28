"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import { useGetTransactionStatsQuery } from "@/redux/slices/transactionApi";

export default function IncomeExpenseChart() {
  const { data, isLoading } = useGetTransactionStatsQuery({});

  const income = data?.totalIncome ?? 0;
  const expense = data?.totalExpense ?? 0;
  const total = income + expense || 1;

  const incomeRatio = (income / total) * 100;
  const expenseRatio = (expense / total) * 100;

  const isHealthy = income >= expense;

  return (
    <Card sx={{ p: 3, borderRadius: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={2}>
          {/* ================= TITLE ================= */}
          <Typography fontWeight={800}>
            Ringkasan Pemasukan & Pengeluaran
          </Typography>

          {/* ================= QUICK STATS ================= */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              icon={<TrendingUpRoundedIcon />}
              label={`Pemasukan: Rp ${income.toLocaleString(
                "id-ID"
              )}`}
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<TrendingDownRoundedIcon />}
              label={`Pengeluaran: Rp ${expense.toLocaleString(
                "id-ID"
              )}`}
              color="error"
              variant="outlined"
            />
          </Stack>

          {/* ================= RATIO PROGRESS ================= */}
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              mb={0.5}
              display="block"
            >
              Perbandingan pemasukan dan pengeluaran
            </Typography>

            <LinearProgress
              variant="determinate"
              value={incomeRatio}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "error.light",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "success.main",
                },
              }}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              mt={0.5}
            >
              <Typography variant="caption">
                Pemasukan {Math.round(incomeRatio)}%
              </Typography>
              <Typography variant="caption">
                Pengeluaran {Math.round(expenseRatio)}%
              </Typography>
            </Stack>
          </Box>

          {/* ================= CHART ================= */}
          <LineChart
            height={240}
            xAxis={[
              {
                scaleType: "band",
                data: ["Total"],
              },
            ]}
            series={[
              {
                label: "Pemasukan",
                data: [income],
                color: "#4CAF50",
              },
              {
                label: "Pengeluaran",
                data: [expense],
                color: "#F44336",
              },
            ]}
            loading={isLoading}
          />

          {/* ================= INSIGHT ================= */}
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {isHealthy
              ? "Kondisi keuangan kamu masih cukup aman. Pemasukan lebih besar dari pengeluaran 👍"
              : "Pengeluaran mulai lebih besar dari pemasukan. Mungkin bisa dicek lagi pengeluaran bulan ini 👀"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
