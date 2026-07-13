import { S as upsertReview, i as useReviews, p as deleteReview } from "./use-admin-data-BfFtiaUr.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Save, Star, Trash2, X } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.reviews.tsx?tsr-split=component
var EMPTY = {
	name: "",
	city: "",
	service: "",
	rating: 5,
	reviewDate: "",
	body: "",
	sortOrder: 0
};
function AdminReviews() {
	const { data: reviews = [] } = useReviews();
	const qc = useQueryClient();
	const [editing, setEditing] = useState(null);
	async function onSave() {
		if (!editing) return;
		try {
			await upsertReview({ data: {
				id: editing.id,
				name: editing.name,
				city: editing.city ?? "",
				service: editing.service ?? "",
				rating: Number(editing.rating) || 5,
				reviewDate: editing.reviewDate ?? "",
				body: editing.body,
				sortOrder: Number(editing.sortOrder) || 0
			} });
			toast.success("Saved");
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["reviews"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function onDelete(id) {
		if (!confirm("Delete this review?")) return;
		try {
			await deleteReview({ data: { id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["reviews"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl font-extrabold text-navy",
					children: "Reviews"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-slate-500",
					children: "Customer testimonials shown on your website."
				})] }), /* @__PURE__ */ jsxs("button", {
					onClick: () => setEditing({
						...EMPTY,
						sortOrder: reviews.length + 1
					}),
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Add review"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: reviews.map((r) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-display font-bold text-navy",
								children: r.name
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-xs text-slate-500",
								children: [
									r.city,
									" · ",
									r.service
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => setEditing(r),
									className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
									children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => onDelete(r.id),
									className: "rounded-lg p-2 text-red-500 hover:bg-red-50",
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 flex",
							children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }, i))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 line-clamp-4 text-sm text-slate-600",
							children: r.body
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-3 text-xs text-slate-400",
							children: r.reviewDate
						})
					]
				}, r.id))
			}),
			editing && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
				onClick: () => setEditing(null),
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-navy",
								children: editing.id ? "Edit review" : "New review"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setEditing(null),
								className: "rounded-lg p-2 hover:bg-slate-100",
								children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(F, {
									label: "Name",
									value: editing.name ?? "",
									onChange: (v) => setEditing({
										...editing,
										name: v
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "City",
									value: editing.city ?? "",
									onChange: (v) => setEditing({
										...editing,
										city: v
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Service",
									value: editing.service ?? "",
									onChange: (v) => setEditing({
										...editing,
										service: v
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Rating (1-5)",
									type: "number",
									value: String(editing.rating ?? 5),
									onChange: (v) => setEditing({
										...editing,
										rating: Number(v)
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Date label",
									value: editing.reviewDate ?? "",
									onChange: (v) => setEditing({
										...editing,
										reviewDate: v
									})
								}),
								/* @__PURE__ */ jsx(F, {
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
										children: "Review"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 5,
										value: editing.body ?? "",
										onChange: (e) => setEditing({
											...editing,
											body: e.target.value
										}),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
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
								className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground",
								children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }), " Save"]
							})]
						})
					]
				})
			})
		]
	});
}
function F({ label, value, onChange, type = "text" }) {
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
export { AdminReviews as component };
