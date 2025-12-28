import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dateParam = req.nextUrl.searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();

  const start = startOfDay(date);
  const end = endOfDay(date);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      date: { gte: start, lte: end },
    },
    include: {
      category: true,
      wallet: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  let income = 0;
  let expense = 0;
  const categoryMap: Record<string, { total: number; name: string; icon: string }> = {};

  transactions.forEach((trx) => {
    if (trx.type === "INCOME") {
      income += trx.amount;
    }

    if (trx.type === "EXPENSE") {
      expense += trx.amount;

      if (trx.category) {
        if (!categoryMap[trx.category.id]) {
          categoryMap[trx.category.id] = {
            total: 0,
            name: trx.category.name,
            icon: trx.category.icon,
          };
        }
        categoryMap[trx.category.id].total += trx.amount;
      }
    }
  });

  const topCategory = Object.values(categoryMap).sort(
    (a, b) => b.total - a.total
  )[0];

  let mood: "GOOD" | "OK" | "BAD" = "OK";
  if (expense <= income) mood = "GOOD";
  else if (expense > income * 1.2) mood = "BAD";

  return NextResponse.json({
    date: start.toISOString(),
    income,
    expense,
    mood,
    topCategory: topCategory
      ? { name: topCategory.name, icon: topCategory.icon }
      : null,
    transactions,
  });
}
