import { o as useSiteSettings, r as useIsAdmin } from "./use-admin-data-BX0OStFG.js";
import { useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, HelpCircle, Inbox, LayoutDashboard, LogOut, MapPin, Menu, Settings, Shield, Star, Wrench, X } from "lucide-react";
import { toast } from "sonner";
//#region src/components/admin/admin-shell.tsx
var NAV = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/services",
		label: "Services",
		icon: Wrench
	},
	{
		to: "/admin/reviews",
		label: "Reviews",
		icon: Star
	},
	{
		to: "/admin/faqs",
		label: "FAQs",
		icon: HelpCircle
	},
	{
		to: "/admin/coverage",
		label: "Coverage",
		icon: MapPin
	},
	{
		to: "/admin/submissions",
		label: "Submissions",
		icon: Inbox
	},
	{
		to: "/admin/admins",
		label: "Admin Users",
		icon: Shield,
		superOnly: true
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminShell() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const settings = useSiteSettings();
	const { data: admin } = useIsAdmin();
	const [open, setOpen] = useState(false);
	async function signOut() {
		toast.success("Signed out");
		navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-50",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: `fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex h-16 items-center justify-between border-b border-slate-200 px-5",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: "/admin",
							className: "font-display text-lg font-extrabold text-navy",
							children: ["Admin", /* @__PURE__ */ jsx("span", {
								className: "text-brand",
								children: "."
							})]
						}), /* @__PURE__ */ jsx("button", {
							className: "lg:hidden text-slate-500",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "flex-1 space-y-1 p-3",
						children: NAV.filter((n) => !n.superOnly || admin?.isSuperAdmin).map(({ to, label, icon: Icon, exact }) => {
							return /* @__PURE__ */ jsxs(Link, {
								to,
								onClick: () => setOpen(false),
								className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${(exact ? path === to : path.startsWith(to)) ? "bg-brand text-brand-foreground shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
								children: [
									/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
									" ",
									label
								]
							}, to);
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t border-slate-200 p-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl bg-slate-50 p-3",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-xs font-semibold uppercase tracking-widest text-slate-500",
										children: "Signed in"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-1 truncate text-sm font-semibold text-navy",
										children: settings.adminDisplayName
									}),
									/* @__PURE__ */ jsx("div", {
										className: "truncate text-xs text-slate-500",
										children: admin?.email
									})
								]
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100",
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }), " View live site"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: signOut,
								className: "mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50",
								children: [/* @__PURE__ */ jsx(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
							})
						]
					})
				]
			}),
			open && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-30 bg-black/40 lg:hidden",
				onClick: () => setOpen(false)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ jsxs("header", {
					className: "sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8",
					children: [
						/* @__PURE__ */ jsx("button", {
							className: "lg:hidden text-slate-600",
							onClick: () => setOpen(true),
							children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-lg font-bold text-navy",
							children: "Admin Portal"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "ml-auto text-xs text-slate-500 hidden sm:block",
							children: ["Managing ", /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-navy",
								children: "proleadsgeneration.com"
							})]
						})
					]
				}), /* @__PURE__ */ jsx("main", {
					className: "p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ jsx(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/admin.tsx?tsr-split=component
var SplitComponent = AdminShell;
//#endregion
export { SplitComponent as component };
