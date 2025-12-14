import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  const walletId = searchParams.get("wallet") || undefined;
  const categoryId = searchParams.get("category") || undefined;

  const typeParam = searchParams.get("type");
  const type = typeParam && ["INCOME", "EXPENSE", "TRANSFER_IN", "TRANSFER_OUT"].includes(typeParam)
    ? typeParam as any
    : undefined;


  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const keyword = searchParams.get("q") || "";

  const transactions = await prisma.transaction.findMany({
    where: {
      wallet: { userId: user.id },
      walletId,
      categoryId,
      type,
      date: startDate && endDate ? {
        gte: new Date(startDate),
        lte: new Date(endDate)
      } : undefined,
      OR: keyword ? [
        { title: { contains: keyword, mode: "insensitive" } },
        { note: { contains: keyword, mode: "insensitive" } }
      ] : undefined
    },
    orderBy: { date: "desc" },
    include: {
      category: true,
      wallet: true,
    }
  });

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    title,
    amount,
    type,
    walletId,
    categoryId,
    date,
    note,
    fromWalletId,
    toWalletId,
  } = await req.json();

  if (!title || !type || !date) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // --- VALIDASI TRANSFER ---
  if (type === "TRANSFER_IN" || type === "TRANSFER_OUT") {
    if (!fromWalletId || !toWalletId) {
      return NextResponse.json(
        { error: "Transfer must include fromWalletId and toWalletId" },
        { status: 400 }
      );
    }

    if (fromWalletId === toWalletId) {
      return NextResponse.json(
        { error: "Cannot transfer to same wallet" },
        { status: 400 }
      );
    }
  }

  const tx = await prisma.$transaction(async (tx) => {
    let newTx;

    // ================================
    // INCOME
    // ================================
    if (type === "INCOME") {
      newTx = await tx.transaction.create({
        data: {
          title,
          amount,
          type,
          date: new Date(date),
          note,
          categoryId,
          walletId,
          userId: user.id,
        },
      });

      await tx.wallet.update({
        where: { id: walletId },
        data: { balance: { increment: amount } },
      });
    }

    // ================================
    // EXPENSE
    // ================================
    else if (type === "EXPENSE") {
      newTx = await tx.transaction.create({
        data: {
          title,
          amount: Math.abs(amount),
          type,
          date: new Date(date),
          note,
          categoryId,
          walletId,
          userId: user.id,
        },
      });

      await tx.wallet.update({
        where: { id: walletId },
        data: { balance: { decrement: Math.abs(amount) } },
      });
    }

    // ================================
    // TRANSFER
    // ================================
    else {
      newTx = await tx.transaction.create({
        data: {
          title: title || "Transfer",
          amount,
          type,
          date: new Date(date),
          note,
          fromWalletId,
          toWalletId,
          userId: user.id,
        },
      });

      // Kurangi sumber
      await tx.wallet.update({
        where: { id: fromWalletId },
        data: { balance: { decrement: Math.abs(amount) } },
      });

      // Tambahkan tujuan
      await tx.wallet.update({
        where: { id: toWalletId },
        data: { balance: { increment: Math.abs(amount) } },
      });
    }

    return newTx;
  });

  return NextResponse.json(tx);
}

