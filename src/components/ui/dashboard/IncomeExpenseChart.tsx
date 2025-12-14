"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Typography } from "@mui/material";
import { useGetTransactionStatsQuery } from "@/redux/slices/transactionApi";

export default function IncomeExpenseChart() {
  const { data, isLoading } = useGetTransactionStatsQuery({});

  // fallback aman
  const income = data?.totalIncome ?? 0;
  const expense = data?.totalExpense ?? 0;

  return (
    <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #eee" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Income vs Expense
        </Typography>

        <LineChart
          height={300}
          xAxis={[
            {
              scaleType: "band",
              data: ["Total"], // sementara 1 titik
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
      </CardContent>
    </Card>
  );
}
