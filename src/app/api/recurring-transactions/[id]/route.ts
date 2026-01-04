import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rtId } = await params;
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // 1️⃣ AUTH & OWNERSHIP CHECK
  const existing = await prisma.recurringTransaction.findFirst({
    where: {
      id: rtId,
      userId: user.id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  // 2️⃣ NORMALISASI DATE
  const data = await prisma.recurringTransaction.update({
    where: { id: rtId }, // ✅ UNIQUE ONLY
    data: {
      ...body,
      nextRun: body.nextRun
        ? new Date(body.nextRun)
        : existing.nextRun,
    },
  });

  return NextResponse.json(data);
}
