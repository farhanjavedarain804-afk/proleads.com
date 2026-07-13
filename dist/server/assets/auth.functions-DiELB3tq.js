import { d as createServerRpc, t as db, u as users } from "./db-BFVvpbdh.js";
import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { deleteCookie, getCookie, setCookie } from "vinxi/http";
//#region src/lib/auth.functions.ts?tss-serverfn-split
var checkAuth_createServerFn_handler = createServerRpc({
	id: "c742807c24d8cf24409ab05ee479814cabfe4b92c8f6ea72847513d368654c35",
	name: "checkAuth",
	filename: "src/lib/auth.functions.ts"
}, (opts) => checkAuth.__executeServer(opts));
var checkAuth = createServerFn({ method: "GET" }).handler(checkAuth_createServerFn_handler, async () => {
	const sessionUser = getCookie("admin_session");
	if (!sessionUser) return {
		ok: false,
		error: "Not authenticated"
	};
	try {
		const userId = sessionUser;
		const userResult = await db.select().from(users).where(eq(users.id, userId)).limit(1);
		if (!userResult.length) return {
			ok: false,
			error: "User not found"
		};
		return {
			ok: true,
			user: {
				id: userResult[0].id,
				email: userResult[0].email
			}
		};
	} catch (e) {
		return {
			ok: false,
			error: "Invalid session"
		};
	}
});
var login_createServerFn_handler = createServerRpc({
	id: "8df20e164b02e0f25b2f3ded46ca477870814adcef4eda397ae3f9dd4def87a1",
	name: "login",
	filename: "src/lib/auth.functions.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).validator((data) => data).handler(login_createServerFn_handler, async ({ data }) => {
	const userResult = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
	if (!userResult.length) throw new Error("Invalid credentials");
	const user = userResult[0];
	if (!user.passwordHash) throw new Error("Invalid credentials");
	if (!await bcrypt.compare(data.password, user.passwordHash)) throw new Error("Invalid credentials");
	setCookie("admin_session", user.id, {
		httpOnly: true,
		secure: true,
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
});
var logout_createServerFn_handler = createServerRpc({
	id: "452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5",
	name: "logout",
	filename: "src/lib/auth.functions.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	deleteCookie("admin_session");
	return { ok: true };
});
//#endregion
export { checkAuth_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler };
