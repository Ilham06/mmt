import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getAuthUser } from '@/libs/getAuthUser';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: planId } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!planId) {
    return NextResponse.json(
      { error: 'Missing plan id' },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { amount, walletId, note } = body;

  if (!amount || amount <= 0 || !walletId) {
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    );
  }

  // ================= VALIDASI =================
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId: user.id,
    },
  });

  if (!wallet) {
    return NextResponse.json(
      { error: 'Wallet not found' },
      { status: 404 }
    );
  }

  if (wallet.balance < amount) {
    return NextResponse.json(
      { error: 'Saldo tidak mencukupi' },
      { status: 400 }
    );
  }

  const plan = await prisma.plan.findFirst({
    where: {
      id: planId,
      userId: user.id,
    },
  });

  if (!plan) {
    return NextResponse.json(
      { error: 'Plan not found' },
      { status: 404 }
    );
  }

  // ================= TRANSACTION ATOMIC =================
  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Kurangi saldo wallet
    await tx.wallet.update({
      where: { id: walletId },
      data: {
        balance: { decrement: amount },
      },
    });

    // 2️⃣ Catat transaksi
    await tx.transaction.create({
      data: {
        userId: user.id,
        title: `Tabungan: ${plan.name}`,
        amount,
        type: 'EXPENSE',
        date: new Date(),
        walletId,
        note,
      },
    });

    // 3️⃣ Catat saving plan
    await tx.planSaving.create({
      data: {
        userId: user.id,
        planId,
        walletId,
        amount,
        note,
      },
    });

    // 4️⃣ Update progress plan
    return tx.plan.update({
      where: { id: planId },
      data: {
        currentAmount: { increment: amount },
      },
    });
  });

  return NextResponse.json(result);
}
