import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";

/* DEFAULT STRUCTURE */
const DEFAULT_NOTIFICATION = {
  transaction: true,
  reminder: true,
  email: false,
};

export async function GET() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: { notificationSettings: true },
  });

  return NextResponse.json(
    data?.notificationSettings || DEFAULT_NOTIFICATION
  );
}

export async function PUT(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await req.json();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      notificationSettings: settings,
    },
  });

  return NextResponse.json({ success: true });
}
