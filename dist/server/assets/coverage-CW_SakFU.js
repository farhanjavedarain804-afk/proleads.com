import { o as useSiteSettings, s as useStates, t as useCities } from "./use-admin-data-BfFtiaUr.js";
import { n as PageHeader, t as CtaBanner } from "./site-footer-DVFKwTPu.js";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Clock, MapPin, Phone, TrendingUp } from "lucide-react";
//#region src/routes/coverage.tsx?tsr-split=component
var REGIONS = [
	{
		name: "West Coast",
		states: [
			"California",
			"Oregon",
			"Washington",
			"Nevada",
			"Arizona"
		],
		techs: "1,240+"
	},
	{
		name: "South",
		states: [
			"Texas",
			"Florida",
			"Georgia",
			"North Carolina",
			"Tennessee"
		],
		techs: "1,890+"
	},
	{
		name: "Northeast",
		states: [
			"New York",
			"Pennsylvania",
			"Massachusetts",
			"New Jersey",
			"Connecticut"
		],
		techs: "980+"
	},
	{
		name: "Midwest",
		states: [
			"Illinois",
			"Ohio",
			"Michigan",
			"Missouri",
			"Indiana"
		],
		techs: "1,120+"
	},
	{
		name: "Mountain",
		states: [
			"Colorado",
			"Utah",
			"Idaho",
			"Montana",
			"Wyoming"
		],
		techs: "420+"
	},
	{
		name: "Southwest",
		states: [
			"New Mexico",
			"Oklahoma",
			"Arkansas",
			"Louisiana",
			"Alabama"
		],
		techs: "610+"
	}
];
function CoveragePage() {
	const { phone: PHONE, phoneTel: PHONE_TEL } = useSiteSettings();
	const { data: statesData = [] } = useStates();
	const { data: citiesData = [] } = useCities();
	const STATES = statesData.map((s) => s.name);
	const CITIES = useMemo(() => {
		const map = {};
		for (const s of statesData) {
			const list = citiesData.filter((c) => c.stateId === s.id).map((c) => c.name);
			if (list.length) map[s.name] = list;
		}
		return map;
	}, [statesData, citiesData]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Our Reach",
			title: "Proudly Serving Communities Nationwide",
			subtitle: "Every state. Every city. One trusted network of vetted home service professionals."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-muted/40",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4",
				children: [
					{
						icon: MapPin,
						v: "50",
						l: "U.S. States"
					},
					{
						icon: TrendingUp,
						v: "480+",
						l: "Metro Areas"
					},
					{
						icon: Clock,
						v: "45 min",
						l: "Avg Response"
					},
					{
						icon: Phone,
						v: "24/7",
						l: "Dispatch"
					}
				].map(({ icon: Icon, v, l }) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-2xl border border-border bg-background p-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand",
						children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-display text-2xl font-extrabold text-navy",
						children: v
					}), /* @__PURE__ */ jsx("div", {
						className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
						children: l
					})] })]
				}, l))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
					children: "Regional Networks"
				}), /* @__PURE__ */ jsx("h2", {
					className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
					children: "Local pros in every region"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: REGIONS.map((r) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-xl font-bold text-navy",
							children: r.name
						}), /* @__PURE__ */ jsxs("span", {
							className: "rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand",
							children: [r.techs, " techs"]
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "mt-4 flex flex-wrap gap-2",
						children: r.states.map((s) => /* @__PURE__ */ jsx("li", {
							className: "rounded-full border border-border px-3 py-1 text-xs font-medium text-navy",
							children: s
						}, s))
					})]
				}, r.name))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Major Metros"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Dense coverage in the cities you live in"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: Object.entries(CITIES).map(([state, cities]) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-lg font-bold text-navy",
							children: state
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-3 space-y-1.5 text-sm text-muted-foreground",
							children: cities.map((c) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-brand" }),
									" ",
									c
								]
							}, c))
						})]
					}, state))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Every State"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "All 50 states covered"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10 flex flex-wrap justify-center gap-2",
					children: STATES.map((s) => /* @__PURE__ */ jsx("span", {
						className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-navy",
						children: s
					}, s))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12 mx-auto max-w-3xl rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6 text-center sm:p-8",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-widest text-brand",
							children: "Nationwide Network"
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-2 font-display text-2xl font-bold text-navy sm:text-3xl",
							children: "Not sure if we cover your city?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Call and we'll route you to the closest licensed pro in minutes."
						}),
						/* @__PURE__ */ jsxs("a", {
							href: `tel:${PHONE_TEL}`,
							className: "mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition",
							children: [
								/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
								" Call Nationwide: ",
								PHONE
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
//#endregion
export { CoveragePage as component };
