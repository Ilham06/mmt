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
import MotionCard from "@/components/motions/MotionCard";

/* ======================= ICON MAP ======================= */
const walletIcons: any = {
  CASH: <AccountBalanceWalletRoundedIcon />,
  BANK: <AccountBalanceRoundedIcon />,
  EWALLET: <AccountBalanceWalletRoundedIcon />,
  CREDIT: <CreditCardRoundedIcon />,
};

/* ======================= STYLE MAP ======================= */
const walletStyles: any = {
  CASH: {
    label: "Tunai",
    desc: "Penggunaan harian",
    bg: "#E3F2FD",
    color: "#1565C0",
  },
  BANK: {
    label: "Rekening Bank",
    desc: "Penyimpanan utama",
    bg: "#E8F5E9",
    color: "#2E7D32",
  },
  EWALLET: {
    label: "Dompet Digital",
    desc: "Transaksi cepat",
    bg: "#FFFDE7",
    color: "#F9A825",
  },
  CREDIT: {
    label: "Kartu Kredit",
    desc: "Perlu pengelolaan ekstra",
    bg: "#FFEBEE",
    color: "#C62828",
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

  /* ======================= LOADING ======================= */
  if (isLoading)
    return (
      <PageWrapper title="Dompet">
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );

  return (
    <PageWrapper
      title="Dompet"
      actions={{
        label: "Tambah Dompet",
        onClick: () => {
          setEditData(null);
          setOpenDialog(true);
        },
        icon: <AddRoundedIcon />,
      }}
    >
      {/* ================= INFO ================= */}
      <Card
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          bgcolor: "background.default",
        }}
      >
        <Typography fontWeight={700}>
          Kelola Dompet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pisahkan sumber dana agar arus keuangan lebih
          mudah dipantau dan dikontrol.
        </Typography>
      </Card>

      {/* ================= WALLET LIST ================= */}
      <Grid container spacing={3}>
        {wallets.map((wallet: any) => {
          const style = walletStyles[wallet.type];
          const isNegative =
            wallet.type === "CREDIT" && wallet.balance < 0;

          return (
            <Grid
              key={wallet.id}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <MotionCard
                sx={{
                  p: 3,
                }}
              >
                {/* MENU */}
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                  onClick={(e) =>
                    openMenu(e, wallet.id)
                  }
                >
                  <MoreVertRoundedIcon fontSize="small" />
                </IconButton>

                <Stack spacing={1.5}>
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: style.bg,
                      color: style.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {walletIcons[wallet.type]}
                  </Box>

                  {/* NAME */}
                  <Link
                    href={`/wallets/${wallet.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      fontSize={16}
                    >
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

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {style.desc}
                  </Typography>

                  {/* BALANCE */}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mt={1}
                    color={
                      isNegative
                        ? "error.main"
                        : "text.primary"
                    }
                  >
                    Rp{" "}
                    {Math.abs(wallet.balance).toLocaleString(
                      "id-ID"
                    )}
                  </Typography>

                  {/* STATUS */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {isNegative
                      ? "Saldo melebihi batas aman"
                      : "Saldo dalam kondisi baik"}
                  </Typography>

                  {/* INDICATOR */}
                  <LinearProgress
                    variant="determinate"
                    value={
                      wallet.balance <= 0
                        ? 5
                        : Math.min(
                            100,
                            wallet.balance / 100000
                          )
                    }
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      mt: 1,
                      bgcolor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: style.color,
                      },
                    }}
                  />
                </Stack>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {/* ================= MENU ================= */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleEdit}>
          Edit Dompet
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleDelete}
        >
          Hapus Dompet
        </MenuItem>
      </Menu>

      {/* ================= ADD / EDIT DIALOG ================= */}
      <AddWalletDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        editData={editData}
      />
    </PageWrapper>
  );
}
