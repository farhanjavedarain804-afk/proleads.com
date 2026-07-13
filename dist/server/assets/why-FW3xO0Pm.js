import { a as STATS, i as PROCESS_STEPS, n as PageHeader, o as VALUES, t as CtaBanner } from "./site-footer-DVFKwTPu.js";
import { t as hero_default } from "./hero-DGrFqcoN.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Award, BadgeCheck, CheckCircle2, Leaf, ShieldCheck, Star, Trophy, Users } from "lucide-react";
//#region src/routes/why.tsx?tsr-split=component
var MISSION = [
	{
		icon: Award,
		title: "Excellence",
		body: "Every technician is vetted, certified and continuously trained on the latest standards."
	},
	{
		icon: Users,
		title: "Community",
		body: "We hire locally and invest in the neighborhoods our pros serve every day."
	},
	{
		icon: Leaf,
		title: "Sustainability",
		body: "We default to low-VOC materials, high-efficiency equipment and ENERGY STAR products."
	}
];
function WhyPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Why Choose Us",
			title: "Trusted by 10,000+ Local Homeowners",
			subtitle: "Unmatched home maintenance expertise backed by transparent guarantees and technicians who treat your property like their own."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-muted/40",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4",
				children: STATS.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: s.value
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-12 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Our Promise"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Six guarantees on every job"
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-8 space-y-6",
						children: VALUES.map((f) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground",
								children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-display text-lg font-bold text-navy",
									children: f.title
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: f.body
								})]
							})]
						}, f.title))
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("div", {
						className: "overflow-hidden rounded-3xl border border-border shadow-xl",
						children: /* @__PURE__ */ jsx("img", {
							src: hero_default,
							alt: "Certified technician on the job",
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 text-navy-foreground shadow-xl",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-4xl font-extrabold text-brand",
							children: "15+"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs font-semibold uppercase tracking-widest",
							children: "Years Pro"
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
							children: "Our Mission"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
							children: "Homeowners first. Always."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground",
							children: "We're building the most trusted home service network in America — with fair prices, honest advice and craftsmanship you can feel every day."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: MISSION.map(({ icon: Icon, title, body }) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-6",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-4 font-display text-xl font-bold text-navy",
								children: title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: body
							})
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-navy text-navy-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-20 sm:py-24",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Simple Steps"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold sm:text-4xl",
						children: "Getting Restored Is Simple"
					})]
				}), /* @__PURE__ */ jsx("ol", {
					className: "mt-14 grid gap-8 md:grid-cols-3",
					children: PROCESS_STEPS.map((s) => /* @__PURE__ */ jsxs("li", {
						className: "relative rounded-2xl border border-white/10 bg-white/5 p-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-5xl font-extrabold text-brand",
								children: s.n
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 font-display text-xl font-bold",
								children: s.t
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-white/70",
								children: s.d
							})
						]
					}, s.n))
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
						children: "Recognitions"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Certifications & industry awards"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "Backed by the standards homeowners trust — audited, accredited and continuously vetted."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: BadgeCheck,
						title: "BBB A+ Accredited",
						body: "Better Business Bureau accredited since 2014 with an A+ rating."
					},
					{
						icon: Trophy,
						title: "HomeAdvisor Elite",
						body: "Top 1% of pros nationwide — Elite Service Award for 6 years running."
					},
					{
						icon: ShieldCheck,
						title: "NATE-Certified HVAC",
						body: "North American Technician Excellence certified across all HVAC crews."
					},
					{
						icon: Star,
						title: "Angi Super Service",
						body: "Angi Super Service Award recipient — 4.9-star customer rating."
					}
				].map(({ icon: Icon, title, body }) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-md",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-4 font-display text-base font-bold text-navy",
							children: title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: body
						})
					]
				}, title))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "The Team"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "6,000+ pros. One promise."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "Every technician in our network completes a 4-step vetting process: license verification, insurance audit, background check, and hands-on skills evaluation. We invest in ongoing training so your home gets the best."
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-6 grid gap-3 sm:grid-cols-2",
						children: [
							"License verified",
							"Insurance audited",
							"Background checked",
							"Drug-tested",
							"Skills tested",
							"Uniformed & badged"
						].map((t) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center gap-2 text-sm text-navy",
							children: [
								/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-brand" }),
								" ",
								t
							]
						}, t))
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						{
							v: "6,000+",
							l: "Vetted Pros"
						},
						{
							v: "98%",
							l: "Same-Day Fill Rate"
						},
						{
							v: "4.9/5",
							l: "Customer Rating"
						},
						{
							v: "45 min",
							l: "Avg Response"
						}
					].map((s) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-6 text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-3xl font-extrabold text-navy",
							children: s.v
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: s.l
						})]
					}, s.l))
				})]
			})
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
//#endregion
export { WhyPage as component };
