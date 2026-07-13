import { a as useServices, o as useSiteSettings } from "./use-admin-data-eMxb8KI8.js";
import { t as logo_default } from "./logo-DQUycLDj.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bug, Clock, DoorOpen, Droplets, Flame, Hammer, Home, MapPin, PaintBucket, Phone, ShieldCheck, Snowflake, Wind, Wrench, Zap } from "lucide-react";
//#region src/lib/site-data.ts
var SERVICES = [
	{
		slug: "hvac",
		icon: Wind,
		title: "HVAC Services",
		desc: "Fast emergency AC repair, furnace maintenance, air conditioning service and heat pump replacement by certified local technicians.",
		tag: "Heating & Cooling",
		features: [
			"AC repair & install",
			"Furnace tune-up",
			"Heat pump service",
			"Duct cleaning",
			"Thermostat setup",
			"Annual maintenance"
		],
		priceFrom: "$89",
		responseTime: "60–90 min"
	},
	{
		slug: "plumbing",
		icon: Wrench,
		title: "Plumbing Solutions",
		desc: "24-hour plumbers for clogged drains, leak detection, sewer line repair, and water heater service — anywhere in the country.",
		tag: "Emergency Plumbing",
		features: [
			"Drain cleaning",
			"Leak detection",
			"Pipe repair",
			"Water heater service",
			"Sewer line repair",
			"Fixture install"
		],
		priceFrom: "$79",
		responseTime: "45–75 min"
	},
	{
		slug: "pest-control",
		icon: Bug,
		title: "Pest Control",
		desc: "Top-rated exterminators for residential pest control, termite treatment, bed bugs, rodents and wasp nest removal.",
		tag: "Residential",
		features: [
			"Termite treatment",
			"Bed bug removal",
			"Rodent control",
			"Wasp & hornet nests",
			"Ant colony treatment",
			"Quarterly plans"
		],
		priceFrom: "$99",
		responseTime: "Same day"
	},
	{
		slug: "roofing",
		icon: Home,
		title: "Premium Roofing",
		desc: "Emergency roof leak repair, storm damage inspection, shingle installation and transparent roof replacement quotes.",
		tag: "Storm Damage",
		features: [
			"Leak repair",
			"Shingle install",
			"Storm inspection",
			"Gutter service",
			"Full replacement",
			"Insurance claims"
		],
		priceFrom: "$149",
		responseTime: "2–4 hours"
	},
	{
		slug: "garage-door",
		icon: DoorOpen,
		title: "Garage Door Repair",
		desc: "Broken spring repair, opener installation, cable replacement and overhead garage door service by trained specialists.",
		tag: "Same-Day",
		features: [
			"Spring replacement",
			"Opener install",
			"Cable & roller",
			"Panel replacement",
			"Remote programming",
			"Safety inspection"
		],
		priceFrom: "$89",
		responseTime: "Same day"
	},
	{
		slug: "electrical",
		icon: Zap,
		title: "Electrical",
		desc: "Licensed electricians for panel upgrades, outlet installs, EV charger wiring and whole-home rewiring.",
		tag: "Licensed",
		features: [
			"Panel upgrades",
			"Outlet & switch install",
			"EV charger wiring",
			"Whole-home rewiring",
			"Lighting install",
			"Code inspection"
		],
		priceFrom: "$99",
		responseTime: "1–2 hours"
	},
	{
		slug: "water-damage",
		icon: Droplets,
		title: "Water Damage Restoration",
		desc: "Emergency water extraction, structural drying, mold prevention and full restoration after floods or leaks.",
		tag: "Emergency",
		features: [
			"Water extraction",
			"Structural drying",
			"Mold prevention",
			"Carpet restoration",
			"Dehumidification",
			"Insurance support"
		],
		priceFrom: "$199",
		responseTime: "30–60 min"
	},
	{
		slug: "chimney",
		icon: Flame,
		title: "Chimney & Fireplace",
		desc: "Chimney sweeping, fireplace inspections, cap replacement and full masonry repair before winter arrives.",
		tag: "Seasonal",
		features: [
			"Chimney sweep",
			"Cap replacement",
			"Masonry repair",
			"Liner install",
			"Level 2 inspection",
			"Gas fireplace service"
		],
		priceFrom: "$129",
		responseTime: "Next day"
	},
	{
		slug: "appliance-repair",
		icon: Snowflake,
		title: "Appliance Repair",
		desc: "Refrigerators, washers, dryers, ovens and dishwashers — most brands serviced within 24 hours.",
		tag: "Home Appliances",
		features: [
			"Refrigerator",
			"Washer & dryer",
			"Oven & range",
			"Dishwasher",
			"Microwave",
			"Ice maker"
		],
		priceFrom: "$79",
		responseTime: "Same day"
	},
	{
		slug: "handyman",
		icon: Hammer,
		title: "Handyman & Remodel",
		desc: "Small fixes to full remodels — drywall, trim, doors, tile and everything on your punch list.",
		tag: "Trusted",
		features: [
			"Drywall repair",
			"Trim & moulding",
			"Door hanging",
			"Tile install",
			"Furniture assembly",
			"TV mounting"
		],
		priceFrom: "$65/hr",
		responseTime: "1–2 days"
	},
	{
		slug: "locksmith",
		icon: ShieldCheck,
		title: "Locksmith & Security",
		desc: "Lockouts, rekeys, deadbolts, smart locks and home security installs — 24/7 emergency dispatch.",
		tag: "24/7",
		features: [
			"Emergency lockout",
			"Rekey service",
			"Smart lock install",
			"Deadbolt upgrade",
			"Camera setup",
			"Safe service"
		],
		priceFrom: "$59",
		responseTime: "20–40 min"
	},
	{
		slug: "painting",
		icon: PaintBucket,
		title: "Interior & Exterior Painting",
		desc: "Prep, prime and premium finishes for interiors, exteriors, cabinets and decks with a 5-year warranty.",
		tag: "Premium Finish",
		features: [
			"Interior painting",
			"Exterior painting",
			"Cabinet refinishing",
			"Deck staining",
			"Color consult",
			"5-yr warranty"
		],
		priceFrom: "$299",
		responseTime: "2–3 days"
	}
];
var STATS = [
	{
		value: "10,000+",
		label: "Happy Homeowners"
	},
	{
		value: "25,000+",
		label: "Completed Jobs"
	},
	{
		value: "15+ Yrs",
		label: "Industry Experience"
	},
	{
		value: "4.9/5",
		label: "Customer Rating"
	}
];
var PROCESS_STEPS = [
	{
		n: "1",
		t: "Contact & Request",
		d: "Call the number or book online. Our dispatchers schedule a perfect time window."
	},
	{
		n: "2",
		t: "Expert Evaluation",
		d: "A certified specialist inspects your system and presents fixed diagnostic options."
	},
	{
		n: "3",
		t: "Complete Satisfaction",
		d: "Our pros finish the job using premium materials, backed by full warranties."
	}
];
var VALUES = [
	{
		title: "Same-Day Service Guarantee",
		body: "We respect your schedule. Techs arrive within the promised window or your diagnostic fee is on us."
	},
	{
		title: "Background-Checked Techs",
		body: "Every field specialist undergoes rigorous nationwide background checks and ongoing certifications."
	},
	{
		title: "100% Upfront Clear Pricing",
		body: "You approve a fixed quote before any work begins. No hidden line items, no surprises."
	},
	{
		title: "5-Year Workmanship Warranty",
		body: "Major installs are backed by our industry-leading 5-year labor guarantee — parts covered by the manufacturer."
	},
	{
		title: "Eco-Friendly Materials",
		body: "We prioritize low-VOC, ENERGY STAR and sustainably sourced products for every install we complete."
	},
	{
		title: "One Trusted Dispatch Line",
		body: "Six trades, one number. Skip juggling contractors — we route your job to the right specialist instantly."
	}
];
//#endregion
//#region src/components/site-footer.tsx
function SiteFooter() {
	const { phone: PHONE, phoneTel: PHONE_TEL } = useSiteSettings();
	const { data: dbServices } = useServices();
	const servicesList = dbServices && dbServices.length > 0 ? dbServices : SERVICES.map((s) => ({
		id: s.slug,
		title: s.title
	}));
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-navy text-navy-foreground",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "rounded-xl bg-white/95 p-3 inline-block",
					children: /* @__PURE__ */ jsx("img", {
						src: logo_default,
						alt: "ProLeadsGeneration company logo",
						className: "h-12 w-auto",
						width: 1600,
						height: 800,
						loading: "lazy"
					})
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-white/70",
					children: "Connecting homeowners nationwide with licensed, insured and background-checked home service pros."
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "font-display text-sm font-bold uppercase tracking-widest text-brand",
					children: "Services"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2 text-sm text-white/80",
					children: servicesList.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/services",
						className: "hover:text-brand",
						children: s.title
					}) }, s.id))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "font-display text-sm font-bold uppercase tracking-widest text-brand",
					children: "Company"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-4 space-y-2 text-sm text-white/80",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/why",
							className: "hover:text-brand",
							children: "Why Us"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/coverage",
							className: "hover:text-brand",
							children: "Coverage"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/reviews",
							className: "hover:text-brand",
							children: "Reviews"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/faq",
							className: "hover:text-brand",
							children: "FAQ"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "hover:text-brand",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "font-display text-sm font-bold uppercase tracking-widest text-brand",
					children: "Contact"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-4 space-y-2 text-sm text-white/80",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: `tel:${PHONE_TEL}`,
							className: "inline-flex items-center gap-2 hover:text-brand",
							children: [
								/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
								" ",
								PHONE
							]
						}) }),
						/* @__PURE__ */ jsxs("li", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-brand" }), " 24/7 Emergency Dispatch"]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-brand" }), " All 50 U.S. States"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ProLeadsGeneration. All rights reserved."
				] }), /* @__PURE__ */ jsxs("span", {
					className: "text-center",
					children: [
						"Developed By",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "https://www.devionic.com",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "font-semibold text-brand hover:underline",
							children: "Devionic (Private) Limited"
						}),
						" ",
						"|",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "https://wa.me/923177121841",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-brand",
							children: "+92-317-7121841 WhatsApp"
						}),
						" ",
						"|",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "https://www.devionic.com",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-brand",
							children: "www.devionic.com"
						}),
						" ",
						"|",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "mailto:info@devionic.com",
							className: "hover:text-brand",
							children: "info@devionic.com"
						})
					]
				})]
			})
		})]
	});
}
function CtaBanner() {
	const { phone: PHONE, phoneTel: PHONE_TEL } = useSiteSettings();
	return /* @__PURE__ */ jsx("section", {
		className: "relative overflow-hidden bg-brand text-brand-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-[1fr_auto] sm:items-center sm:py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
					children: "Need Expert Assistance Immediately?"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-brand-foreground/90",
					children: "Call now and we'll dispatch a licensed pro to your door — 24/7, nationwide."
				})]
			}), /* @__PURE__ */ jsxs("a", {
				href: `tel:${PHONE_TEL}`,
				className: "inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 font-display text-base font-bold text-navy-foreground shadow-xl hover:bg-navy/90 transition",
				children: [
					/* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
					" ",
					PHONE
				]
			})]
		})
	});
}
function PageHeader({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ jsx("section", {
		className: "bg-navy text-navy-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl px-4 py-16 text-center sm:py-20",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold uppercase tracking-[0.25em] text-brand",
					children: eyebrow
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl",
					children: title
				}),
				subtitle && /* @__PURE__ */ jsx("p", {
					className: "mx-auto mt-4 max-w-2xl text-white/80",
					children: subtitle
				})
			]
		})
	});
}
//#endregion
export { STATS as a, PROCESS_STEPS as i, PageHeader as n, VALUES as o, SiteFooter as r, CtaBanner as t };
