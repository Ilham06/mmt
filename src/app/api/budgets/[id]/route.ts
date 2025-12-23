import { getAuthUser } from "@/libs/getAuthUser";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// ================= PUT =================
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const budget = await prisma.budget.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!budget) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }

  const updated = await prisma.budget.update({
    where: { id },
    data: {
      limit: body.limit ?? budget.limit,
    },
  });

  return NextResponse.json(updated);
}

// ================= DELETE =================
export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.budget.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
