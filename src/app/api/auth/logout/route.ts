import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Hapus cookie token
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: false, // local
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return res;
}
