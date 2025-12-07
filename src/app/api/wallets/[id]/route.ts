import { getAuthUser } from "@/libs/getAuthUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const user = await getAuthUser(); // ← WAJIB AWAIT
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wallet = await prisma.wallet.findFirst({
    where: { id: params.id, userId: user.id },
  });

  if (!wallet) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(wallet);
}

export async function PUT(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, isPrimary } = await req.json();

  if (!name || !type) {
    return NextResponse.json({ error: "Name and type required" }, { status: 400 });
  }

  // If set primary, remove primary from others
  if (isPrimary) {
    await prisma.wallet.updateMany({
      where: { userId: user.id },
      data: { isPrimary: false },
    });
  }

  const wallet = await prisma.wallet.updateMany({
    where: { id: params.id, userId: user.id },
    data: { name, type, isPrimary },
  });

  return NextResponse.json(wallet);
}

export async function DELETE(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Prevent deleting primary wallet unless explicitly allowed
  const wallet = await prisma.wallet.findFirst({
    where: { id: params.id, userId: user.id },
  });

  if (!wallet) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Protect user from deleting the only wallet
  const walletCount = await prisma.wallet.count({
    where: { userId: user.id },
  });

  if (walletCount === 1) {
    return NextResponse.json({ error: "Cannot delete last wallet" }, { status: 400 });
  }

  await prisma.wallet.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Deleted" });
}


