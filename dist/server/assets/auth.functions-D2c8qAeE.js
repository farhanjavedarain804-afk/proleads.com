import { d as createServerRpc, t as db, u as users } from "./db-CCkpHSzc.js";
import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { createRequire } from "module";
import { eq } from "drizzle-orm";
import { deleteCookie, getCookie, getEvent, setCookie } from "vinxi/http";
//#region src/lib/auth.functions.ts?tss-serverfn-split
var bcrypt = createRequire(import.meta.url)("bcryptjs");
var checkAuth_createServerFn_handler = createServerRpc({
	id: "c742807c24d8cf24409ab05ee479814cabfe4b92c8f6ea72847513d368654c35",
	name: "checkAuth",
	filename: "src/lib/auth.functions.ts"
}, (opts) => checkAuth.__executeServer(opts));
var checkAuth = createServerFn({ method: "GET" }).handler(checkAuth_createServerFn_handler, async () => {
	try {
		const sessionId = getCookie(getEvent(), "admin_session");
		if (!sessionId) return {
			ok: false,
			error: "Not authenticated"
		};
		const rows = await db.select({
			id: users.id,
			email: users.email
		}).from(users).where(eq(users.id, sessionId)).limit(1);
		if (!rows.length) return {
			ok: false,
			error: "User not found"
		};
		return {
			ok: true,
			user: {
				id: rows[0].id,
				email: rows[0].email
			}
		};
	} catch (e) {
		console.error("[checkAuth]", e?.message);
		return {
			ok: false,
			error: "Session error"
		};
	}
});
var login_createServerFn_handler = createServerRpc({
	id: "8df20e164b02e0f25b2f3ded46ca477870814adcef4eda397ae3f9dd4def87a1",
	name: "login",
	filename: "src/lib/auth.functions.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).validator((data) => data).handler(login_createServerFn_handler, async ({ data }) => {
	try {
		if (!data?.email || !data?.password) throw new Error("Email and password are required");
		const rows = await db.select().from(users).where(eq(users.email, data.email.trim().toLowerCase())).limit(1);
		if (!rows.length || !rows[0].passwordHash) throw new Error("Invalid credentials");
		const user = rows[0];
		if (!await bcrypt.compare(data.password, user.passwordHash)) throw new Error("Invalid credentials");
		setCookie(getEvent(), "admin_session", user.id, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge: 3600 * 24 * 7
		});
		return {
			ok: true,
			user: {
				id: user.id,
				email: user.email
			}
		};
	} catch (e) {
		console.error("[login]", e?.message);
		throw new Error(e?.message || "Login failed");
	}
});
var logout_createServerFn_handler = createServerRpc({
	id: "452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5",
	name: "logout",
	filename: "src/lib/auth.functions.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	try {
		deleteCookie(getEvent(), "admin_session", { path: "/" });
	} catch (e) {
		console.error("[logout]", e?.message);
	}
	return { ok: true };
});
//#endregion
export { checkAuth_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler };
