'use client';

import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Typography,
  TablePagination,
} from '@mui/material';

interface MainTableProps {
  header: string[];
  children: React.ReactNode;
  hasPagination?: boolean;
  rowsCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function MainTable({
  header,
  children,
  hasPagination = false,
  rowsCount = 0,
  page = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: MainTableProps) {
  return (
    <Paper
    >
      {/* TABLE */}
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F4F6F8' }}>
              {header.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 700,
                    ...(index === header.length - 1 && { textAlign: 'right' }),
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          {children}
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      {hasPagination && (
        <Box display="flex" justifyContent="flex-end">
          <TablePagination
            component="div"
            count={rowsCount}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={(_, newPage) => onPageChange?.(newPage)}
            onRowsPerPageChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      )}
    </Paper>
  );
}
