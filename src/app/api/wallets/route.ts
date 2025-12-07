import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET() {
  const user = await getAuthUser(); // ← WAJIB AWAIT
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallets = await prisma.wallet.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(wallets);
}

export async function POST(req: Request) {
  const user = await getAuthUser(); // ← WAJIB AWAIT
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, isPrimary } = await req.json();

  if (!name || !type) {
    return NextResponse.json({ error: "Name and type required" }, { status: 400 });
  }

  // If new primary wallet is created → unset old ones
  if (isPrimary) {
    await prisma.wallet.updateMany({
      where: { userId: user.id },
      data: { isPrimary: false },
    });
  }

  const wallet = await prisma.wallet.create({
    data: {
      name,
      type,
      isPrimary: !!isPrimary,
      userId: user.id, // ← userId VALID
    },
  });

  return NextResponse.json(wallet);
}
