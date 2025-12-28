"use client";

import {
  Card,
  Typography,
  Stack,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import { useGetTransactionsQuery } from "@/redux/slices/transactionApi";

export default function RecentTransactionList() {
  const { data, isLoading } = useGetTransactionsQuery({
    limit: 5,
  });

  const rows = data ?? [];

  return (
    <Card sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        {/* ================= HEADER ================= */}
        <Typography fontWeight={800}>
          Aktivitas Terakhir
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Catatan transaksi terbaru kamu
        </Typography>

        <Divider />

        {/* ================= CONTENT ================= */}
        {isLoading ? (
          <Stack spacing={2}>
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={56}
                sx={{ borderRadius: 3 }}
              />
            ))}
          </Stack>
        ) : rows.length === 0 ? (
          <Box py={2}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Belum ada transaksi hari ini. Santai dulu ya ☕
            </Typography>
          </Box>
        ) : (
          <Stack spacing={1}>
            {rows.map((row: any, idx: number) => {
              const isExpense = row.type === "EXPENSE";

              return (
                <Box key={row.id}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    {/* ICON */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 3,
                        bgcolor: isExpense
                          ? "error.light"
                          : "success.light",
                        color: '#FFF',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isExpense ? (
                        <TrendingDownRoundedIcon />
                      ) : (
                        <TrendingUpRoundedIcon />
                      )}
                    </Box>

                    {/* INFO */}
                    <Box flex={1}>
                      <Typography fontWeight={600}>
                        {row.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {row.category?.name} •{" "}
                        {row.wallet?.name}
                      </Typography>
                    </Box>

                    {/* AMOUNT */}
                    <Box textAlign="right">
                      <Typography
                        fontWeight={700}
                        color={
                          isExpense
                            ? "error.main"
                            : "success.main"
                        }
                      >
                        {isExpense ? "-" : "+"} Rp{" "}
                        {Math.abs(
                          row.amount
                        ).toLocaleString("id-ID")}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(
                          row.date
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* DIVIDER */}
                  {idx !== rows.length - 1 && (
                    <Divider sx={{ my: 1.5 }} />
                  )}
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
