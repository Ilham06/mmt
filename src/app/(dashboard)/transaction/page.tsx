"use client";

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
  Card,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import { useState } from "react";
import PageWrapper from "@/components/layouts/pageWrapper";
import { MainTable } from "@/components/common/MainTable";
import TransactionSummary from "@/components/ui/transaction/TransactionSummary";

import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useGetTransactionStatsQuery,
} from "@/redux/slices/transactionApi";

import { useRouter } from "next/navigation";
import { useGetWalletsQuery } from "@/redux/slices/walletApi";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApi";

const getMonthRange = (month: string) => {
  if (!month) return {};

  const [year, m] = month.split("-").map(Number);

  const startDate = new Date(year, m - 1, 1);
  const endDate = new Date(year, m, 0); // last day of month

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};



export default function TransactionsPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [tab, setTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [walletFilter, setWalletFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  // ================= FETCH =================
  const monthRange = getMonthRange(monthFilter);

  const { data = [], isLoading } = useGetTransactionsQuery(
    {
      type: tab !== "all" ? tab : undefined,
      category: categoryFilter || undefined,
      wallet: walletFilter || undefined,
      q: search || undefined,
      ...monthRange, // 👈 INI KUNCINYA
    },
    { refetchOnMountOrArgChange: true }
  );


  const { data: wallets = [] } = useGetWalletsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: stats } = useGetTransactionStatsQuery({
    wallet: walletFilter || undefined,
    category: categoryFilter || undefined,
    ...monthRange,
  });


  const [deleteTransaction] = useDeleteTransactionMutation();

  // ================= MENU =================
  const handleMenuOpen = (e: any, id: string) => {
    setActiveRow(id);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setActiveRow(null);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (!activeRow) return;
    await deleteTransaction(activeRow).unwrap();
    handleMenuClose();
  };

  const handleEdit = () => {
    if (!activeRow) return;
    router.push(`/transaction/${activeRow}`);
  };

  // ================= TYPE META (SOFT COLOR) =================
  const typeMeta: any = {
    INCOME: {
      label: "Pemasukan",
      bg: "#E8F5E9",
      color: "#2E7D32",
    },
    EXPENSE: {
      label: "Pengeluaran",
      bg: "#FDECEA",
      color: "#C62828",
    },
    TRANSFER: {
      label: "Transfer",
      bg: "#E3F2FD",
      color: "#1565C0",
    },
  };

  // ================= MONTH OPTIONS =================
  const currentYear = new Date().getFullYear();

  const months = [
    { value: `${currentYear}-01`, label: "Januari" },
    { value: `${currentYear}-02`, label: "Februari" },
    { value: `${currentYear}-03`, label: "Maret" },
    { value: `${currentYear}-04`, label: "April" },
    { value: `${currentYear}-05`, label: "Mei" },
    { value: `${currentYear}-06`, label: "Juni" },
    { value: `${currentYear}-07`, label: "Juli" },
    { value: `${currentYear}-08`, label: "Agustus" },
    { value: `${currentYear}-09`, label: "September" },
    { value: `${currentYear}-10`, label: "Oktober" },
    { value: `${currentYear}-11`, label: "November" },
    { value: `${currentYear}-12`, label: "Desember" },
  ];

  const getMonthLabel = (value: string) => {
    if (!value) return "";
    const [, month] = value.split("-");
    return months.find((m) => m.value.endsWith(month))?.label;
  };

  const selectedCategory = categories.find(
    (c: any) => c.id === categoryFilter
  );

  const selectedWallet = wallets.find(
    (w: any) => w.id === walletFilter
  );



  return (
    <PageWrapper
      title="Transaksi"
      actions={{
        label: "Tambah Transaksi",
        href: "/transaction/create",
        icon: <AddRoundedIcon />,
      }}
    >
      {/* ================= SUMMARY ================= */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12 }}>
          <TransactionSummary stats={stats} month={monthFilter ? `Bulan ${getMonthLabel(monthFilter)}` : ""} />
        </Grid>
      </Grid>

      {/* ================= INFO ================= */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Typography fontWeight={700}>
          Ringkasan Aktivitas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Semua pemasukan, pengeluaran, dan transfer kamu tercatat
          rapi di sini.
        </Typography>
      </Card>

      {/* ================= FILTER + TABLE ================= */}
      <Box sx={{ borderRadius: 4, bgcolor: "background.paper" }}>
        {/* FILTER */}
        <Box p={3}>
          {/* TABS */}
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                minHeight: 48,
              },
            }}
          >
            <Tab
              value="all"
              label="Semua"
              icon={<ListAltRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="INCOME"
              label="Pemasukan"
              icon={<TrendingUpRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="EXPENSE"
              label="Pengeluaran"
              icon={<TrendingDownRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="TRANSFER"
              label="Transfer"
              icon={<SwapHorizRoundedIcon />}
              iconPosition="start"
            />
          </Tabs>

          {/* FILTER ROW */}
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
          >
            {/* MONTH */}
            <FormControl size="small" sx={{ width: isMobile ? "100%" : 160 }}>
              <Select
                displayEmpty
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarMonthRoundedIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Semua Bulan</MenuItem>
                {months.map((m) => (
                  <MenuItem key={m.value} value={m.value}>
                    {m.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* CATEGORY */}
            <FormControl size="small" sx={{ width: isMobile ? "100%" : 180 }}>
              <Select
                displayEmpty
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">Semua Kategori</MenuItem>
                {categories.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* WALLET */}
            <FormControl size="small" sx={{ width: isMobile ? "100%" : 180 }}>
              <Select
                displayEmpty
                value={walletFilter}
                onChange={(e) => setWalletFilter(e.target.value)}
              >
                <MenuItem value="">Semua Dompet</MenuItem>
                {wallets.map((w: any) => (
                  <MenuItem key={w.id} value={w.id}>
                    {w.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Cari transaksi…"
              value={search}
              fullWidth={isMobile}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* FILTER INFO */}
{(monthFilter || categoryFilter || walletFilter || search) && (
  <Box mt={2}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", mb: 1 }}
    >
      Menampilkan hasil untuk:
    </Typography>

    <Stack direction="row" spacing={1} flexWrap="wrap">
      {monthFilter && (
        <Chip
          size="small"
          label={`Bulan: ${getMonthLabel(monthFilter)}`}
          onDelete={() => setMonthFilter("")}
        />
      )}

      {categoryFilter && (
        <Chip
          size="small"
          label={`Kategori: ${selectedCategory?.name}`}
          onDelete={() => setCategoryFilter("")}
        />
      )}

      {walletFilter && (
        <Chip
          size="small"
          label={`Dompet: ${selectedWallet?.name}`}
          onDelete={() => setWalletFilter("")}
        />
      )}

      {search && (
        <Chip
          size="small"
          label={`Pencarian: "${search}"`}
          onDelete={() => setSearch("")}
        />
      )}
    </Stack>
  </Box>
)}

        </Box>

        

        <Divider />

        {/* ================= TABLE ================= */}
        <MainTable
          header={["Transaksi", "Tipe", "Jumlah", "Tanggal", ""]}
          hasPagination
          rowsCount={data.length}
          page={0}
          pageSize={10}
        >
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  Memuat transaksi…
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  Belum ada transaksi untuk filter ini.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any) => {
                const meta = typeMeta[row.type];
                const isExpense = row.type === "EXPENSE";

                return (
                  <TableRow key={row.id} hover sx={{ height: 72 }}>
                    <TableCell>
                      <Typography fontWeight={700}>
                        {row.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.category?.name} • {row.wallet?.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={meta.label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          bgcolor: meta.bg,
                          color: meta.color,
                          borderRadius: 2,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        fontWeight={700}
                        fontSize={14}
                        color={isExpense ? "error.main" : "success.main"}
                      >
                        {isExpense ? "-" : "+"} Rp{" "}
                        {Math.abs(row.amount).toLocaleString("id-ID")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {new Date(row.date).toLocaleDateString("id-ID")}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, row.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </MainTable>
      </Box>

      {/* ================= ROW MENU ================= */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit Transaksi</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          Hapus Transaksi
        </MenuItem>
      </Menu>
    </PageWrapper>
  );
}
