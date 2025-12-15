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
  Stack,
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
  const [editItem, setEditItem] = useState(null);

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
      title="🎭 Skill Manager"
      // subtitle="Atur skill keuangan kamu biar resource nggak bocor"
      actions={{
        label: "Tambah Skill",
        onClick: () => setOpenAdd(true),
        icon: <AddRoundedIcon />,
      }}
    >
      {/* NPC MESSAGE */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#F4F6FF",
        }}
      >
        <Typography fontWeight={600}>
          🧠 DompetBot berkata:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          “Skill yang rapi bikin laporan & analisis kamu makin akurat 🎯”
        </Typography>
      </Paper>

      {/* SEARCH */}
      <Paper
        sx={{
          boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
          borderRadius: 3,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Cari skill… (contoh: Makan, Hiburan)"
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
              Sedang memuat skill kamu…
            </Typography>
          </Box>
        ) : filtered.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography fontWeight={600}>
              Belum ada skill di sini 👀
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tambahkan skill pertama biar sistem bisa belajar kebiasaanmu
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpenAdd(true)}
            >
              Tambah Skill Pertama 🎮
            </Button>
          </Box>
        ) : (
          <MainTable
            header={[
              "Skill",
              "Preview",
              "Role",
              "Icon",
              "Aksi",
            ]}
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
                    <Typography fontWeight={600}>{row.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Skill aktif
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
                          ? "⬆️ Buff"
                          : "⬇️ Damage"
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
                      sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
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
          Upgrade Skill ✨
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleDelete}
        >
          Hapus Skill 😬
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
