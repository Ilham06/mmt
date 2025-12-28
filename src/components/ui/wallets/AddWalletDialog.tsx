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
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

import { useState, useEffect } from "react";
import {
  useCreateWalletMutation,
  useUpdateWalletMutation,
} from "@/redux/slices/walletApi";

/* ================= WALLET TYPES ================= */
const typeOptions = [
  {
    value: "CASH",
    label: "Tunai",
    desc: "Untuk transaksi harian",
    icon: <WalletIcon />,
    color: "#1565C0",
  },
  {
    value: "BANK",
    label: "Rekening Bank",
    desc: "Penyimpanan utama",
    icon: <AccountBalanceRoundedIcon />,
    color: "#2E7D32",
  },
  {
    value: "EWALLET",
    label: "Dompet Digital",
    desc: "Pembayaran cepat & praktis",
    icon: <AccountBalanceWalletRoundedIcon />,
    color: "#F9A825",
  },
  {
    value: "CREDIT",
    label: "Kartu Kredit",
    desc: "Perlu pengelolaan ekstra",
    icon: <CreditCardRoundedIcon />,
    color: "#C62828",
  },
];

export default function AddWalletDialog({
  open,
  onClose,
  editData,
}: any) {
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

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        type: editData.type,
        balance: editData.balance,
        notes: editData.notes ?? "",
      });
    } else {
      setForm({
        name: "",
        type: "",
        balance: "",
        notes: "",
      });
    }
  }, [editData]);

  const handleChange = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedType = typeOptions.find(
    (t) => t.value === form.type
  );

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
      fullScreen={isMobile}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          overflow: "hidden",
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontWeight={800}>
            {isEdit ? "Edit Dompet" : "Tambah Dompet"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Atur sumber dana untuk pengelolaan keuangan
          </Typography>
        </Box>

        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      {/* ================= CONTENT ================= */}
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={3}>
          {/* NAME */}
          <TextField
            label="Nama Dompet"
            placeholder="Contoh: BCA, Cash, OVO"
            fullWidth
            required
            value={form.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
          />

          {/* TYPE */}
          <Box>
            <Typography
              fontWeight={700}
              mb={1}
            >
              Tipe Dompet
            </Typography>

            <Grid container spacing={2}>
              {typeOptions.map((t) => {
                const active = form.type === t.value;

                return (
                  <Grid
                    key={t.value}
                    size={{ xs: 12, sm: 6 }}
                  >
                    <Box
                      onClick={() =>
                        handleChange("type", t.value)
                      }
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: active
                          ? t.color
                          : "divider",
                        bgcolor: active
                          ? t.color + "0F"
                          : "transparent",
                        transition: "all .2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        "&:hover": {
                          borderColor: t.color,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: t.color,
                          color: "#fff",
                        }}
                      >
                        {t.icon}
                      </Avatar>

                      <Box>
                        <Typography
                          fontWeight={600}
                        >
                          {t.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {t.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* BALANCE */}
          <TextField
            label="Saldo Awal (Rp)"
            type="number"
            fullWidth
            value={form.balance}
            onChange={(e) =>
              handleChange("balance", e.target.value)
            }
            helperText="Isi 0 jika tidak ada saldo awal"
          />

          {/* NOTES */}
          <TextField
            label="Catatan (Opsional)"
            fullWidth
            multiline
            minRows={isMobile ? 3 : 4}
            value={form.notes}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
          />

          {/* PREVIEW */}
          {selectedType && form.name && (
            <Chip
              label={`${selectedType.label} • ${form.name}`}
              sx={{
                width: "fit-content",
                bgcolor: selectedType.color + "14",
                color: selectedType.color,
                fontWeight: 600,
              }}
            />
          )}
        </Stack>
      </DialogContent>

      <Divider />

      {/* ================= ACTION ================= */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 0,
        }}
      >
        <Button
          fullWidth={isMobile}
          onClick={onClose}
        >
          Batal
        </Button>

        <Button
          fullWidth={isMobile}
          variant="contained"
          disabled={!form.name || !form.type}
          onClick={handleSubmit}
        >
          {isEdit ? "Simpan Perubahan" : "Simpan Dompet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
