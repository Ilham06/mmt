"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

// ======================= STORAGE TYPES =======================
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
  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: "",
    notes: "",
  });

  const [createWallet] = useCreateWalletMutation();
  const [updateWallet] = useUpdateWalletMutation();

  const isEdit = Boolean(editData);

  // ======================= PREFILL =======================
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

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      TransitionComponent={Fade}
      PaperProps={{
        sx: { borderRadius: 4, overflow: "hidden" },
      }}
    >
      {/* ================= HEADER ================= */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          {isEdit ? "✨ Upgrade Storage" : "💰 Bangun Storage Baru"}
        </Typography>
        <Typography color="text.secondary">
          Atur tempat penyimpanan resource kamu
        </Typography>
      </Box>

      <Divider />

      {/* ================= CONTENT ================= */}
      <DialogContent sx={{ py: 4, px: 4 }}>
        <Stack spacing={3}>
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
              “Pisahin storage bikin resource kamu lebih gampang dikontrol 🎯”
            </Typography>
          </Box>

          {/* STORAGE NAME */}
          <TextField
            label="Nama Storage"
            fullWidth
            required
            placeholder="Contoh: Dompet Utama, Gaji, Jajan"
            helperText="Bikin nama yang gampang kamu kenali"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* STORAGE TYPE */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Pilih Tipe Storage
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Setiap storage punya karakter berbeda
            </Typography>

            <Grid container spacing={2}>
              {typeOptions.map((t) => (
                <Grid size={{ xs: 6 }} key={t.value}>
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
                      transition: "0.2s",
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
            helperText="Jumlah resource saat storage ini dibuat"
            value={form.balance}
            onChange={(e) => handleChange("balance", e.target.value)}
          />

          {/* NOTES */}
          <TextField
            label="Catatan Tambahan (Opsional)"
            fullWidth
            multiline
            minRows={3}
            placeholder="Contoh: khusus gaji, jangan dipakai jajan"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          {/* PREVIEW */}
          {selectedType && form.name && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                🔍 Preview Storage
              </Typography>
              <Chip
                label={`${selectedType.label} • ${form.name}`}
                sx={{
                  bgcolor: selectedType.color + "22",
                  color: selectedType.color,
                  fontWeight: 600,
                }}
              />
            </Box>
          )}
        </Stack>
      </DialogContent>

      <Divider />

      {/* ================= ACTION ================= */}
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Batal
        </Button>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 4,
            borderRadius: 2,
          }}
          onClick={handleSubmit}
          disabled={!form.name || !form.type}
        >
          {isEdit ? "Upgrade Storage 🚀" : "Bangun Storage 🎮"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
