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
  IconButton,
  CircularProgress,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import PageWrapper from '@/components/layouts/pageWrapper';
import { useCreatePlanMutation } from '@/redux/slices/planApi';
import { useRouter } from 'next/navigation';

/* ================= LABEL COMPONENT ================= */
function FieldLabel({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Stack spacing={0.5}>
      <Typography fontWeight={600}>{title}</Typography>
      {description && (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
  );
}

/* ================= VALIDATION ================= */
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

export default function CreatePlanPage() {
  const router = useRouter();
  const [createPlan, { isLoading }] = useCreatePlanMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      targetDate: '',
      mode: 'SIMPLE',
      targetAmount: '',
      items: [{ name: '', amount: '' }],
    },
    validationSchema,
    onSubmit: async (values) => {
      const items = values.items ?? [];

      const payload = {
        name: values.name,
        description: values.description,
        targetDate: values.targetDate,
        mode: values.mode,
        targetAmount:
          values.mode === 'BREAKDOWN'
            ? items.reduce(
                (sum: number, i: any) =>
                  sum + Number(i.amount || 0),
                0
              )
            : Number(values.targetAmount),
        items:
          values.mode === 'BREAKDOWN'
            ? items
            : [],
      };

      try {
        await createPlan(payload).unwrap();
        router.push('/plan');
      } catch (err) {
        console.error('Create plan failed', err);
      }
    },
  });

  const items = formik.values.items ?? [];
  const totalItems = items.reduce(
    (sum: number, i: any) => sum + Number(i.amount || 0),
    0
  );

  return (
    <PageWrapper
      title="🎯 Buat Financial Plan"
      subtitle="Rencanakan tujuan keuanganmu dengan lebih matang dan terarah"
    >
      <Grid container spacing={4}>
        {/* ================= MAIN FORM ================= */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 4, borderRadius: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={5}>
                {/* ================= BASIC INFO ================= */}
                <Stack spacing={3}>
                  <Typography fontWeight={700} fontSize={18}>
                    Informasi Utama
                  </Typography>

                  <Stack spacing={1.5}>
                    <FieldLabel
                      title="Nama Plan"
                      description="Contoh: Nikah, Dana Darurat, Liburan"
                    />
                    <TextField
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      fullWidth
                      error={Boolean(
                        formik.touched.name && formik.errors.name
                      )}
                      helperText={
                        formik.touched.name ? formik.errors.name : ''
                      }
                    />
                  </Stack>

                  <Stack spacing={1.5}>
                    <FieldLabel
                      title="Deskripsi"
                      description="Opsional, membantu kamu mengingat tujuan ini"
                    />
                    <TextField
                      name="description"
                      multiline
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Stack>

                <Divider />

                {/* ================= TARGET ================= */}
                <Stack spacing={3}>
                  <Typography fontWeight={700} fontSize={18}>
                    Target & Waktu
                  </Typography>

                  <Stack spacing={1.5}>
                    <FieldLabel
                      title="Target Tanggal"
                      description="Tanggal ini digunakan untuk menghitung kebutuhan tabungan"
                    />
                    <TextField
                      type="date"
                      name="targetDate"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.targetDate}
                      onChange={formik.handleChange}
                      error={Boolean(
                        formik.touched.targetDate &&
                          formik.errors.targetDate
                      )}
                      helperText={
                        formik.touched.targetDate
                          ? formik.errors.targetDate
                          : ''
                      }
                    />
                  </Stack>
                </Stack>

                <Divider />

                {/* ================= MODE SELECT ================= */}
                <Stack spacing={3}>
                  <Typography fontWeight={700} fontSize={18}>
                    Cara Menentukan Target
                  </Typography>

                  <Grid container spacing={2}>
                    {[
                      {
                        value: 'SIMPLE',
                        title: 'Total Saja',
                        desc: 'Langsung tentukan total dana',
                      },
                      {
                        value: 'BREAKDOWN',
                        title: 'Rincian Detail',
                        desc: 'Pisahkan target per kebutuhan',
                      },
                    ].map((opt) => (
                      <Grid key={opt.value} size={{ xs: 12, md: 6 }}>
                        <Card
                          onClick={() =>
                            formik.setFieldValue('mode', opt.value)
                          }
                          sx={{
                            p: 3,
                            cursor: 'pointer',
                            borderRadius: 3,
                            border:
                              formik.values.mode === opt.value
                                ? '2px solid #6366f1'
                                : '1px solid #e5e7eb',
                            bgcolor:
                              formik.values.mode === opt.value
                                ? 'rgba(99,102,241,.08)'
                                : 'transparent',
                          }}
                        >
                          <Typography fontWeight={700}>
                            {opt.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {opt.desc}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* SIMPLE */}
                  {formik.values.mode === 'SIMPLE' && (
                    <Stack spacing={1.5}>
                      <FieldLabel
                        title="Target Dana"
                        description="Total dana yang ingin kamu capai"
                      />
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
                        error={Boolean(
                          formik.touched.targetAmount &&
                            formik.errors.targetAmount
                        )}
                        helperText={
                          formik.touched.targetAmount
                            ? formik.errors.targetAmount
                            : ''
                        }
                      />
                    </Stack>
                  )}

                  {/* BREAKDOWN */}
                  {formik.values.mode === 'BREAKDOWN' && (
                    <Stack spacing={2}>
                      {items.map((item: any, idx) => (
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
                                  items.filter((_, i) => i !== idx)
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
                        Rp {totalItems.toLocaleString('id-ID')}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {/* ================= ACTION ================= */}
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      px: 5,
                      py: 1.3,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={22} />
                    ) : (
                      'Buat Plan'
                    )}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Card>
        </Grid>

        {/* ================= SIDE INFO ================= */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Stack spacing={2}>
              <Typography fontWeight={700}>
                💡 Kenapa ini penting?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plan membantu kamu memisahkan antara kebutuhan dan
                keinginan, sehingga keuangan lebih terarah.
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
