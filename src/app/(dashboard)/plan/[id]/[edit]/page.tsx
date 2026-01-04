'use client';

import {
  Box,
  Card,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  Grid,
  InputAdornment,
  CircularProgress,
  IconButton,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import PageWrapper from '@/components/layouts/pageWrapper';
import {
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
} from '@/redux/slices/planApi';

import { useParams, useRouter } from 'next/navigation';

/* =====================================================
   TYPES
===================================================== */
type PlanItemForm = {
  name: string;
  amount: string; // UI = string
};

type PlanFormValues = {
  name: string;
  description: string;
  targetDate: string;
  mode: 'SIMPLE' | 'BREAKDOWN';
  targetAmount: string; // UI = string
  items: PlanItemForm[];
};

/* =====================================================
   VALIDATION
===================================================== */
const validationSchema = Yup.object({
  name: Yup.string().required('Nama plan wajib diisi'),
  targetDate: Yup.string().required('Target tanggal wajib diisi'),
  targetAmount: Yup.number().when('mode', {
    is: 'SIMPLE',
    then: (s) =>
      s
        .typeError('Harus berupa angka')
        .positive('Harus lebih dari 0')
        .required('Target wajib diisi'),
  }),
});

/* =====================================================
   PAGE
===================================================== */
export default function EditPlanPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: plan, isLoading } = useGetPlanByIdQuery(id);
  const [updatePlan, { isLoading: isSaving }] =
    useUpdatePlanMutation();

  const formik = useFormik<PlanFormValues>({
    enableReinitialize: true,
    initialValues: plan
      ? {
          name: plan.name,
          description: plan.description || '',
          targetDate: plan.targetDate.split('T')[0],
          mode: plan.mode,
          targetAmount:
            plan.mode === 'SIMPLE'
              ? String(plan.targetAmount)
              : '',
          items:
            plan.items && plan.items.length > 0
              ? plan.items.map((i: any) => ({
                  name: i.name,
                  amount: String(i.amount),
                }))
              : [{ name: '', amount: '' }],
        }
      : {
          name: '',
          description: '',
          targetDate: '',
          mode: 'SIMPLE',
          targetAmount: '',
          items: [{ name: '', amount: '' }],
        },
    validationSchema,
    onSubmit: async (values) => {
      const parsedItems = values.items.map((i) => ({
        name: i.name,
        amount: Number(i.amount),
      }));

      const payload = {
        id,
        name: values.name,
        description: values.description,
        targetDate: values.targetDate,
        mode: values.mode,
        targetAmount:
          values.mode === 'BREAKDOWN'
            ? parsedItems.reduce(
                (sum, i) => sum + i.amount,
                0
              )
            : Number(values.targetAmount),
        items:
          values.mode === 'BREAKDOWN'
            ? parsedItems
            : [],
      };

      await updatePlan(payload).unwrap();
      router.push(`/plan/${id}`);
    },
  });

  if (isLoading || !plan) {
    return (
      <PageWrapper title="Edit Plan">
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  const items = formik.values.items;
  const totalItems = items.reduce(
    (sum, i) => sum + Number(i.amount || 0),
    0
  );

  return (
    <PageWrapper
      title="✏️ Edit Financial Plan"
      subtitle="Perbarui target dan rincian tujuan keuanganmu"
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 4, borderRadius: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                {/* ================= BASIC ================= */}
                <Stack spacing={1.5}>
                  <Typography fontWeight={700}>
                    Nama Plan
                  </Typography>
                  <TextField
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={
                      !!formik.touched.name &&
                      !!formik.errors.name
                    }
                    helperText={
                      formik.touched.name
                        ? String(formik.errors.name)
                        : ''
                    }
                    fullWidth
                  />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography fontWeight={700}>
                    Deskripsi
                  </Typography>
                  <TextField
                    name="description"
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </Stack>

                <Divider />

                {/* ================= DATE ================= */}
                <Stack spacing={1.5}>
                  <Typography fontWeight={700}>
                    Target Tanggal
                  </Typography>
                  <TextField
                    type="date"
                    name="targetDate"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.targetDate}
                    onChange={formik.handleChange}
                    error={
                      !!formik.touched.targetDate &&
                      !!formik.errors.targetDate
                    }
                    helperText={
                      formik.touched.targetDate
                        ? String(formik.errors.targetDate)
                        : ''
                    }
                  />
                </Stack>

                <Divider />

                {/* ================= MODE ================= */}
                {formik.values.mode === 'SIMPLE' && (
                  <Stack spacing={1.5}>
                    <Typography fontWeight={700}>
                      Target Dana
                    </Typography>
                    <TextField
                      name="targetAmount"
                      value={formik.values.targetAmount}
                      onChange={formik.handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Rp
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                )}

                {formik.values.mode === 'BREAKDOWN' && (
                  <Stack spacing={2}>
                    <Typography fontWeight={700}>
                      Rincian Target
                    </Typography>

                    {items.map((item, idx) => (
                      <Grid container spacing={2} key={idx}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            placeholder="Nama kebutuhan"
                            value={item.name}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `items.${idx}.name`,
                                e.target.value
                              )
                            }
                            fullWidth
                          />
                        </Grid>

                        <Grid size={{ xs: 10, md: 5 }}>
                          <TextField
                            placeholder="Nominal"
                            value={item.amount}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `items.${idx}.amount`,
                                e.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Rp
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                          />
                        </Grid>

                        <Grid
                          size={{ xs: 2, md: 1 }}
                          display="flex"
                          alignItems="center"
                        >
                          <IconButton
                            onClick={() =>
                              formik.setFieldValue(
                                'items',
                                items.filter(
                                  (_, i) => i !== idx
                                )
                              )
                            }
                            disabled={items.length === 1}
                          >
                            <DeleteOutlineRoundedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}

                    <Button
                      startIcon={<AddRoundedIcon />}
                      onClick={() =>
                        formik.setFieldValue('items', [
                          ...items,
                          { name: '', amount: '' },
                        ])
                      }
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Tambah Rincian
                    </Button>

                    <Typography fontWeight={700}>
                      Total Target:{' '}
                      Rp{' '}
                      {totalItems.toLocaleString('id-ID')}
                    </Typography>
                  </Stack>
                )}

                {/* ================= ACTION ================= */}
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSaving}
                    sx={{
                      px: 4,
                      py: 1.2,
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    {isSaving
                      ? 'Menyimpan...'
                      : 'Simpan Perubahan'}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
