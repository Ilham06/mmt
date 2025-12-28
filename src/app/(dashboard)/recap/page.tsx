"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentNeutralRoundedIcon from "@mui/icons-material/SentimentNeutralRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

/* ================= MOOD META ================= */
const moodMeta: any = {
  GOOD: {
    label: "Kondisi Baik",
    color: "success",
    icon: <SentimentSatisfiedRoundedIcon />,
    text:
      "Pengelolaan keuangan kamu hari ini berjalan dengan baik. Tetap pertahankan kebiasaan ini.",
  },
  OK: {
    label: "Cukup Terkendali",
    color: "warning",
    icon: <SentimentNeutralRoundedIcon />,
    text:
      "Masih dalam batas wajar, namun ada ruang untuk pengelolaan yang lebih optimal.",
  },
  BAD: {
    label: "Perlu Evaluasi",
    color: "error",
    icon: <SentimentVeryDissatisfiedRoundedIcon />,
    text:
      "Pengeluaran hari ini cukup tinggi. Luangkan waktu untuk mengevaluasi kembali.",
  },
};

export default function DailyRecapPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/recap/daily")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const mood = moodMeta[data.mood];

  return (
    <PageWrapper title="Ringkasan Harian">
      {/* ================= HEADER SUMMARY ================= */}
      <Card
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.default",
        }}
      >
        <Stack spacing={2}>
          <Typography
            fontWeight={800}
            fontSize={22}
          >
            {new Date(data.date).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Chip
              icon={mood.icon}
              label={mood.label}
              color={mood.color}
              sx={{ fontWeight: 700 }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {mood.text}
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* ================= FINANCIAL SUMMARY ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Total Pemasukan
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              mt={0.5}
            >
              Rp {data.income.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Total Pengeluaran
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              mt={0.5}
              color="error.main"
            >
              Rp {data.expense.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* ================= INSIGHT ================= */}
      {data.topCategory && (
        <Card sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography fontWeight={700} mb={0.5}>
            Insight Hari Ini
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pengeluaran paling dominan hari ini berasal dari kategori{" "}
            <b>
              {data.topCategory.icon} {data.topCategory.name}
            </b>
            .
          </Typography>
        </Card>
      )}

      {/* ================= TRANSACTIONS ================= */}
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Aktivitas Hari Ini
        </Typography>

        {data.transactions.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Tidak ada transaksi yang tercatat hari ini.
          </Typography>
        ) : (
          <List disablePadding>
            {data.transactions.map((trx: any) => (
              <ListItem
                key={trx.id}
                divider
                sx={{ px: 0 }}
              >
                <ListItemText
                  primary={
                    <Typography fontWeight={600}>
                      {trx.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {trx.category?.name ?? "-"} •{" "}
                      {trx.type === "EXPENSE" ? "Pengeluaran" : "Pemasukan"} • Rp{" "}
                      {trx.amount.toLocaleString("id-ID")}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </PageWrapper>
  );
}
