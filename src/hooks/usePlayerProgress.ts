"use client";

import { useState } from "react";

export function usePlayerProgress() {
  const [totalXP, setTotalXP] = useState(120);

  const level = Math.floor(totalXP / 100) + 1;
  const currentXP = totalXP % 100;

  const gainXP = (xp: number) => {
    setTotalXP((prev) => prev + xp);
  };

  return {
    level,
    currentXP,
    gainXP,
  };
}
