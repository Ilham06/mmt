import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";
console.log(JWT_SECRET)

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
