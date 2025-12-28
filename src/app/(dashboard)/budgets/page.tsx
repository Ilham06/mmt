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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";

import PageWrapper from "@/components/layouts/pageWrapper";
import { useGetBudgetStatusQuery, useCreateBudgetMutation } from "@/redux/slices/budgetApi";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApi";

// ======================= STATUS META =======================
const statusMeta: Record<string, any> = {
  SAFE: {
    label: "Safe",
    color: "success",
    icon: <CheckCircleRoundedIcon />,
  },
  WARNING: {
    label: "Warning",
    color: "warning",
    icon: <WarningAmberRoundedIcon />,
  },
  CRITICAL: {
    label: "Critical",
    color: "error",
    icon: <WhatshotRoundedIcon />,
  },
};

export default function BudgetSurvivalPage() {
  const { data: budgets = [], isLoading } = useGetBudgetStatusQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createBudget] = useCreateBudgetMutation();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    categoryId: "",
    limit: "",
  });

  const handleSubmit = async () => {
    if (!form.categoryId || !form.limit) return;

    await createBudget({
      categoryId: form.categoryId,
      limit: Number(form.limit),
      period: "MONTHLY",
    });

    setForm({ categoryId: "", limit: "" });
    setOpen(false);
  };

  return (
    <PageWrapper title="❤️ Survival Mode" actions={{ 
      label: 'Tambah Budget',
      icon: <AddRoundedIcon/>,
      onClick: () => setOpen(true)
     }}>
      {/* NPC MESSAGE */}
      <Card sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: "#F4F6FF" }}>
        <Typography fontWeight={600}>🧠 DompetBot:</Typography>
        <Typography variant="body2" color="text.secondary">
          “Pelan-pelan aja. Yang penting HP kamu nggak habis 🔥”
        </Typography>
      </Card>

      {/* BUDGET LIST */}
      <Grid container spacing={3}>
        {isLoading && (
          <Typography color="text.secondary">Loading budget...</Typography>
        )}

        {budgets.map((b: any) => {
          const meta = statusMeta[b.status];
          const percent = Math.min(b.percent, 100);

          return (
            <Grid key={b.id} size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  {/* HEADER */}
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <Typography fontSize={26}>{b.icon}</Typography> */}
                      <Typography fontWeight={700}>{b.category}</Typography>
                    </Stack>

                    <Chip
                      icon={meta.icon}
                      label={meta.label}
                      color={meta.color}
                      size="small"
                    />
                  </Stack>

                  {/* HP BAR */}
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={100 - percent}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        bgcolor: "#eee",
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            b.status === "SAFE"
                              ? "#4CAF50"
                              : b.status === "WARNING"
                              ? "#FF9800"
                              : "#F44336",
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      HP tersisa: Rp {b.remaining.toLocaleString("id-ID")}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* DETAIL */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">
                      Damage: Rp {b.used.toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="body2">
                      Max HP: Rp {b.limit.toLocaleString("id-ID")}
                    </Typography>
                  </Stack>

                  {b.status === "CRITICAL" && (
                    <Typography
                      variant="body2"
                      color="error.main"
                      fontWeight={600}
                    >
                      ⚠️ HP kritis! Hindari expense di kategori ini
                    </Typography>
                  )}
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ================= MODAL ADD BUDGET ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>🎯 Set Budget Baru</DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <TextField
              select
              label="Kategori"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
            >
              {categories
                .filter((c: any) => c.type === "EXPENSE")
                .map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
            </TextField>

            <TextField
              label="Limit Budget (Rp)"
              type="number"
              value={form.limit}
              onChange={(e) =>
                setForm({ ...form, limit: e.target.value })
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}
