"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";

export default function CategoryPieChart() {
  // MOCK — nanti bisa dari API
  const data = [
    { label: "Makan", value: 40, color: "#FF7043" },
    { label: "Transport", value: 20, color: "#42A5F5" },
    { label: "Belanja", value: 25, color: "#AB47BC" },
    { label: "Tagihan", value: 15, color: "#26A69A" },
  ];

  const top = [...data].sort((a, b) => b.value - a.value)[0];

  return (
    <Card sx={{ p: 3, borderRadius: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={2}>
          {/* ================= TITLE ================= */}
          <Typography fontWeight={800}>
            Pengeluaran Terbesar
          </Typography>

          {/* ================= SUBTITLE ================= */}
          <Typography variant="body2" color="text.secondary">
            Kategori yang paling sering kamu gunakan
          </Typography>

          {/* ================= HIGHLIGHT ================= */}
          <Chip
            label={`${top.label} • ${top.value}%`}
            sx={{
              bgcolor: top.color + "22",
              color: top.color,
              fontWeight: 700,
              width: "fit-content",
            }}
          />

          {/* ================= CHART ================= */}
          <PieChart
            series={[
              {
                data: data.map((d) => ({
                  label: d.label,
                  value: d.value,
                  color: d.color,
                })),
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 4,
              },
            ]}
            height={260}
          />

          {/* ================= INSIGHT ================= */}
          <Typography variant="caption" color="text.secondary">
            Kalau mau lebih hemat, kamu bisa mulai dari kategori ini 🙂
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
