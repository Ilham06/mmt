"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, Typography } from "@mui/material";

export default function CategoryPieChart() {
  const data = [
    { label: "Food", value: 40 },
    { label: "Transport", value: 20 },
    { label: "Shopping", value: 25 },
    { label: "Bills", value: 15 },
  ];

  return (
    <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #eee" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Expense by Category
        </Typography>

        <PieChart
          series={[
            {
              data,
              innerRadius: 40,
              outerRadius: 100,
              paddingAngle: 5,
            },
          ]}
          height={280}
        />
      </CardContent>
    </Card>
  );
}
