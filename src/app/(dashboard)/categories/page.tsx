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
    setOpenAdd(true);
  };

  const handleDelete = async () => {
    if (!activeRow) return;
    await deleteCategory(activeRow);
    setAnchorEl(null);
  };

  return (
    <PageWrapper
      title="Categories"
      actions={{
        label: "Add Category",
        onClick: () => setOpenAdd(true),
        icon: <AddRoundedIcon />,
      }}
    >
      {/* FILTER BAR */}
      <Paper
        sx={{
          boxShadow: "var(--mui-shadow)",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search categories…"
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
          sx={{
            borderRadius: 2,
            p: 2,
          }}
        />

        {/* LOADING */}
        {isLoading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <MainTable
            header={["Name", "Preview", "Type", "Icon", "Actions"]}
            hasPagination
            rowsCount={filtered.length}
            page={0}
            pageSize={5}
          >
            <TableBody>
              {filtered.map((row: any) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>

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
                      label={row.type}
                      size="small"
                      sx={{
                        bgcolor: row.type === "INCOME" ? "#E8F5E9" : "#FFEBEE",
                        color: row.type === "INCOME" ? "#2E7D32" : "#C62828",
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

                  {/* ACTIONS */}
                  <TableCell align="right">
                    <IconButton
                      size="small"
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

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>

      {/* ADD CATEGORY DIALOG */}
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
