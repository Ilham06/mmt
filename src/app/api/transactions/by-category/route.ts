import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 1️⃣ Aggregate transaksi EXPENSE per category
  const grouped = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: {
      userId: user.id,
      type: "EXPENSE",
      categoryId: { not: null },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
    take: 5, // 👈 TOP 5 saja (dashboard)
  });

  if (grouped.length === 0) {
    return NextResponse.json([]);
  }

  // 2️⃣ Ambil metadata kategori
  const categories = await prisma.category.findMany({
    where: {
      id: { in: grouped.map((g) => g.categoryId!) },
    },
    select: {
      id: true,
      name: true,
      icon: true,
      color: true,
    },
  });

  // 3️⃣ Hitung total keseluruhan (buat percentage)
  const grandTotal = grouped.reduce(
    (sum, g) => sum + (g._sum.amount || 0),
    0
  );

  // 4️⃣ Gabungkan data
  const result = grouped.map((g) => {
    const cat = categories.find((c) => c.id === g.categoryId);

    const total = g._sum.amount || 0;
    const percentage =
      grandTotal > 0
        ? Math.round((total / grandTotal) * 100)
        : 0;

    return {
      categoryId: g.categoryId,
      name: cat?.name ?? "Unknown",
      icon: cat?.icon ?? "❓",
      color: cat?.color ?? "#CBD5E1",
      total,
      percentage,
    };
  });

  return NextResponse.json(result);
}
