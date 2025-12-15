"use client";

import { Achievement } from "@/hooks/useArchivements";
import Grid from "@mui/material/Grid";
import AchievementCard from "./ArchivementCard";

type Props = {
  achievements: Achievement[];
  onUnlock: (id: string) => void;
};

export default function AchievementGrid({
  achievements,
  onUnlock,
}: Props) {
  return (
    <Grid container spacing={2}>
      {achievements.map((a) => (
        <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <AchievementCard
            title={a.title}
            description={a.description}
            progress={a.progress}
            unlocked={a.unlocked}
            rewardXP={a.rewardXP}
            onUnlock={() => onUnlock(a.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
