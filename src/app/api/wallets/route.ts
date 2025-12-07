import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

// ===========================
// GET ALL WALLETS
// ===========================
export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallets = await prisma.wallet.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(wallets);
}

// ===========================
// CREATE WALLET
// ===========================
export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, balance, isPrimary } = await req.json();

  // Jika user membuat wallet primary baru → nonaktifkan primary lama
  if (isPrimary) {
    await prisma.wallet.updateMany({
      where: { userId: user.id, isPrimary: true },
      data: { isPrimary: false },
    });
  }

  const wallet = await prisma.wallet.create({
    data: {
      name,
      type,
      balance: Number(balance) ?? 0,
      isPrimary: !!isPrimary,
      userId: user.id,
    },
  });

  return NextResponse.json(wallet);
}
