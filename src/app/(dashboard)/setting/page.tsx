'use client';

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
  Chip,
} from '@mui/material';

import PageWrapper from '@/components/layouts/pageWrapper';

export default function SettingsPage() {
  return (
    <PageWrapper title="⚙️ Settings">
      <Stack spacing={4}>
        {/* ================= PROFILE ================= */}
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={1} mb={3}>
            <Typography fontWeight={800}>🧑 Profile</Typography>
            <Typography variant="body2" color="text.secondary">
              Biar aplikasi kenal kamu lebih dekat
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nama"
                fullWidth
                placeholder="Nama panggilan juga boleh 😄"
                defaultValue="Dompet Survivor"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                fullWidth
                defaultValue="user@email.com"
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button variant="contained">Simpan Profil</Button>
          </Box>
        </Card>

        {/* ================= PREFERENCES ================= */}
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={1} mb={3}>
            <Typography fontWeight={800}>🎨 Preferensi</Typography>
            <Typography variant="body2" color="text.secondary">
              Atur tampilan & kebiasaan sesuai gaya kamu
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="🌙 Dark mode (biar mata adem)"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="💱 Tampilkan simbol Rupiah (Rp)"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="🧠 Aktifkan smart suggestion"
            />
          </Stack>
        </Card>

        {/* ================= NOTIFICATIONS ================= */}
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={1} mb={3}>
            <Typography fontWeight={800}>🔔 Notifikasi</Typography>
            <Typography variant="body2" color="text.secondary">
              Biar nggak kecolongan tanpa sadar
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="🚨 Peringatan mendekati budget"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="📅 Daily recap (ringkasan harian)"
            />

            <FormControlLabel
              control={<Switch />}
              label="📊 Ringkasan bulanan"
            />
          </Stack>
        </Card>

        {/* ================= SECURITY ================= */}
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={1} mb={3}>
            <Typography fontWeight={800}>🔐 Keamanan</Typography>
            <Typography variant="body2" color="text.secondary">
              Jaga akun kamu tetap aman
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField
              label="Password sekarang"
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
              <Button variant="outlined">Update Password</Button>
            </Box>
          </Stack>
        </Card>

        {/* ================= DANGER ZONE ================= */}
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px dashed',
            borderColor: 'error.light',
          }}
        >
          <Stack spacing={1} mb={2}>
            <Typography fontWeight={800} color="error.main">
              ☠️ Danger Zone
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aksi di bawah ini tidak bisa dibatalkan
            </Typography>
          </Stack>

          <Alert severity="warning" sx={{ mb: 2 }}>
            Pastikan kamu benar-benar yakin sebelum lanjut.
          </Alert>

          <Stack spacing={2}>
            <Button color="error" variant="outlined">
              Reset Semua Data
            </Button>

            <Button color="error" variant="contained">
              Hapus Akun Permanen
            </Button>
          </Stack>
        </Card>
      </Stack>
    </PageWrapper>
  );
}
