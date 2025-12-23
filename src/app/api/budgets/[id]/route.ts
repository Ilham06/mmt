import { getAuthUser } from "@/libs/getAuthUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const budget = await prisma.budget.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  if (!budget) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }

  const updated = await prisma.budget.update({
    where: { id: params.id },
    data: {
      limit: body.limit ?? budget.limit,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.budget.deleteMany({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
