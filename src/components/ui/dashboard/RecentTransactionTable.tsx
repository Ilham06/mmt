"use client";

import { MainTable } from "@/components/common/MainTable";
import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
} from "@mui/material";
import { useGetTransactionsQuery } from "@/redux/slices/transactionApi";

export default function RecentTransactionTable() {
  const { data, isLoading } = useGetTransactionsQuery({
    limit: 5,
  });

  const rows = data ?? [];

  return (
    <MainTable header={["Waktu", "Aksi", "Impact"]}>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={3}>Loading…</TableCell>
          </TableRow>
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>
              Belum ada aksi hari ini 👀
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row: any) => (
            <TableRow key={row.id} hover>
              {/* DATE */}
              <TableCell>
                <Typography variant="body2">
                  {new Date(row.date).toLocaleDateString("id-ID")}
                </Typography>
              </TableCell>

              {/* ACTION */}
              <TableCell>
                <Stack>
                  <Typography fontWeight={600}>
                    {row.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {row.category?.name} • {row.wallet?.name}
                  </Typography>
                </Stack>
              </TableCell>

              {/* IMPACT */}
              <TableCell align="right">
                <Typography
                  fontWeight={700}
                  color={
                    row.type === "EXPENSE"
                      ? "error.main"
                      : "success.main"
                  }
                >
                  {row.type === "EXPENSE" ? "💥 -" : "💚 +"} Rp{" "}
                  {Math.abs(row.amount).toLocaleString("id-ID")}
                </Typography>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </MainTable>
  );
}
