'use client';

import {
  Box,
  Breadcrumbs,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import MotionButton from '../motions/MotionButton';
import React from 'react';

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
  actions?: ActionButton[] | ActionButton;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const actionButtons = Array.isArray(actions)
    ? actions
    : actions
    ? [actions]
    : [];

  /* ================= ACTION RENDERER ================= */
  const renderActions = (fullWidth = false) => (
    <Stack direction="row" spacing={1} width={fullWidth ? '100%' : 'auto'}>
      {actionButtons.map((btn, idx) => {
        const ButtonEl = (
          <MotionButton
            key={idx}
            variant={btn.variant || 'contained'}
            startIcon={btn.icon || <AddIcon />}
            fullWidth={fullWidth}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: fullWidth ? 2 : 2,
            }}
            onClick={btn.onClick}
          >
            {btn.label}
          </MotionButton>
        );

        return btn.href ? (
          <Link
            key={idx}
            href={btn.href}
            style={{ textDecoration: 'none', width: fullWidth ? '100%' : 'auto' }}
          >
            {ButtonEl}
          </Link>
        ) : (
          ButtonEl
        );
      })}
    </Stack>
  );

  return (
    <Box>
      {/* ================= TITLE (DESKTOP + MOBILE) ================= */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          fontWeight={700}
          sx={{ wordBreak: 'break-word' }}
        >
          {title}
        </Typography>

        {/* ACTIONS — DESKTOP ONLY */}
        {!isMobile && actionButtons.length > 0 && renderActions()}
      </Stack>

      {/* ================= BREADCRUMB ================= */}
      <Breadcrumbs
        separator="›"
        sx={{
          mb: 1.5,
          fontSize: isMobile ? 12 : 14,
          color: 'text.secondary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          href="/dashboard"
          style={{ textDecoration: 'none', color: '#637381' }}
        >
          Dashboard
        </Link>

        {(isMobile ? segments.slice(-1) : segments).map((seg, index, arr) => {
          const label = seg.charAt(0).toUpperCase() + seg.slice(1);
          const realIndex = isMobile ? segments.length - 1 : index;

          const href = '/' + segments.slice(0, realIndex + 1).join('/');
          const isLast =
            (isMobile && index === arr.length - 1) ||
            (!isMobile && realIndex === segments.length - 1);

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

      {/* ================= ACTIONS — MOBILE ONLY (UNDER BREADCRUMB) ================= */}
      {isMobile && actionButtons.length > 0 && (
        <Box mb={2}>{renderActions(true)}</Box>
      )}

      {/* ================= CONTENT ================= */}
      <Box>{children}</Box>
    </Box>
  );
}
