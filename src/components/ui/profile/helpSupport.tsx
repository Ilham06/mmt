"use client";

import {
  Card,
  Stack,
  Typography,
  Button,
} from "@mui/material";

export default function HelpSupport() {
  return (
    <Card sx={{ p: 4 }}>
      <Typography fontWeight={700} mb={2}>
        Bantuan & Support
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Jika kamu mengalami kendala atau butuh bantuan, silakan hubungi kami.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined">FAQ</Button>
        <Button variant="contained">Hubungi Support</Button>
      </Stack>
    </Card>
  );
}
