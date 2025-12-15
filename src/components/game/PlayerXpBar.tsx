"use client";

import { Box, LinearProgress, Typography, Stack, Chip } from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

type Props = {
  level: number;
  currentXP: number;
  maxXP?: number;
};

export default function PlayerXPBar({
  level,
  currentXP,
  maxXP = 100,
}: Props) {
  const percent = (currentXP / maxXP) * 100;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        <Chip
          icon={<EmojiEventsRoundedIcon />}
          label={`Level ${level}`}
          color="primary"
          size="small"
        />

        <Typography variant="caption" color="text.secondary">
          {currentXP}/{maxXP} XP
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: "grey.200",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            background:
              "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
          },
        }}
      />
    </Box>
  );
}
