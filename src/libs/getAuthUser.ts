import { cookies } from "next/headers";
import { verifyToken } from "./auth";

export async function getAuthUser() {
  const cookieStore = await cookies(); // ← WAJIB await
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = verifyToken(token);
    return decoded; // berisi user.id, user.email
  } catch (e) {
    return null;
  }
}
