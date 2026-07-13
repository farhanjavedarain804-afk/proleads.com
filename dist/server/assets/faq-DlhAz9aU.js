import { n as useFaqs, o as useSiteSettings } from "./use-admin-data-eMxb8KI8.js";
import { n as PageHeader, t as CtaBanner } from "./site-footer-BAyCD3So.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, Phone, Search } from "lucide-react";
//#region src/routes/faq.tsx?tsr-split=component
var CATEGORIES = [
	{
		title: "Booking & Scheduling",
		topics: [
			"Same-day availability",
			"Online booking",
			"Reschedule / cancel",
			"Emergency dispatch"
		]
	},
	{
		title: "Pricing & Payments",
		topics: [
			"Flat-rate diagnostics",
			"Financing options",
			"Accepted payment methods",
			"Estimates & quotes"
		]
	},
	{
		title: "Warranties & Guarantees",
		topics: [
			"Workmanship warranty",
			"Parts warranty",
			"Satisfaction promise",
			"Insurance claims"
		]
	},
	{
		title: "Coverage & Availability",
		topics: [
			"Service areas",
			"24/7 dispatch",
			"Rural coverage",
			"Commercial jobs"
		]
	}
];
function FaqPage() {
	const [open, setOpen] = useState(0);
	const [query, setQuery] = useState("");
	const { data: FAQS = [] } = useFaqs();
	const { phone: PHONE, phoneTel: PHONE_TEL } = useSiteSettings();
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return FAQS;
		return FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
	}, [query, FAQS]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "FAQ",
			title: "Frequently Asked Questions",
			subtitle: "Everything you need to know before you book."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-3xl px-4 pt-10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search questions…",
					className: "w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 py-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: CATEGORIES.map((c) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-display text-base font-bold text-navy",
						children: c.title
					}), /* @__PURE__ */ jsx("ul", {
						className: "mt-3 space-y-1 text-sm text-muted-foreground",
						children: c.topics.map((t) => /* @__PURE__ */ jsxs("li", { children: ["• ", t] }, t))
					})]
				}, c.title))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-4xl px-4 pb-16",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [filtered.length === 0 && /* @__PURE__ */ jsxs("p", {
					className: "rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
					children: [
						"No questions match \"",
						query,
						"\". Try different keywords or call us directly."
					]
				}), filtered.map((f, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background transition-shadow hover:shadow-sm",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setOpen(isOpen ? null : i),
							className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 text-left",
							children: [/* @__PURE__ */ jsx("span", {
								className: "min-w-0 font-display font-bold text-navy",
								children: f.question
							}), /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}` })]
						}), isOpen && /* @__PURE__ */ jsx("div", {
							className: "border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground",
							children: f.answer
						})]
					}, f.id);
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-10 rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-8 text-center",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-display text-2xl font-bold text-navy",
						children: "Still have questions?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Our dispatch team is available 24/7 for anything not covered above."
					}),
					/* @__PURE__ */ jsxs("a", {
						href: `tel:${PHONE_TEL}`,
						className: "mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition",
						children: [
							/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
							" Call ",
							PHONE
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
//#endregion
export { FaqPage as component };
