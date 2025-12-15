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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import { Add } from "@mui/icons-material";

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

export default function TransactionsPage() {
  const router = useRouter();

  const [tab, setTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [walletFilter, setWalletFilter] = useState("");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  // ================= FETCH =================
  const { data = [], isLoading } = useGetTransactionsQuery(
    {
      type: tab !== "all" ? tab : undefined,
      category: categoryFilter || undefined,
      wallet: walletFilter || undefined,
      q: search || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { data: wallets = [] } = useGetWalletsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: stats } = useGetTransactionStatsQuery({
    wallet: walletFilter || undefined,
    category: categoryFilter || undefined,
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

  const typeMeta: any = {
    INCOME: { label: "⬆️ Buff", bg: "#E8F5E9", color: "#2E7D32" },
    EXPENSE: { label: "⬇️ Damage", bg: "#FFEBEE", color: "#C62828" },
    TRANSFER: { label: "🔁 Move", bg: "#E3F2FD", color: "#1565C0" },
  };

  return (
    <PageWrapper
      title="🧾 Action Log"
      // subtitle="Semua aksi keuangan kamu tercatat di sini"
      actions={{
        label: "Aksi Baru",
        href: "/transaction/create",
        icon: <FlashOnRoundedIcon />,
      }}
    >
      {/* ===== SUMMARY ===== */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12 }}>
          <TransactionSummary stats={stats} />
        </Grid>
      </Grid>

      {/* NPC MESSAGE */}
      <Card
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#F4F6FF",
        }}
      >
        <Typography fontWeight={600}>🧠 DompetBot:</Typography>
        <Typography variant="body2" color="text.secondary">
          “Setiap aksi kecil ngaruh ke progres finansial kamu 🎮”
        </Typography>
      </Card>

      {/* ===== FILTER + LIST ===== */}
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
        }}
      >
        {/* FILTER */}
        <Box p={3}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
              },
            }}
          >
            <Tab label="Semua Aksi" value="all" />
            <Tab label="⬆️ Buff" value="INCOME" />
            <Tab label="⬇️ Damage" value="EXPENSE" />
            <Tab label="🔁 Move" value="TRANSFER" />
          </Tabs>

          <Box display="flex" gap={2} flexWrap="wrap">
            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">Semua Skill</MenuItem>
                {categories.map((c: any) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ width: 180 }}>
              <Select
                displayEmpty
                value={walletFilter}
                onChange={(e) => setWalletFilter(e.target.value)}
              >
                <MenuItem value="">Semua Storage</MenuItem>
                {wallets.map((w: any) => (
                  <MenuItem key={w.id} value={w.id}>
                    {w.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Cari aksi…"
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
          header={["Aksi", "Tipe", "Impact", "Tanggal", ""]}
          hasPagination
          rowsCount={data.length}
          page={0}
          pageSize={10}
        >
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading aksi…</TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  Belum ada aksi. Mulai gerak dulu 🎮
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any) => {
                const meta = typeMeta[row.type];
                return (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      height: 72,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={700}>{row.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.category?.name} • {row.wallet?.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={meta.label}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: meta.bg,
                          color: meta.color,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        fontWeight={700}
                        color={
                          row.type === "EXPENSE"
                            ? "error.main"
                            : "success.main"
                        }
                      >
                        {row.type === "EXPENSE" ? "-" : "+"} Rp{" "}
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
                        sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
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

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit Aksi ✏️</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          Hapus Aksi ❌
        </MenuItem>
      </Menu>
    </PageWrapper>
  );
}
