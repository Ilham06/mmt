import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  const walletId = searchParams.get("wallet") || undefined;
  const categoryId = searchParams.get("category") || undefined;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const dateFilter =
    startDate && endDate
      ? {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      : undefined;

  // =============================
  // BASE WHERE (AMAN)
  // =============================
  const baseWhere: any = {
    userId: user.id,
    date: dateFilter,
  };

  // =============================
  // INCOME
  // =============================
  const income = await prisma.transaction.aggregate({
    where: {
      ...baseWhere,
      type: "INCOME",
      walletId,
      categoryId,
    },
    _sum: { amount: true },
    _count: true,
  });

  // =============================
  // EXPENSE
  // =============================
  const expense = await prisma.transaction.aggregate({
    where: {
      ...baseWhere,
      type: "EXPENSE",
      walletId,
      categoryId,
    },
    _sum: { amount: true },
    _count: true,
  });

  // =============================
  // TRANSFER (IN + OUT)
  // =============================
  const transferIn = await prisma.transaction.aggregate({
    where: {
      ...baseWhere,
      type: "TRANSFER_IN",
      toWalletId: walletId,
    },
    _sum: { amount: true },
    _count: true,
  });

  const transferOut = await prisma.transaction.aggregate({
    where: {
      ...baseWhere,
      type: "TRANSFER_OUT",
      fromWalletId: walletId,
    },
    _sum: { amount: true },
    _count: true,
  });

  // =============================
  // FINAL RESPONSE
  // =============================
  return NextResponse.json({
    totalIncome: income._sum.amount || 0,
    totalExpense: expense._sum.amount || 0,
    totalTransfer:
      (transferIn._sum.amount || 0) + (transferOut._sum.amount || 0),

    incomeCount: income._count,
    expenseCount: expense._count,
    transferCount: transferIn._count + transferOut._count,

    count:
      income._count +
      expense._count +
      transferIn._count +
      transferOut._count,
  });
}
