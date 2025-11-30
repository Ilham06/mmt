"use client";

import { MainTable } from "@/components/common/MainTable";
import { TableBody, TableRow, TableCell, Typography } from "@mui/material";

export default function RecentTransactionTable() {
  const rows = [
    { date: "2025-01-01", title: "Grocery", amount: -150000 },
    { date: "2025-01-02", title: "Salary", amount: 8500000 },
    { date: "2025-01-03", title: "Grab", amount: -20000 },
  ];

  return (
    <MainTable header={["Date", "Title", "Amount"]}>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index} hover>
            {/* DATE */}
            <TableCell>
              <Typography>{row.date}</Typography>
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
                  color: row.amount < 0 ? "error.main" : "success.main",
                }}
              >
                {row.amount < 0
                  ? `- Rp ${Math.abs(row.amount).toLocaleString("id-ID")}`
                  : `+ Rp ${row.amount.toLocaleString("id-ID")}`}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MainTable>
  );
}
