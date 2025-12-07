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
} from "@mui/material";

import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

import { useState, useEffect } from "react";
import { useCreateWalletMutation, useUpdateWalletMutation } from "@/redux/slices/walletApi";

// MATCH Prisma ENUMS
const typeOptions = [
  { value: "CASH", label: "Cash", icon: <WalletIcon />, color: "#1976d2" },
  { value: "BANK", label: "Bank Account", icon: <AccountBalanceRoundedIcon />, color: "#2e7d32" },
  { value: "EWALLET", label: "e-Wallet", icon: <AccountBalanceWalletRoundedIcon />, color: "#f9a825" },
  { value: "CREDIT", label: "Credit Card", icon: <CreditCardRoundedIcon />, color: "#c62828" },
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

  // Prefill data ketika edit
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
    if (editData) {
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
        sx: { borderRadius: 4, p: 0, overflow: "hidden" },
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          {editData ? "Edit Wallet" : "Tambah Wallet Baru"}
        </Typography>
        <Typography color="text.secondary">
          Kelola akun atau dompet keuangan Anda
        </Typography>
      </Box>

      <Divider />

      {/* CONTENT */}
      <DialogContent sx={{ py: 4, px: 4 }}>
        <Stack spacing={3}>
          {/* NAME */}
          <TextField
            label="Nama Wallet"
            fullWidth
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* TYPE SELECTOR */}
          <Box>
            <Typography mb={1} fontWeight={600}>
              Pilih Tipe Wallet
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
                    <Typography fontWeight={600}>{t.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* BALANCE */}
          <TextField
            label="Saldo Awal"
            type="number"
            fullWidth
            value={form.balance}
            onChange={(e) => handleChange("balance", e.target.value)}
          />

          {/* NOTES */}
          <TextField
            label="Catatan (Opsional)"
            fullWidth
            multiline
            minRows={3}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </Stack>
      </DialogContent>

      <Divider />

      {/* ACTIONS */}
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
          {editData ? "Simpan Perubahan" : "Simpan Wallet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
