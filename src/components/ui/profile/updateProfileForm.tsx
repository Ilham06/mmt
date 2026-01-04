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

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/profileApi";

/* ================= VALIDATION ================= */
const validationSchema = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  bio: Yup.string().max(160, "Maksimal 160 karakter"),
});

export default function EditProfileForm() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving }] =
    useUpdateProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        await updateProfile({
          name: values.name,
          bio: values.bio,
        }).unwrap();

        setStatus({ success: true });
      } catch (e: any) {
        setStatus({
          error:
            e?.data?.error ||
            "Gagal memperbarui profil",
        });
      }
    },
  });

  if (isLoading) return null;

  return (
    <Card sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={3}>
        Edit Profil
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {/* NAME */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Nama
            </Typography>
            <TextField
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.name &&
                  formik.errors.name
              )}
              helperText={
                formik.touched.name
                  ? formik.errors.name
                  : ""
              }
            />
          </Stack>

          {/* EMAIL (READ ONLY) */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Email
            </Typography>
            <TextField
              name="email"
              value={formik.values.email}
              disabled
              helperText="Email tidak dapat diubah"
            />
          </Stack>

          {/* BIO */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              Bio
            </Typography>
            <TextField
              name="bio"
              multiline
              rows={3}
              placeholder="Ceritakan sedikit tentang kamu…"
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={Boolean(
                formik.touched.bio &&
                  formik.errors.bio
              )}
              helperText={
                formik.touched.bio
                  ? formik.errors.bio
                  : "Maksimal 160 karakter"
              }
            />
          </Stack>

          {/* FEEDBACK */}
          {formik.status?.success && (
            <Alert severity="success">
              Profil berhasil diperbarui
            </Alert>
          )}

          {formik.status?.error && (
            <Alert severity="error">
              {formik.status.error}
            </Alert>
          )}

          {/* ACTION */}
          <Stack
            direction="row"
            justifyContent="flex-end"
          >
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
              Simpan Perubahan
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
