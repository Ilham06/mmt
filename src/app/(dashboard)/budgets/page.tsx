"use client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Button
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageWrapper from "@/components/layouts/pageWrapper";
import { useState } from "react";
import AddBudgetDialog from "@/components/ui/budget/AddBudgetDialog";

const dummyBudgets = [
  {
    id: "1",
    category: "Food & Drinks",
    color: "#1E88E5",
    limit: 2000000,
    used: 1250000,
    period: "Monthly",
  },
  {
    id: "2",
    category: "Transport",
    color: "#8E24AA",
    limit: 800000,
    used: 500000,
    period: "Monthly",
  },
  {
    id: "3",
    category: "Shopping",
    color: "#FB8C00",
    limit: 1500000,
    used: 600000,
    period: "Monthly",
  },
];

export default function BudgetsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  const handleMenu = (e: any, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveId(id);
  };

  const progressColor = (pct: number) => {
    if (pct < 60) return "success";
    if (pct < 85) return "warning";
    return "error";
  };

  return (
    <PageWrapper
      title="Budgets"
      actions={{
        label: "Add Budget",
        onClick: () => setOpenAdd(true),
        icon: <AddRoundedIcon />,
      }}
    >
      <Grid container spacing={3}>
        {dummyBudgets.map((b) => {
          const pct = (b.used / b.limit) * 100;

          return (
            <Grid size={{ xs: 12, md: 4 }} key={b.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "var(--mui-shadow-lg)",
                  position: "relative",
                }}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => handleMenu(e, b.id)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Chip
                  label={b.category}
                  sx={{
                    bgcolor: b.color + "22",
                    color: b.color,
                    fontWeight: 600,
                    mb: 2,
                    borderRadius: 1,
                  }}
                />

                <Typography variant="body2" color="text.secondary">
                  {b.period}
                </Typography>

                <Typography
                  variant="h5"
                  mt={1}
                  fontWeight={700}
                >
                  Rp {b.used.toLocaleString("id-ID")}
                  <Typography
                    component="span"
                    sx={{ color: "text.secondary", fontSize: 16 }}
                  >
                    {" "}
                    / Rp {b.limit.toLocaleString("id-ID")}
                  </Typography>
                </Typography>

                {/* PROGRESS */}
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    color={progressColor(pct)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                </Box>

                <Typography
                  mt={1}
                  color={
                    progressColor(pct) === "success"
                      ? "success.main"
                      : progressColor(pct) === "warning"
                      ? "warning.main"
                      : "error.main"
                  }
                  fontWeight={600}
                >
                  {pct.toFixed(0)}% used
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem>Edit</MenuItem>
        <MenuItem sx={{ color: "error.main" }}>Delete</MenuItem>
      </Menu>

      {/* ADD BUDGET DIALOG */}
      <AddBudgetDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </PageWrapper>
  );
}
