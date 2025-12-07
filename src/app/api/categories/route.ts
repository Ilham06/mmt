import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, icon, color } = await req.json();

  if (!name || !type || !icon || !color) {
    return NextResponse.json(
      { error: "Name, type, icon, and color are required" },
      { status: 400 }
    );
  }

  const exists = await prisma.category.findFirst({
    where: { name, userId: user.id },
  });

  if (exists)
    return NextResponse.json(
      { error: "Category name already exists" },
      { status: 400 }
    );

  const category = await prisma.category.create({
    data: {
      name,
      type,
      icon,
      color,
      userId: user.id,
    },
  });

  return NextResponse.json(category);
}
