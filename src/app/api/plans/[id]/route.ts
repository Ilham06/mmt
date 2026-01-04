import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getAuthUser } from '@/libs/getAuthUser';

/* =====================================================
   GET PLAN DETAIL
===================================================== */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing plan id' }, { status: 400 });
  }

  const plan = await prisma.plan.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  if (!plan) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
  }

  return NextResponse.json(plan);
}

/* =====================================================
   UPDATE PLAN
===================================================== */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing plan id' }, { status: 400 });
  }

  const body = await req.json();

  const {
    name,
    description,
    targetDate,
    mode,
    targetAmount,
    items = [],
  } = body;

  // 🧠 HITUNG TARGET FINAL
  const finalTarget =
    mode === 'BREAKDOWN'
      ? items.reduce(
          (sum: number, i: any) => sum + Number(i.amount || 0),
          0
        )
      : Number(targetAmount);

  if (!finalTarget || finalTarget <= 0) {
    return NextResponse.json(
      { error: 'Target amount invalid' },
      { status: 400 }
    );
  }

  // 🧹 HAPUS ITEM LAMA (AMAN)
  await prisma.planItem.deleteMany({
    where: { planId: id },
  });

  const updatedPlan = await prisma.plan.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      name,
      description,
      mode,
      targetAmount: finalTarget,
      targetDate: new Date(targetDate),
      items:
        mode === 'BREAKDOWN'
          ? {
              create: items.map((i: any) => ({
                name: i.name,
                amount: Number(i.amount),
              })),
            }
          : undefined,
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json(updatedPlan);
}

/* =====================================================
   DELETE PLAN
===================================================== */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing plan id' }, { status: 400 });
  }

  // 🧹 CASCADE MANUAL (AMAN)
  await prisma.planItem.deleteMany({
    where: { planId: id },
  });

  await prisma.plan.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
