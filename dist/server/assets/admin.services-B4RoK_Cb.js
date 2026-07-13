import { C as upsertService, a as useServices, m as deleteService } from "./use-admin-data-B0r3MH-a.js";
import { n as getIcon, t as ICON_NAMES } from "./icon-map-DfNldbji.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.services.tsx?tsr-split=component
var EMPTY = {
	slug: "",
	iconName: "Wrench",
	title: "",
	description: "",
	tag: "",
	features: [],
	priceFrom: "",
	responseTime: "",
	sortOrder: 0,
	featuresText: ""
};
function AdminServices() {
	const { data: services = [] } = useServices();
	const qc = useQueryClient();
	const [editing, setEditing] = useState(null);
	async function onSave() {
		if (!editing) return;
		try {
			await upsertService({ data: {
				id: editing.id,
				slug: editing.slug,
				iconName: editing.iconName,
				title: editing.title,
				description: editing.description,
				tag: editing.tag ?? "",
				features: (editing.featuresText ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
				priceFrom: editing.priceFrom ?? "",
				responseTime: editing.responseTime ?? "",
				sortOrder: Number(editing.sortOrder) || 0
			} });
			toast.success(editing.id ? "Service updated" : "Service created");
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["services"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function onDelete(id) {
		if (!confirm("Delete this service?")) return;
		try {
			await deleteService({ data: { id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["services"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	function openEdit(s) {
		setEditing({
			...s,
			featuresText: (s.features ?? []).join("\n")
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl font-extrabold text-navy",
					children: "Services"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-slate-500",
					children: "Add, edit or remove the services displayed on your site."
				})] }), /* @__PURE__ */ jsxs("button", {
					onClick: () => setEditing({
						...EMPTY,
						sortOrder: services.length + 1
					}),
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Add service"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: services.map((s) => {
					return /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand",
									children: /* @__PURE__ */ jsx(getIcon(s.iconName), { className: "h-5 w-5" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => openEdit(s),
										className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
										children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => onDelete(s.id),
										className: "rounded-lg p-2 text-red-500 hover:bg-red-50",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
									})]
								})]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 font-display font-bold text-navy",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 line-clamp-2 text-sm text-slate-500",
								children: s.description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 flex flex-wrap gap-2 text-xs",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-slate-100 px-2 py-1 text-slate-600",
										children: s.slug
									}),
									s.priceFrom && /* @__PURE__ */ jsxs("span", {
										className: "rounded-full bg-emerald-50 px-2 py-1 text-emerald-700",
										children: ["From ", s.priceFrom]
									}),
									s.responseTime && /* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-sky-50 px-2 py-1 text-sky-700",
										children: s.responseTime
									})
								]
							})
						]
					}, s.id);
				})
			}),
			editing && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
				onClick: () => setEditing(null),
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-navy",
								children: editing.id ? "Edit service" : "New service"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setEditing(null),
								className: "rounded-lg p-2 hover:bg-slate-100",
								children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Title",
									value: editing.title ?? "",
									onChange: (v) => setEditing({
										...editing,
										title: v
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Slug",
									value: editing.slug ?? "",
									onChange: (v) => setEditing({
										...editing,
										slug: v
									})
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
									children: "Icon"
								}), /* @__PURE__ */ jsx("select", {
									value: editing.iconName,
									onChange: (e) => setEditing({
										...editing,
										iconName: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm",
									children: ICON_NAMES.map((n) => /* @__PURE__ */ jsx("option", {
										value: n,
										children: n
									}, n))
								})] }),
								/* @__PURE__ */ jsx(Field, {
									label: "Tag",
									value: editing.tag ?? "",
									onChange: (v) => setEditing({
										...editing,
										tag: v
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Price from",
									value: editing.priceFrom ?? "",
									onChange: (v) => setEditing({
										...editing,
										priceFrom: v
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Response time",
									value: editing.responseTime ?? "",
									onChange: (v) => setEditing({
										...editing,
										responseTime: v
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Sort order",
									type: "number",
									value: String(editing.sortOrder ?? 0),
									onChange: (v) => setEditing({
										...editing,
										sortOrder: Number(v)
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
										children: "Description"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										value: editing.description ?? "",
										onChange: (e) => setEditing({
											...editing,
											description: e.target.value
										}),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
										children: "Features (one per line)"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 6,
										value: editing.featuresText ?? "",
										onChange: (e) => setEditing({
											...editing,
											featuresText: e.target.value
										}),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-mono"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => setEditing(null),
								className: "rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50",
								children: "Cancel"
							}), /* @__PURE__ */ jsxs("button", {
								onClick: onSave,
								className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:brightness-110",
								children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }), " Save"]
							})]
						})
					]
				})
			})
		]
	});
}
function Field({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
		className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
		children: label
	}), /* @__PURE__ */ jsx("input", {
		type,
		value,
		onChange: (e) => onChange(e.target.value),
		className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
	})] });
}
//#endregion
export { AdminServices as component };
