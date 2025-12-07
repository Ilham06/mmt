import { hashPassword } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return NextResponse.json({
      message: "Registration successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
