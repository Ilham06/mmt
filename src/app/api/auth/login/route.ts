import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { verifyPassword, signToken } from "@/libs/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = signToken({ id: user.id, email: user.email });

    const res = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // LOCALHOST → MUST BE FALSE!
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });


    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
