import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getAuthUser } from "@/libs/getAuthUser";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const valid = await bcrypt.compare(
    currentPassword,
    dbUser.password
  );

  if (!valid)
    return NextResponse.json(
      { error: "Password lama salah" },
      { status: 400 }
    );

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return NextResponse.json({ success: true });
}
