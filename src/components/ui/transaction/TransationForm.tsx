"use client";

import {
  Box,
  Button,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Divider,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import PaidIcon from "@mui/icons-material/Paid";
import CategoryIcon from "@mui/icons-material/Category";
import NotesIcon from "@mui/icons-material/Notes";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionByIdQuery,
} from "@/redux/slices/transactionApi";

import { useGetCategoriesQuery } from "@/redux/slices/categoryApi";
import { useGetWalletsQuery } from "@/redux/slices/walletApi";
import PageWrapper from "@/components/layouts/pageWrapper";

/* ======================= OPTIONS ======================= */
const typeOptions = [
  { value: "INCOME", label: "Masuk", icon: <TrendingUpRounded />, color: "success" },
  { value: "EXPENSE", label: "Keluar", icon: <TrendingDownRounded />, color: "error" },
  { value: "TRANSFER", label: "Transfer", icon: <SwapHorizRounded />, color: "primary" },
];

/* ======================= SMART REACTION ======================= */
const getSmartReaction = ({ amount, type }: { amount: number; type: string }) => {
  if (!amount) return null;
  if (type === "EXPENSE") {
    if (amount >= 1_000_000) return "😬 Wah, gede juga pengeluarannya…";
    if (amount >= 300_000) return "🤔 Lumayan nih, masih aman?";
    return "👌 Oke, masih wajar";
  }
  if (type === "INCOME") {
    if (amount >= 5_000_000) return "🎉 Gajian besar nih, mantap!";
    return "💰 Income masuk!";
  }
  if (type === "TRANSFER") return "🔁 Pindah dompet, aman~";
  return null;
};

export default function TransactionFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const isEdit = Boolean(id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const { data: detail } = useGetTransactionByIdQuery(id!, {
    skip: !isEdit,
  });

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: wallets = [] } = useGetWalletsQuery();

  const [error, setError] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    categoryId: "",
    walletId: "",
    toWalletId: "",
    date: "",
    notes: "",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (detail && isEdit) {
      setForm({
        title: detail.title,
        amount: detail.amount.toString(),
        type: detail.type,
        categoryId: detail.categoryId || "",
        walletId: detail.walletId || detail.fromWalletId || "",
        toWalletId: detail.toWalletId || "",
        date: detail.date.split("T")[0],
        notes: detail.note || "",
      });
    }
  }, [detail, isEdit]);

  const handleChange = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const smartReaction = getSmartReaction({
    amount: Number(form.amount),
    type: form.type,
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    setError("");
    if (!form.title || !form.amount || !form.date) {
      return setError("Judul, jumlah, dan tanggal wajib diisi ya 😅");
    }

    const payload: any = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      date: form.date,
      note: form.notes || undefined,
      categoryId: form.type !== "TRANSFER" ? form.categoryId : null,
      walletId: form.type !== "TRANSFER" ? form.walletId : null,
      fromWalletId: form.type === "TRANSFER" ? form.walletId : null,
      toWalletId: form.type === "TRANSFER" ? form.toWalletId : null,
    };

    try {
      isEdit
        ? await updateTransaction({ id, ...payload }).unwrap()
        : await createTransaction(payload).unwrap();
      router.push("/transactions");
    } catch (err: any) {
      setError(err.data?.error || "Gagal menyimpan transaksi 😭");
    }
  };

  /* ================= RESET ================= */
  const handleReset = () => {
    if (!isEdit) {
      setForm({
        title: "",
        amount: "",
        type: "EXPENSE",
        categoryId: "",
        walletId: "",
        toWalletId: "",
        date: "",
        notes: "",
      });
    } else if (detail) {
      setForm({
        title: detail.title,
        amount: detail.amount.toString(),
        type: detail.type,
        categoryId: detail.categoryId || "",
        walletId: detail.walletId || detail.fromWalletId || "",
        toWalletId: detail.toWalletId || "",
        date: detail.date.split("T")[0],
        notes: detail.note || "",
      });
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await deleteTransaction(id!).unwrap();
      router.push("/transactions");
    } catch (err: any) {
      setError(err.data?.error || "Gagal menghapus transaksi.");
    }
  };

  return (
    <PageWrapper title={isEdit ? "Edit Transaksi ✏️" : "Tambah Transaksi 💸"}>
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Santai aja, catat seperlunya. Yang penting kejadian uangnya nggak lupa 😄
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: isMobile ? 2 : 4, borderRadius: 4 }}>
        <Stack spacing={isMobile ? 3 : 4}>
          {/* INFO UTAMA */}
          <Box>
            <Typography variant="h6" fontWeight={700} display="flex" gap={1}>
              <PaidIcon fontSize="small" /> Info Utama
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Judul transaksi"
                  fullWidth
                  required
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Jumlah (Rp)"
                  type="number"
                  fullWidth
                  required
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
                {smartReaction && (
                  <Typography variant="caption" color="text.secondary">
                    {smartReaction}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* JENIS TRANSAKSI */}
          <Box>
            <Typography fontWeight={700}>Jenis Transaksi</Typography>

            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              mt={2}
            >
              {typeOptions.map((t) => (
                <Chip
                  key={t.value}
                  icon={t.icon}
                  label={t.label}
                  clickable
                  color={t.color as any}
                  variant={form.type === t.value ? "filled" : "outlined"}
                  onClick={() => handleChange("type", t.value)}
                  sx={{
                    px: 2,
                    py: 2,
                    fontWeight: 600,
                    width: isMobile ? "100%" : "auto",
                    justifyContent: isMobile ? "flex-start" : "center",
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* DETAIL */}
          <Box>
            <Typography variant="h6" fontWeight={700} display="flex" gap={1}>
              <CategoryIcon fontSize="small" /> Detail Transaksi
            </Typography>

            <Grid container spacing={2} mt={1}>
              {form.type !== "TRANSFER" && (
                <>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Kategori"
                      select
                      fullWidth
                      value={form.categoryId}
                      onChange={(e) =>
                        handleChange("categoryId", e.target.value)
                      }
                    >
                      {categories.map((c: any) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Wallet"
                      select
                      fullWidth
                      value={form.walletId}
                      onChange={(e) =>
                        handleChange("walletId", e.target.value)
                      }
                    >
                      {wallets.map((w: any) => (
                        <MenuItem key={w.id} value={w.id}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Tanggal"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* CATATAN */}
          <Box>
            <Typography variant="h6" fontWeight={700} display="flex" gap={1}>
              <NotesIcon fontSize="small" /> Catatan (opsional)
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={isMobile ? 3 : 4}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Catatan tambahan kalau ada…"
            />
          </Box>

          <Divider />

          {/* ACTION */}
          {isMobile ? (
            <Stack spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleSubmit}
              >
                {isEdit ? "Update Transaksi" : "Simpan Transaksi"}
              </Button>

              <Stack direction="row" spacing={1}>
                <Button fullWidth variant="outlined" onClick={handleReset}>
                  Reset
                </Button>

                {isEdit && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Hapus
                  </Button>
                )}
              </Stack>

              <Button
                fullWidth
                variant="text"
                onClick={() => router.push("/transactions")}
              >
                ← Kembali ke daftar
              </Button>
            </Stack>
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="text"
                onClick={() => router.push("/transactions")}
              >
                ← Kembali
              </Button>

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>

                {isEdit && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Hapus
                  </Button>
                )}

                <Button variant="contained" onClick={handleSubmit}>
                  {isEdit ? "Update" : "Simpan"}
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* DELETE DIALOG */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} fullWidth>
        <DialogTitle>Yakin mau hapus?</DialogTitle>
        <DialogContent>
          <Typography>
            Sekali dihapus, transaksi ini nggak bisa balik lagi 😬
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Batal</Button>
          <Button color="error" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
