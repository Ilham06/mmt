"use client";

import {
  Card,
  Stack,
  Typography,
  Switch,
  Divider,
  Button,
  MenuItem,
  TextField,
  Alert,
  Box,
} from "@mui/material";

import { useFormik } from "formik";

import {
  useGetPreferencesQuery,
  useUpdatePreferencesMutation,
} from "@/redux/slices/profileApi";

/* ================= OPTION ================= */
const LANGUAGES = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
];

export default function PreferenceForm() {
  const { data, isLoading } = useGetPreferencesQuery();
  const [updatePref, { isLoading: saving }] =
    useUpdatePreferencesMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      theme: data?.theme || "light",
      language: data?.language || "id",
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        await updatePref(values).unwrap();
        setStatus({ success: true });
      } catch (e: any) {
        setStatus({
          error:
            e?.data?.error ||
            "Gagal menyimpan preferensi",
        });
      }
    },
  });

  if (isLoading) return null;

  return (
    <Card sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={1}>
        Preferensi
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Atur tampilan dan bahasa aplikasi sesuai
        kenyamanan kamu.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {/* THEME */}
          <Stack spacing={1.2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={600}>
                  Tema Aplikasi
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Gunakan mode gelap untuk kenyamanan mata
                </Typography>
              </Box>

              <Switch
                checked={formik.values.theme === "dark"}
                onChange={(e) =>
                  formik.setFieldValue(
                    "theme",
                    e.target.checked
                      ? "dark"
                      : "light"
                  )
                }
              />
            </Stack>
          </Stack>

          <Divider />

          {/* LANGUAGE */}
          <Stack spacing={1.2}>
            <Typography fontWeight={600}>
              Bahasa
            </Typography>

            <TextField
              select
              value={formik.values.language}
              onChange={(e) =>
                formik.setFieldValue(
                  "language",
                  e.target.value
                )
              }
              helperText="Bahasa tampilan aplikasi"
              sx={{ maxWidth: 280 }}
            >
              {LANGUAGES.map((lang) => (
                <MenuItem
                  key={lang.value}
                  value={lang.value}
                >
                  {lang.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {/* FEEDBACK */}
          {formik.status?.success && (
            <Alert severity="success">
              Preferensi berhasil disimpan
            </Alert>
          )}

          {formik.status?.error && (
            <Alert severity="error">
              {formik.status.error}
            </Alert>
          )}

          {/* ACTION */}
          <Stack direction="row" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{
                px: 4,
                py: 1.1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Simpan Preferensi
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
