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
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentNeutralRoundedIcon from "@mui/icons-material/SentimentNeutralRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";

import PageWrapper from "@/components/layouts/pageWrapper";

const moodMeta: any = {
  GOOD: {
    label: "Great Day!",
    color: "success",
    icon: <SentimentSatisfiedRoundedIcon />,
    text: "Keuangan kamu aman hari ini. Nice control 👏",
  },
  OK: {
    label: "Not Bad",
    color: "warning",
    icon: <SentimentNeutralRoundedIcon />,
    text: "Masih oke, tapi ada ruang buat lebih hemat.",
  },
  BAD: {
    label: "Rough Day",
    color: "error",
    icon: <SentimentVeryDissatisfiedRoundedIcon />,
    text: "Hari yang berat. Besok bisa lebih baik 💪",
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
    <PageWrapper title="📅 Daily Recap">
      {/* HERO */}
      <Card sx={{ p: 4, mb: 4, borderRadius: 4, textAlign: "center", bgcolor: "#F4F6FF" }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h5" fontWeight={800}>
            {new Date(data.date).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>

          <Chip
            icon={mood.icon}
            label={mood.label}
            color={mood.color}
            sx={{ fontWeight: 700 }}
          />

          <Typography variant="body2" color="text.secondary" maxWidth={360}>
            {mood.text}
          </Typography>
        </Stack>
      </Card>

      {/* SUMMARY */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
              💚 Heal (Income)
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              Rp {data.income.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
              💥 Damage (Expense)
            </Typography>
            <Typography variant="h6" fontWeight={700} color="error.main">
              Rp {data.expense.toLocaleString("id-ID")}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* INSIGHT */}
      {data.topCategory && (
        <Card sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography fontWeight={700}>📊 Insight Hari Ini</Typography>
          <Typography variant="body2" color="text.secondary">
            Kategori paling sering kamu serang hari ini adalah{" "}
            <b>
              {data.topCategory.icon} {data.topCategory.name}
            </b>
          </Typography>
        </Card>
      )}

      {/* TRANSACTIONS LIST */}
      <Card sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography fontWeight={700} mb={2}>
          📜 Aktivitas Hari Ini
        </Typography>

        {data.transactions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Belum ada transaksi hari ini.
          </Typography>
        ) : (
          <List disablePadding>
            {data.transactions.map((trx: any) => (
              <ListItem key={trx.id} divider>
                <ListItemText
                  primary={
                    <Typography fontWeight={600}>
                      {trx.title}
                    </Typography>
                  }
                  secondary={`${trx.category?.name ?? "-"} • ${
                    trx.type === "EXPENSE" ? "-" : "+"
                  } Rp ${trx.amount.toLocaleString("id-ID")}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </PageWrapper>
  );
}
