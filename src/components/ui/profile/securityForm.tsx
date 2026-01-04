"use client";

import {
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useChangePasswordMutation } from "@/redux/slices/profileApi";

/* ================= VALIDATION ================= */
const validationSchema = Yup.object({
  currentPassword: Yup.string().required(
    "Password saat ini wajib diisi"
  ),
  newPassword: Yup.string()
    .min(8, "Minimal 8 karakter")
    .required("Password baru wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Konfirmasi password tidak cocok"
    )
    .required("Konfirmasi password wajib diisi"),
});

export default function SecurityForm() {
  const [changePassword, { isLoading }] =
    useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }).unwrap();

        resetForm();
        setStatus({ success: true });
      } catch (e: any) {
        setStatus({
          error:
            e?.data?.error ||
            "Gagal mengubah password",
        });
      }
    },
  });

  return (
    <Card sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={1}>
        Keamanan Akun
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Ubah password akun untuk menjaga keamanan data
        finansial kamu.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {/* CURRENT PASSWORD */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Password Saat Ini
            </Typography>
            <TextField
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.currentPassword &&
                  formik.errors.currentPassword
              )}
              helperText={
                formik.touched.currentPassword
                  ? formik.errors.currentPassword
                  : ""
              }
            />
          </Stack>

          {/* NEW PASSWORD */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Password Baru
            </Typography>
            <TextField
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.newPassword &&
                  formik.errors.newPassword
              )}
              helperText={
                formik.touched.newPassword
                  ? formik.errors.newPassword
                  : "Minimal 8 karakter"
              }
            />
          </Stack>

          {/* CONFIRM PASSWORD */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Konfirmasi Password Baru
            </Typography>
            <TextField
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
          </Stack>

          {/* FEEDBACK */}
          {formik.status?.success && (
            <Alert severity="success">
              Password berhasil diperbarui
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
              disabled={isLoading}
              sx={{
                px: 4,
                py: 1.1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Simpan Password
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
