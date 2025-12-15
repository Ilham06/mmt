"use client";

export function useBudgetStatus(totalBudget: number, spent: number) {
  const remaining = Math.max(totalBudget - spent, 0);
  const percent = Math.max((remaining / totalBudget) * 100, 0);

  let status: "safe" | "warning" | "critical" = "safe";

  if (percent <= 30) status = "critical";
  else if (percent <= 60) status = "warning";

  return {
    remaining,
    percent,
    status,
  };
}
