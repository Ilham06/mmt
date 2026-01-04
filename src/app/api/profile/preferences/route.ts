import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

const DEFAULT_PREF = {
  language: "id",
  theme: "light",
};

export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: { preferences: true },
  });

  return NextResponse.json(data?.preferences || DEFAULT_PREF);
}

export async function PUT(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pref = await req.json();

  await prisma.user.update({
    where: { id: user.id },
    data: { preferences: pref },
  });

  return NextResponse.json({ success: true });
}
