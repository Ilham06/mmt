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
} from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  { value: 'INCOME', label: 'Income' },
  { value: 'EXPENSE', label: 'Expense' },
  { value: 'TRANSFER', label: 'Transfer' },
];

export default function TransactionFormPage({ params }: any) {
  const id = params?.id;
  const isEdit = Boolean(id);

  const router = useRouter();

  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const { data: detail } = useGetTransactionByIdQuery(id!, { skip: !isEdit });
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

  // ======================= PREFILL DATA EDIT =======================
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
      return setError('Harap isi semua field wajib.');
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
      setError(err.data?.error || 'Gagal menyimpan transaksi.');
    }
  };

  // ======================= RESET =======================
  const handleReset = () => {
    if (!isEdit)
      return setForm({
        title: '',
        amount: '',
        type: 'EXPENSE',
        categoryId: '',
        walletId: '',
        toWalletId: '',
        date: '',
        notes: '',
      });

    // RESET EDIT
    if (detail)
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
    <PageWrapper title={isEdit ? "Edit Transaksi" : "Tambah Transaksi"}>
      {/* ALERT */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Pastikan seluruh data transaksi sudah benar sebelum disimpan.
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* FORM CARD */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={4}>
          {/* ======================= BASIC INFO ======================= */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <PaidIcon fontSize="small" /> Informasi Dasar
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Bagian ini berisi detail utama dari transaksi Anda.
            </Typography>

            <Grid container spacing={2}>
              {/* TITLE */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Judul Transaksi"
                  fullWidth
                  required
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  helperText="Contoh: Belanja di Indomaret, Gaji Bulan Ini"
                />
              </Grid>

              {/* AMOUNT */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Jumlah (Rp)"
                  fullWidth
                  required
                  type="number"
                  value={form.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  helperText="Gunakan nilai positif atau negatif sesuai kebutuhan"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* ======================= DETAIL TRANSAKSI ======================= */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CategoryIcon fontSize="small" /> Detail Transaksi
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Informasi tambahan untuk mengkategorikan transaksi.
            </Typography>

            <Grid container spacing={2}>
              {/* TYPE */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Tipe Transaksi"
                  select
                  fullWidth
                  value={form.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  helperText="Income / Expense / Transfer"
                >
                  {typeOptions.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* CATEGORY */}
              {form.type !== 'TRANSFER' && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Kategori"
                    select
                    fullWidth
                    value={form.categoryId}
                    onChange={(e) => handleChange('categoryId', e.target.value)}
                    helperText="Pilih kategori transaksi"
                  >
                    {categories.map((c: any) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {/* WALLET */}
              {form.type !== 'TRANSFER' && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Dompet"
                    select
                    fullWidth
                    value={form.walletId}
                    onChange={(e) => handleChange('walletId', e.target.value)}
                    helperText="Sumber atau tujuan keuangan"
                  >
                    {wallets.map((w: any) => (
                      <MenuItem key={w.id} value={w.id}>
                        {w.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {/* TRANSFER FROM */}
              {form.type === 'TRANSFER' && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Dari Wallet"
                    select
                    fullWidth
                    value={form.walletId}
                    onChange={(e) => handleChange('walletId', e.target.value)}
                  >
                    {wallets.map((w: any) => (
                      <MenuItem key={w.id} value={w.id}>
                        {w.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {/* TRANSFER TO */}
              {form.type === 'TRANSFER' && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Ke Wallet"
                    select
                    fullWidth
                    value={form.toWalletId}
                    onChange={(e) => handleChange('toWalletId', e.target.value)}
                  >
                    {wallets.map((w: any) => (
                      <MenuItem key={w.id} value={w.id}>
                        {w.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {/* DATE */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Tanggal Transaksi"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* ======================= NOTES ======================= */}
          <Box>
            <Typography
              variant="h6"
              mb={1}
              fontWeight={700}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <NotesIcon fontSize="small" /> Catatan Tambahan (Opsional)
            </Typography>

            <TextField
              label="Catatan mengenai transaksi"
              fullWidth
              multiline
              minRows={3}
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </Box>

          {/* ======================= BUTTONS ======================= */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="text"
              onClick={() => router.push('/transactions')}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              ← Kembali ke daftar
            </Button>

            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                sx={{ textTransform: 'none', borderRadius: 2 }}
                onClick={handleReset}
              >
                Reset
              </Button>

              {isEdit && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ textTransform: 'none', px: 4, borderRadius: 2 }}
                onClick={handleSubmit}
              >
                {isEdit ? "Update Transaksi" : "Simpan Transaksi"}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* ======================= DELETE CONFIRM ======================= */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Hapus Transaksi?</DialogTitle>
        <DialogContent>
          <Typography>Transaksi yang dihapus tidak bisa dikembalikan.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Batal</Button>
          <Button color="error" onClick={handleDelete}>Hapus</Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
