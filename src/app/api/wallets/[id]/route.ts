import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await getAuthUser();
  
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallet = await prisma.wallet.findFirst({
    where: { id, userId: user.id },
    include: {
      transactions: {
        orderBy: { date: "desc" },
        take: 50,
      },
    },
  });

  if (!wallet)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(wallet);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await getAuthUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, balance, isPrimary } = await req.json();

  // Cek apakah wallet milik user
  const exists = await prisma.wallet.findFirst({
    where: { id, userId: user.id },
  });

  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Jika ganti primary → nonaktifkan lainnya
  if (isPrimary) {
    await prisma.wallet.updateMany({
      where: { userId: user.id, isPrimary: true },
      data: { isPrimary: false },
    });
  }

  const updated = await prisma.wallet.update({
    where: { id },
    data: { name, type, balance: Number(balance), isPrimary },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await getAuthUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const exists = await prisma.wallet.findFirst({
    where: { id, userId: user.id },
  });

  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.wallet.delete({ where: { id } });

  return NextResponse.json({ message: "Wallet deleted" });
}
