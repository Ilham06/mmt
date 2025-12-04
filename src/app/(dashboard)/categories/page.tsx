'use client';

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
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import PageWrapper from '@/components/layouts/pageWrapper';
import { MainTable } from '@/components/common/MainTable';

import { useState } from 'react';
import AddCategoryDialog from '@/components/ui/cagegory/AddCategoryDialog';

const dummyCategories = [
  {
    id: '1',
    name: 'Food & Drinks',
    color: '#1E88E5',
    icon: 'Restaurant',
    type: 'EXPENSE',
  },
  {
    id: '2',
    name: 'Transport',
    color: '#8E24AA',
    icon: 'DirectionsCar',
    type: 'EXPENSE',
  },
  {
    id: '3',
    name: 'Salary',
    color: '#43A047',
    icon: 'AttachMoney',
    type: 'INCOME',
  },
];

export default function CategoriesPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = dummyCategories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenu = (event: any, id: string) => {
    setActiveRow(id);
    setAnchorEl(event.currentTarget);
  };

  return (
    <PageWrapper
      title="Categories"
      actions={{
        label: 'Add Category',
        onClick: () => setOpenAdd(true),
        icon: <AddRoundedIcon />,
      }}
    >
      {/* FILTER BAR */}
      <Paper
        sx={{
          boxShadow: 'var(--mui-shadow)',
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
            p: 2
          }}
        />

         {/* TABLE */}
      <MainTable
        header={['Name', 'Preview', 'Type', 'Icon', 'Actions']}
        hasPagination
        rowsCount={filtered.length}
        page={0}
        pageSize={5}
      >
        <TableBody>
          {filtered.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>

              {/* PREVIEW */}
              <TableCell>
                <Chip
                  label={row.name}
                  sx={{
                    bgcolor: row.color + '33',
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
                    bgcolor: row.type === 'INCOME' ? '#E8F5E9' : '#FFEBEE',
                    color: row.type === 'INCOME' ? '#2E7D32' : '#C62828',
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
                    bgcolor: '#F5F5F5',
                    borderRadius: 1,
                  }}
                />
              </TableCell>

              {/* ACTIONS */}
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => handleMenu(e, row.id)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MainTable>
      </Paper>

     

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem>Edit</MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>

      {/* ADD CATEGORY DIALOG */}
      <AddCategoryDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </PageWrapper>
  );
}
