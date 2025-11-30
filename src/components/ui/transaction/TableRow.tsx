"use client";

import {
  TableRow,
  TableCell,
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

export default function TransactionRow({ row }: any) {
  return (
    <TableRow hover>
      {/* CUSTOMER */}
      <TableCell>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>{row.title[0]}</Avatar>

          <Box>
            <Typography fontWeight={600}>{row.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              INV-{row.id}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* DATE */}
      <TableCell>
        <Typography>{row.date}</Typography>
        <Typography variant="body2" color="text.secondary">
          {row.time}
        </Typography>
      </TableCell>

      {/* AMOUNT */}
      <TableCell align="right" sx={{ fontWeight: 600 }}>
        {row.amount}
      </TableCell>

      {/* STATUS */}
      <TableCell>
        <Chip
          label={row.status}
          color={
            row.status === "Paid"
              ? "success"
              : row.status === "Overdue"
              ? "error"
              : "warning"
          }
          size="small"
        />
      </TableCell>

      {/* MENU */}
      <TableCell align="right">
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
