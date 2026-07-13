import { f as deleteFaq, n as useFaqs, x as upsertFaq } from "./use-admin-data-Cbnxa5qJ.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.faqs.tsx?tsr-split=component
function AdminFaqs() {
	const { data: faqs = [] } = useFaqs();
	const qc = useQueryClient();
	const [editing, setEditing] = useState(null);
	async function onSave() {
		if (!editing) return;
		try {
			await upsertFaq({ data: {
				id: editing.id,
				question: editing.question,
				answer: editing.answer,
				sortOrder: Number(editing.sortOrder) || 0
			} });
			toast.success("Saved");
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["faqs"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function onDelete(id) {
		if (!confirm("Delete this FAQ?")) return;
		try {
			await deleteFaq({ data: { id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["faqs"] });
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
					children: "FAQs"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-slate-500",
					children: "Frequently asked questions displayed on your site."
				})] }), /* @__PURE__ */ jsxs("button", {
					onClick: () => setEditing({
						question: "",
						answer: "",
						sortOrder: faqs.length + 1
					}),
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Add FAQ"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100",
				children: faqs.map((f) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-4 p-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display font-bold text-navy",
							children: f.question
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-slate-500",
							children: f.answer
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex shrink-0 gap-1",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setEditing(f),
							className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
							children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => onDelete(f.id),
							className: "rounded-lg p-2 text-red-500 hover:bg-red-50",
							children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}, f.id))
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
								children: editing.id ? "Edit FAQ" : "New FAQ"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setEditing(null),
								className: "rounded-lg p-2 hover:bg-slate-100",
								children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
									children: "Question"
								}), /* @__PURE__ */ jsx("input", {
									value: editing.question ?? "",
									onChange: (e) => setEditing({
										...editing,
										question: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
									children: "Answer"
								}), /* @__PURE__ */ jsx("textarea", {
									rows: 5,
									value: editing.answer ?? "",
									onChange: (e) => setEditing({
										...editing,
										answer: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500",
									children: "Sort order"
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									value: editing.sortOrder ?? 0,
									onChange: (e) => setEditing({
										...editing,
										sortOrder: Number(e.target.value)
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
								})] })
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
//#endregion
export { AdminFaqs as component };
