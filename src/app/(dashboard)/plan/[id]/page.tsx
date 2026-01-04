'use client';

import {
  Box,
  Card,
  Typography,
  Stack,
  Grid,
  Button,
  LinearProgress,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

import { useParams } from 'next/navigation';
import PageWrapper from '@/components/layouts/pageWrapper';

import {
  useGetPlanByIdQuery,
} from '@/redux/slices/planApi';

import { useState } from 'react';
import AddSavingDialog from '@/components/ui/plan/AddSavingDialog';

// =======================
// HELPERS
// =======================
const formatCurrency = (value: number) =>
  `Rp ${value.toLocaleString('id-ID')}`;

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [openSaving, setOpenSaving] = useState(false);

  const {
    data: plan,
    isLoading,
    isError,
  } = useGetPlanByIdQuery(id);

  // ======================= LOADING =======================
  if (isLoading) {
    return (
      <PageWrapper title="Plan Detail">
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  // ======================= ERROR =======================
  if (!plan || isError) {
    return (
      <PageWrapper title="Plan Detail">
        <Card>
          <Stack p={4} spacing={2} alignItems="center">
            <Typography fontWeight={700}>
              Plan tidak ditemukan
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Plan ini mungkin sudah dihapus atau tidak
              tersedia.
            </Typography>
          </Stack>
        </Card>
      </PageWrapper>
    );
  }

  const progress = Math.min(
    100,
    Math.round(
      (plan.currentAmount / plan.targetAmount) * 100
    )
  );

  return (
    <PageWrapper
      title={`🎯 ${plan.name}`}
      subtitle={`Target ${new Date(
        plan.targetDate
      ).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })}`}
      actions={[
        {
          label: 'Tambah Tabungan',
          icon: <AddRoundedIcon />,
          onClick: () => setOpenSaving(true),
        },
        {
          label: 'Edit Plan',
          icon: <EditRoundedIcon />,
          variant: 'outlined',
          href:  `/plan/${id}/edit`
        },
      ]}
    >
      <Stack spacing={4}>
        {/* ================= HERO ================= */}
        <Card>
          <Stack spacing={2} p={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={800} fontSize={26}>
                {formatCurrency(plan.currentAmount)}{' '}
                <Typography
                  component="span"
                  color="text.secondary"
                  fontWeight={500}
                >
                  / {formatCurrency(plan.targetAmount)}
                </Typography>
              </Typography>

              <Chip
                label={
                  progress >= 100 ? 'Selesai' : 'Aktif'
                }
                color={
                  progress >= 100 ? 'success' : 'primary'
                }
              />
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {progress}% tercapai • Target{' '}
              <b>
                {new Date(
                  plan.targetDate
                ).toLocaleDateString('id-ID', {
                  month: 'long',
                  year: 'numeric',
                })}
              </b>
            </Typography>

            <Divider />

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
                Tetap konsisten menabung untuk mencapai
                tujuanmu 🎯
              </Typography>
            </Stack>
          </Stack>
        </Card>

        <Grid container spacing={4}>
          {/* ================= BREAKDOWN ================= */}
          {plan.items && plan.items.length > 0 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Stack p={3} spacing={2}>
                  <Typography fontWeight={700}>
                    Rincian Target
                  </Typography>
                  <Divider />

                  {plan.items.map((item) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography>{item.name}</Typography>
                      <Typography fontWeight={600}>
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          )}

          {/* ================= INFO ================= */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Stack p={3} spacing={2}>
                <Typography fontWeight={700}>
                  Informasi Plan
                </Typography>
                <Divider />

                <Typography variant="body2">
                  Mode:{' '}
                  <b>
                    {plan.mode === 'SIMPLE'
                      ? 'Total'
                      : 'Rincian'}
                  </b>
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Kamu bisa menambahkan tabungan kapan saja
                  ke plan ini.
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>

      {/* ================= ADD SAVING DIALOG ================= */}
      <AddSavingDialog
        open={openSaving}
        planId={plan.id}
        onClose={() => setOpenSaving(false)}
      />
    </PageWrapper>
  );
}
