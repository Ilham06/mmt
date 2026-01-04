'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  useAddSavingToPlanMutation,
} from '@/redux/slices/planApi';

import {
  useGetWalletsQuery,
} from '@/redux/slices/walletApi';

/* ================= VALIDATION ================= */
const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError('Harus berupa angka')
    .positive('Nominal harus lebih dari 0')
    .required('Nominal wajib diisi'),
  walletId: Yup.string().required('Pilih wallet'),
});

export default function AddSavingDialog({
  open,
  onClose,
  planId,
}: {
  open: boolean;
  onClose: () => void;
  planId: string;
}) {
  const { data: wallets = [] } = useGetWalletsQuery();
  const [addSaving, { isLoading }] =
    useAddSavingToPlanMutation();

  const formik = useFormik({
    initialValues: {
      amount: '',
      walletId: '',
      note: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addSaving({
          planId,
          amount: Number(values.amount),
          walletId: values.walletId,
          note: values.note,
        }).unwrap();

        onClose();
        formik.resetForm();
      } catch (err) {
        console.error('Add saving failed', err);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Typography fontWeight={700}>
          Tambah Tabungan
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Masukkan dana ke plan ini
        </Typography>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} mt={1}>
            {/* ================= AMOUNT ================= */}
            <Stack spacing={1}>
              <Typography fontWeight={600}>
                Nominal
              </Typography>
              <TextField
                name="amount"
                placeholder="2000000"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.amount &&
                    formik.errors.amount
                )}
                helperText={
                  formik.touched.amount
                    ? String(formik.errors.amount)
                    : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Rp
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* ================= WALLET ================= */}
            <Stack spacing={1}>
              <Typography fontWeight={600}>
                Sumber Dana
              </Typography>
              <TextField
                select
                name="walletId"
                value={formik.values.walletId}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.touched.walletId &&
                    formik.errors.walletId
                )}
                helperText={
                  formik.touched.walletId
                    ? String(formik.errors.walletId)
                    : ''
                }
              >
                {wallets.map((w: any) => (
                  <MenuItem key={w.id} value={w.id}>
                    {w.name} — Rp{' '}
                    {Math.abs(w.balance).toLocaleString(
                      'id-ID'
                    )}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* ================= NOTE ================= */}
            <Stack spacing={1}>
              <Typography fontWeight={600}>
                Catatan (opsional)
              </Typography>
              <TextField
                name="note"
                multiline
                rows={2}
                value={formik.values.note}
                onChange={formik.handleChange}
              />
            </Stack>

            {/* ================= ACTION ================= */}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                py: 1.2,
                fontWeight: 600,
              }}
            >
              {isLoading ? (
                <CircularProgress size={22} />
              ) : (
                'Simpan Tabungan'
              )}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
