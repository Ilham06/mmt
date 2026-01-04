'use client';

import {
  Box,
  Card,
  Typography,
  Stack,
  Switch,
  Button,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import PageWrapper from '@/components/layouts/pageWrapper';
import { useGetRecurringTransactionsQuery, useUpdateRecurringTransactionMutation } from '@/redux/slices/recurringApi';
import { useState } from 'react';
import RecurringDialog from '@/components/ui/recurring/recurringFormDialog';
import { EditRounded } from '@mui/icons-material';

// ==============================
// HELPERS
// ==============================
const formatCurrency = (value: number) =>
  `Rp ${value.toLocaleString('id-ID')}`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const intervalLabel: Record<string, string> = {
  DAILY: 'Harian',
  WEEKLY: 'Mingguan',
  MONTHLY: 'Bulanan',
  YEARLY: 'Tahunan',
};

export default function RecurringPage() {

  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // ==============================
  // API
  // ==============================
  const {
    data: recurring = [],
    isLoading,
  } = useGetRecurringTransactionsQuery({});

  const [updateRecurring] =
    useUpdateRecurringTransactionMutation();

  // ==============================
  // HANDLER
  // ==============================
  const toggleActive = async (item: any) => {
    await updateRecurring({
      id: item.id,
      active: !item.active,
    });
  };

  return (
    <PageWrapper
      title="Recurring Transactions"
      // subtitle="Atur transaksi otomatis seperti gaji dan pengeluaran rutin"
      actions={{
        label: 'Tambah Recurring',
        icon: <AddRoundedIcon />,
        onClick: () => {
          setEditData(null);
          setOpenDialog(true);
        },
      }}

    >
      {/* LOADING */}
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      )}

      {/* EMPTY STATE */}
      {!isLoading && recurring.length === 0 && (
        <Card>
          <Stack spacing={1.5} p={4} alignItems="center">
            <Typography fontWeight={700}>
              Belum ada transaksi otomatis
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Gunakan recurring transaction untuk gaji,
              transport rutin, atau langganan bulanan.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{ mt: 1 }}
            >
              Tambah Recurring
            </Button>
          </Stack>
        </Card>
      )}

      {/* LIST */}
      <Stack spacing={3}>
        {recurring.map((item: any) => {
          const isExpense = item.type === 'EXPENSE';
          const isIncome = item.type === 'INCOME';

          return (
            <Card key={item.id}>
              <Stack spacing={2} p={3}>
                {/* HEADER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.3}>
                    <Typography fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {intervalLabel[item.interval]} •
                      berikutnya {formatDate(item.nextRun)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditData(item);
                        setOpenDialog(true);
                      }}
                      sx={{
                        bgcolor: 'rgba(0,0,0,0.04)',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <EditRounded fontSize="small" />
                    </IconButton>
                  </Stack>


                </Stack>

                <Divider />

                {/* BODY */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.3}>
                    <Typography
                      fontWeight={800}
                      color={
                        isExpense
                          ? 'error.main'
                          : isIncome
                            ? 'success.main'
                            : 'text.primary'
                      }
                    >
                      {isExpense ? '− ' : isIncome ? '+ ' : ''}
                      {formatCurrency(item.amount)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.category?.name ?? 'Tanpa kategori'}
                      {item.wallet?.name
                        ? ` • ${item.wallet.name}`
                        : ''}
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    label={item.active ? 'Aktif' : 'Paused'}
                    color={item.active ? 'success' : 'default'}
                  />
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      <RecurringDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        editData={editData}
      />

    </PageWrapper>
  );
}
