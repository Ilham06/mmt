"use client";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Fade,
} from "@mui/material";

import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useState } from "react";

// WALLET TYPES WITH VISUAL STYLE
const typeOptions = [
  { value: "cash", label: "Cash", icon: <WalletIcon />, color: "#1976d2" },
  { value: "bank", label: "Bank Account", icon: <AccountBalanceRoundedIcon />, color: "#2e7d32" },
  { value: "ewallet", label: "e-Wallet", icon: <AccountBalanceWalletRoundedIcon />, color: "#f9a825" },
  { value: "credit", label: "Credit Card", icon: <CreditCardRoundedIcon />, color: "#c62828" },
];

export default function AddWalletDialog({ open, onClose }: any) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const selectedType = typeOptions.find((t) => t.value === form.type);

  const handleSubmit = () => {
    console.log("Wallet saved:", form);
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
        sx: {
          borderRadius: 4,
          p: 0,
          overflow: "hidden",
        },
      }}
    >
      {/* ===================== HEADER ===================== */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >

        <Box>
          <Typography variant="h5" fontWeight={700}>
            Tambah Wallet Baru
          </Typography>
          <Typography>
            Kelola akun atau dompet keuangan Anda
          </Typography>
        </Box>
      </Box>

      <Divider />
      {/* ===================== CONTENT ===================== */}
      <DialogContent sx={{ py: 4, px: 4 }}>
        <Grid container spacing={4}>
          {/* LEFT FORM */}
          <Grid size={{ xs: 12 }}>
            <Stack spacing={3}>
              {/* Wallet Name */}
              <TextField
                label="Nama Wallet"
                fullWidth
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              {/* Wallet Type */}
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

              {/* Balance */}
              <TextField
                label="Saldo Awal"
                type="number"
                fullWidth
                value={form.balance}
                onChange={(e) => handleChange("balance", e.target.value)}
              />

              {/* Notes */}
              <TextField
                label="Catatan (Opsional)"
                fullWidth
                multiline
                minRows={3}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </Stack>
          </Grid>

        </Grid>
      </DialogContent>

      <Divider />

      {/* ===================== ACTIONS ===================== */}
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
          Simpan Wallet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
