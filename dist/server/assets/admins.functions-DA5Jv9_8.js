import { d as createServerRpc, l as userRoles, t as db, u as users } from "./db-C6ZEXB-E.js";
import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
//#region src/lib/admins.functions.ts?tss-serverfn-split
var listAdmins_createServerFn_handler = createServerRpc({
	id: "107006364cdee73930754d5e03e7d2892ae9886b96d2d356e1cd6474c0cabc22",
	name: "listAdmins",
	filename: "src/lib/admins.functions.ts"
}, (opts) => listAdmins.__executeServer(opts));
var listAdmins = createServerFn({ method: "GET" }).handler(listAdmins_createServerFn_handler, async () => {
	const roles = await db.select().from(userRoles);
	const users$1 = await db.select().from(users);
	const byUser = /* @__PURE__ */ new Map();
	for (const r of roles) {
		const list = byUser.get(r.userId) ?? [];
		list.push(r.role);
		byUser.set(r.userId, list);
	}
	const admins = [];
	for (const [userId, rs] of byUser.entries()) {
		if (!rs.includes("admin") && !rs.includes("super_admin")) continue;
		const user = users$1.find((u) => u.id === userId);
		admins.push({
			user_id: userId,
			email: user?.email ?? null,
			roles: rs,
			created_at: user?.createdAt?.toISOString() ?? null
		});
	}
	admins.sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
	return admins;
});
var createAdmin_createServerFn_handler = createServerRpc({
	id: "0d737a506253be8b1bcf8f03a5c4b274ed25f812eb48158a328a25da51d389c9",
	name: "createAdmin",
	filename: "src/lib/admins.functions.ts"
}, (opts) => createAdmin.__executeServer(opts));
var createAdmin = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.email || !data.email.includes("@")) throw new Error("Valid email required");
	if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
	return data;
}).handler(createAdmin_createServerFn_handler, async ({ data }) => {
	const { v4: uuidv4 } = await import("uuid");
	const userId = uuidv4();
	const hash = await bcrypt.hash(data.password, 10);
	await db.insert(users).values({
		id: userId,
		email: data.email,
		passwordHash: hash
	});
	const rolesToInsert = [{
		userId,
		role: "admin"
	}];
	if (data.superAdmin) rolesToInsert.push({
		userId,
		role: "super_admin"
	});
	await db.insert(userRoles).values(rolesToInsert);
	return {
		ok: true,
		user_id: userId
	};
});
var deleteAdmin_createServerFn_handler = createServerRpc({
	id: "4238df6f4b72e184e18e907ed8067550b5d163dd07d00c0d7dbfba18fc4638cf",
	name: "deleteAdmin",
	filename: "src/lib/admins.functions.ts"
}, (opts) => deleteAdmin.__executeServer(opts));
var deleteAdmin = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.userId) throw new Error("userId required");
	return data;
}).handler(deleteAdmin_createServerFn_handler, async ({ data }) => {
	await db.delete(userRoles).where(eq(userRoles.userId, data.userId));
	await db.delete(users).where(eq(users.id, data.userId));
	return { ok: true };
});
var resetAdminPassword_createServerFn_handler = createServerRpc({
	id: "154d3aee0cac7cb21297da175e742bf2ae56077871ec769d56e1a441455ab3f3",
	name: "resetAdminPassword",
	filename: "src/lib/admins.functions.ts"
}, (opts) => resetAdminPassword.__executeServer(opts));
var resetAdminPassword = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.userId) throw new Error("userId required");
	if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
	return data;
}).handler(resetAdminPassword_createServerFn_handler, async ({ data }) => {
	const hash = await bcrypt.hash(data.password, 10);
	await db.update(users).set({ passwordHash: hash }).where(eq(users.id, data.userId));
	return { ok: true };
});
//#endregion
export { createAdmin_createServerFn_handler, deleteAdmin_createServerFn_handler, listAdmins_createServerFn_handler, resetAdminPassword_createServerFn_handler };
