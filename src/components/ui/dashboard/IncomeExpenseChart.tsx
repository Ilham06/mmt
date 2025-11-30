"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent, Typography } from "@mui/material";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function IncomeExpenseChart() {
  return (
    <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #eee" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Income vs Expense
        </Typography>

        <LineChart
          height={300}
          xAxis={[{ scaleType: "band", data: months }]}
          series={[
            {
              data: [500, 1200, 900, 1400, 1800, 2200],
              color: "#4CAF50",
              label: "Income",
            },
            {
              data: [400, 800, 1100, 900, 1500, 1700],
              color: "#F44336",
              label: "Expense",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
