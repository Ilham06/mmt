"use client";

import { MainTable } from "@/components/common/MainTable";
import { TableBody } from "@mui/material";
import TransactionRow from "./TableRow";

export default function TransactionTable() {
  const rows = [
    {
      id: 9919,
      title: "Amiah Pruitt",
      date: "11 Nov 2025",
      time: "2:16 pm",
      amount: "$2,331.63",
      status: "Paid",
    },
    {
      id: 9918,
      title: "Ariana Lang",
      date: "12 Nov 2025",
      time: "2:16 pm",
      amount: "$2,372.93",
      status: "Overdue",
    },
    {
      id: 9917,
      title: "Lawson Bass",
      date: "13 Nov 2025",
      time: "2:16 pm",
      amount: "$2,283.97",
      status: "Paid",
    },
  ];

  return (
    <MainTable header={["Customer", "Create", "Amount", "Status", ""]}>
      <TableBody>
        {rows.map((row, idx) => (
          <TransactionRow key={idx} row={row} />
        ))}
      </TableBody>
    </MainTable>
  );
}
