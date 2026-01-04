import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getAuthUser } from '@/libs/getAuthUser';

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );

  const body = await req.json();

  const {
    name,
    description,
    targetDate,
    mode,
    targetAmount,
    items = [],
  } = body;

  if (!name || !targetDate || !mode) {
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    );
  }

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

  const plan = await prisma.plan.create({
    data: {
      userId: user.id,
      name,
      description,
      targetDate: new Date(targetDate),
      mode,
      targetAmount: finalTarget,
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
  });

  return NextResponse.json(plan);
}

export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );

  const plans = await prisma.plan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });

  return NextResponse.json(plans);
}

