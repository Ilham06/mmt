"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Fade,
} from "@mui/material";
import { useState } from "react";

const dummyCategories = [
  { name: "Food & Drinks", color: "#1E88E5" },
  { name: "Transport", color: "#8E24AA" },
  { name: "Shopping", color: "#FB8C00" },
  { name: "Salary", color: "#43A047" },
  { name: "Entertainment", color: "#D81B60" },
];

export default function AddBudgetDialog({ open, onClose }: any) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    period: "Monthly",
  });

  const handleChange = (field: string, val: any) => {
    setForm((p) => ({ ...p, [field]: val }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Fade}>
      <DialogTitle fontWeight={700}>Add Budget</DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          {/* CATEGORY */}
          <TextField
            select
            label="Category"
            fullWidth
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {dummyCategories.map((c) => (
              <MenuItem key={c.name} value={c.name}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      bgcolor: c.color,
                      borderRadius: "50%",
                    }}
                  />
                  {c.name}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          {/* LIMIT */}
          <TextField
            label="Limit (Rp)"
            type="number"
            fullWidth
            value={form.limit}
            onChange={(e) => handleChange("limit", e.target.value)}
          />

          {/* PERIOD */}
          <TextField
            select
            label="Period"
            value={form.period}
            onChange={(e) => handleChange("period", e.target.value)}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Custom">Custom Range</MenuItem>
          </TextField>

          {/* If custom date → add start & end */}
          {form.period === "Custom" && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Start"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="End"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!form.category || !form.limit}
          sx={{ px: 4, borderRadius: 2 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
