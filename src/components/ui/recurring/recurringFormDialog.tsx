'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Divider,
  Box,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  useCreateRecurringTransactionMutation,
  useUpdateRecurringTransactionMutation,
} from '@/redux/slices/recurringApi';

// ==============================
// VALIDATION
// ==============================
const RecurringSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimal 3 karakter')
    .required('Judul wajib diisi'),

  amount: Yup.number()
    .typeError('Nominal harus berupa angka')
    .positive('Nominal harus lebih dari 0')
    .required('Nominal wajib diisi'),

  type: Yup.string()
    .oneOf(['INCOME', 'EXPENSE'])
    .required(),

  interval: Yup.string()
    .oneOf(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'])
    .required(),

  nextRun: Yup.string().required(),

  active: Yup.boolean(),
});

// ==============================
// OPTIONS
// ==============================
const intervals = [
  { value: 'DAILY', label: 'Harian' },
  { value: 'WEEKLY', label: 'Mingguan' },
  { value: 'MONTHLY', label: 'Bulanan' },
  { value: 'YEARLY', label: 'Tahunan' },
];

// ==============================
// HELPER
// ==============================
const helperText = (touched: boolean, error?: unknown) =>
  touched && error ? String(error) : '';

// ==============================
// TYPES
// ==============================
type Props = {
  open: boolean;
  onClose: () => void;
  editData?: any | null;
};

export default function RecurringDialog({
  open,
  onClose,
  editData,
}: Props) {
  const isEdit = Boolean(editData);

  const [createRecurring, { isLoading: creating }] =
    useCreateRecurringTransactionMutation();
  const [updateRecurring, { isLoading: updating }] =
    useUpdateRecurringTransactionMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editData?.title ?? '',
      amount: editData?.amount ?? '',
      type: editData?.type ?? 'EXPENSE',
      interval: editData?.interval ?? 'MONTHLY',
      nextRun: editData?.nextRun
        ? editData.nextRun.split('T')[0]
        : '',
      active: editData?.active ?? true,
    },
    validationSchema: RecurringSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEdit) {
          await updateRecurring({
            id: editData.id,
            ...values,
            nextRun: new Date(values.nextRun).toISOString(),
          });

        } else {
          await createRecurring({
            ...values,
            nextRun: new Date(values.nextRun).toISOString(),
          });

        }
        onClose();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* ================= HEADER ================= */}
      <DialogTitle sx={{ pb: 1 }}>
        <Typography fontWeight={800} fontSize={18}>
          {isEdit
            ? 'Edit Recurring Transaction'
            : 'Tambah Recurring Transaction'}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Transaksi otomatis seperti gaji, langganan, atau transport
        </Typography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {/* ================= BASIC INFO ================= */}
            <Box>
              <Typography
                fontWeight={700}
                fontSize={14}
                mb={2}
              >
                Informasi Utama
              </Typography>

              <Stack spacing={2}>
                <TextField
                  name="title"
                  label="Judul"
                  placeholder="Gaji Bulanan / Transport Harian"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.title && formik.errors.title
                  )}
                  helperText={helperText(
                    Boolean(formik.touched.title),
                    formik.errors.title
                  )}
                  fullWidth
                />

                <TextField
                  name="amount"
                  label="Nominal"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.amount && formik.errors.amount
                  )}
                  helperText={helperText(
                    Boolean(formik.touched.amount),
                    formik.errors.amount
                  )}
                  fullWidth
                />
              </Stack>
            </Box>

            <Divider />

            {/* ================= SCHEDULE ================= */}
            <Box>
              <Typography
                fontWeight={700}
                fontSize={14}
                mb={2}
              >
                Penjadwalan
              </Typography>

              <Stack spacing={2}>
                <TextField
                  name="interval"
                  label="Interval"
                  select
                  value={formik.values.interval}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.interval &&
                    formik.errors.interval
                  )}
                  helperText={helperText(
                    Boolean(formik.touched.interval),
                    formik.errors.interval
                  )}
                  fullWidth
                >
                  {intervals.map((i) => (
                    <MenuItem key={i.value} value={i.value}>
                      {i.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="nextRun"
                  label="Tanggal Mulai"
                  type="date"
                  value={formik.values.nextRun}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.nextRun &&
                    formik.errors.nextRun
                  )}
                  helperText={helperText(
                    Boolean(formik.touched.nextRun),
                    formik.errors.nextRun
                  )}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>
            </Box>

            <Divider />

            {/* ================= SETTINGS ================= */}
            <Box>
              <Typography
                fontWeight={700}
                fontSize={14}
                mb={2}
              >
                Pengaturan
              </Typography>

              <Stack spacing={2}>
                <TextField
                  name="type"
                  label="Jenis Transaksi"
                  select
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="INCOME">Income</MenuItem>
                  <MenuItem value="EXPENSE">Expense</MenuItem>
                </TextField>

                {/* <TextField
                  name="active"
                  label="Status"
                  select
                  value={formik.values.active}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={2}>Nonaktif</MenuItem>
                </TextField> */}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>

        {/* ================= ACTIONS ================= */}
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
          }}
        >
          <Button onClick={onClose}>Batal</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              formik.isSubmitting || creating || updating
            }
            sx={{
              px: 3,
              fontWeight: 700,
            }}
          >
            {isEdit ? 'Simpan Perubahan' : 'Tambah'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
