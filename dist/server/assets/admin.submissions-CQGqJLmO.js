import { _ as markSubmissionRead, c as useSubmissions, g as deleteSubmission } from "./use-admin-data-jVw2-oN2.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, Inbox, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.submissions.tsx?tsr-split=component
function AdminSubmissions() {
	const { data: subs = [] } = useSubmissions();
	const qc = useQueryClient();
	const [filter, setFilter] = useState("all");
	const filtered = filter === "unread" ? subs.filter((s) => !s.isRead) : subs;
	async function toggleRead(id, isRead) {
		if (!isRead) try {
			await markSubmissionRead({ data: { id } });
			qc.invalidateQueries({ queryKey: ["contact_submissions"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function onDelete(id) {
		if (!confirm("Delete this submission?")) return;
		try {
			await deleteSubmission({ data: { id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["contact_submissions"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-2xl font-extrabold text-navy",
				children: "Form Submissions"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-slate-500",
				children: "Contact form entries from your website visitors."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-1 rounded-xl border border-slate-200 bg-white p-1",
				children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => setFilter("all"),
					className: `rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === "all" ? "bg-brand text-brand-foreground" : "text-slate-600"}`,
					children: [
						"All (",
						subs.length,
						")"
					]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setFilter("unread"),
					className: `rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === "unread" ? "bg-brand text-brand-foreground" : "text-slate-600"}`,
					children: [
						"Unread (",
						subs.filter((s) => !s.isRead).length,
						")"
					]
				})]
			})]
		}), filtered.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm",
			children: [/* @__PURE__ */ jsx(Inbox, { className: "mx-auto h-10 w-10 text-slate-300" }), /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm text-slate-500",
				children: "No submissions yet."
			})]
		}) : /* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: filtered.map((s) => /* @__PURE__ */ jsxs("div", {
				className: `rounded-2xl border ${s.isRead ? "border-slate-200 bg-white" : "border-brand/30 bg-brand/5"} p-5 shadow-sm`,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-display font-bold text-navy",
									children: s.name
								}), !s.isRead && /* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-foreground",
									children: "New"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500",
								children: [
									/* @__PURE__ */ jsxs("a", {
										href: `mailto:${s.email}`,
										className: "inline-flex items-center gap-1 hover:text-brand",
										children: [
											/* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
											" ",
											s.email
										]
									}),
									s.phone && /* @__PURE__ */ jsxs("a", {
										href: `tel:${s.phone}`,
										className: "inline-flex items-center gap-1 hover:text-brand",
										children: [
											/* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
											" ",
											s.phone
										]
									}),
									s.city && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
											" ",
											s.city
										]
									}),
									s.service && /* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-slate-100 px-2 py-0.5",
										children: s.service
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => toggleRead(s.id, s.isRead),
								className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
								title: s.isRead ? "Mark unread" : "Mark read",
								children: s.isRead ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => onDelete(s.id),
								className: "rounded-lg p-2 text-red-500 hover:bg-red-50",
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
							})]
						})]
					}),
					s.message && /* @__PURE__ */ jsx("p", {
						className: "mt-3 rounded-xl bg-white/60 p-3 text-sm text-slate-700 whitespace-pre-wrap",
						children: s.message
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-3 text-xs text-slate-400",
						children: new Date(s.createdAt).toLocaleString()
					})
				]
			}, s.id))
		})]
	});
}
//#endregion
export { AdminSubmissions as component };
