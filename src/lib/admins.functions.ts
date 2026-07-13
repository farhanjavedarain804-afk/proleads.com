import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { createRequire } from "module";

const _req = createRequire(import.meta.url);
const bcrypt = _req("bcryptjs") as typeof import("bcryptjs");

export const listAdmins = createServerFn({ method: "GET" }).handler(async () => {
  const roles = await db.select().from(schema.userRoles);
  const users = await db.select().from(schema.users);

  const byUser = new Map<string, string[]>();
  for (const r of roles) {
    const list = byUser.get(r.userId) ?? [];
    list.push(r.role);
    byUser.set(r.userId, list);
  }

  const admins: Array<{ user_id: string; email: string | null; roles: string[]; created_at: string | null }> = [];
  for (const [userId, rs] of byUser.entries()) {
    if (!rs.includes("admin") && !rs.includes("super_admin")) continue;
    const user = users.find((u) => u.id === userId);
    admins.push({
      user_id: userId,
      email: user?.email ?? null,
      roles: rs,
      created_at: user?.createdAt?.toISOString() ?? null,
    });
  }
  admins.sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
  return admins;
});

export const createAdmin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string; superAdmin?: boolean }) => {
    if (!data.email || !data.email.includes("@")) throw new Error("Valid email required");
    if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
    return data;
  })
  .handler(async ({ data }) => {
    // Insert user (password_hash is placeholder — implement bcrypt in production)
    const { v4: uuidv4 } = await import("uuid");
    const userId = uuidv4();
    const hash = await bcrypt.hash(data.password, 10);
    await db.insert(schema.users).values({
      id: userId,
      email: data.email,
      passwordHash: hash,
    });

    const rolesToInsert: Array<typeof schema.userRoles.$inferInsert> = [
      { userId, role: "admin" },
    ];
    if (data.superAdmin) rolesToInsert.push({ userId, role: "super_admin" });
    await db.insert(schema.userRoles).values(rolesToInsert);

    return { ok: true, user_id: userId };
  });

export const deleteAdmin = createServerFn({ method: "POST" })
  .validator((data: { userId: string }) => {
    if (!data.userId) throw new Error("userId required");
    return data;
  })
  .handler(async ({ data }) => {
    await db.delete(schema.userRoles).where(eq(schema.userRoles.userId, data.userId));
    await db.delete(schema.users).where(eq(schema.users.id, data.userId));
    return { ok: true };
  });

export const resetAdminPassword = createServerFn({ method: "POST" })
  .validator((data: { userId: string; password: string }) => {
    if (!data.userId) throw new Error("userId required");
    if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
    return data;
  })
  .handler(async ({ data }) => {
    const hash = await bcrypt.hash(data.password, 10);
    await db.update(schema.users)
      .set({ passwordHash: hash })
      .where(eq(schema.users.id, data.userId));
    return { ok: true };
  });
