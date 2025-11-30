'use client';

import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Chip,
  Button,
} from '@mui/material';

import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from 'react';
import PageWrapper from '@/components/layouts/pageWrapper';
import Link from 'next/link';
import AddWalletDialog from '@/components/ui/wallets/AddWalletDialog';

// ======================= DUMMY WALLETS =======================
const wallets = [
  {
    id: '1',
    name: 'Main Wallet',
    type: 'cash',
    balance: 1250000,
  },
  {
    id: '2',
    name: 'BNI',
    type: 'bank',
    balance: 4075000,
  },
  {
    id: '3',
    name: 'OVO',
    type: 'ewallet',
    balance: 285000,
  },
  {
    id: '4',
    name: 'Jago',
    type: 'bank',
    balance: 560000,
  },
  {
    id: '5',
    name: 'BCA Credit Card',
    type: 'credit',
    balance: -1250000,
  },
];

// ======================= ICON MAP =======================
const walletIcons: any = {
  cash: <AccountBalanceWalletRoundedIcon />,
  bank: <AccountBalanceRoundedIcon />,
  ewallet: <AccountBalanceWalletRoundedIcon />,
  credit: <CreditCardRoundedIcon />,
};

// ======================= COLOR MAP =======================
const walletColors: any = {
  cash: { bg: '#E3F2FD', color: '#1565C0', label: 'Cash' },
  bank: { bg: '#E8F5E9', color: '#2E7D32', label: 'Bank' },
  ewallet: { bg: '#FFFDE7', color: '#F9A825', label: 'e-Wallet' },
  credit: { bg: '#FFEBEE', color: '#C62828', label: 'Credit Card' },
};

export default function WalletsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);


  const openMenu = (e: any, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveId(id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setActiveId(null);
  };

  return (
    <PageWrapper
      title="Wallets"
      actions={{
        label: "Add Wallet",
        onClick: () => setOpenDialog(true),
        icon: <AddRoundedIcon />,
      }}

    >
      <Grid container spacing={3}>
        {wallets.map((wallet) => {
          const style = walletColors[wallet.type];

          return (
            <Grid key={wallet.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 'var(--mui-shadow)',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  transition: '0.2s',
                  '&:hover': { boxShadow: 'var(--mui-shadow-lg)' },
                }}
              >
                {/* MENU BUTTON */}
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={(e) => openMenu(e, wallet.id)}
                >
                  <MoreVertRoundedIcon fontSize="small" />
                </IconButton>

                {/* ICON */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: style.bg,
                    color: style.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: 24,
                  }}
                >
                  {walletIcons[wallet.type]}
                </Box>

                {/* NAME */}
                <Link href={'wallets/' + wallet.id} style={{ textDecoration: 'none', color: '#333' }}>
                  <Typography variant="h6" fontWeight={700}>
                    {wallet.name}
                  </Typography></Link>

                {/* TYPE LABEL */}
                <Chip
                  label={style.label}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: style.bg,
                    color: style.color,
                    fontWeight: 600,
                  }}
                />

                {/* BALANCE */}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mt={2}
                  color={wallet.balance < 0 ? 'error.main' : 'text.primary'}
                >
                  Rp {Math.abs(wallet.balance).toLocaleString('id-ID')}
                </Typography>

                {/* NEGATIVE BALANCE TAG FOR CREDIT */}
                {wallet.balance < 0 && (
                  <Typography variant="body2" color="error.main">
                    Outstanding balance
                  </Typography>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem>Edit Wallet</MenuItem>
        <MenuItem>Delete Wallet</MenuItem>
      </Menu>

      <AddWalletDialog open={openDialog} onClose={() => setOpenDialog(false)} />

    </PageWrapper>
  );
}
