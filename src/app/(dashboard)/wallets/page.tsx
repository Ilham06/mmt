"use client";

import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
  Stack,
  LinearProgress,
} from "@mui/material";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";
import PageWrapper from "@/components/layouts/pageWrapper";
import Link from "next/link";

import AddWalletDialog from "@/components/ui/wallets/AddWalletDialog";
import {
  useDeleteWalletMutation,
  useGetWalletsQuery,
} from "@/redux/slices/walletApi";

// ======================= ICON MAP =======================
const walletIcons: any = {
  CASH: <AccountBalanceWalletRoundedIcon />,
  BANK: <AccountBalanceRoundedIcon />,
  EWALLET: <AccountBalanceWalletRoundedIcon />,
  CREDIT: <CreditCardRoundedIcon />,
};

// ======================= GAME STYLE MAP =======================
const walletStyles: any = {
  CASH: {
    bg: "#E3F2FD",
    color: "#1565C0",
    label: "💼 Inventory",
    desc: "Akses cepat",
  },
  BANK: {
    bg: "#E8F5E9",
    color: "#2E7D32",
    label: "🏦 Vault",
    desc: "Penyimpanan aman",
  },
  EWALLET: {
    bg: "#FFFDE7",
    color: "#F9A825",
    label: "⚡ Fast Access",
    desc: "Cepat & praktis",
  },
  CREDIT: {
    bg: "#FFEBEE",
    color: "#C62828",
    label: "☠️ Debt Zone",
    desc: "Zona bahaya",
  },
};

export default function WalletsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data: wallets = [], isLoading } = useGetWalletsQuery();
  const [deleteWallet] = useDeleteWalletMutation();

  const openMenu = (e: any, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveId(id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setActiveId(null);
  };

  const handleEdit = () => {
    const w = wallets.find((x: any) => x.id === activeId);
    setEditData(w);
    setOpenDialog(true);
    closeMenu();
  };

  const handleDelete = async () => {
    await deleteWallet(activeId);
    closeMenu();
  };

  // ======================= LOADING =======================
  if (isLoading)
    return (
      <PageWrapper title="💰 Resource Storage">
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );

  return (
    <PageWrapper
      title="💰 Resource Storage"
      // subtitle="Tempat kamu nyimpen kekuatan finansial"
      actions={{
        label: "Tambah Storage",
        onClick: () => {
          setEditData(null);
          setOpenDialog(true);
        },
        icon: <AddRoundedIcon />,
      }}
    >
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
          “Pisahin storage bikin resource kamu lebih gampang dikontrol 🎯”
        </Typography>
      </Card>

      <Grid container spacing={3}>
        {wallets.map((wallet: any) => {
          const style = walletStyles[wallet.type];
          const danger = wallet.type === "CREDIT" && wallet.balance < 0;

          return (
            <Grid key={wallet.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  position: "relative",
                  transition: "0.2s",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* MENU */}
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => openMenu(e, wallet.id)}
                >
                  <MoreVertRoundedIcon fontSize="small" />
                </IconButton>

                <Stack spacing={1}>
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: style.bg,
                      color: style.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {walletIcons[wallet.type]}
                  </Box>

                  {/* NAME */}
                  <Link
                    href={`/wallets/${wallet.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography fontWeight={700} variant="h6">
                      {wallet.name}
                    </Typography>
                  </Link>

                  {/* TYPE */}
                  <Chip
                    label={style.label}
                    size="small"
                    sx={{
                      width: "fit-content",
                      bgcolor: style.bg,
                      color: style.color,
                      fontWeight: 600,
                    }}
                  />

                  <Typography variant="caption" color="text.secondary">
                    {style.desc}
                  </Typography>

                  {/* BALANCE */}
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    mt={1}
                    color={danger ? "error.main" : "text.primary"}
                  >
                    Rp {Math.abs(wallet.balance).toLocaleString("id-ID")}
                  </Typography>

                  {/* STATUS */}
                  {danger ? (
                    <Typography variant="body2" color="error.main">
                      ☠️ Resource kritis! Hati-hati pakai ini
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Status: Aman
                    </Typography>
                  )}

                  {/* RESOURCE BAR (VISUAL GAME FEEL) */}
                  <LinearProgress
                    variant="determinate"
                    value={
                      wallet.balance <= 0
                        ? 10
                        : Math.min(100, wallet.balance / 100000)
                    }
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      mt: 1,
                      bgcolor: "#eee",
                    }}
                  />
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={handleEdit}>Upgrade Storage ✨</MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
          Hancurkan Storage 😬
        </MenuItem>
      </Menu>

      {/* ADD / EDIT DIALOG */}
      <AddWalletDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        editData={editData}
      />
    </PageWrapper>
  );
}
