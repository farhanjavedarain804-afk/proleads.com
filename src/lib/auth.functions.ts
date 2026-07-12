import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { setCookie, getCookie, deleteCookie } from "vinxi/http";
import bcrypt from "bcryptjs";

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const sessionUser = getCookie("admin_session");
  if (!sessionUser) return { ok: false, error: "Not authenticated" };
  
  try {
    const userId = sessionUser; // In a real app this should be signed/encrypted JWT
    const userResult = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
    
    if (!userResult.length) return { ok: false, error: "User not found" };
    return { ok: true, user: { id: userResult[0].id, email: userResult[0].email } };
  } catch (e) {
    return { ok: false, error: "Invalid session" };
  }
});

export const login = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const userResult = await db.select().from(schema.users).where(eq(schema.users.email, data.email)).limit(1);
    if (!userResult.length) throw new Error("Invalid credentials");
    
    const user = userResult[0];
    if (!user.passwordHash) throw new Error("Invalid credentials");
    
    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");
    
    setCookie("admin_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return { ok: true, user: { id: user.id, email: user.email } };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("admin_session");
  return { ok: true };
});
