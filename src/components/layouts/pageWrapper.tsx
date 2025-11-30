'use client';

import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}

export default function PageWrapper({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ActionButton[] | ActionButton; // single or multiple
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Normalize actions → always array
  const actionButtons = Array.isArray(actions)
    ? actions
    : actions
    ? [actions]
    : [];

  return (
    <Box>

      {/* =============================== */}
      {/* TITLE + ACTIONS */}
      {/* =============================== */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        {/* TITLE */}
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>

        {/* ACTION BUTTON(S) */}
        {actionButtons.length > 0 && (
          <Stack direction="row" spacing={1}>
            {actionButtons.map((btn, idx) => {
              const Btn = (
                <Button
                  key={idx}
                  variant={btn.variant || 'contained'}
                  startIcon={btn.icon || <AddIcon />}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              );

              return btn.href ? (
                <Link key={idx} href={btn.href} style={{ textDecoration: 'none' }}>
                  {Btn}
                </Link>
              ) : (
                Btn
              );
            })}
          </Stack>
        )}
      </Stack>

      {/* =============================== */}
      {/* BREADCRUMB */}
      {/* =============================== */}
      <Breadcrumbs
        separator="›"
        sx={{
          mb: 3,
          fontSize: 14,
          color: 'text.secondary',
        }}
      >
        <Link
          href="/dashboard"
          style={{ textDecoration: 'none', color: '#637381' }}
        >
          Dashboard
        </Link>

        {segments.map((seg, index) => {
          const label = seg.charAt(0).toUpperCase() + seg.slice(1);
          const href = '/' + segments.slice(0, index + 1).join('/');

          const isLast = index === segments.length - 1;

          return (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: 'none',
                color: isLast ? '#000' : '#637381',
                fontWeight: isLast ? 600 : 500,
              }}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>

      {/* =============================== */}
      {/* PAGE CONTENT */}
      {/* =============================== */}
      <Box>{children}</Box>
    </Box>
  );
}
