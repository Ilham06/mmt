"use client";

import { MainTable } from "@/components/common/MainTable";
import { TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useGetTransactionsQuery } from "@/redux/slices/transactionApi";

export default function RecentTransactionTable() {
  const { data, isLoading } = useGetTransactionsQuery({
    limit: 5,
  });

  const rows = data ?? [];

  return (
    <MainTable header={["Date", "Title", "Amount"]}>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={3}>Loading…</TableCell>
          </TableRow>
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>No transactions</TableCell>
          </TableRow>
        ) : (
          rows.map((row: any) => (
            <TableRow key={row.id} hover>
              {/* DATE */}
              <TableCell>
                <Typography>
                  {new Date(row.date).toLocaleDateString("id-ID")}
                </Typography>
              </TableCell>

              {/* TITLE */}
              <TableCell>
                <Typography fontWeight={500}>{row.title}</Typography>
              </TableCell>

              {/* AMOUNT */}
              <TableCell align="right">
                <Typography
                  sx={{
                    fontWeight: 600,
                    color:
                      row.type === "EXPENSE"
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {row.type === "EXPENSE"
                    ? `- Rp ${Math.abs(row.amount).toLocaleString("id-ID")}`
                    : `+ Rp ${row.amount.toLocaleString("id-ID")}`}
                </Typography>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </MainTable>
  );
}
