import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createSsrRpc } from "./createSsrRpc-DfjpTred.js";
import { r as useIsAdmin } from "./use-admin-data-B0r3MH-a.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { isRedirect, useNavigate, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, KeyRound, Plus, Shield, Trash2, X } from "lucide-react";
import { toast } from "sonner";
//#region node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/lib/admins.functions.ts
var listAdmins = createServerFn({ method: "GET" }).handler(createSsrRpc("107006364cdee73930754d5e03e7d2892ae9886b96d2d356e1cd6474c0cabc22"));
var createAdmin = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.email || !data.email.includes("@")) throw new Error("Valid email required");
	if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
	return data;
}).handler(createSsrRpc("0d737a506253be8b1bcf8f03a5c4b274ed25f812eb48158a328a25da51d389c9"));
var deleteAdmin = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.userId) throw new Error("userId required");
	return data;
}).handler(createSsrRpc("4238df6f4b72e184e18e907ed8067550b5d163dd07d00c0d7dbfba18fc4638cf"));
var resetAdminPassword = createServerFn({ method: "POST" }).validator((data) => {
	if (!data.userId) throw new Error("userId required");
	if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters");
	return data;
}).handler(createSsrRpc("154d3aee0cac7cb21297da175e742bf2ae56077871ec769d56e1a441455ab3f3"));
//#endregion
//#region src/routes/_authenticated/admin.admins.tsx?tsr-split=component
function AdminsPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: me, isLoading: meLoading } = useIsAdmin();
	const list = useServerFn(listAdmins);
	const create = useServerFn(createAdmin);
	const del = useServerFn(deleteAdmin);
	const resetPw = useServerFn(resetAdminPassword);
	const admins = useQuery({
		queryKey: ["admins"],
		queryFn: () => list(),
		enabled: !!me?.isSuperAdmin
	});
	useEffect(() => {
		if (!meLoading && me && !me.isSuperAdmin) {
			toast.error("Super admin access required");
			navigate({ to: "/admin" });
		}
	}, [
		me,
		meLoading,
		navigate
	]);
	const [showForm, setShowForm] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [asSuper, setAsSuper] = useState(false);
	const createMut = useMutation({
		mutationFn: (input) => create({ data: input }),
		onSuccess: () => {
			toast.success("Admin created");
			setEmail("");
			setPassword("");
			setAsSuper(false);
			setShowForm(false);
			qc.invalidateQueries({ queryKey: ["admins"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteMut = useMutation({
		mutationFn: (userId) => del({ data: { userId } }),
		onSuccess: () => {
			toast.success("Admin removed");
			qc.invalidateQueries({ queryKey: ["admins"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const resetMut = useMutation({
		mutationFn: (input) => resetPw({ data: input }),
		onSuccess: () => toast.success("Password updated"),
		onError: (e) => toast.error(e.message)
	});
	if (!me?.isSuperAdmin) return /* @__PURE__ */ jsx("div", {
		className: "text-sm text-slate-500",
		children: "Checking permissions…"
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl font-extrabold text-navy sm:text-3xl",
					children: "Admin Users"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-slate-500",
					children: "Manage who can sign in to the admin portal. Super admins can add and remove other admins."
				})] }), /* @__PURE__ */ jsxs("button", {
					onClick: () => setShowForm((s) => !s),
					className: "inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm hover:bg-brand/90",
					children: [showForm ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), showForm ? "Cancel" : "New Admin"]
				})]
			}),
			showForm && /* @__PURE__ */ jsxs("form", {
				onSubmit: (e) => {
					e.preventDefault();
					createMut.mutate({
						email,
						password,
						superAdmin: asSuper
					});
				},
				className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-display text-lg font-bold text-navy",
						children: "Create new admin"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
							placeholder: "new-admin@example.com"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
							children: "Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							required: true,
							minLength: 8,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
							placeholder: "At least 8 characters"
						})] })]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-2 text-sm text-slate-700",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: asSuper,
							onChange: (e) => setAsSuper(e.target.checked),
							className: "h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
						}), "Grant super admin (can also manage admins)"]
					}),
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: createMut.isPending,
						className: "inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-navy-foreground hover:bg-navy/90 disabled:opacity-50",
						children: createMut.isPending ? "Creating…" : "Create Admin"
					}) })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 border-b border-slate-100 px-6 py-4",
					children: [/* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ jsx("h3", {
						className: "font-display text-lg font-bold text-navy",
						children: "Current admins"
					})]
				}), admins.isLoading ? /* @__PURE__ */ jsx("div", {
					className: "p-6 text-sm text-slate-400",
					children: "Loading…"
				}) : (admins.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsx("div", {
					className: "p-6 text-sm text-slate-400",
					children: "No admins yet."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "divide-y divide-slate-100",
					children: admins.data.map((a) => {
						const isSuper = a.roles.includes("super_admin");
						const isMe = a.user_id === me.userId;
						return /* @__PURE__ */ jsxs("li", {
							className: "flex flex-wrap items-center justify-between gap-3 px-6 py-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "truncate text-sm font-semibold text-navy",
											children: a.email ?? a.user_id
										}),
										isSuper && /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700",
											children: [/* @__PURE__ */ jsx(Crown, { className: "h-3 w-3" }), " Super"]
										}),
										isMe && /* @__PURE__ */ jsx("span", {
											className: "rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600",
											children: "You"
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-slate-500",
									children: a.created_at ? `Joined ${new Date(a.created_at).toLocaleDateString()}` : ""
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => {
										const pw = prompt(`Set new password for ${a.email}:`);
										if (!pw) return;
										if (pw.length < 8) {
											toast.error("Password must be at least 8 characters");
											return;
										}
										resetMut.mutate({
											userId: a.user_id,
											password: pw
										});
									},
									className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50",
									children: [/* @__PURE__ */ jsx(KeyRound, { className: "h-3.5 w-3.5" }), " Reset password"]
								}), /* @__PURE__ */ jsxs("button", {
									onClick: () => {
										if (isMe) {
											toast.error("You cannot delete yourself");
											return;
										}
										if (!confirm(`Delete admin ${a.email}? This cannot be undone.`)) return;
										deleteMut.mutate(a.user_id);
									},
									disabled: isMe,
									className: "inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed",
									children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
								})]
							})]
						}, a.user_id);
					})
				})]
			})
		]
	});
}
//#endregion
export { AdminsPage as component };
