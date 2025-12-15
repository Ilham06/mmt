"use client";

import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";

type Props = {
  totalBudget: number;
  spent: number;
};

export default function BudgetHPBar({
  totalBudget,
  spent,
}: Props) {
  const remaining = Math.max(totalBudget - spent, 0);
  const percent = Math.max((remaining / totalBudget) * 100, 0);

  let color = "success.main";
  let label = "Safe";
  let icon = <FavoriteRoundedIcon />;

  if (percent <= 30) {
    color = "error.main";
    label = "Critical";
    icon = <WhatshotRoundedIcon />;
  } else if (percent <= 60) {
    color = "warning.main";
    label = "Warning";
    icon = <WarningAmberRoundedIcon />;
  }

  return (
    <Box>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <Typography fontWeight={800}>
            Budget HP
          </Typography>
        </Stack>

        <Chip
          label={label}
          size="small"
          sx={{
            bgcolor: color,
            color: "white",
            fontWeight: 700,
          }}
        />
      </Stack>

      {/* BAR */}
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 12,
          borderRadius: 6,
          bgcolor: "grey.300",
          "& .MuiLinearProgress-bar": {
            bgcolor: color,
            borderRadius: 6,
          },
        }}
      />

      {/* FOOTER */}
      <Typography
        variant="caption"
        color="text.secondary"
        mt={0.5}
        display="block"
      >
        Sisa Rp {remaining.toLocaleString("id-ID")} dari{" "}
        Rp {totalBudget.toLocaleString("id-ID")}
      </Typography>
    </Box>
  );
}
