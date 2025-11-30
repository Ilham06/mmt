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
} from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layouts/pageWrapper';

// ======================= OPTIONS =======================
const typeOptions = [
  { value: 'INCOME', label: 'Income' },
  { value: 'EXPENSE', label: 'Expense' },
  { value: 'TRANSFER', label: 'Transfer' },
];

const categoryOptions = [
  'Food',
  'Transport',
  'Shopping',
  'Salary',
  'Entertainment',
  'Transfer',
];

const walletOptions = ['Main Wallet', 'Cash', 'OVO', 'Dana', 'BNI', 'Jago'];

export default function AddTransactionPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    category: '',
    wallet: '',
    date: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Transaction submitted:', form);

    // nanti diganti POST API → redirect
    router.push('/transactions');
  };

  const handleReset = () => {
    setForm({
      title: '',
      amount: '',
      type: 'EXPENSE',
      category: '',
      wallet: '',
      date: '',
      notes: '',
    });
  };

  return (
    <PageWrapper title="Tambah Transaksi">
      {/* ALERT */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Pastikan seluruh data transaksi sudah benar sebelum disimpan.
      </Alert>

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

          {/* ======================= TRANSACTION DETAILS ======================= */}
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
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Kategori"
                  select
                  fullWidth
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  helperText="Pilih kategori transaksi"
                >
                  {categoryOptions.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* WALLET */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Dompet"
                  select
                  fullWidth
                  value={form.wallet}
                  onChange={(e) => handleChange('wallet', e.target.value)}
                  helperText="Sumber atau tujuan keuangan"
                >
                  {walletOptions.map((w) => (
                    <MenuItem key={w} value={w}>
                      {w}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

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

              <Button
                variant="contained"
                sx={{ textTransform: 'none', px: 4, borderRadius: 2 }}
                onClick={handleSubmit}
              >
                Simpan Transaksi
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </PageWrapper>
  );
}
