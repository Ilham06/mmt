"use client";

import { Card, Typography, Stack } from "@mui/material";
import BudgetHPBar from "./budgetHPBar";

type Props = {
  title?: string;
  totalBudget: number;
  spent: number;
};

export default function BudgetCard({
  title = "Monthly Survival",
  totalBudget,
  spent,
}: Props) {
  return (
    <Card sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography fontWeight={800}>
          ❤️ {title}
        </Typography>

        <BudgetHPBar
          totalBudget={totalBudget}
          spent={spent}
        />

        <Typography variant="body2" color="text.secondary">
          Jangan sampai HP kamu habis sebelum akhir bulan 😬
        </Typography>
      </Stack>
    </Card>
  );
}
