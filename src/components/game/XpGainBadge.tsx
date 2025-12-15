"use client";

import { Chip, Fade } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

export default function XPGainBadge({ xp }: { xp: number }) {
  return (
    <Fade in timeout={300}>
      <Chip
        icon={<TrendingUpRoundedIcon />}
        label={`+${xp} XP`}
        color="success"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          fontWeight: 700,
          zIndex: 9999,
        }}
      />
    </Fade>
  );
}
