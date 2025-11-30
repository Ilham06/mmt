"use client";

import Grid from "@mui/material/Grid";
import { Card, Box, Typography } from "@mui/material";
import ReceiptLongRounded from "@mui/icons-material/ReceiptLongRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";

const summaryItems = [
  {
    label: "Total",
    count: 20,
    amount: "$46,218.04",
    icon: <ReceiptLongRounded />,
    color: "#00A76F",
  },
  {
    label: "Income",
    count: 10,
    amount: "$23,110.23",
    icon: <TrendingUpRounded />,
    color: "#078DEE",
  },
  {
    label: "Expense",
    count: 6,
    amount: "$13,825.05",
    icon: <TrendingDownRounded />,
    color: "#FF5630",
  },
  {
    label: "Transfer",
    count: 2,
    amount: "$4,655.63",
    icon: <SwapHorizRounded />,
    color: "#9155FD",
  },
];

export default function TransactionSummary() {
  return (
    <Grid container spacing={2}>
      {summaryItems.map((item, i) => (
        <Grid key={i} size={{ xs: 12, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              // border: "1px solid #eee",
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: item.color + "15",
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {item.count} transactions
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {item.amount}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
