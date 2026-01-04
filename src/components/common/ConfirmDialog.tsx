"use client";

import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  onConfirm,
  onClose,
  loading = false,
  color = "error",
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  color?: "error" | "primary";
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* ICON */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor:
                color === "error"
                  ? "rgba(211,47,47,0.12)"
                  : "rgba(25,118,210,0.12)",
              color: `${color}.main`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon fontSize="large" />
          </Box>

          {/* TEXT */}
          <Stack spacing={1}>
            <Typography fontWeight={700} fontSize={18}>
              {title}
            </Typography>

            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {description}
              </Typography>
            )}
          </Stack>

          {/* ACTION */}
          <Stack direction="row" spacing={2} width="100%">
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
            >
              {cancelText}
            </Button>

            <Button
              fullWidth
              variant="contained"
              color={color}
              onClick={onConfirm}
              disabled={loading}
            >
              {confirmText}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
