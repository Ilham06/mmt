"use client";

import {
  Card,
  Stack,
  Typography,
  Switch,
  Divider,
  Button,
  Alert,
} from "@mui/material";

import { useFormik } from "formik";

import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/redux/slices/profileApi";

/* ================= ITEM COMPONENT ================= */
function NotificationItem({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Stack spacing={0.3}>
        <Typography fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </Stack>

      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Stack>
  );
}

export default function NotificationSettings() {
  const { data, isLoading } =
    useGetNotificationSettingsQuery();

  const [updateSettings, { isLoading: saving }] =
    useUpdateNotificationSettingsMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      transaction: data?.transaction ?? true,
      reminder: data?.reminder ?? true,
      email: data?.email ?? false,
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        await updateSettings(values).unwrap();
        setStatus({ success: true });
      } catch (e: any) {
        setStatus({
          error:
            e?.data?.error ||
            "Gagal menyimpan pengaturan",
        });
      }
    },
  });

  if (isLoading) return null;

  return (
    <Card sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={1}>
        Notifikasi
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Atur jenis pemberitahuan yang ingin kamu terima.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <NotificationItem
            title="Notifikasi Transaksi"
            description="Dapatkan notifikasi setiap ada transaksi"
            checked={formik.values.transaction}
            onChange={(v) =>
              formik.setFieldValue("transaction", v)
            }
          />

          <Divider />

          <NotificationItem
            title="Pengingat Keuangan"
            description="Reminder plan, anggaran, dan jadwal"
            checked={formik.values.reminder}
            onChange={(v) =>
              formik.setFieldValue("reminder", v)
            }
          />

          <Divider />

          <NotificationItem
            title="Email Notifikasi"
            description="Kirim notifikasi penting ke email"
            checked={formik.values.email}
            onChange={(v) =>
              formik.setFieldValue("email", v)
            }
          />

          {/* FEEDBACK */}
          {formik.status?.success && (
            <Alert severity="success">
              Pengaturan notifikasi disimpan
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
              Simpan Pengaturan
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
