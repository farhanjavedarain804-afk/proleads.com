import { a as useServices, i as useReviews, n as useFaqs, o as useSiteSettings, s as useStates, t as useCities } from "./use-admin-data-Ik71BfQt.js";
import { a as STATS, i as PROCESS_STEPS, o as VALUES, t as CtaBanner } from "./site-footer-DMGk8vbH.js";
import { n as getIcon } from "./icon-map-DfNldbji.js";
import { t as hero_default } from "./hero-DGrFqcoN.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronDown, Clock, MapPin, Phone, Quote, ShieldCheck, Sparkles, Star, Wrench } from "lucide-react";
var hero_bg_mp4_asset_default = {
	version: 1,
	asset_id: "331ddd3f-5490-4eaf-b90d-5be8e6ba8d21",
	project_id: "bf594a2d-504f-43b9-8f67-08ff6f84f463",
	url: "/__l5e/assets-v1/331ddd3f-5490-4eaf-b90d-5be8e6ba8d21/hero-bg.mp4",
	original_filename: "hero-bg.mp4",
	size: 19672902,
	created_at: "2026-07-12T13:59:30Z"
};
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Landing() {
	const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
	const { data: SERVICES = [] } = useServices();
	const { data: REVIEWS = [] } = useReviews();
	const { data: FAQS = [] } = useFaqs();
	const { data: statesData = [] } = useStates();
	const { data: citiesData = [] } = useCities();
	const STATES = statesData.map((s) => s.name);
	const CITIES = useMemo(() => {
		const map = {};
		for (const s of statesData) map[s.name] = citiesData.filter((c) => c.state_id === s.id).map((c) => c.name);
		return map;
	}, [statesData, citiesData]);
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [availability, setAvailability] = useState(null);
	const cityList = useMemo(() => state && state !== "USA" ? CITIES[state] ?? [
		`${state} — Main Metro`,
		`${state} — Suburbs`,
		`${state} — Countywide`
	] : [], [state, CITIES]);
	const handleFindPro = () => {
		if (!state) {
			setAvailability(null);
			return;
		}
		setAvailability({
			state,
			city: city || (state === "USA" ? "Nationwide" : `${state} area`)
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative isolate overflow-hidden bg-navy text-navy-foreground",
			children: [
				/* @__PURE__ */ jsx("video", {
					src: hero_bg_mp4_asset_default.url,
					poster: hero_default,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "auto",
					className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
				}),
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/95" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:py-24 lg:py-28",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto max-w-3xl text-center",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand",
									children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), " Nationwide Home Service Network"]
								}),
								/* @__PURE__ */ jsxs("h1", {
									className: "mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
									children: [
										"Premium Nationwide ",
										/* @__PURE__ */ jsx("span", {
											className: "text-brand",
											children: "Home Services"
										}),
										" Network"
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg",
									children: "Premium Heating, Cooling, Plumbing, Roofing, Pest and Garage Door expert solutions across the United States — booked in minutes."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-[1fr_1fr_auto]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsxs("select", {
											value: state,
											onChange: (e) => {
												setState(e.target.value);
												setCity("");
												setAvailability(null);
											},
											"aria-label": "Select your state",
											className: "w-full appearance-none rounded-xl bg-white px-4 py-3 pr-10 text-sm font-medium text-navy shadow-sm outline-none ring-brand focus:ring-2",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "",
													children: "-- Select Your State --"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "USA",
													children: "Whole USA (Nationwide)"
												}),
												STATES.map((s) => /* @__PURE__ */ jsx("option", {
													value: s,
													children: s
												}, s))
											]
										}), /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/60" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsxs("select", {
											value: city,
											onChange: (e) => {
												setCity(e.target.value);
												setAvailability(null);
											},
											"aria-label": "Select your city",
											className: "w-full appearance-none rounded-xl bg-white px-4 py-3 pr-10 text-sm font-medium text-navy shadow-sm outline-none ring-brand focus:ring-2",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "",
													children: state ? "-- Select Your City --" : "-- Select a State First --"
												}),
												cityList.map((c) => /* @__PURE__ */ jsx("option", {
													value: c,
													children: c
												}, c)),
												state && /* @__PURE__ */ jsxs("option", {
													value: `Other in ${state}`,
													children: ["Other city in ", state]
												})
											]
										}), /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/60" })]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: handleFindPro,
										className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:brightness-110 transition disabled:opacity-60",
										disabled: !state,
										children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }), " Find Local Pro"]
									})
								]
							}), availability && /* @__PURE__ */ jsxs("div", {
								className: "mt-4 flex flex-col items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-left sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "text-sm font-semibold text-white",
										children: [
											"Great news — we're available in ",
											availability.city,
											availability.state !== "USA" && availability.city !== `${availability.state} area` ? `, ${availability.state}` : "",
											"!"
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-white/75",
										children: "Certified local pros are ready to dispatch. Call now or browse services to book."
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-shrink-0 gap-2",
									children: [/* @__PURE__ */ jsxs("a", {
										href: `tel:${PHONE_TEL}`,
										className: "inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground hover:brightness-110",
										children: [/* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }), " Call"]
									}), /* @__PURE__ */ jsxs(Link, {
										to: "/services",
										className: "inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20",
										children: ["Services ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: "/services",
								className: "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg hover:brightness-110 transition",
								children: [/* @__PURE__ */ jsx(Wrench, { className: "h-4 w-4" }), " View Services"]
							}), /* @__PURE__ */ jsxs("a", {
								href: `tel:${PHONE_TEL}`,
								className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition",
								children: [
									/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
									" Call ",
									PHONE
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/85 sm:text-sm",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-brand" }), " Fully Licensed & Insured"]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-brand" }), " 4.9/5 Rated Experts"]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-brand" }), " Same-Day Response"]
								})
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:py-14 md:grid-cols-4",
				children: STATS.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl",
						children: s.value
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:py-24",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
							children: "Our Expertise"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl",
							children: "Complete Home Solutions For Every Need"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground",
							children: "Twelve trusted trades. One phone number. Certified local pros dispatched to your door."
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: SERVICES.slice(0, 6).map((s) => {
						return /* @__PURE__ */ jsxs("article", {
							className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl",
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
								})
							]
						}, s.id);
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/services",
						className: "inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition",
						children: ["See all 12 services ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Why Choose Us"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Six guarantees on every job"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: VALUES.map((v) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-6",
						children: [
							/* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 text-brand" }),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 font-display text-lg font-bold text-navy",
								children: v.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: v.body
							})
						]
					}, v.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-navy text-navy-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Simple Steps"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold sm:text-4xl",
						children: "How It Works"
					})]
				}), /* @__PURE__ */ jsx("ol", {
					className: "mt-14 grid gap-8 md:grid-cols-3",
					children: PROCESS_STEPS.map((s) => /* @__PURE__ */ jsxs("li", {
						className: "rounded-2xl border border-white/10 bg-white/5 p-8",
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
			className: "mx-auto max-w-7xl px-4 py-20",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Testimonials"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Real feedback from real neighbors"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: REVIEWS.slice(0, 3).map((r) => /* @__PURE__ */ jsxs("figure", {
						className: "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ jsx(Quote, { className: "h-6 w-6 text-brand/40" }),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "mt-3 flex-1 text-sm leading-relaxed",
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
								className: "mt-3 text-xs text-muted-foreground",
								children: [
									"— ",
									r.name,
									", ",
									r.city
								]
							})
						]
					}, r.id))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/reviews",
						className: "inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline",
						children: ["Read all reviews ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Nationwide Reach"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "Serving all 50 states"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "From coast to coast — 480+ metros, 6,000+ certified pros and 45-minute average response time in major cities."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							"California",
							"Texas",
							"Florida",
							"New York",
							"Georgia",
							"Arizona",
							"North Carolina",
							"Illinois",
							"Ohio",
							"Colorado"
						].map((s) => /* @__PURE__ */ jsx("span", {
							className: "rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-navy",
							children: s
						}, s))
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/coverage",
						className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline",
						children: ["See full coverage map ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-4",
					children: [
						{
							v: "50",
							l: "States"
						},
						{
							v: "480+",
							l: "Metros"
						},
						{
							v: "6,000+",
							l: "Pros"
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
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-4xl px-4 py-16",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
							children: "FAQ"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
							children: "Common Questions"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 space-y-3",
						children: FAQS.slice(0, 4).map((f) => /* @__PURE__ */ jsxs("details", {
							className: "group rounded-2xl border border-border bg-background",
							children: [/* @__PURE__ */ jsxs("summary", {
								className: "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-bold text-navy",
								children: [f.question, /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 text-brand transition-transform group-open:rotate-180" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground",
								children: f.answer
							})]
						}, f.id))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 text-center",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/faq",
							className: "inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline",
							children: ["View all FAQs ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-muted/40 border-y border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-5xl px-4 py-16 sm:py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
						children: "Compare"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl",
						children: "How ProLeads compares"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10 overflow-hidden rounded-3xl border border-border bg-background shadow-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-4 border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "px-4 py-4 sm:px-6",
								children: "Feature"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "px-4 py-4 text-center text-brand sm:px-6",
								children: "ProLeads"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "px-4 py-4 text-center sm:px-6",
								children: "Local Solo"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "px-4 py-4 text-center sm:px-6",
								children: "Big-box Chain"
							})
						]
					}), [
						[
							"Licensed & insured pros",
							"yes",
							"maybe",
							"yes"
						],
						[
							"24/7 emergency dispatch",
							"yes",
							"no",
							"limited"
						],
						[
							"Upfront flat-rate pricing",
							"yes",
							"varies",
							"no"
						],
						[
							"5-year workmanship warranty",
							"yes",
							"1 year",
							"1 year"
						],
						[
							"Same-day availability",
							"yes",
							"no",
							"sometimes"
						],
						[
							"Nationwide coverage",
							"50 states",
							"1 city",
							"regional"
						]
					].map((row, i) => /* @__PURE__ */ jsxs("div", {
						className: `grid grid-cols-4 items-center text-sm ${i % 2 ? "bg-muted/20" : ""}`,
						children: [/* @__PURE__ */ jsx("div", {
							className: "px-4 py-3.5 font-medium text-navy sm:px-6",
							children: row[0]
						}), row.slice(1).map((v, j) => /* @__PURE__ */ jsx("div", {
							className: "px-4 py-3.5 text-center sm:px-6",
							children: v === "yes" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto h-5 w-5 text-brand" }) : /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: v
							})
						}, j))]
					}, row[0]))]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-brand" }), " Fully Insured"]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-brand" }), " Licensed in 50 States"]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Star, { className: "h-4 w-4 text-brand" }), " 4.9/5 · 8,400+ Reviews"]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-brand" }), " 24/7 Support"]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-brand" }), " BBB A+ Accredited"]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-brand" }), " HomeAdvisor Elite"]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(CtaBanner, {})
	] });
}
//#endregion
export { Landing as component };
