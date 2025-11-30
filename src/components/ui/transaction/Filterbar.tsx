"use client";

import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";

export default function FilterBar() {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 2,
        border: "1px solid #eee",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField label="Service" fullWidth />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            type="date"
            label="Start date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            type="date"
            label="End date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField label="Search customer…" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
}
