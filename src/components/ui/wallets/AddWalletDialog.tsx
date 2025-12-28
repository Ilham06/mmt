"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Grid,
  Stack,
  Typography,
  Box,
  Avatar,
  Divider,
  Fade,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

import { useState, useEffect } from "react";
import {
  useCreateWalletMutation,
  useUpdateWalletMutation,
} from "@/redux/slices/walletApi";

/* ================= STORAGE TYPES ================= */
const typeOptions = [
  {
    value: "CASH",
    label: "💼 Inventory",
    desc: "Akses cepat untuk transaksi harian",
    icon: <WalletIcon />,
    color: "#1976d2",
  },
  {
    value: "BANK",
    label: "🏦 Vault",
    desc: "Penyimpanan aman & stabil",
    icon: <AccountBalanceRoundedIcon />,
    color: "#2e7d32",
  },
  {
    value: "EWALLET",
    label: "⚡ Fast Access",
    desc: "Cepat & fleksibel",
    icon: <AccountBalanceWalletRoundedIcon />,
    color: "#f9a825",
  },
  {
    value: "CREDIT",
    label: "☠️ Debt Zone",
    desc: "Zona berbahaya, gunakan dengan bijak",
    icon: <CreditCardRoundedIcon />,
    color: "#c62828",
  },
];

export default function AddWalletDialog({ open, onClose, editData }: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: "",
    notes: "",
  });

  const [createWallet] = useCreateWalletMutation();
  const [updateWallet] = useUpdateWalletMutation();

  const isEdit = Boolean(editData);

  /* PREFILL */
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        type: editData.type,
        balance: editData.balance,
        notes: editData.notes ?? "",
      });
    } else {
      setForm({ name: "", type: "", balance: "", notes: "" });
    }
  }, [editData]);

  const handleChange = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedType = typeOptions.find((t) => t.value === form.type);

  const handleSubmit = async () => {
    if (isEdit) {
      await updateWallet({ id: editData.id, ...form });
    } else {
      await createWallet(form);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile} // ✅ mobile only
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          overflow: "hidden",
        },
      }}
    >
      {/* ===== HEADER (DESKTOP TETAP) ===== */}
      <Box sx={{ p: isMobile ? 2 : 3 }}>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
          {isEdit ? "✨ Upgrade Storage" : "💰 Bangun Storage Baru"}
        </Typography>
        <Typography color="text.secondary">
          Atur tempat penyimpanan resource kamu
        </Typography>
      </Box>

      <Divider />

      {/* ===== CONTENT ===== */}
      <DialogContent sx={{ py: isMobile ? 2 : 4, px: isMobile ? 2 : 4 }}>
        <Stack spacing={3}>
          {/* STORAGE NAME */}
          <TextField
            label="Nama Storage"
            fullWidth
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* STORAGE TYPE (STRUKTUR SAMA, RESPONSIVE GRID) */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Pilih Tipe Storage
            </Typography>

            <Grid container spacing={2}>
              {typeOptions.map((t) => (
                <Grid
                  key={t.value}
                  size={{ xs: 12, sm: 6 }} // ✅ mobile 1 kolom, desktop 2 kolom
                >
                  <Box
                    onClick={() => handleChange("type", t.value)}
                    sx={{
                      borderRadius: 3,
                      p: 2,
                      cursor: "pointer",
                      border:
                        form.type === t.value
                          ? `2px solid ${t.color}`
                          : "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      "&:hover": {
                        border:
                          form.type === t.value
                            ? `2px solid ${t.color}`
                            : `1px solid ${t.color}`,
                      },
                    }}
                  >
                    <Avatar sx={{ bgcolor: t.color, color: "white" }}>
                      {t.icon}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600}>{t.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* BALANCE */}
          <TextField
            label="Resource Awal (Rp)"
            type="number"
            fullWidth
            value={form.balance}
            onChange={(e) => handleChange("balance", e.target.value)}
          />

          {/* NOTES */}
          <TextField
            label="Catatan Tambahan (Opsional)"
            fullWidth
            multiline
            minRows={isMobile ? 3 : 4}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          {/* PREVIEW */}
          {selectedType && form.name && (
            <Chip
              label={`${selectedType.label} • ${form.name}`}
              sx={{
                bgcolor: selectedType.color + "22",
                color: selectedType.color,
                fontWeight: 600,
              }}
            />
          )}
        </Stack>
      </DialogContent>

      <Divider />

      {/* ===== ACTION ===== */}
      <DialogActions
        sx={{
          p: isMobile ? 2 : 3,
          flexDirection: isMobile ? "column" : "row", // ✅ mobile only
          gap: isMobile ? 1 : 0,
        }}
      >
        <Button
          fullWidth={isMobile}
          onClick={onClose}
          sx={{ fontWeight: 600 }}
        >
          Batal
        </Button>

        <Button
          fullWidth={isMobile}
          variant="contained"
          onClick={handleSubmit}
          disabled={!form.name || !form.type}
          sx={{ fontWeight: 700 }}
        >
          {isEdit ? "Upgrade Storage 🚀" : "Bangun Storage 🎮"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
