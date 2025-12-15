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
} from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

// ======================= MOCK BUDGET DATA =======================
const budgets = [
  {
    id: 1,
    category: "Makan",
    icon: "🍔",
    limit: 1000000,
    used: 450000,
  },
  {
    id: 2,
    category: "Transport",
    icon: "🚕",
    limit: 500000,
    used: 420000,
  },
  {
    id: 3,
    category: "Hiburan",
    icon: "🎮",
    limit: 300000,
    used: 290000,
  },
  {
    id: 4,
    category: "Belanja",
    icon: "🛍️",
    limit: 400000,
    used: 410000,
  },
];

const getStatus = (used: number, limit: number) => {
  const pct = (used / limit) * 100;
  if (pct < 60) return "SAFE";
  if (pct < 90) return "WARNING";
  return "CRITICAL";
};

const statusMeta: any = {
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
  return (
    <PageWrapper
      title="❤️ Survival Mode"
      // subtitle="Jaga HP keuangan kamu biar nggak tumbang"
    >
      {/* NPC MESSAGE */}
      <Card
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#F4F6FF",
        }}
      >
        <Typography fontWeight={600}>🧠 DompetBot:</Typography>
        <Typography variant="body2" color="text.secondary">
          “Pelan-pelan aja. Yang penting HP kamu nggak habis 🔥”
        </Typography>
      </Card>

      <Grid container spacing={3}>
        {budgets.map((b) => {
          const status = getStatus(b.used, b.limit);
          const meta = statusMeta[status];
          const percent = Math.min((b.used / b.limit) * 100, 100);
          const remaining = Math.max(b.limit - b.used, 0);

          return (
            <Grid key={b.id} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Stack spacing={2}>
                  {/* HEADER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontSize={28}>{b.icon}</Typography>
                      <Typography fontWeight={700}>
                        {b.category}
                      </Typography>
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
                            status === "SAFE"
                              ? "#4CAF50"
                              : status === "WARNING"
                              ? "#FF9800"
                              : "#F44336",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mt={0.5}
                    >
                      HP tersisa: Rp{" "}
                      {remaining.toLocaleString("id-ID")}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* DETAIL */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2">
                      Damage: Rp{" "}
                      {b.used.toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="body2">
                      Max HP: Rp{" "}
                      {b.limit.toLocaleString("id-ID")}
                    </Typography>
                  </Stack>

                  {/* STATUS TEXT */}
                  {status === "CRITICAL" && (
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
    </PageWrapper>
  );
}
