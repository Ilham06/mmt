import { getAuthUser } from "@/libs/getAuthUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { categoryId, limit, period } = body;

  if (!categoryId || !limit) {
    return NextResponse.json(
      { error: "Category & limit wajib diisi" },
      { status: 400 }
    );
  }

  // Pastikan kategori milik user & EXPENSE
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId: user.id,
      type: "EXPENSE",
    },
  });

  if (!category) {
    return NextResponse.json(
      { error: "Kategori tidak valid" },
      { status: 400 }
    );
  }

  // Cegah duplicate budget (1 kategori per periode)
  const exists = await prisma.budget.findFirst({
    where: {
      userId: user.id,
      categoryId,
      period: period ?? "MONTHLY",
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: "Budget kategori ini sudah ada" },
      { status: 400 }
    );
  }

  const budget = await prisma.budget.create({
    data: {
      userId: user.id,
      categoryId,
      limit,
      period: period ?? "MONTHLY",
    },
  });

  return NextResponse.json(budget);
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const budgets = await prisma.budget.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(budgets);
}
