"use client";

import {
  Card,
  Typography,
  LinearProgress,
  Stack,
  Button,
  Chip,
  Box,
} from "@mui/material";

import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type Props = {
  title: string;
  description: string;
  progress: number;
  rewardXP: number;
  completed?: boolean;
  onComplete?: () => void;
};

export default function QuestCard({
  title,
  description,
  progress,
  rewardXP,
  completed = false,
  onComplete,
}: Props) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        position: "relative",
        opacity: completed ? 0.7 : 1,
      }}
    >
      <Stack spacing={2}>
        {/* HEADER */}
        <Stack direction="row" spacing={1} alignItems="center">
          <FlagRoundedIcon color="primary" />
          <Typography fontWeight={800}>{title}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {/* PROGRESS */}
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary">
            Progress {progress}%
          </Typography>
        </Box>

        {/* FOOTER */}
        <Stack direction="row" justifyContent="space-between">
          <Chip
            label={`+${rewardXP} XP`}
            color="success"
            size="small"
          />

          {completed ? (
            <Chip
              icon={<CheckCircleRoundedIcon />}
              label="Completed"
              color="success"
              size="small"
            />
          ) : (
            onComplete && (
              <Button
                size="small"
                variant="contained"
                onClick={onComplete}
              >
                Claim
              </Button>
            )
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
