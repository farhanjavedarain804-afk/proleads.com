import { createServerFn } from "@tanstack/react-start";
import { getEvent, getCookie, setCookie, deleteCookie } from "vinxi/http";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { createRequire } from "module";

// bcryptjs is a pure-CJS package — use createRequire to bypass ESM interop issues
const _require = createRequire(import.meta.url);
const bcrypt = _require("bcryptjs") as typeof import("bcryptjs");

// ─── checkAuth ────────────────────────────────────────────────────────────────
export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const event = getEvent();
    const sessionId = getCookie(event, "admin_session");
    if (!sessionId) return { ok: false as const, error: "Not authenticated" };

    const rows = await db
      .select({ id: schema.users.id, email: schema.users.email })
      .from(schema.users)
      .where(eq(schema.users.id, sessionId))
      .limit(1);

    if (!rows.length) return { ok: false as const, error: "User not found" };

    return { ok: true as const, user: { id: rows[0].id, email: rows[0].email } };
  } catch (e: any) {
    console.error("[checkAuth]", e?.message);
    return { ok: false as const, error: "Session error" };
  }
});

// ─── login ────────────────────────────────────────────────────────────────────
export const login = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { email: string; password: string })
  .handler(async ({ data }) => {
    try {
      if (!data?.email || !data?.password) {
        throw new Error("Email and password are required");
      }

      const rows = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, data.email.trim().toLowerCase()))
        .limit(1);

      if (!rows.length || !rows[0].passwordHash) {
        throw new Error("Invalid credentials");
      }

      const user = rows[0];
      const match = await bcrypt.compare(data.password, user.passwordHash);
      if (!match) throw new Error("Invalid credentials");

      // Set the session cookie on the H3 response
      const event = getEvent();
      setCookie(event, "admin_session", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { ok: true as const, user: { id: user.id, email: user.email } };
    } catch (e: any) {
      console.error("[login]", e?.message);
      throw new Error(e?.message || "Login failed");
    }
  });

// ─── logout ───────────────────────────────────────────────────────────────────
export const logout = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const event = getEvent();
    deleteCookie(event, "admin_session", { path: "/" });
  } catch (e: any) {
    console.error("[logout]", e?.message);
  }
  return { ok: true as const };
});
