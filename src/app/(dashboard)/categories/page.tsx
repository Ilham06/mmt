"use client";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  TableBody,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import PageWrapper from "@/components/layouts/pageWrapper";
import { MainTable } from "@/components/common/MainTable";

import { useState } from "react";
import AddCategoryDialog from "@/components/ui/cagegory/AddCategoryDialog";

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/slices/categoryApi";

export default function CategoriesPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<any>(null);

  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const filtered = categories.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenu = (event: any, item: any) => {
    setActiveRow(item.id);
    setAnchorEl(event.currentTarget);
    setEditItem(item);
  };

  const handleDelete = async () => {
    if (!activeRow) return;
    await deleteCategory(activeRow);
    setAnchorEl(null);
  };

  return (
    <PageWrapper
      title="Kategori"
      actions={{
        label: "Tambah Kategori",
        onClick: () => setOpenAdd(true),
        icon: <AddRoundedIcon />,
      }}
    >
      {/* INFO */}
      <Paper
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          bgcolor: "background.default",
        }}
      >
        <Typography fontWeight={700}>
          Kelola Kategori Transaksi
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kategori membantu mengelompokkan pemasukan dan pengeluaran agar laporan
          keuangan lebih akurat dan mudah dipahami.
        </Typography>
      </Paper>

      {/* SEARCH */}
      <Paper
        sx={{
          borderRadius: 3,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Cari kategori… (contoh: Makan, Transport)"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ p: 2 }}
        />

        {/* LOADING */}
        {isLoading ? (
          <Box textAlign="center" py={6}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" mt={2}>
              Sedang memuat kategori…
            </Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography fontWeight={700}>
              Belum ada kategori
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tambahkan kategori untuk mulai mengelompokkan transaksi kamu.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpenAdd(true)}
            >
              Tambah Kategori
            </Button>
          </Box>
        ) : (
          <MainTable
            header={["Kategori", "Preview", "Jenis", "Ikon", "Aksi"]}
            hasPagination
            rowsCount={filtered.length}
            page={0}
            pageSize={5}
          >
            <TableBody>
              {filtered.map((row: any) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    height: 72,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {/* NAME */}
                  <TableCell>
                    <Typography fontWeight={600}>
                      {row.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Digunakan pada transaksi
                    </Typography>
                  </TableCell>

                  {/* PREVIEW */}
                  <TableCell>
                    <Chip
                      label={row.name}
                      sx={{
                        bgcolor: row.color + "33",
                        color: row.color,
                        fontWeight: 600,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  {/* TYPE */}
                  <TableCell>
                    <Chip
                      label={
                        row.type === "INCOME"
                          ? "Pemasukan"
                          : "Pengeluaran"
                      }
                      size="small"
                      sx={{
                        bgcolor:
                          row.type === "INCOME"
                            ? "#E8F5E9"
                            : "#FFEBEE",
                        color:
                          row.type === "INCOME"
                            ? "#2E7D32"
                            : "#C62828",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* ICON */}
                  <TableCell>
                    <Chip
                      label={row.icon}
                      size="small"
                      sx={{
                        bgcolor: "#F5F5F5",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  {/* ACTION */}
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                      onClick={(e) => handleMenu(e, row)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MainTable>
        )}
      </Paper>

      {/* ACTION MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setOpenAdd(true);
            setAnchorEl(null);
          }}
        >
          Edit Kategori
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleDelete}
        >
          Hapus Kategori
        </MenuItem>
      </Menu>

      {/* ADD / EDIT DIALOG */}
      <AddCategoryDialog
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setEditItem(null);
        }}
        category={editItem}
      />
    </PageWrapper>
  );
}
