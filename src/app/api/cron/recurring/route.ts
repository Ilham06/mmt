import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const now = new Date();

  const due = await prisma.recurringTransaction.findMany({
    where: {
      active: true,
      nextRun: { lte: now },
    },
  });

  for (const r of due) {
    // Create transaction
    await prisma.transaction.create({
      data: {
        userId: r.userId,
        title: r.title,
        amount: r.amount,
        type: r.type,
        date: r.nextRun,
        walletId: r.walletId,
        categoryId: r.categoryId,
      },
    });

    // Update wallet
    if (r.walletId) {
      await prisma.wallet.update({
        where: { id: r.walletId },
        data: {
          balance:
            r.type === "EXPENSE"
              ? { decrement: r.amount }
              : { increment: r.amount },
        },
      });
    }

    // Update nextRun
    const nextRun = calculateNextRun(r.nextRun, r.interval);

    await prisma.recurringTransaction.update({
      where: { id: r.id },
      data: { nextRun },
    });
  }

  return NextResponse.json({
    success: true,
    executed: due.length,
  });
}

function calculateNextRun(date: Date, interval: string) {
  const d = new Date(date);

  switch (interval) {
    case "DAILY":
      d.setDate(d.getDate() + 1);
      break;
    case "WEEKLY":
      d.setDate(d.getDate() + 7);
      break;
    case "MONTHLY":
      d.setMonth(d.getMonth() + 1);
      break;
    case "YEARLY":
      d.setFullYear(d.getFullYear() + 1);
      break;
  }

  return d;
}
