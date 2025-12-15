"use client";

import {
  Card,
  Typography,
  Stack,
  LinearProgress,
  Chip,
  Box,
  Button,
} from "@mui/material";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type Props = {
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  rewardXP: number;
  onUnlock?: () => void;
};

export default function AchievementCard({
  title,
  description,
  progress,
  unlocked,
  rewardXP,
  onUnlock,
}: Props) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        opacity: unlocked ? 1 : 0.6,
        position: "relative",
      }}
    >
      <Stack spacing={2}>
        {/* HEADER */}
        <Stack direction="row" spacing={1} alignItems="center">
          {unlocked ? (
            <EmojiEventsRoundedIcon color="warning" />
          ) : (
            <LockRoundedIcon color="disabled" />
          )}
          <Typography fontWeight={800}>{title}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {/* PROGRESS */}
        {!unlocked && (
          <Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption">
              Progress {progress}%
            </Typography>
          </Box>
        )}

        {/* FOOTER */}
        <Stack direction="row" justifyContent="space-between">
          <Chip
            label={`+${rewardXP} XP`}
            color="success"
            size="small"
          />

          {unlocked ? (
            <Chip
              icon={<CheckCircleRoundedIcon />}
              label="Unlocked"
              color="success"
              size="small"
            />
          ) : (
            progress === 100 &&
            onUnlock && (
              <Button
                size="small"
                variant="contained"
                onClick={onUnlock}
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
