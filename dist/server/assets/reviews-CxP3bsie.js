import { i as useReviews } from "./use-admin-data-B0r3MH-a.js";
import { n as PageHeader, t as CtaBanner } from "./site-footer-CZcUWgh0.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
//#region src/routes/reviews.tsx?tsr-split=component
var RATING_BREAKDOWN = [
	{
		stars: 5,
		pct: 92
	},
	{
		stars: 4,
		pct: 6
	},
	{
		stars: 3,
		pct: 1
	},
	{
		stars: 2,
		pct: .5
	},
	{
		stars: 1,
		pct: .5
	}
];
function ReviewsPage() {
	const { data: REVIEWS = [] } = useReviews();
	const services = useMemo(() => ["All", ...Array.from(new Set(REVIEWS.map((r) => r.service)))], [REVIEWS]);
	const [filter, setFilter] = useState("All");
	const filtered = filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Testimonials",
			title: "What Our Customers Say",
			subtitle: "Honest feedback from homeowners in your neighborhood."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-muted/40",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[auto_1fr] md:items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-6xl font-extrabold text-navy",
							children: "4.9"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 flex justify-center gap-1 text-brand",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-current" }, i))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Based on 8,412 reviews"
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: RATING_BREAKDOWN.map((r) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "w-10 text-sm font-semibold text-navy",
								children: [r.stars, " ★"]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "h-2 flex-1 overflow-hidden rounded-full bg-border",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full rounded-full bg-brand",
									style: { width: `${r.pct}%` }
								})
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "w-12 text-right text-xs text-muted-foreground",
								children: [r.pct, "%"]
							})
						]
					}, r.stars))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 pt-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: services.map((s) => /* @__PURE__ */ jsx("button", {
					onClick: () => setFilter(s),
					className: `rounded-full border px-4 py-1.5 text-sm font-semibold transition ${filter === s ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background text-navy hover:border-brand"}`,
					children: s
				}, s))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-12 sm:py-16",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto mb-10 max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Verified Reviews"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "What homeowners are saying"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((r) => /* @__PURE__ */ jsxs("figure", {
						className: "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ jsx(Quote, { className: "h-6 w-6 text-brand/40" }),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "mt-3 flex-1 text-sm leading-relaxed text-foreground",
								children: [
									"\"",
									r.body,
									"\""
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-4 flex gap-1 text-brand",
								children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i))
							}),
							/* @__PURE__ */ jsxs("figcaption", {
								className: "mt-4 flex items-center gap-3 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground font-display font-bold",
										children: r.name.charAt(0)
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx("div", {
											className: "truncate font-display font-bold text-navy",
											children: r.name
										}), /* @__PURE__ */ jsxs("div", {
											className: "truncate text-xs text-muted-foreground",
											children: [
												r.city,
												" · ",
												r.service
											]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: r.review_date
									})
								]
							})
						]
					}, r.id))
				}),
				/* @__PURE__ */ jsx(ReviewForm, {})
			]
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
function ReviewForm() {
	const [submitted, setSubmitted] = useState(false);
	const [rating, setRating] = useState(5);
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-16 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
					children: "Write A Customer Review"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-2 font-display text-2xl font-bold text-navy sm:text-3xl",
					children: "Share Your Genuine Feedback"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your review is sent directly to our quality inspection desk for review and verification."
				})
			]
		}), submitted ? /* @__PURE__ */ jsxs("div", {
			className: "mt-8 flex flex-col items-center gap-3 rounded-2xl bg-brand/10 p-8 text-center",
			children: [
				/* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-brand" }),
				/* @__PURE__ */ jsx("p", {
					className: "font-display text-lg font-bold text-navy",
					children: "Thank you for your feedback!"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "We appreciate you taking the time to share your experience."
				})
			]
		}) : /* @__PURE__ */ jsxs("form", {
			onSubmit: (e) => {
				e.preventDefault();
				setSubmitted(true);
			},
			className: "mt-8 grid gap-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "text-xs font-semibold uppercase tracking-widest text-navy",
					children: "Overall Experience Rating"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 flex gap-1",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setRating(n),
						"aria-label": `${n} stars`,
						className: "p-1",
						children: /* @__PURE__ */ jsx(Star, { className: `h-7 w-7 ${n <= rating ? "fill-brand text-brand" : "text-muted-foreground"}` })
					}, n))
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsx("input", {
						required: true,
						placeholder: "Full Name",
						className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
					}), /* @__PURE__ */ jsx("input", {
						required: true,
						placeholder: "Your City & State",
						className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
					})]
				}),
				/* @__PURE__ */ jsxs("select", {
					required: true,
					defaultValue: "",
					className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							disabled: true,
							children: "Service used…"
						}),
						/* @__PURE__ */ jsx("option", { children: "HVAC" }),
						/* @__PURE__ */ jsx("option", { children: "Plumbing" }),
						/* @__PURE__ */ jsx("option", { children: "Roofing" }),
						/* @__PURE__ */ jsx("option", { children: "Pest Control" }),
						/* @__PURE__ */ jsx("option", { children: "Garage Door" }),
						/* @__PURE__ */ jsx("option", { children: "Electrical" }),
						/* @__PURE__ */ jsx("option", { children: "Water Damage" }),
						/* @__PURE__ */ jsx("option", { children: "Appliance Repair" })
					]
				}),
				/* @__PURE__ */ jsx("textarea", {
					required: true,
					rows: 4,
					placeholder: "Your Review Details",
					className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "submit",
					className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-bold text-brand-foreground hover:brightness-110 transition",
					children: ["Submit Feedback Securely ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})]
	});
}
//#endregion
export { ReviewsPage as component };
