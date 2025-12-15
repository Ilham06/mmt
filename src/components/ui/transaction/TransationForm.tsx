'use client';

import {
  Box,
  Button,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Divider,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRounded from '@mui/icons-material/TrendingDownRounded';
import SwapHorizRounded from '@mui/icons-material/SwapHorizRounded';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionByIdQuery,
} from '@/redux/slices/transactionApi';

import { useGetCategoriesQuery } from '@/redux/slices/categoryApi';
import { useGetWalletsQuery } from '@/redux/slices/walletApi';
import PageWrapper from '@/components/layouts/pageWrapper';

// ======================= OPTIONS =======================
const typeOptions = [
  {
    value: 'INCOME',
    label: 'Masuk',
    icon: <TrendingUpRounded />,
    color: 'success',
  },
  {
    value: 'EXPENSE',
    label: 'Keluar',
    icon: <TrendingDownRounded />,
    color: 'error',
  },
  {
    value: 'TRANSFER',
    label: 'Transfer',
    icon: <SwapHorizRounded />,
    color: 'primary',
  },
];

export default function TransactionFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const isEdit = Boolean(id);

  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const { data: detail } = useGetTransactionByIdQuery(id!, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: wallets = [] } = useGetWalletsQuery();

  const [error, setError] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    categoryId: '',
    walletId: '',
    toWalletId: '',
    date: '',
    notes: '',
  });

  // ======================= PREFILL =======================
  useEffect(() => {
    if (detail && isEdit) {
      setForm({
        title: detail.title,
        amount: detail.amount.toString(),
        type: detail.type,
        categoryId: detail.categoryId || '',
        walletId: detail.walletId || detail.fromWalletId || '',
        toWalletId: detail.toWalletId || '',
        date: detail.date.split('T')[0],
        notes: detail.note || '',
      });
    }
  }, [detail, isEdit]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ======================= SUBMIT =======================
  const handleSubmit = async () => {
    setError('');

    if (!form.title || !form.amount || !form.date) {
      return setError('Judul, jumlah, dan tanggal wajib diisi ya 😅');
    }

    const payload: any = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      date: form.date,
      note: form.notes || undefined,
      categoryId: form.type !== 'TRANSFER' ? form.categoryId : null,
      walletId: form.type !== 'TRANSFER' ? form.walletId : null,
      fromWalletId: form.type === 'TRANSFER' ? form.walletId : null,
      toWalletId: form.type === 'TRANSFER' ? form.toWalletId : null,
    };

    try {
      if (isEdit) {
        await updateTransaction({ id, ...payload }).unwrap();
      } else {
        await createTransaction(payload).unwrap();
      }
      router.push('/transactions');
    } catch (err: any) {
      setError(err.data?.error || 'Gagal menyimpan transaksi 😭');
    }
  };

  // ======================= RESET =======================
  const handleReset = () => {
    if (!isEdit) {
      setForm({
        title: '',
        amount: '',
        type: 'EXPENSE',
        categoryId: '',
        walletId: '',
        toWalletId: '',
        date: '',
        notes: '',
      });
    } else if (detail) {
      setForm({
        title: detail.title,
        amount: detail.amount.toString(),
        type: detail.type,
        categoryId: detail.categoryId || '',
        walletId: detail.walletId || detail.fromWalletId || '',
        toWalletId: detail.toWalletId || '',
        date: detail.date.split('T')[0],
        notes: detail.note || '',
      });
    }
  };

  // ======================= DELETE =======================
  const handleDelete = async () => {
    try {
      await deleteTransaction(id!).unwrap();
      router.push('/transactions');
    } catch (err: any) {
      setError(err.data?.error || 'Gagal menghapus transaksi.');
    }
  };

  return (
    <PageWrapper
      title={isEdit ? 'Edit Transaksi ✏️' : 'Tambah Transaksi 💸'}
    >
      {/* INFO */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Santai aja, catat seperlunya. Yang penting kejadian uangnya nggak lupa 😄
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* FORM */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
        }}
      >
        <Stack spacing={4}>
          {/* BASIC */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <PaidIcon fontSize="small" /> Info Utama
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Bagian paling penting — ceritain transaksi ini secara singkat & jelas.
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Judul transaksi"
                  fullWidth
                  required
                  placeholder="Ngopi sore, bayar kos, gaji bulan ini…"
                  helperText="Bikin yang gampang kamu inget"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Jumlah (Rp)"
                  fullWidth
                  required
                  type="number"
                  helperText="Masukkan nominalnya aja, nanti sistem yang urus"
                  value={form.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* TYPE */}
          <Box>
            <Typography fontWeight={700}>
              Jenis Transaksi
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Uang masuk, keluar, atau cuma pindah dompet?
            </Typography>

            <Stack direction="row" spacing={2}>
              {typeOptions.map((t) => (
                <Chip
                  key={t.value}
                  icon={t.icon}
                  label={t.label}
                  clickable
                  color={t.color as any}
                  variant={form.type === t.value ? 'filled' : 'outlined'}
                  onClick={() => handleChange('type', t.value)}
                  sx={{ px: 2, py: 2, fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* DETAIL */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CategoryIcon fontSize="small" /> Detail Transaksi
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Biar nanti gampang dianalisis & dilihat polanya.
            </Typography>

            <Grid container spacing={2}>
              {form.type !== 'TRANSFER' && (
                <>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Kategori"
                      select
                      fullWidth
                      helperText="Contoh: Makan, Transport, Hiburan"
                      value={form.categoryId}
                      onChange={(e) =>
                        handleChange('categoryId', e.target.value)
                      }
                    >
                      {categories.map((c: any) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Wallet"
                      select
                      fullWidth
                      helperText="Dari / ke mana uangnya?"
                      value={form.walletId}
                      onChange={(e) =>
                        handleChange('walletId', e.target.value)
                      }
                    >
                      {wallets.map((w: any) => (
                        <MenuItem key={w.id} value={w.id}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              {form.type === 'TRANSFER' && (
                <>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Dari Wallet"
                      select
                      fullWidth
                      helperText="Wallet asal"
                      value={form.walletId}
                      onChange={(e) =>
                        handleChange('walletId', e.target.value)
                      }
                    >
                      {wallets.map((w: any) => (
                        <MenuItem key={w.id} value={w.id}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Ke Wallet"
                      select
                      fullWidth
                      helperText="Wallet tujuan"
                      value={form.toWalletId}
                      onChange={(e) =>
                        handleChange('toWalletId', e.target.value)
                      }
                    >
                      {wallets.map((w: any) => (
                        <MenuItem key={w.id} value={w.id}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Tanggal"
                  type="date"
                  fullWidth
                  helperText="Kapan kejadian ini terjadi?"
                  InputLabelProps={{ shrink: true }}
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* NOTES */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <NotesIcon fontSize="small" /> Catatan (opsional)
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Mau curhat sedikit juga nggak apa-apa 😅
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Contoh: lapar mata, khilaf, tapi bahagia"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </Box>

          {/* ACTION */}
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ fontWeight: 600 }}
              onClick={() => router.push('/transactions')}
            >
              ← Kembali ke daftar
            </Button>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>

              {isEdit && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteOpen(true)}
                >
                  Hapus
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ px: 4 }}
                onClick={handleSubmit}
              >
                {isEdit ? 'Update' : 'Simpan'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Yakin mau hapus?</DialogTitle>
        <DialogContent>
          <Typography>
            Sekali dihapus, transaksi ini nggak bisa balik lagi 😬
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Batal</Button>
          <Button color="error" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
