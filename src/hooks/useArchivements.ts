"use client";

import { useState } from "react";
import { usePlayerProgress } from "./usePlayerProgress";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  rewardXP: number;
};

export function useAchievement() {
  const { gainXP } = usePlayerProgress();

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "a1",
      title: "Langkah Pertama",
      description: "Tambah transaksi pertama",
      progress: 100,
      unlocked: true,
      rewardXP: 20,
    },
    {
      id: "a2",
      title: "Hemat Itu Keren",
      description: "Tidak jajan 3 hari berturut-turut",
      progress: 67,
      unlocked: false,
      rewardXP: 50,
    },
    {
      id: "a3",
      title: "Dompet Warrior",
      description: "Total expense di bawah 1 juta",
      progress: 30,
      unlocked: false,
      rewardXP: 100,
    },
  ]);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === id && !a.unlocked) {
          gainXP(a.rewardXP);
          return { ...a, unlocked: true, progress: 100 };
        }
        return a;
      })
    );
  };

  return {
    achievements,
    unlockAchievement,
  };
}
