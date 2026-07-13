import { a as useServices, o as useSiteSettings } from "./use-admin-data-Chku8Dys.js";
import { n as PageHeader, t as CtaBanner } from "./site-footer-DI2-QEQy.js";
import { n as getIcon } from "./icon-map-DfNldbji.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2, Clock, Phone, Tag } from "lucide-react";
//#region src/routes/services.tsx?tsr-split=component
var CATEGORIES = [
	{
		label: "Emergency",
		desc: "24/7 same-day dispatch when things can't wait."
	},
	{
		label: "Maintenance",
		desc: "Seasonal tune-ups and quarterly plans that prevent breakdowns."
	},
	{
		label: "Installation",
		desc: "New systems installed to code with manufacturer warranties."
	},
	{
		label: "Restoration",
		desc: "Storm, water and fire damage restored end-to-end."
	}
];
function ServicesPage() {
	const { data: SERVICES = [] } = useServices();
	const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Our Expertise",
			title: "Complete Home Solutions For Every Need",
			subtitle: "Twelve trusted trades. One phone number. Certified local pros dispatched to your door — anywhere in the U.S."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-muted/40",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4",
				children: CATEGORIES.map((c) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border bg-background p-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-xs font-semibold uppercase tracking-widest text-brand",
						children: c.label
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: c.desc
					})]
				}, c.label))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "All Services"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Twelve trusted home service trades"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 text-sm text-muted-foreground sm:text-base",
						children: "Certified local pros dispatched nationwide — pick a service to get started."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: SERVICES.map((s) => {
					return /* @__PURE__ */ jsxs("article", {
						className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-5 flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground",
									children: /* @__PURE__ */ jsx(getIcon(s.icon_name), { className: "h-7 w-7" })
								}), /* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-navy/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-navy",
									children: s.tag
								})]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-navy",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: s.description
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mt-4 grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs text-foreground/80",
								children: s.features.map((f) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-brand shrink-0" }),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: f
										})
									]
								}, f))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-5 flex items-center justify-between border-t border-border pt-4 text-xs",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 font-semibold text-navy",
									children: [
										/* @__PURE__ */ jsx(Tag, { className: "h-3.5 w-3.5 text-brand" }),
										" From ",
										s.price_from
									]
								}), /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5 text-brand" }),
										" ",
										s.response_time
									]
								})]
							}),
							/* @__PURE__ */ jsxs("a", {
								href: `tel:${PHONE_TEL}`,
								className: "mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground hover:brightness-110 transition",
								children: [
									/* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }),
									" Call ",
									PHONE,
									" ",
									/* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
								]
							})
						]
					}, s.id);
				})
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-navy text-navy-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
							children: "Transparent Pricing"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-2 font-display text-3xl font-extrabold sm:text-4xl",
							children: "No surprises. Ever."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-white/80",
							children: "Every service starts with a flat-rate diagnostic. You approve a fixed, itemized quote before work begins. We honor the quoted price even if the job takes longer than expected."
						})
					]
				}), /* @__PURE__ */ jsxs("a", {
					href: `tel:${PHONE_TEL}`,
					className: "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-display font-bold text-brand-foreground hover:brightness-110 transition",
					children: [/* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }), " Get a Free Quote"]
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Included Free"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "What's included in every visit"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "Ten things you'll never pay extra for — because good service is standard, not premium."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
				children: [
					"Free phone estimate",
					"Shoe covers & drop cloths",
					"Uniformed technician",
					"Photo documentation",
					"Clean-up on completion",
					"Same-crew return visits",
					"5-year workmanship warranty",
					"Manufacturer parts warranty",
					"Digital invoicing",
					"Follow-up satisfaction call"
				].map((f) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm",
					children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", {
						className: "text-navy",
						children: f
					})]
				}, f))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
							children: "Seasonal Checklist"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
							children: "Year-round home maintenance"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground",
							children: "Book ahead of season and save on emergency call-outs."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							season: "Spring",
							items: [
								"AC tune-up",
								"Gutter cleaning",
								"Roof inspection",
								"Pest prevention"
							]
						},
						{
							season: "Summer",
							items: [
								"Refrigerant check",
								"Deck & fence care",
								"Sprinkler service",
								"Attic ventilation"
							]
						},
						{
							season: "Fall",
							items: [
								"Furnace tune-up",
								"Chimney sweep",
								"Weatherstripping",
								"Leaf & drain flush"
							]
						},
						{
							season: "Winter",
							items: [
								"Pipe insulation",
								"Emergency heat repair",
								"Ice-dam prevention",
								"Generator check"
							]
						}
					].map((s) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-6",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-flex rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand",
							children: s.season
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: s.items.map((i) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2 text-navy",
								children: [
									/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 shrink-0 text-brand" }),
									" ",
									i
								]
							}, i))
						})]
					}, s.season))
				})]
			})
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
//#endregion
export { ServicesPage as component };
