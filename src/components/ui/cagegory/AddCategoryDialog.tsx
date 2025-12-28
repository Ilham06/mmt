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
      fullScreen={isMobile} // ✅ MOBILE ONLY
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <DialogTitle sx={{ pb: 1, px: isMobile ? 2 : 3 }}>
        {isEdit ? "✨ Upgrade Skill" : "🎭 Unlock Skill Baru"}
      </DialogTitle>

      <Typography
        px={isMobile ? 2 : 3}
        pb={2}
        color="text.secondary"
        fontSize={isMobile ? 13 : 14}
      >
        {isEdit
          ? "Tingkatkan skill ini biar tracking kamu makin akurat."
          : "Skill ini akan menentukan ke mana resource kamu sering dipakai."}
      </Typography>

      <Divider />

      {/* ================= CONTENT ================= */}
      <DialogContent sx={{ py: isMobile ? 2 : 3, px: isMobile ? 2 : 4 }}>
        <Stack spacing={isMobile ? 2.5 : 3}>
          {/* NPC MESSAGE */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#F4F6FF",
            }}
          >
            <Typography fontWeight={600}>🧠 DompetBot:</Typography>
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

            <Grid container spacing={isMobile ? 1 : 1.5}>
              {iconSet.map((item) => (
                <Grid key={item.label} size={{ xs: 3, sm: 2 }}>
                  <IconButton
                    onClick={() => handleChange("icon", item.label)}
                    sx={{
                      width: isMobile ? 44 : 48,
                      height: isMobile ? 44 : 48,
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

            <Grid container spacing={isMobile ? 1 : 1.5}>
              {colorSet.map((clr) => (
                <Grid key={clr} size={{ xs: 3, sm: 2 }}>
                  <Box
                    onClick={() => handleChange("color", clr)}
                    sx={{
                      width: isMobile ? 28 : 32,
                      height: isMobile ? 28 : 32,
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
      <DialogActions
        sx={{
          p: isMobile ? 2 : 3,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 0,
        }}
      >
        <Button
          fullWidth={isMobile}
          sx={{ textTransform: "none" }}
          onClick={onClose}
        >
          Batal
        </Button>

        <Button
          fullWidth={isMobile}
          variant="contained"
          sx={{ borderRadius: 2, px: isMobile ? 0 : 4 }}
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
