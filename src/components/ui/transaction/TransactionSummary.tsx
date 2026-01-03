'use client';

import Grid from '@mui/material/Grid';
import { Card, Box, Typography } from '@mui/material';

import ReceiptLongRounded from '@mui/icons-material/ReceiptLongRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRounded from '@mui/icons-material/TrendingDownRounded';
import SwapHorizRounded from '@mui/icons-material/SwapHorizRounded';
import MotionCard from '@/components/motions/MotionCard';

type Props = {
  stats?: {
    totalIncome: number;
    totalExpense: number;
    totalTransfer: number;
    incomeCount: number;
    expenseCount: number;
    transferCount: number;
    count: number;
  };
  month: string
};

export default function TransactionSummary({ stats, month }: Props) {
  if (!stats) return null;

  const items = [
    {
      label: 'Total',
      count: stats.count,
      amount: stats.totalIncome - stats.totalExpense,
      icon: <ReceiptLongRounded />,
      color: '#00A76F',
    },
    {
      label: 'Income',
      count: stats.incomeCount,
      amount: stats.totalIncome,
      icon: <TrendingUpRounded />,
      color: '#078DEE',
    },
    {
      label: 'Expense',
      count: stats.expenseCount,
      amount: stats.totalExpense,
      icon: <TrendingDownRounded />,
      color: '#FF5630',
    },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((item, i) => (
        <Grid size={{xs: 12, md: 4}} key={i}>
          <MotionCard
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              bgcolor: 'background.paper',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: item.color + '15',
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                {item.label} • {month}
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                Rp {item.amount.toLocaleString('id-ID')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.count} transaksi
              </Typography>
            </Box>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
}
