"use client";

import {
  Box,
  Card,
  Typography,
  Stack,
  TextField,
  Switch,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Alert,
} from "@mui/material";

import PageWrapper from "@/components/layouts/pageWrapper";

export default function SettingsPage() {
  return (
    <PageWrapper title="Pengaturan">
      <Stack spacing={4}>
        {/* ================= PROFILE ================= */}
        <Card sx={{ p: 4 }}>
          <Stack spacing={0.5} mb={3}>
            <Typography fontWeight={800}>
              Profil Pengguna
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Informasi dasar yang digunakan di seluruh aplikasi
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nama"
                fullWidth
                placeholder="Nama yang ditampilkan"
                defaultValue="Dompet Survivor"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                fullWidth
                defaultValue="user@email.com"
                disabled
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button variant="contained">
              Simpan Perubahan
            </Button>
          </Box>
        </Card>

        {/* ================= PREFERENCES ================= */}
        <Card sx={{ p: 4 }}>
          <Stack spacing={0.5} mb={3}>
            <Typography fontWeight={800}>
              Preferensi Aplikasi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sesuaikan tampilan dan perilaku aplikasi dengan kebutuhan kamu
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Mode gelap"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Tampilkan simbol mata uang (Rp)"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Aktifkan saran otomatis"
            />
          </Stack>
        </Card>

        {/* ================= NOTIFICATIONS ================= */}
        <Card sx={{ p: 4 }}>
          <Stack spacing={0.5} mb={3}>
            <Typography fontWeight={800}>
              Notifikasi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pilih informasi yang ingin kamu terima
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Peringatan mendekati batas anggaran"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Ringkasan harian"
            />

            <FormControlLabel
              control={<Switch />}
              label="Ringkasan bulanan"
            />
          </Stack>
        </Card>

        {/* ================= SECURITY ================= */}
        <Card sx={{ p: 4 }}>
          <Stack spacing={0.5} mb={3}>
            <Typography fontWeight={800}>
              Keamanan Akun
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kelola kredensial untuk menjaga keamanan akun kamu
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField
              label="Password saat ini"
              type="password"
              fullWidth
            />
            <TextField
              label="Password baru"
              type="password"
              fullWidth
            />
            <TextField
              label="Konfirmasi password baru"
              type="password"
              fullWidth
            />

            <Box>
              <Button variant="outlined">
                Perbarui Password
              </Button>
            </Box>
          </Stack>
        </Card>

        {/* ================= DANGER ZONE ================= */}
        <Card
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "error.light",
          }}
        >
          <Stack spacing={0.5} mb={2}>
            <Typography fontWeight={800} color="error.main">
              Area Sensitif
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
            </Typography>
          </Stack>

          <Alert severity="warning" sx={{ mb: 2 }}>
            Pastikan kamu sudah memahami konsekuensi sebelum melanjutkan.
          </Alert>

          <Stack spacing={2}>
            <Button color="error" variant="outlined">
              Reset Seluruh Data
            </Button>

            <Button color="error" variant="contained">
              Hapus Akun Secara Permanen
            </Button>
          </Stack>
        </Card>
      </Stack>
    </PageWrapper>
  );
}
