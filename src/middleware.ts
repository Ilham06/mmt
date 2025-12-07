import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/libs/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/wallets", "/transactions", "/categories"];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (isProtected) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      verifyToken(token); // Now works on Node runtime!
    } catch {
      console.log("Token invalid");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (path === "/login" && token) {
    try {
      verifyToken(token);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/wallets/:path*",
    "/transactions/:path*",
    "/categories/:path*",
    "/login",
  ],
  runtime: "nodejs",
};
