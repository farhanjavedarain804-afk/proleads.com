import { _ as markSubmissionRead, a as useServices, b as updateSubmission, c as useSubmissions, g as deleteSubmission, i as useReviews, n as useFaqs, s as useStates } from "./use-admin-data-jVw2-oN2.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, HelpCircle, Inbox, Mail, MapPin, Pencil, Phone, Star, Trash2, TrendingUp, Wrench, X } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.index.tsx?tsr-split=component
function AdminDashboard() {
	const subs = useSubmissions();
	const services = useServices();
	const reviews = useReviews();
	const faqs = useFaqs();
	const states = useStates();
	const qc = useQueryClient();
	const [viewing, setViewing] = useState(null);
	const [editing, setEditing] = useState(null);
	const [saving, setSaving] = useState(false);
	const cards = [
		{
			label: "New Submissions",
			value: subs.data?.filter((s) => !s.isRead).length ?? 0,
			total: subs.data?.length ?? 0,
			icon: Inbox,
			color: "bg-brand text-brand-foreground"
		},
		{
			label: "Services",
			value: services.data?.length ?? 0,
			icon: Wrench,
			color: "bg-navy text-navy-foreground"
		},
		{
			label: "Reviews",
			value: reviews.data?.length ?? 0,
			icon: Star,
			color: "bg-amber-500 text-white"
		},
		{
			label: "FAQs",
			value: faqs.data?.length ?? 0,
			icon: HelpCircle,
			color: "bg-emerald-500 text-white"
		},
		{
			label: "States Covered",
			value: states.data?.length ?? 0,
			icon: MapPin,
			color: "bg-sky-500 text-white"
		}
	];
	const recent = subs.data?.slice(0, 5) ?? [];
	async function handleDelete(id) {
		if (!confirm("Delete this submission?")) return;
		try {
			await deleteSubmission({ data: { id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["contact_submissions"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function handleView(s) {
		setViewing(s);
		if (!s.isRead) try {
			await markSubmissionRead({ data: { id: s.id } });
			qc.invalidateQueries({ queryKey: ["contact_submissions"] });
		} catch (e) {
			console.error(e);
		}
	}
	async function handleSaveEdit(e) {
		e.preventDefault();
		if (!editing) return;
		setSaving(true);
		const { id, name, email, phone, city, service, message } = editing;
		try {
			await updateSubmission({ data: {
				id,
				name,
				email,
				phone,
				city,
				service,
				message
			} });
			toast.success("Updated");
			qc.invalidateQueries({ queryKey: ["contact_submissions"] });
			setEditing(null);
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-2xl font-extrabold text-navy sm:text-3xl",
				children: "Welcome back"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-slate-500",
				children: "Overview of your site content and inbound leads."
			})] }),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: cards.map((c) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsx("div", {
								className: `grid h-10 w-10 place-items-center rounded-xl ${c.color}`,
								children: /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5" })
							}), c.total !== void 0 && c.total !== c.value && /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-slate-400",
								children: ["of ", c.total]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-3 text-3xl font-display font-extrabold text-navy",
							children: c.value
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-xs font-medium uppercase tracking-widest text-slate-500",
							children: c.label
						})
					]
				}, c.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ jsx("h3", {
							className: "font-display text-lg font-bold text-navy",
							children: "Recent Submissions"
						})]
					}), /* @__PURE__ */ jsx(Link, {
						to: "/admin/submissions",
						className: "text-xs font-semibold text-brand hover:underline",
						children: "View all →"
					})]
				}), recent.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "py-8 text-center text-sm text-slate-400",
					children: "No submissions yet."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "divide-y divide-slate-100",
					children: recent.map((s) => /* @__PURE__ */ jsxs("li", {
						className: "flex flex-wrap items-center justify-between gap-4 py-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "truncate text-sm font-semibold text-navy",
									children: s.name
								}), !s.isRead && /* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-foreground",
									children: "New"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "truncate text-xs text-slate-500",
								children: [
									s.service || "General",
									" · ",
									s.city || s.email
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "mr-2 text-xs text-slate-400",
									children: new Date(s.createdAt).toLocaleDateString()
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => handleView(s),
									className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
									title: "View details",
									children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setEditing({ ...s }),
									className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100",
									title: "Edit",
									children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => handleDelete(s.id),
									className: "rounded-lg p-2 text-red-500 hover:bg-red-50",
									title: "Delete",
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
								})
							]
						})]
					}, s.id))
				})]
			}),
			viewing && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				onClick: () => setViewing(null),
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-navy",
								children: viewing.name
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-slate-500",
								children: new Date(viewing.createdAt).toLocaleString()
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setViewing(null),
								className: "rounded-lg p-1 text-slate-500 hover:bg-slate-100",
								children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: `mailto:${viewing.email}`,
									className: "flex items-center gap-2 text-slate-700 hover:text-brand",
									children: [
										/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-brand" }),
										" ",
										viewing.email
									]
								}),
								viewing.phone && /* @__PURE__ */ jsxs("a", {
									href: `tel:${viewing.phone}`,
									className: "flex items-center gap-2 text-slate-700 hover:text-brand",
									children: [
										/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-brand" }),
										" ",
										viewing.phone
									]
								}),
								viewing.city && /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-slate-700",
									children: [
										/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-brand" }),
										" ",
										viewing.city
									]
								}),
								viewing.service && /* @__PURE__ */ jsx("div", {
									className: "inline-block rounded-full bg-slate-100 px-3 py-1 text-xs",
									children: viewing.service
								})
							]
						}),
						viewing.message && /* @__PURE__ */ jsx("div", {
							className: "mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap",
							children: viewing.message
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end gap-2",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => {
									setEditing({ ...viewing });
									setViewing(null);
								},
								className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-navy hover:bg-slate-50",
								children: [/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setViewing(null),
								className: "rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-navy-foreground hover:bg-navy/90",
								children: "Close"
							})]
						})
					]
				})
			}),
			editing && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				onClick: () => setEditing(null),
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSaveEdit,
					className: "w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-navy",
								children: "Edit submission"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setEditing(null),
								className: "rounded-lg p-1 text-slate-500 hover:bg-slate-100",
								children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 grid gap-3",
							children: [[
								"name",
								"email",
								"phone",
								"city",
								"service"
							].map((f) => /* @__PURE__ */ jsxs("label", {
								className: "grid gap-1 text-xs",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold uppercase tracking-widest text-slate-500",
									children: f
								}), /* @__PURE__ */ jsx("input", {
									value: editing[f] ?? "",
									onChange: (e) => setEditing({
										...editing,
										[f]: e.target.value
									}),
									className: "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
								})]
							}, f)), /* @__PURE__ */ jsxs("label", {
								className: "grid gap-1 text-xs",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold uppercase tracking-widest text-slate-500",
									children: "Message"
								}), /* @__PURE__ */ jsx("textarea", {
									rows: 4,
									value: editing.message ?? "",
									onChange: (e) => setEditing({
										...editing,
										message: e.target.value
									}),
									className: "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex justify-end gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setEditing(null),
								className: "rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50",
								children: "Cancel"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: saving,
								className: "rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:brightness-110 disabled:opacity-60",
								children: saving ? "Saving…" : "Save changes"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
