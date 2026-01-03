import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.recurringTransaction.findMany({
    where: { userId: user.id },
    orderBy: { nextRun: "asc" },
    include: {
      category: true,
      wallet: true,
    },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    title,
    amount,
    type,
    interval,
    nextRun,
    categoryId,
    walletId,
  } = await req.json();

  if (!title || !amount || !type || !interval || !nextRun) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  const data = await prisma.recurringTransaction.create({
    data: {
      title,
      amount,
      type,
      interval,
      nextRun: new Date(nextRun),
      categoryId,
      walletId,
      userId: user.id,
    },
  });

  return NextResponse.json(data);
}
