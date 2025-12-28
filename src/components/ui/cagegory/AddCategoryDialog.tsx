"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { iconSet, colorSet } from "@/config/categories";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/slices/categoryApi";

export default function AddCategoryDialog({
  open,
  onClose,
  category,
}: {
  open: boolean;
  onClose: () => void;
  category?: any;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [form, setForm] = useState({
    name: "",
    type: "EXPENSE",
    icon: "",
    color: "",
  });

  const [createCategory, { isLoading: creating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] =
    useUpdateCategoryMutation();

  const isEdit = Boolean(category);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
      });
    } else {
      setForm({
        name: "",
        type: "EXPENSE",
        icon: "",
        color: "",
      });
    }
  }, [category, open]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateCategory({ id: category.id, ...form }).unwrap();
      } else {
        await createCategory(form).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
  open={open}
  onClose={onClose}
  maxWidth="xs"
  fullWidth
  fullScreen={isMobile}
  TransitionComponent={Fade}
  PaperProps={{
    sx: {
      borderRadius: isMobile ? 0 : 4,
    },
  }}
>
  {/* HEADER */}
  <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
    <Typography fontWeight={800}>
      {isEdit ? "Edit Kategori" : "Tambah Kategori"}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Tentukan kategori untuk mengelompokkan transaksi
    </Typography>
  </Box>

  {/* CONTENT */}
  <DialogContent sx={{ px: 3, py: 3 }}>
    <Stack spacing={3}>
      <TextField
        label="Nama Kategori"
        fullWidth
        value={form.name}
        placeholder="Contoh: Makan, Transport, Hiburan"
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <TextField
        select
        label="Jenis Kategori"
        fullWidth
        value={form.type}
        helperText="Menentukan pengaruh kategori pada laporan"
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <MenuItem value="EXPENSE">Pengeluaran</MenuItem>
        <MenuItem value="INCOME">Pemasukan</MenuItem>
      </TextField>

      {/* ICON */}
      <Box>
        <Typography fontWeight={700} mb={1}>
          Ikon
        </Typography>
        <Grid container spacing={1.5}>
          {iconSet.map((item) => (
            <Grid key={item.label} size={{ xs: 3 }}>
              <IconButton
                onClick={() => handleChange("icon", item.label)}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  border:
                    form.icon === item.label
                      ? `2px solid ${form.color || "#2065D1"}`
                      : "1px solid #ddd",
                  bgcolor:
                    form.icon === item.label
                      ? (form.color || "#2065D1") + "22"
                      : "transparent",
                }}
              >
                {item.icon}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* COLOR */}
      <Box>
        <Typography fontWeight={700} mb={1}>
          Warna
        </Typography>
        <Grid container spacing={1.5}>
          {colorSet.map((clr) => (
            <Grid key={clr} size={{ xs: 3 }}>
              <Box
                onClick={() => handleChange("color", clr)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: clr,
                  cursor: "pointer",
                  border:
                    form.color === clr
                      ? "3px solid #000"
                      : "2px solid #fff",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PREVIEW */}
      {form.name && form.icon && form.color && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Preview
          </Typography>
          <Chip
            label={form.name}
            sx={{
              mt: 0.5,
              bgcolor: form.color + "22",
              color: form.color,
              fontWeight: 600,
            }}
          />
        </Box>
      )}
    </Stack>
  </DialogContent>

  {/* ACTION */}
  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button onClick={onClose}>Batal</Button>
    <Button
      variant="contained"
      disabled={!form.name || !form.icon || !form.color}
      onClick={handleSubmit}
    >
      {isEdit ? "Simpan Perubahan" : "Simpan Kategori"}
    </Button>
  </DialogActions>
</Dialog>

  );
}
