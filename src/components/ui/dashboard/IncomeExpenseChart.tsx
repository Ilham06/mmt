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

  return (
    <Card sx={{ p: 3, borderRadius: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={2}>
          <Typography fontWeight={800}>
            ⚔️ Buff vs Damage
          </Typography>

          {/* QUICK STATS */}
          <Stack direction="row" spacing={2}>
            <Chip
              icon={<TrendingUpRoundedIcon />}
              label={`Income: Rp ${income.toLocaleString("id-ID")}`}
              color="success"
            />
            <Chip
              icon={<TrendingDownRoundedIcon />}
              label={`Expense: Rp ${expense.toLocaleString("id-ID")}`}
              color="error"
            />
          </Stack>

          {/* PROGRESS */}
          <Box>
            <Typography variant="caption" color="text.secondary">
              Income vs Expense Ratio
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

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption">
                💚 {Math.round(incomeRatio)}%
              </Typography>
              <Typography variant="caption">
                💥 {Math.round(expenseRatio)}%
              </Typography>
            </Stack>
          </Box>

          {/* CHART */}
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
                label: "Income",
                data: [income],
                color: "#4CAF50",
              },
              {
                label: "Expense",
                data: [expense],
                color: "#F44336",
              },
            ]}
            loading={isLoading}
          />

          {/* INSIGHT */}
          <Typography variant="body2" color="text.secondary">
            {income > expense
              ? "🟢 Kondisi aman. Resource kamu masih lebih kuat dari damage."
              : "🔴 Warning! Expense mulai mengalahkan income."}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
