'use client';

import {
  Box,
  Chip,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  Select,
  Grid,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Add } from '@mui/icons-material';

import { Key, useState } from 'react';
import PageWrapper from '@/components/layouts/pageWrapper';
import { MainTable } from '@/components/common/MainTable';
import TransactionSummary from '@/components/ui/transaction/TransactionSummary';
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useGetTransactionStatsQuery
} from '@/redux/slices/transactionApi';

import { useRouter } from 'next/navigation';
import { useGetWalletsQuery } from '@/redux/slices/walletApi';
import { useGetCategoriesQuery } from '@/redux/slices/categoryApi';


export default function TransactionsPage() {
  const router = useRouter();

  const [tab, setTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [walletFilter, setWalletFilter] = useState("");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  // --------------------- FETCH DATA ---------------------
  const { data, isLoading } = useGetTransactionsQuery({
    type: tab !== "all" ? tab : undefined,
    category: categoryFilter || undefined,
    wallet: walletFilter || undefined,
    q: search || undefined,
  }, {
    refetchOnMountOrArgChange: true
  });

  const { data: wallets = [] } = useGetWalletsQuery()
  const { data: categories = [] } = useGetCategoriesQuery()

  const [deleteTransaction] = useDeleteTransactionMutation();
  const rows = data ?? [];

  const { data: stats } = useGetTransactionStatsQuery({
    wallet: walletFilter || undefined,
    category: categoryFilter || undefined,
  });


  // --------------------- MENU ---------------------
  const handleMenuOpen = (event: any, id: string) => {
    setActiveRow(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActiveRow(null);
    setAnchorEl(null);
  };

  // --------------------- DELETE ---------------------
  const handleDelete = async () => {
    if (!activeRow) return;

    await deleteTransaction(activeRow).unwrap();
    handleMenuClose();
  };

  // --------------------- EDIT ---------------------
  const handleEdit = () => {
    if (!activeRow) return;
    router.push(`/transaction/${activeRow}`);
  };


  const typeColors: any = {
    INCOME: { bg: '#E8F5E9', text: '#2E7D32' },
    EXPENSE: { bg: '#FFEBEE', text: '#C62828' },
    TRANSFER_IN: { bg: '#E3F2FD', text: '#1565C0' },
    TRANSFER_OUT: { bg: '#E3F2FD', text: '#1565C0' },
  };

  return (
    <PageWrapper
      title="Transactions"
      actions={{
        label: 'Add Transaction',
        href: '/transaction/create',
        icon: <Add />,
      }}
    >
      {/* SUMMARY */}
      <Grid size={{ xs: 12 }}>
        <TransactionSummary stats={stats} />
      </Grid>

      {/* FILTER CARD */}
      <Box sx={{ borderRadius: 3, my: 2, bgcolor: "background.paper", boxShadow: "var(--mui-shadow)" }}>
        <Box p={2}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="All" value="all" />
            <Tab label="Income" value="INCOME" />
            <Tab label="Expense" value="EXPENSE" />
            <Tab label="Transfers" value="TRANSFER" />
          </Tabs>

          <Box display="flex" gap={2} flexWrap="wrap">
            {/* CATEGORY */}
            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category: any) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* WALLET */}
            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={walletFilter}
                onChange={(e) => setWalletFilter(e.target.value)}
              >
                <MenuItem value="">All Wallets</MenuItem>
                {wallets.map((wallet: any) => (
                  <MenuItem key={wallet.id} value={wallet.id}>{wallet.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* SEARCH */}
            <TextField
              placeholder="Search…"
              size="small"
              sx={{ flex: 1 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* TABLE */}
        <MainTable
          header={['Title', 'Category', 'Wallet', 'Type', 'Amount', 'Date', 'Actions']}
          hasPagination
          rowsCount={rows.length}
          page={0}
          pageSize={10}
        >
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7}>Loading…</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={7}>No transactions found</TableCell></TableRow>
            ) : (
              rows.map((row: any) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                  <TableCell>{row.category?.name}</TableCell>
                  <TableCell>{row.wallet?.name}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        borderRadius: 1,
                        bgcolor: typeColors[row.type]?.bg,
                        color: typeColors[row.type]?.text,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    {row.type == 'EXPENSE' ? (
                      <span style={{ color: '#C62828' }}>
                        - Rp {Math.abs(row.amount).toLocaleString('id-ID')}
                      </span>
                    ) : (
                      <span style={{ color: '#2E7D32' }}>
                        + Rp {row.amount.toLocaleString('id-ID')}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>{new Date(row.date).toLocaleDateString("id-ID")}</TableCell>

                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </MainTable>
      </Box>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </PageWrapper>
  );
}
