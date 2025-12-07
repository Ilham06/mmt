import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

// ================= GET CATEGORY DETAIL =================

export async function GET(req: Request, { params }: any) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const category = await prisma.category.findFirst({
    where: { id: params.id, userId: user.id },
  });

  if (!category)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(category);
}

// ================= UPDATE CATEGORY =================

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ⬅ FIX TERPENTING
  
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, icon, color } = await req.json();

  // Cek ownership
  const exists = await prisma.category.findFirst({
    where: { id, userId: user.id },
  });

  if (!exists)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Update
  const updated = await prisma.category.update({
    where: { id },
    data: { name, type, icon, color },
  });

  return NextResponse.json(updated);
}



// ================= DELETE CATEGORY =================

export async function DELETE(req: Request,  context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Cegah delete jika masih dipakai
  const usedInTransactions = await prisma.transaction.count({
    where: { categoryId: id, wallet: { userId: user.id } }
  });

  const usedInBudget = await prisma.budget.count({
    where: { categoryId: id }
  });

  const usedInRecurring = await prisma.recurringTransaction.count({
    where: { categoryId: id }
  });

  if (usedInTransactions + usedInBudget + usedInRecurring > 0) {
    return NextResponse.json(
      { error: "Category is used in transactions or budgets, cannot delete" },
      { status: 400 }
    );
  }

  await prisma.category.delete({
    where: { id: id },
  });

  return NextResponse.json({ message: "Deleted" });
}
