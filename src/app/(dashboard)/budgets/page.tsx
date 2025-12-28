"use client";

import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { useState } from "react";

import PageWrapper from "@/components/layouts/pageWrapper";
import {
  useGetBudgetStatusQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} from "@/redux/slices/budgetApi";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApi";
import MotionCard from "@/components/motions/MotionCard";

/* ======================= STATUS META ======================= */
const statusMeta: Record<string, any> = {
  SAFE: {
    label: "Aman",
    color: "#2E7D32",
    bg: "#E8F5E9",
    icon: <CheckCircleRoundedIcon fontSize="small" />,
  },
  WARNING: {
    label: "Perlu Diperhatikan",
    color: "#EF6C00",
    bg: "#FFF3E0",
    icon: <WarningAmberRoundedIcon fontSize="small" />,
  },
  CRITICAL: {
    label: "Mendekati Batas",
    color: "#C62828",
    bg: "#FDECEA",
    icon: <WhatshotRoundedIcon fontSize="small" />,
  },
};

export default function BudgetPage() {
  const { data: budgets = [], isLoading } =
    useGetBudgetStatusQuery();
  const { data: categories = [] } =
    useGetCategoriesQuery();

  const [createBudget] = useCreateBudgetMutation();
  const [updateBudget] = useUpdateBudgetMutation();
  const [deleteBudget] = useDeleteBudgetMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    categoryId: "",
    limit: "",
  });

  /* ================= OPEN CREATE ================= */
  const handleOpenCreate = () => {
    setEditing(null);
    setForm({ categoryId: "", limit: "" });
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const handleOpenEdit = (b: any) => {
    setEditing(b);
    setForm({
      categoryId: b.categoryId,
      limit: String(b.limit),
    });
    setOpen(true);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.categoryId || !form.limit) return;

    if (editing) {
      await updateBudget({
        id: editing.id,
        limit: Number(form.limit),
      });
    } else {
      await createBudget({
        categoryId: form.categoryId,
        limit: Number(form.limit),
        period: "MONTHLY",
      });
    }

    setOpen(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!editing) return;
    await deleteBudget(editing.id);
    setOpen(false);
  };

  return (
    <PageWrapper
      title="Anggaran"
      actions={{
        label: "Tambah Anggaran",
        icon: <AddRoundedIcon />,
        onClick: handleOpenCreate,
      }}
    >
      {/* ================= INFO ================= */}
      <Card
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InsightsRoundedIcon />
        </Box>

        <Box>
          <Typography fontWeight={700}>
            Kontrol Pengeluaran
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Pantau penggunaan anggaran per kategori
          </Typography>
        </Box>
      </Card>

      {/* ================= BUDGET LIST ================= */}
      <Grid container spacing={3}>
        {isLoading && (
          <Typography color="text.secondary">
            Memuat data…
          </Typography>
        )}

        {budgets.map((b: any) => {
          const meta = statusMeta[b.status];
          const percent = Math.min(b.percent, 100);

          return (
            <Grid key={b.id} size={{ xs: 12, md: 6 }}>
              <MotionCard sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  {/* HEADER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={700}>
                      {b.category}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems={'center'} gap={2}>
                      <Chip
                        icon={meta.icon}
                        label={meta.label}
                        size="small"
                        sx={{
                          bgcolor: meta.bg,
                          color: meta.color,
                          fontWeight: 600,
                        }}
                      />

                      <IconButton
                        size="small"
                        className="edit-action"
                        onClick={() => handleOpenEdit(b)}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          "&:hover": {
                            bgcolor: "background.default",
                          },
                        }}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>

                    </Stack>
                  </Stack>

                  {/* PROGRESS */}
                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: meta.color,
                      },
                    }}
                  />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography variant="caption">
                      Terpakai: Rp{" "}
                      {b.used.toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="caption">
                      Sisa: Rp{" "}
                      {b.remaining.toLocaleString("id-ID")}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Batas: Rp{" "}
                    {b.limit.toLocaleString("id-ID")}
                  </Typography>
                </Stack>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {/* ================= DIALOG ================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontWeight={800}>
              {editing
                ? "Edit Anggaran"
                : "Tambah Anggaran"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Atur batas pengeluaran kategori
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* CONTENT */}
        <DialogContent sx={{ px: 3, py: 3 }}>
          <Stack spacing={3}>
            {!editing && (
              <TextField
                select
                label="Kategori"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: e.target.value,
                  })
                }
              >
                {categories
                  .filter(
                    (c: any) => c.type === "EXPENSE"
                  )
                  .map((c: any) => (
                    <MenuItem
                      key={c.id}
                      value={c.id}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}

            <TextField
              label="Batas Anggaran (Rp)"
              type="number"
              value={form.limit}
              onChange={(e) =>
                setForm({
                  ...form,
                  limit: e.target.value,
                })
              }
            />
          </Stack>
        </DialogContent>

        {/* ACTION */}
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            justifyContent: "space-between",
          }}
        >
          {editing ? (
            <Button
              color="error"
              startIcon={
                <DeleteOutlineRoundedIcon />
              }
              onClick={handleDelete}
            >
              Hapus
            </Button>
          ) : (
            <Box />
          )}

          <Stack direction="row" spacing={2}>
            <Button onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Simpan
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
