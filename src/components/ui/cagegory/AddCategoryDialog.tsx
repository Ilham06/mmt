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
      TransitionComponent={Fade}
    >
      {/* ================= HEADER ================= */}
      <DialogTitle sx={{ pb: 1 }}>
        {isEdit ? "✨ Upgrade Skill" : "🎭 Unlock Skill Baru"}
      </DialogTitle>

      <Typography px={3} pb={2} color="text.secondary">
        {isEdit
          ? "Tingkatkan skill ini biar tracking kamu makin akurat."
          : "Skill ini akan menentukan ke mana resource kamu sering dipakai."}
      </Typography>

      <Divider />

      {/* ================= CONTENT ================= */}
      <DialogContent sx={{ py: 3, px: 4 }}>
        <Stack spacing={3}>
          {/* NPC MESSAGE */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#F4F6FF",
            }}
          >
            <Typography fontWeight={600}>
              🧠 DompetBot:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              “Pilih skill dengan bijak, ini bakal sering muncul di laporan kamu 😉”
            </Typography>
          </Box>

          {/* SKILL NAME */}
          <TextField
            label="Nama Skill"
            fullWidth
            value={form.name}
            placeholder="Contoh: Survival, Fun, Mobility"
            helperText="Bikin yang gampang kamu pahami"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* ROLE / TYPE */}
          <TextField
            select
            label="Peran Skill"
            fullWidth
            value={form.type}
            helperText="Skill ini buff atau damage?"
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="EXPENSE">⬇️ Damage (Expense)</MenuItem>
            <MenuItem value="INCOME">⬆️ Buff (Income)</MenuItem>
          </TextField>

          {/* ICON PICKER */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              🎨 Pilih Ikon Skill
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Ikon bantu kamu ngenalin skill ini lebih cepat
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
                      bgcolor:
                        form.icon === item.label
                          ? (form.color || "#4f8ef7") + "22"
                          : "transparent",
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
              🎯 Warna Skill
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Warna ini bakal dipakai di chart & laporan
            </Typography>

            <Grid container spacing={1.5}>
              {colorSet.map((clr) => (
                <Grid key={clr} size={{ xs: 2 }}>
                  <Box
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
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* PREVIEW */}
          {form.name && form.icon && form.color && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                🔍 Preview Skill
              </Typography>
              <Chip
                label={form.name}
                sx={{
                  bgcolor: form.color + "33",
                  color: form.color,
                  fontWeight: 600,
                }}
              />
            </Box>
          )}
        </Stack>
      </DialogContent>

      {/* ================= ACTION ================= */}
      <DialogActions sx={{ p: 3 }}>
        <Button sx={{ textTransform: "none" }} onClick={onClose}>
          Batal
        </Button>

        <Button
          variant="contained"
          sx={{ borderRadius: 2, px: 4 }}
          disabled={!form.name || !form.icon || !form.color}
          onClick={handleSubmit}
        >
          {creating || updating
            ? "Memproses…"
            : isEdit
            ? "Upgrade Skill 🚀"
            : "Unlock Skill 🎮"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
