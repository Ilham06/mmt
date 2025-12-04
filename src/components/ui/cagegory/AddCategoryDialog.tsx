"use client";

import { colorSet, iconSet } from "@/config/categories";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Fade,
  Divider,
} from "@mui/material";

import { useState } from "react";


export default function AddCategoryDialog({ open, onClose }: any) {
  const [form, setForm] = useState({
    name: "",
    type: "EXPENSE",
    icon: "",
    color: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const selectedIcon = iconSet.find((i) => i.label === form.icon);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Fade}
    >
      <DialogTitle sx={{ pb: 1 }}>Add New Category</DialogTitle>
      <Typography px={3} pb={2} color="text.secondary">
        Used to classify transactions
      </Typography>

      <Divider />

      <DialogContent sx={{ py: 3, px: 4 }}>
        <Stack spacing={3}>
          {/* NAME */}
          <TextField
            label="Category Name"
            fullWidth
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* TYPE */}
          <TextField
            select
            label="Type"
            fullWidth
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="EXPENSE">Expense</MenuItem>
            <MenuItem value="INCOME">Income</MenuItem>
          </TextField>

          {/* ICON PICKER */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Choose Icon
            </Typography>

            <Grid container spacing={1.5}>
              {iconSet.map((item) => (
                <Grid key={item.label} size={{ xs: 2 }}>
                  <IconButton
                    onClick={() => handleChange("icon", item.label)}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      border:
                        form.icon === item.label
                          ? `2px solid ${form.color || "#4f8ef7"}`
                          : "1px solid #ccc",
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* COLOR PICKER */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Choose Color
            </Typography>

            <Grid container spacing={1.5}>
              {colorSet.map((clr) => (
                <Box
                key={clr}
                    onClick={() => handleChange("color", clr)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      cursor: "pointer",
                      bgcolor: clr,
                      border:
                        form.color === clr
                          ? "3px solid #000"
                          : "2px solid white",
                    }}
                  />
              ))}
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button sx={{ textTransform: "none" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 2, px: 4 }}
          disabled={!form.name || !form.icon || !form.color}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
