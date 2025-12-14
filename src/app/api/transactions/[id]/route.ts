import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: txId } = await params;
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

  const oldTx = await prisma.transaction.findFirst({
    where: { id: txId, userId: user.id },
  });

  if (!oldTx)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updatedTx = await prisma.$transaction(async (db) => {
    // -----------------------------
    // 1. ROLLBACK OLD
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
    // 2. APPLY NEW
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

    if (type === "TRANSFER") {
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
    // 3. UPDATE TX
    // -----------------------------
    return db.transaction.update({
      where: { id: txId },
      data: {
        title,
        amount: amount,
        type,
        date: new Date(date),
        note,
        walletId: type !== "TRANSFER" ? walletId : null,
        categoryId: type !== "TRANSFER" ? categoryId : null,
        fromWalletId: type === "TRANSFER" ? fromWalletId : null,
        toWalletId: type === "TRANSFER" ? toWalletId : null,
      },
    });
  });

  return NextResponse.json(updatedTx);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: txId } = await params;

  if (!txId) {
    return NextResponse.json(
      { error: "Transaction ID is required" },
      { status: 400 }
    );
  }

  const oldTx = await prisma.transaction.findFirst({
    where: {
      id: txId,
      userId: user.id,
    },
  });

  if (!oldTx) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  await prisma.$transaction(async (db) => {
    // =============================
    // ROLLBACK SALDO
    // =============================

    if (oldTx.type === "INCOME" && oldTx.walletId) {
      await db.wallet.update({
        where: { id: oldTx.walletId, userId: user.id },
        data: { balance: { decrement: oldTx.amount } },
      });
    }

    if (oldTx.type === "EXPENSE" && oldTx.walletId) {
      await db.wallet.update({
        where: { id: oldTx.walletId, userId: user.id },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });
    }

    if (
      (oldTx.type === "TRANSFER_IN" ||
        oldTx.type === "TRANSFER_OUT") &&
      oldTx.fromWalletId &&
      oldTx.toWalletId
    ) {
      await db.wallet.update({
        where: { id: oldTx.fromWalletId, userId: user.id },
        data: { balance: { increment: Math.abs(oldTx.amount) } },
      });

      await db.wallet.update({
        where: { id: oldTx.toWalletId, userId: user.id },
        data: { balance: { decrement: Math.abs(oldTx.amount) } },
      });
    }

    // =============================
    // DELETE TRANSACTION
    // =============================
    await db.transaction.delete({
      where: { id: txId },
    });
  });

  return NextResponse.json({ message: "Transaction deleted successfully" });
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: txId } = await params;

  const tx = await prisma.transaction.findFirst({
    where: {
      id: txId,
      userId: user.id,
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
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(tx);
}

