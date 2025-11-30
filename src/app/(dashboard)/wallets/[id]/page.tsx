'use client';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
} from '@mui/material';

import PageWrapper from '@/components/layouts/pageWrapper';
import { MainTable } from '@/components/common/MainTable';

import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';

import { useState } from 'react';

// ======================= DUMMY DATA =======================
const wallet = {
  id: '1',
  name: 'Main Wallet',
  type: 'cash',
  balance: 1250000,
  inflow: 2500000,
  outflow: 900000,
  transactionsCount: 22,
  lastUpdated: '2025-11-12',
};

const transactions = [
  {
    id: '1',
    title: 'Salary November',
    type: 'INCOME',
    amount: 8500000,
    date: '2025-11-10',
    category: 'Salary',
  },
  {
    id: '2',
    title: 'Grocery – Indomaret',
    type: 'EXPENSE',
    amount: -150000,
    date: '2025-11-12',
    category: 'Food',
  },
  {
    id: '3',
    title: 'Grab Ride',
    type: 'EXPENSE',
    amount: -20000,
    date: '2025-11-09',
    category: 'Transport',
  },
];

const typeColors: any = {
  INCOME: { bg: '#E8F5E9', text: '#2E7D32', icon: <TrendingUpRoundedIcon /> },
  EXPENSE: { bg: '#FFEBEE', text: '#C62828', icon: <TrendingDownRoundedIcon /> },
  TRANSFER: { bg: '#E3F2FD', text: '#1565C0', icon: <CompareArrowsRoundedIcon /> },
};

const walletIcons: any = {
  cash: <AccountBalanceWalletRoundedIcon />,
  bank: <AccountBalanceRoundedIcon />,
  ewallet: <AccountBalanceWalletRoundedIcon />,
  credit: <CreditCardRoundedIcon />,
};

const walletColors: any = {
  cash: { color: '#1565C0', gradient: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)' },
  bank: { color: '#2E7D32', gradient: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)' },
  ewallet: { color: '#F9A825', gradient: 'linear-gradient(135deg, #fdd835 0%, #fbc02d 100%)' },
  credit: { color: '#C62828', gradient: 'linear-gradient(135deg, #ef5350 0%, #e53935 100%)' },
};

export default function WalletDetailPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const style = walletColors[wallet.type];

  const handleMenu = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <PageWrapper
      title={wallet.name}
      actions={{
        label: 'Add Transaction',
        href: '/transactions/create',
      }}
    >
      {/* ========================= HEADER CARD ========================= */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 4,
          color: 'white',
          background: style.gradient,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box display="flex" gap={2} alignItems="center">
              <Avatar
                sx={{
                  width: 62,
                  height: 62,
                  bgcolor: 'rgba(255,255,255,0.2)',
                }}
              >
                {walletIcons[wallet.type]}
              </Avatar>

              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {wallet.name}
                </Typography>
                <Typography>
                  Last updated: {wallet.lastUpdated}
                </Typography>
              </Box>
            </Box>

            {/* Balance */}
            <Typography variant="h3" mt={3} fontWeight={700}>
              Rp {wallet.balance.toLocaleString('id-ID')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={handleMenu}
              sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {/* ========================= ANALYTICS CARDS ========================= */}
      <Grid container spacing={3} mb={4}>
        {/* Inflow */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: 'var(--mui-shadow-lg)',
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Inflow (bulan ini)
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={700} color="success.main">
                  + Rp {wallet.inflow.toLocaleString('id-ID')}
                </Typography>
              </Box>

              <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark' }}>
                <TrendingUpRoundedIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>

        {/* Outflow */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: 'var(--mui-shadow-lg)',
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Outflow (bulan ini)
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={700} color="error.main">
                  - Rp {wallet.outflow.toLocaleString('id-ID')}
                </Typography>
              </Box>

              <Avatar sx={{ bgcolor: 'error.light', color: 'error.dark' }}>
                <TrendingDownRoundedIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>

        {/* Total Transactions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: 'var(--mui-shadow-lg)',
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Jumlah Transaksi
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={700}>
                  {wallet.transactionsCount}
                </Typography>
              </Box>

              <Avatar sx={{ bgcolor: '#E3F2FD', color: '#1565C0' }}>
                <CompareArrowsRoundedIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ========================= TRANSACTIONS TABLE ========================= */}
      <Paper
        sx={{
          // p: 3,
          borderRadius: 4,
          boxShadow: 'var(--mui-shadow-lg)',
        }}
      >
        <Typography variant="h6" mb={2} fontWeight={700} px={3} pt={3}>
          Recent Transactions
        </Typography>

        <MainTable
          header={['Title', 'Category', 'Type', 'Amount', 'Date', 'Actions']}
          hasPagination
          rowsCount={transactions.length}
          page={0}
          pageSize={5}
        >
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} hover>
                {/* Title */}
                <TableCell sx={{ fontWeight: 600 }}>{t.title}</TableCell>

                {/* Category */}
                <TableCell>
                  <Chip label={t.category} size="small" />
                </TableCell>

                {/* Type */}
                <TableCell>
                  <Chip
                    label={t.type}
                    size="small"
                    sx={{
                      bgcolor: typeColors[t.type].bg,
                      color: typeColors[t.type].text,
                      fontWeight: 600,
                      borderRadius: 1,
                    }}
                  />
                </TableCell>

                {/* Amount */}
                <TableCell sx={{ fontWeight: 700 }}>
                  {t.amount < 0 ? (
                    <span style={{ color: '#C62828' }}>
                      - Rp {Math.abs(t.amount).toLocaleString('id-ID')}
                    </span>
                  ) : (
                    <span style={{ color: '#2E7D32' }}>
                      + Rp {t.amount.toLocaleString('id-ID')}
                    </span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell>{t.date}</TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <IconButton onClick={handleMenu}>
                    <MoreVertRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MainTable>
      </Paper>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Edit Transaction</MenuItem>
        <MenuItem>Delete Transaction</MenuItem>
      </Menu>
    </PageWrapper>
  );
}
