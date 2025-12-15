"use client";

import { useState } from "react";
// import { GAME_XP } from "@/config/game";
import { usePlayerProgress } from "./usePlayerProgress";

export type Quest = {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  rewardXP: number;
};

export function useQuestProgress() {
  const { gainXP } = usePlayerProgress();

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "q1",
      title: "No Jajan Hari Ini",
      description: "Tidak jajan selama 1 hari penuh",
      progress: 67,
      completed: false,
      rewardXP: 20,
    },
  ]);

  const completeQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id && !q.completed) {
          gainXP(q.rewardXP);
          return { ...q, completed: true, progress: 100 };
        }
        return q;
      })
    );
  };

  return {
    quests,
    completeQuest,
  };
}
