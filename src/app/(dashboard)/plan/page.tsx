'use client';

import {
  Box,
  Card,
  Typography,
  Stack,
  Grid,
  Button,
  LinearProgress,
  Chip,
  Divider,
  CircularProgress,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

import Link from 'next/link';
import PageWrapper from '@/components/layouts/pageWrapper';

import { useGetPlansQuery } from '@/redux/slices/planApi';

// =======================
// HELPERS
// =======================
const formatCurrency = (value: number) =>
  `Rp ${value.toLocaleString('id-ID')}`;

export default function PlansPage() {
  const { data: plans = [], isLoading } = useGetPlansQuery();

  // ======================= LOADING =======================
  if (isLoading) {
    return (
      <PageWrapper
        title="🎯 Financial Plans"
        subtitle="Tujuan keuangan yang sedang kamu bangun"
      >
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  // ======================= SUMMARY =======================
  const totalTarget = plans.reduce(
    (sum, p) => sum + p.targetAmount,
    0
  );

  const totalCurrent = plans.reduce(
    (sum, p) => sum + p.currentAmount,
    0
  );

  return (
    <PageWrapper
      title="🎯 Financial Plans"
      subtitle="Tujuan keuangan yang sedang kamu bangun"
      actions={{
        label: 'Tambah Plan',
        icon: <AddRoundedIcon />,
        href: '/plan/create',
      }}
    >
      <Stack spacing={4}>
        {/* ================= SUMMARY ================= */}
        <Card>
          <Stack spacing={1.5} p={3}>
            <Typography fontWeight={700}>
              Ringkasan Tujuan
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Target
                </Typography>
                <Typography fontWeight={800} fontSize={20}>
                  {formatCurrency(totalTarget)}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Terkumpul
                </Typography>
                <Typography fontWeight={800} fontSize={20}>
                  {formatCurrency(totalCurrent)}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Card>

        {/* ================= PLAN LIST ================= */}
        <Grid container spacing={3}>
          {plans.map((plan) => {
            const progress = Math.min(
              100,
              Math.round(
                (plan.currentAmount / plan.targetAmount) * 100
              )
            );

            return (
              <Grid key={plan.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    transition: '0.2s',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow:
                        '0 16px 40px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <Stack spacing={2}>
                    {/* HEADER */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            bgcolor: 'rgba(99,102,241,.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20,
                          }}
                        >
                          🎯
                        </Box>

                        <Stack>
                          <Typography fontWeight={800}>
                            {plan.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Target{' '}
                            {new Date(
                              plan.targetDate
                            ).toLocaleDateString('id-ID', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Chip
                        size="small"
                        label={
                          progress >= 100
                            ? 'Selesai'
                            : 'Aktif'
                        }
                        color={
                          progress >= 100
                            ? 'success'
                            : 'primary'
                        }
                      />
                    </Stack>

                    {/* AMOUNT */}
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>
                        {formatCurrency(
                          plan.currentAmount
                        )}{' '}
                        <Typography
                          component="span"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          /{' '}
                          {formatCurrency(
                            plan.targetAmount
                          )}
                        </Typography>
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                        }}
                      />

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {progress}% tercapai
                      </Typography>
                    </Stack>

                    <Divider />

                    {/* INSIGHT */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <EmojiEventsRoundedIcon
                        fontSize="small"
                        color="primary"
                      />
                      <Typography variant="body2">
                        Terus konsisten menabung untuk
                        mencapai target 🎯
                      </Typography>
                    </Stack>

                    {/* ACTION */}
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <Button
                        size="small"
                        component={Link}
                        href={`/plan/${plan.id}`}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Lihat Detail
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* ================= EMPTY STATE ================= */}
        {plans.length === 0 && (
          <Card>
            <Stack
              spacing={2}
              p={4}
              alignItems="center"
            >
              <EmojiEventsRoundedIcon
                sx={{
                  fontSize: 48,
                  color: 'text.secondary',
                }}
              />
              <Typography fontWeight={700}>
                Belum ada plan keuangan
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Mulai dengan membuat tujuan keuangan
                seperti dana darurat, nikah, atau
                liburan.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                component={Link}
                href="/plan/create"
              >
                Buat Plan Pertama
              </Button>
            </Stack>
          </Card>
        )}
      </Stack>
    </PageWrapper>
  );
}
