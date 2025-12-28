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
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

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

/* ================= UTIL ================= */
const todayISO = () => new Date().toISOString().split("T")[0];

const typeOptions = [
  {
    value: "EXPENSE",
    label: "Pengeluaran",
    desc: "Uang keluar dari dompet",
    icon: <TrendingDownRoundedIcon />,
    bg: "#FDECEA",
    color: "#C62828",
  },
  {
    value: "INCOME",
    label: "Pemasukan",
    desc: "Uang masuk ke dompet",
    icon: <TrendingUpRoundedIcon />,
    bg: "#E8F5E9",
    color: "#2E7D32",
  },
  {
    value: "TRANSFER",
    label: "Transfer",
    desc: "Pindah antar dompet",
    icon: <SwapHorizRoundedIcon />,
    bg: "#E3F2FD",
    color: "#1565C0",
  },
];

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
    date: todayISO(),
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    setError("");
    if (!form.amount || !form.date) {
      return setError("Jumlah dan tanggal wajib diisi.");
    }

    const payload: any = {
      title: form.title || "Transaksi",
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
      router.push("/transaction");
    } catch (err: any) {
      setError(err.data?.error || "Gagal menyimpan transaksi.");
    }
  };

  const handleDelete = async () => {
    await deleteTransaction(id!).unwrap();
    router.push("/transaction");
  };

  return (
    <PageWrapper title={isEdit ? "Edit Transaksi" : "Tambah Transaksi"}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* ================= BASIC INFO ================= */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography fontWeight={700}>
              Informasi Utama
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tentukan judul, jumlah, dan tanggal transaksi
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Judul"
                  placeholder="Contoh: Makan siang"
                  fullWidth
                  value={form.title}
                  onChange={(e) =>
                    handleChange("title", e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="Jumlah (Rp)"
                  type="number"
                  placeholder="0"
                  fullWidth
                  value={form.amount}
                  onChange={(e) =>
                    handleChange("amount", e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  type="date"
                  label="Tanggal"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={form.date}
                  onChange={(e) =>
                    handleChange("date", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </Paper>

        {/* ================= TYPE ================= */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography fontWeight={700}>
              Jenis Transaksi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pilih jenis transaksi sesuai kejadian
            </Typography>

            <Grid container spacing={2}>
              {typeOptions.map((t) => (
                <Grid size={{ xs: 12, md: 4 }} key={t.value}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor:
                        form.type === t.value
                          ? t.color
                          : "divider",
                      bgcolor:
                        form.type === t.value
                          ? t.bg
                          : "transparent",
                    }}
                  >
                    <CardActionArea
                      onClick={() =>
                        handleChange("type", t.value)
                      }
                      sx={{ p: 2 }}
                    >
                      <Stack spacing={1}>
                        <Box
                          sx={{
                            color: t.color,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {t.icon}
                          <Typography fontWeight={700}>
                            {t.label}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {t.desc}
                        </Typography>
                      </Stack>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>

        {/* ================= FINANCIAL DETAILS ================= */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography fontWeight={700}>
              Detail Keuangan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kategori dan dompet yang terlibat
            </Typography>

            <Grid container spacing={2}>
              {form.type !== "TRANSFER" && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      label="Kategori"
                      fullWidth
                      value={form.categoryId}
                      onChange={(e) =>
                        handleChange(
                          "categoryId",
                          e.target.value
                        )
                      }
                    >
                      {categories.map((c: any) => (
                        <MenuItem
                          key={c.id}
                          value={c.id}
                        >
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      label="Dompet"
                      fullWidth
                      value={form.walletId}
                      onChange={(e) =>
                        handleChange(
                          "walletId",
                          e.target.value
                        )
                      }
                    >
                      {wallets.map((w: any) => (
                        <MenuItem
                          key={w.id}
                          value={w.id}
                        >
                          {w.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
            </Grid>
          </Stack>
        </Paper>

        {/* ================= NOTES ================= */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography fontWeight={700}>
              Catatan Tambahan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Opsional, untuk informasi tambahan
            </Typography>

            <TextField
              multiline
              minRows={3}
              placeholder="Tambahkan catatan jika perlu…"
              value={form.notes}
              onChange={(e) =>
                handleChange("notes", e.target.value)
              }
            />
          </Stack>
        </Paper>

        {/* ================= ACTION ================= */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="text"
            onClick={() => router.push("/transaction")}
          >
            ← Kembali
          </Button>

          <Stack direction="row" spacing={2}>
            {isEdit && (
              <Button
                color="error"
                variant="outlined"
                onClick={() => setDeleteOpen(true)}
              >
                Hapus
              </Button>
            )}
            <Button variant="contained" onClick={handleSubmit}>
              {isEdit ? "Simpan Perubahan" : "Simpan Transaksi"}
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Hapus Transaksi?</DialogTitle>
        <DialogContent>
          <Typography>
            Transaksi ini akan dihapus permanen.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>
            Batal
          </Button>
          <Button color="error" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
