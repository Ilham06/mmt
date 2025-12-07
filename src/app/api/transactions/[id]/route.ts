import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function PUT(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const txId = params.id;
  const body = await req.json();

  const {
    title,
    amount,
    type,
    date,
    note,
    walletId,
    categoryId,
    fromWalletId,
    toWalletId,
  } = body;

  // Ambil transaksi lama
  const oldTx = await prisma.transaction.findFirst({
    where: { id: txId, userId: user.id },
  });

  if (!oldTx) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // RUN UPDATE DALAM TRANSAKSI DATABASE
  const updatedTx = await prisma.$transaction(async (db) => {
    // -----------------------------
    // 1) ROLLBACK saldo lama
    // -----------------------------
    if (oldTx.type === "INCOME") {
      await db.wallet.update({
        where: { id: oldTx.walletId! },
        data: { balance: { decrement: oldTx.amount } },
      });
    }

    if (oldTx.type === "EXPENSE") {
      await db.wallet.update({
        where: { id: oldTx.walletId! },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });
    }

    if (oldTx.type === "TRANSFER_IN" || oldTx.type === "TRANSFER_OUT") {
      await db.wallet.update({
        where: { id: oldTx.fromWalletId! },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });

      await db.wallet.update({
        where: { id: oldTx.toWalletId! },
        data: { balance: { decrement: Math.abs(oldTx.amount) } },
      });
    }

    // -----------------------------
    // 2) APPLY saldo baru
    // -----------------------------
    if (type === "INCOME") {
      await db.wallet.update({
        where: { id: walletId },
        data: { balance: { increment: amount } },
      });
    }

    if (type === "EXPENSE") {
      await db.wallet.update({
        where: { id: walletId },
        data: { balance: { decrement: Math.abs(amount) } },
      });
    }

    if (type === "TRANSFER_IN" || type === "TRANSFER_OUT") {
      await db.wallet.update({
        where: { id: fromWalletId },
        data: { balance: { decrement: Math.abs(amount) } },
      });

      await db.wallet.update({
        where: { id: toWalletId },
        data: { balance: { increment: Math.abs(amount) } },
      });
    }

    // -----------------------------
    // 3) UPDATE TRANSACTION BARU
    // -----------------------------
    return db.transaction.update({
      where: { id: txId },
      data: {
        title,
        amount: type === "EXPENSE" ? -Math.abs(amount) : amount,
        type,
        date: new Date(date),
        note,
        walletId: type === "INCOME" || type === "EXPENSE" ? walletId : null,
        categoryId: categoryId || null,
        fromWalletId: type.includes("TRANSFER") ? fromWalletId : null,
        toWalletId: type.includes("TRANSFER") ? toWalletId : null,
      },
    });
  });

  return NextResponse.json(updatedTx);
}

export async function DELETE(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const txId = params.id;

  const oldTx = await prisma.transaction.findFirst({
    where: { id: txId, userId: user.id },
  });

  if (!oldTx)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction(async (db) => {
    // Rollback saldo
    if (oldTx.type === "INCOME") {
      await db.wallet.update({
        where: { id: oldTx.walletId! },
        data: { balance: { decrement: oldTx.amount } },
      });
    }

    if (oldTx.type === "EXPENSE") {
      await db.wallet.update({
        where: { id: oldTx.walletId! },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });
    }

    if (oldTx.type.includes("TRANSFER")) {
      await db.wallet.update({
        where: { id: oldTx.fromWalletId! },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });

      await db.wallet.update({
        where: { id: oldTx.toWalletId! },
        data: { balance: { decrement: Math.abs(oldTx.amount) } },
      });
    }

    // Delete
    await db.transaction.delete({ where: { id: txId } });
  });

  return NextResponse.json({ message: "Deleted" });
}

export async function GET(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const txId = params.id;

  const tx = await prisma.transaction.findFirst({
    where: {
      id: txId,
      userId: user.id, // pastikan transaksi milik user
    },
    include: {
      category: true,
      wallet: true,
      fromWallet: true,
      toWallet: true,
      attachments: true,
    },
  });

  if (!tx) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json(tx);
}
