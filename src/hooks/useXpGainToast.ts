import { useState } from "react";

export function useXPGainQueue() {
  const [xp, setXP] = useState(0);
  const [visible, setVisible] = useState(false);

  const showXP = (amount: number) => {
    setXP(amount);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 1500);
  };

  return {
    xp,
    visible,
    showXP,
  };
}
