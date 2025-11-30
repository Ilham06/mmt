'use client';

import {
  Box,
  Button,
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

import { useState } from 'react';
import PageWrapper from '@/components/layouts/pageWrapper';
import { MainTable } from '@/components/common/MainTable';
import TransactionSummary from '@/components/ui/transaction/TransactionSummary';

// ======================= DUMMY TRANSACTIONS =======================
const rows = [
  {
    id: '1',
    title: 'Grocery – Indomaret',
    category: 'Food',
    wallet: 'Main Wallet',
    type: 'EXPENSE',
    amount: -150000,
    date: '2025-11-12',
  },
  {
    id: '2',
    title: 'Salary November',
    category: 'Salary',
    wallet: 'BNI',
    type: 'INCOME',
    amount: 8500000,
    date: '2025-11-10',
  },
  {
    id: '3',
    title: 'Grab Ride',
    category: 'Transport',
    wallet: 'OVO',
    type: 'EXPENSE',
    amount: -20000,
    date: '2025-11-09',
  },
  {
    id: '4',
    title: 'Transfer to Savings',
    category: 'Transfer',
    wallet: 'Main Wallet → Jago',
    type: 'TRANSFER',
    amount: -2000000,
    date: '2025-11-08',
  },
];

// ======================= LABEL MAP =======================
const typeLabelMap: any = {
  INCOME: 'Income',
  EXPENSE: 'Expense',
  TRANSFER: 'Transfer',
};

// ======================= CUSTOM COLORS =======================
const typeColors: any = {
  INCOME: { bg: '#E8F5E9', text: '#2E7D32' },     // hijau
  EXPENSE: { bg: '#FFEBEE', text: '#C62828' },    // merah
  TRANSFER: { bg: '#E3F2FD', text: '#1565C0' },   // biru
};

// ======================= CATEGORY FILTER =======================
const categories = Array.from(new Set(rows.map((r) => r.category)));
const wallets = Array.from(new Set(rows.map((r) => r.wallet)));

export default function TransactionsPage() {
  const [tab, setTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [walletFilter, setWalletFilter] = useState('');
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const handleMenuOpen = (event: any, id: string) => {
    setActiveRow(id);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setActiveRow(null);
    setAnchorEl(null);
  };

  // ======================= FILTERING =======================
  const filteredRows = rows.filter((r) => {
    const tabMatch = tab === 'all' || r.type === tab;
    const categoryMatch = categoryFilter ? r.category === categoryFilter : true;
    const walletMatch = walletFilter ? r.wallet === walletFilter : true;
    const searchMatch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.wallet.toLowerCase().includes(search.toLowerCase());

    return tabMatch && categoryMatch && walletMatch && searchMatch;
  });

  return (
    <PageWrapper
      title="Transactions"
      actions={{
        label: 'Add Transaction',
        href: '/transaction/create', // nanti diganti form
        icon: <Add />,
      }}
    >
        {/* SUMMARY */}
      <Grid size={12}>
        <TransactionSummary />
      </Grid>

      {/* ======================= FILTER CARD ======================= */}
      <Box
        sx={{
          borderRadius: 3,
          my: 2,
          bgcolor: 'background.paper',
          boxShadow: 'var(--mui-shadow)',
        }}
      >

        <Box p={2}>
          {/* TABS */}
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
          >
            <Tab label="All" value="all" />
            <Tab label="Income" value="INCOME" />
            <Tab label="Expense" value="EXPENSE" />
            <Tab label="Transfer" value="TRANSFER" />
          </Tabs>

          {/* FILTER BAR (Category, Wallet, Search) */}
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            {/* Category Filter */}
            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                renderValue={(selected) => selected || 'Category'}
                sx={{ borderRadius: 2 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Wallet Filter */}
            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={walletFilter}
                onChange={(e) => setWalletFilter(e.target.value)}
                renderValue={(selected) => selected || 'Wallet'}
                sx={{ borderRadius: 2 }}
              >
                {wallets.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* SEARCH */}
            <TextField
              placeholder="Search transaction…"
              size="small"
              sx={{ flex: 1, borderRadius: 2 }}
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

        {/* ======================= TABLE ======================= */}
        <MainTable
          header={['Title', 'Category', 'Wallet', 'Type', 'Amount', 'Date', 'Actions']}
          hasPagination
          rowsCount={filteredRows.length}
          page={0}
          pageSize={5}
        >
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover td': { backgroundColor: 'rgba(145,158,171,0.04)' },
                }}
              >
                {/* TITLE */}
                <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>

                {/* CATEGORY */}
                <TableCell>{row.category}</TableCell>

                {/* WALLET */}
                <TableCell>{row.wallet}</TableCell>

                {/* TYPE */}
                <TableCell>
                  <Chip
                    label={typeLabelMap[row.type]}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 1,
                      bgcolor: typeColors[row.type]?.bg,
                      color: typeColors[row.type]?.text,
                    }}
                  />
                </TableCell>

                {/* AMOUNT */}
                <TableCell sx={{ fontWeight: 700 }}>
                  {row.amount < 0 ? (
                    <span style={{ color: '#C62828' }}>- Rp {Math.abs(row.amount).toLocaleString('id-ID')}</span>
                  ) : (
                    <span style={{ color: '#2E7D32' }}>+ Rp {row.amount.toLocaleString('id-ID')}</span>
                  )}
                </TableCell>

                {/* DATE */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {row.date}
                  </Typography>
                </TableCell>

                {/* ACTIONS */}
                <TableCell align="right">
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, row.id)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MainTable>
      </Box>

      {/* ======================= MENU ======================= */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </PageWrapper>
  );
}
