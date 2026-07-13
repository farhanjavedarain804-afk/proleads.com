import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { createRequire } from "module";

const _require = createRequire(import.meta.url);
// Use require() so bcryptjs is loaded as pure CJS, bypassing ESM interop issues in the bundle
const bcrypt = _require("bcryptjs") as typeof import("bcryptjs");

// Helper: safely get H3 event — returns null if outside server request context
function safeGetEvent() {
  try {
    // vinxi/http getEvent throws if called outside an H3 request context
    const { getEvent } = _require("vinxi/http") as typeof import("vinxi/http");
    const event = getEvent();
    return event ?? null;
  } catch {
    return null;
  }
}

// Helper: safely read a cookie — returns null if not in a server context
function safeGetCookie(name: string): string | null {
  try {
    const event = safeGetEvent();
    if (!event) return null;
    const { getCookie } = _require("vinxi/http") as typeof import("vinxi/http");
    return getCookie(event, name) ?? null;
  } catch {
    return null;
  }
}

// Helper: safely set a cookie — noop if not in a server context
function safeSetCookie(name: string, value: string, options: Record<string, unknown>) {
  try {
    const event = safeGetEvent();
    if (!event) return;
    const { setCookie } = _require("vinxi/http") as typeof import("vinxi/http");
    setCookie(event, name, value, options as any);
  } catch {
    // ignore
  }
}

// Helper: safely delete a cookie — noop if not in a server context
function safeDeleteCookie(name: string) {
  try {
    const event = safeGetEvent();
    if (!event) return;
    const { deleteCookie } = _require("vinxi/http") as typeof import("vinxi/http");
    deleteCookie(event, name);
  } catch {
    // ignore
  }
}

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sessionUser = safeGetCookie("admin_session");
    if (!sessionUser) return { ok: false as const, error: "Not authenticated" };

    const userResult = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, sessionUser))
      .limit(1);

    if (!userResult.length) return { ok: false as const, error: "User not found" };

    return {
      ok: true as const,
      user: { id: userResult[0].id, email: userResult[0].email },
    };
  } catch (e: any) {
    console.error("[checkAuth] Error:", e?.message);
    return { ok: false as const, error: "Session check failed" };
  }
});

export const login = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { email: string; password: string })
  .handler(async ({ data }) => {
    try {
      if (!data?.email || !data?.password) {
        throw new Error("Email and password are required");
      }

      const userResult = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, data.email))
        .limit(1);

      if (!userResult.length) throw new Error("Invalid credentials");

      const user = userResult[0];
      if (!user.passwordHash) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) throw new Error("Invalid credentials");

      // Set cookie without the "secure" option so it works on both HTTP/HTTPS and environments behind reverse proxies
      safeSetCookie("admin_session", user.id, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { ok: true as const, user: { id: user.id, email: user.email } };
    } catch (e: any) {
      console.error("[login] Error:", e?.message);
      throw new Error(e?.message || "Login failed");
    }
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  try {
    safeDeleteCookie("admin_session");
  } catch {
    // ignore
  }
  return { ok: true as const };
});
