import { d as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.js";
import { drizzle } from "drizzle-orm/mysql2";
import { boolean, int, json, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/db/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	contactSubmissions: () => contactSubmissions,
	coverageCities: () => coverageCities,
	coverageStates: () => coverageStates,
	faqs: () => faqs,
	reviews: () => reviews,
	services: () => services,
	siteSettings: () => siteSettings,
	userRoles: () => userRoles,
	users: () => users
});
var userRoles = mysqlTable("user_roles", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: varchar("user_id", { length: 36 }).notNull(),
	role: varchar("role", { length: 20 }).notNull().default("admin"),
	createdAt: timestamp("created_at").notNull().defaultNow()
});
var siteSettings = mysqlTable("site_settings", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	phone: varchar("phone", { length: 255 }).notNull().default("(888) 555-0199"),
	phoneTel: varchar("phone_tel", { length: 255 }).notNull().default("+18885550199"),
	email: varchar("email", { length: 255 }).notNull().default("support@proleadsgeneration.com"),
	address: text("address").notNull(),
	adminDisplayName: varchar("admin_display_name", { length: 255 }).notNull().default("Admin"),
	singleton: boolean("singleton").notNull().default(true),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
});
var services = mysqlTable("services", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	slug: varchar("slug", { length: 255 }).notNull().unique(),
	iconName: varchar("icon_name", { length: 255 }).notNull().default("Wrench"),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	tag: varchar("tag", { length: 255 }).notNull().default(""),
	features: json("features").notNull().default([]),
	priceFrom: varchar("price_from", { length: 255 }).notNull().default(""),
	responseTime: varchar("response_time", { length: 255 }).notNull().default(""),
	sortOrder: int("sort_order").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
});
var reviews = mysqlTable("reviews", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: varchar("name", { length: 255 }).notNull(),
	city: varchar("city", { length: 255 }).notNull().default(""),
	service: varchar("service", { length: 255 }).notNull().default(""),
	rating: int("rating").notNull().default(5),
	reviewDate: varchar("review_date", { length: 255 }).notNull().default(""),
	body: text("body").notNull(),
	sortOrder: int("sort_order").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
});
var faqs = mysqlTable("faqs", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	sortOrder: int("sort_order").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
});
var coverageStates = mysqlTable("coverage_states", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: varchar("name", { length: 255 }).notNull().unique(),
	sortOrder: int("sort_order").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow()
});
var coverageCities = mysqlTable("coverage_cities", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	stateId: varchar("state_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	sortOrder: int("sort_order").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow()
});
var contactSubmissions = mysqlTable("contact_submissions", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 255 }).notNull().default(""),
	service: varchar("service", { length: 255 }).notNull().default(""),
	city: varchar("city", { length: 255 }).notNull().default(""),
	message: text("message").notNull(),
	isRead: boolean("is_read").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow()
});
var users = mysqlTable("users", {
	id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
	email: varchar("email", { length: 255 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
});
//#endregion
//#region src/db/index.ts
var _db = null;
function createDb() {
	return drizzle({
		connection: {
			host: process.env.DB_HOST || "127.0.0.1",
			port: Number(process.env.DB_PORT) || 3306,
			user: process.env.DB_USER || "u749853029_prouser",
			password: process.env.DB_PASSWORD || "M-husnain@393393",
			database: process.env.DB_NAME || "u749853029_pro",
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0
		},
		schema: schema_exports,
		mode: "default"
	});
}
function getDb() {
	if (!_db) try {
		_db = createDb();
	} catch (err) {
		console.error("[DB] Failed to initialize:", err);
		throw err;
	}
	return _db;
}
var db = new Proxy({}, { get(_, prop) {
	return getDb()[prop];
} });
//#endregion
export { faqs as a, siteSettings as c, createServerRpc as d, coverageStates as i, userRoles as l, contactSubmissions as n, reviews as o, coverageCities as r, services as s, db as t, users as u };
