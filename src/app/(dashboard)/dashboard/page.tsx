'use client';

import {
  Box,
  Card,
  Typography,
  Stack,
  Grid,
  Chip,
  Divider,
  LinearProgress,
} from '@mui/material';

import {
  TrendingUpRounded,
  TrendingDownRounded,
  AccountBalanceWalletRounded,
} from '@mui/icons-material';

import { PieChart } from '@mui/x-charts/PieChart';

import PageWrapper from '@/components/layouts/pageWrapper';
import { useGetExpenseByCategoryQuery, useGetTransactionsQuery, useGetTransactionStatsQuery } from '@/redux/slices/transactionApi';
import { useGetWalletsQuery } from '@/redux/slices/walletApi';
import Link from 'next/link';

// ==============================
// HELPERS
// ==============================
const formatCurrency = (value: number) =>
  `Rp ${value.toLocaleString('id-ID')}`;

// ==============================
// STATIC (UI ONLY FOR NOW)
// ==============================
const expenseData = [
  { label: 'Makan', value: 40, color: '#6366f1' },
  { label: 'Transport', value: 25, color: '#22c55e' },
  { label: 'Hiburan', value: 20, color: '#f59e0b' },
  { label: 'Lainnya', value: 15, color: '#94a3b8' },
];

export default function DashboardPage() {
  // ==============================
  // API
  // ==============================
  const { data, isLoading } = useGetTransactionStatsQuery({});
  const { data: wallets = [], isLoading: walletLoading } =
    useGetWalletsQuery();
  const {
    data: expenseCategories = [],
    isLoading: expenseLoading,
  } = useGetExpenseByCategoryQuery();
  const {
    data: transactions = [],
    isLoading: txLoading,
  } = useGetTransactionsQuery({
    limit: 10,
  });

  const totalIncome = data?.totalIncome ?? 0;
  const totalExpense = data?.totalExpense ?? 0;
  const cashflow = totalIncome - totalExpense;

  const topCategory = expenseCategories[0];


  const summary = [
    {
      label: 'Income',
      value: totalIncome,
      count: data?.incomeCount ?? 0,
      color: '#16a34a',
      bg: 'rgba(22,163,74,.12)',
      icon: <TrendingUpRounded />,
      prefix: '+',
    },
    {
      label: 'Expense',
      value: totalExpense,
      count: data?.expenseCount ?? 0,
      color: '#dc2626',
      bg: 'rgba(220,38,38,.12)',
      icon: <TrendingDownRounded />,
      prefix: '−',
    },
    {
      label: 'Cashflow',
      value: cashflow,
      count: data?.count ?? 0,
      color: '#2563eb',
      bg: 'rgba(37,99,235,.12)',
      icon: <AccountBalanceWalletRounded />,
      prefix: '',
    },
  ];

  const formatCurrency = (amount: number) =>
    `Rp ${Math.abs(amount).toLocaleString("id-ID")}`;


  return (
    <PageWrapper title="Dashboard">
      <Stack spacing={4}>

        {/* ================= HERO ================= */}
        <Card>
          <Box
            sx={{
              p: 4,
              position: 'relative',
              color: '#fff',
              background:
                'linear-gradient(160deg, #020617 0%, #0f172a 60%, #020617 100%)',
              overflow: 'hidden',
            }}
          >
            {/* glow */}
            <Box
              sx={{
                position: 'absolute',
                width: 220,
                height: 220,
                borderRadius: '50%',
                bgcolor: 'rgba(99,102,241,.18)',
                filter: 'blur(80px)',
                top: -60,
                right: -40,
              }}
            />

            <Stack spacing={2} position="relative">
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Total Balance • Bulan ini
              </Typography>

              <Typography fontSize={40} fontWeight={900}>
                {isLoading ? '—' : formatCurrency(cashflow)}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  size="small"
                  icon={<TrendingUpRounded />}
                  label={
                    isLoading
                      ? 'Memuat...'
                      : cashflow >= 0
                        ? 'Keuangan terkendali'
                        : 'Perlu perhatian'
                  }
                  sx={{
                    bgcolor: 'rgba(34,197,94,.15)',
                    color: '#22c55e',
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Card>

        {/* ================= SUMMARY ================= */}
        <Grid container spacing={3}>
          {summary.map((item) => (
            <Grid key={item.label} size={{ xs: 12, md: 4 }}>
              <Card>
                <Stack direction="row" spacing={2} p={3}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: item.bg,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>

                    <Typography fontWeight={800} sx={{ color: item.color }}>
                      {isLoading
                        ? '—'
                        : `${item.prefix} ${formatCurrency(item.value)}`}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {isLoading
                        ? 'Memuat...'
                        : `${item.count} transaksi`}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= WALLET & EXPENSE ================= */}
        <Grid container spacing={3}>
          {/* WALLET */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card>
              <Stack spacing={3} p={3}>
                {/* HEADER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.5}>
                    <Typography fontWeight={700}>
                      Wallet Overview
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Ringkasan saldo utama
                    </Typography>
                  </Stack>

                  <Link href={'/wallets'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    Lihat selengkapnya
                  </Typography></Link>
                </Stack>

                {/* LOADING */}
                {walletLoading && (
                  <Typography variant="caption" color="text.secondary">
                    Memuat wallet...
                  </Typography>
                )}

                {/* CONTENT */}
                {wallets
                  .slice(0, 5) // 👈 tampilkan max 3
                  .map((wallet: any) => (
                    <Stack key={wallet.id} spacing={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography fontWeight={600}>
                          {wallet.name}
                        </Typography>

                        <Typography fontWeight={800}>
                          Rp {wallet.balance.toLocaleString('id-ID')}
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={
                          wallet.balance <= 0
                            ? 5
                            : Math.min(100, wallet.balance / 100000)
                        }
                        sx={{
                          height: 5,
                          borderRadius: 3,
                          bgcolor: 'divider',
                        }}
                      />
                    </Stack>
                  ))}


              </Stack>
            </Card>
          </Grid>



          {/* EXPENSE */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card>
              <Stack spacing={3} p={3}>
                {/* HEADER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.5}>
                    <Typography fontWeight={700}>
                      Expense Breakdown
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Kategori pengeluaran terbesar
                    </Typography>
                  </Stack>

                  <Link href={'/categories'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Lihat selengkapnya
                  </Typography>
                  </Link>
                </Stack>

                {/* CONTENT */}
                {expenseLoading && (
                  <Typography variant="caption" color="text.secondary">
                    Memuat data kategori...
                  </Typography>
                )}

                {!expenseLoading && expenseCategories.length === 0 && (
                  <Typography variant="caption" color="text.secondary">
                    Belum ada data pengeluaran
                  </Typography>
                )}

                {!expenseLoading && expenseCategories.length > 0 && (
                  <Stack alignItems="center" spacing={2}>
                    {/* DONUT */}
                    <Box position="relative">
                      <PieChart
                        width={170}
                        height={170}
                        series={[
                          {
                            innerRadius: 65,
                            outerRadius: 85,
                            data: expenseCategories.map((c, i) => ({
                              id: i,
                              value: c.total,
                              label: c.name,
                              color: c.color,
                            })),
                          },
                        ]}
                        hideLegend
                      />

                      {/* CENTER INFO */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          pointerEvents: "none",
                        }}
                      >
                        <Typography fontWeight={800}>
                          {topCategory.percentage}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {topCategory.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* LEGEND */}
                    <Stack spacing={1.2} width="100%">
                      {expenseCategories.slice(0, 5).map((c) => (
                        <Stack
                          key={c.categoryId}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: c.color,
                              }}
                            />
                            <Typography fontSize={13} fontWeight={600}>
                              {c.name}
                            </Typography>
                          </Stack>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {c.percentage}% • Rp{" "}
                            {c.total.toLocaleString("id-ID")}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>


                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>

        </Grid>

        {/* ================= RECENT ================= */}
        <Card>
          <Stack spacing={2} p={3}>
            {/* HEADER */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={0.5}>
                <Typography fontWeight={700}>
                  Recent Transactions
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Aktivitas keuangan terakhir kamu
                </Typography>
              </Stack>

              <Link href={'/transaction'} style={{ textDecoration: 'none'}}>
              <Typography
                variant="caption"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                Lihat selengkapnya
              </Typography></Link>
            </Stack>

            <Divider />

            {/* LOADING */}
            {txLoading && (
              <Typography variant="caption" color="text.secondary">
                Memuat transaksi...
              </Typography>
            )}

            {/* EMPTY */}
            {!txLoading && transactions.length === 0 && (
              <Typography variant="caption" color="text.secondary">
                Belum ada transaksi
              </Typography>
            )}

            {/* LIST (MAX 10) */}
            {!txLoading &&
              transactions.slice(0, 10).map((tx: any) => {
                const isExpense = tx.type === "EXPENSE";
                const isIncome = tx.type === "INCOME";

                return (
                  <Stack
                    key={tx.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack spacing={0.2}>
                      <Typography fontWeight={600}>
                        {tx.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {tx.wallet?.name ?? "—"} •{" "}
                        {new Date(tx.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Typography>
                    </Stack>

                    <Typography
                      fontWeight={800}
                      color={
                        isExpense
                          ? "error.main"
                          : isIncome
                            ? "success.main"
                            : "text.primary"
                      }
                    >
                      {isExpense ? "− " : isIncome ? "+ " : ""}
                      {formatCurrency(tx.amount)}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
        </Card>


      </Stack>
    </PageWrapper>
  );
}
