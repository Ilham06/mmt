import { getAuthUser } from "@/libs/getAuthUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const budgets = await prisma.budget.findMany({
    where: { userId: user.id },
    include: { category: true },
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const result = await Promise.all(
    budgets.map(async (b) => {
      const sum = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          userId: user.id,
          categoryId: b.categoryId,
          type: "EXPENSE",
          date: { gte: startOfMonth },
        },
      });

      const used = sum._sum.amount ?? 0;
      const percent = (used / b.limit) * 100;

      let status: "SAFE" | "WARNING" | "CRITICAL" = "SAFE";
      if (percent >= 90) status = "CRITICAL";
      else if (percent >= 60) status = "WARNING";

      return {
        id: b.id,
        category: b.category.name,
        icon: b.category.icon,
        color: b.category.color,
        limit: b.limit,
        used,
        remaining: Math.max(b.limit - used, 0),
        percent: Math.min(percent, 100),
        status,
      };
    })
  );

  return NextResponse.json(result);
}
