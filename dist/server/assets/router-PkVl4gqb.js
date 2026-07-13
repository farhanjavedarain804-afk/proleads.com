import { o as useSiteSettings } from "./use-admin-data-jVw2-oN2.js";
import { t as logo_default } from "./logo-DQUycLDj.js";
import { r as SiteFooter } from "./site-footer-DDqAP1-1.js";
import { t as checkAuth } from "./auth.functions-C9ZQzyF9.js";
import { useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu, Phone, ShieldCheck, X } from "lucide-react";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-DbY6nDYz.css";
//#endregion
//#region src/components/site-header.tsx
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/coverage",
		label: "Coverage"
	},
	{
		to: "/why",
		label: "Why Us"
	},
	{
		to: "/reviews",
		label: "Reviews"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { phone, phoneTel: PHONE_TEL } = useSiteSettings();
	const PHONE = phone;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "bg-navy text-navy-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm",
			children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-brand shrink-0" }), /* @__PURE__ */ jsx("span", {
				className: "truncate",
				children: "Emergency Services Available 24/7 Across the United States"
			})]
		})
	}), /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "flex min-w-0 items-center",
					children: /* @__PURE__ */ jsx("img", {
						src: logo_default,
						alt: "ProLeadsGeneration — We Generate. You Grow.",
						className: "h-8 w-auto sm:h-9 object-contain",
						width: 1600,
						height: 800
					})
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden lg:flex items-center justify-center gap-6 text-sm font-medium whitespace-nowrap",
					children: NAV.map((n) => /* @__PURE__ */ jsx(Link, {
						to: n.to,
						activeOptions: { exact: true },
						activeProps: { className: "text-brand" },
						className: "whitespace-nowrap hover:text-brand transition-colors",
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-end gap-2",
					children: [/* @__PURE__ */ jsxs("a", {
						href: `tel:${PHONE_TEL}`,
						className: "hidden sm:inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:brightness-110 transition",
						children: [
							/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
							" ",
							PHONE
						]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setMenuOpen((v) => !v),
						className: "grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden",
						"aria-label": "Toggle menu",
						children: menuOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
					})]
				})
			]
		}), menuOpen && /* @__PURE__ */ jsx("div", {
			className: "lg:hidden border-t border-border bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium",
				children: [NAV.map((n) => /* @__PURE__ */ jsx(Link, {
					to: n.to,
					onClick: () => setMenuOpen(false),
					activeOptions: { exact: true },
					activeProps: { className: "rounded-lg px-3 py-2 bg-muted text-brand" },
					className: "rounded-lg px-3 py-2 hover:bg-muted",
					children: n.label
				}, n.to)), /* @__PURE__ */ jsxs("a", {
					href: `tel:${PHONE_TEL}`,
					className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 font-semibold text-brand-foreground",
					children: [
						/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
						" ",
						PHONE
					]
				})]
			})
		})]
	})] });
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-xl text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 rounded-lg bg-red-50 p-4 text-left text-xs font-mono text-red-700 overflow-auto max-h-60 border border-red-200",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-bold mb-1",
						children: error?.message || String(error)
					}), /* @__PURE__ */ jsx("pre", {
						className: "whitespace-pre-wrap",
						children: error?.stack
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: /* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					})
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#0b1220"
			},
			{ title: "ProLeadsGeneration — Premium Home Services Nationwide" },
			{
				name: "description",
				content: "ProLeadsGeneration connects homeowners with certified HVAC, plumbing, roofing, pest control and garage door pros across the USA. 24/7 emergency response."
			},
			{
				name: "author",
				content: "ProLeadsGeneration"
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				property: "og:site_name",
				content: "ProLeadsGeneration"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:locale",
				content: "en_US"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@proleadsgeneration"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "ProLeadsGeneration",
				url: "/",
				slogan: "We Generate. You Grow.",
				description: "Nationwide home services network — certified HVAC, plumbing, roofing, electrical, pest control and garage door pros available 24/7.",
				areaServed: {
					"@type": "Country",
					name: "United States"
				}
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "ProLeadsGeneration",
				url: "/",
				potentialAction: {
					"@type": "SearchAction",
					target: "/services?q={search_term_string}",
					"query-input": "required name=search_term_string"
				}
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
			className: "font-sans antialiased",
			children: [children, /* @__PURE__ */ jsx(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true
		})]
	});
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-h-screen bg-background text-foreground flex flex-col",
			children: [
				/* @__PURE__ */ jsx(SiteHeader, {}),
				/* @__PURE__ */ jsx("main", {
					className: "flex-1",
					children: /* @__PURE__ */ jsx(Outlet, {})
				}),
				/* @__PURE__ */ jsx(SiteFooter, {})
			]
		}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true
		})]
	});
}
//#endregion
//#region src/routes/why.tsx
var $$splitComponentImporter$17 = () => import("./why-DMxFKM-8.js");
var Route$18 = createFileRoute("/why")({
	head: () => ({
		meta: [
			{ title: "Why Choose Us — Trusted Service Pros | ProLeads" },
			{
				name: "description",
				content: "Trusted by 10,000+ homeowners. Same-day service, background-checked techs, upfront pricing and a 5-year workmanship warranty."
			},
			{
				property: "og:title",
				content: "Why Choose ProLeadsGeneration"
			},
			{
				property: "og:description",
				content: "Background-checked techs, upfront pricing, 5-year workmanship warranty. Trusted by 10,000+ homeowners."
			},
			{
				property: "og:url",
				content: "/why"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Why Choose ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "Certified, background-checked pros with a 5-year workmanship warranty."
			}
		],
		links: [{
			rel: "canonical",
			href: "/why"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
//#endregion
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route$17 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/services",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/coverage",
				changefreq: "weekly",
				priority: "0.8"
			},
			{
				path: "/why",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/reviews",
				changefreq: "weekly",
				priority: "0.7"
			},
			{
				path: "/faq",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.8"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/services.tsx
var $$splitComponentImporter$16 = () => import("./services-BrcxhWPa.js");
var SERVICE_TRADES = [
	{
		name: "HVAC Repair & Installation",
		description: "Heating, cooling, and ventilation service, replacement and maintenance."
	},
	{
		name: "Plumbing Services",
		description: "Leaks, water heaters, drain cleaning, repiping and fixture installs."
	},
	{
		name: "Roofing",
		description: "Roof repair, replacement, storm damage and gutter service."
	},
	{
		name: "Pest Control",
		description: "Residential and commercial pest, rodent and termite treatment."
	},
	{
		name: "Garage Door Service",
		description: "Spring, opener, panel and full garage door replacement."
	},
	{
		name: "Electrical",
		description: "Wiring, panels, EV chargers, lighting and safety inspections."
	},
	{
		name: "Water Damage Restoration",
		description: "Water extraction, drying, mold remediation and full restoration."
	},
	{
		name: "Appliance Repair",
		description: "Refrigerators, ovens, washers, dryers and dishwashers."
	},
	{
		name: "Handyman Services",
		description: "Drywall, carpentry, painting and small home repairs."
	},
	{
		name: "Landscaping",
		description: "Lawn care, irrigation, hardscaping and seasonal cleanup."
	},
	{
		name: "Cleaning Services",
		description: "Deep cleaning, move-in/out, and recurring residential cleaning."
	},
	{
		name: "Locksmith",
		description: "Lockouts, rekeys, smart locks and 24/7 emergency locksmith service."
	}
];
var Route$16 = createFileRoute("/services")({
	head: () => ({
		meta: [
			{ title: "Home Services — HVAC, Plumbing & More | ProLeads" },
			{
				name: "description",
				content: "HVAC, plumbing, roofing, pest control, garage door, electrical, water damage, appliance repair and more — from certified local pros."
			},
			{
				property: "og:title",
				content: "Home Services — HVAC, Plumbing, Roofing & More"
			},
			{
				property: "og:description",
				content: "Twelve trusted trades. One phone number. Certified local pros dispatched to your door — anywhere in the U.S."
			},
			{
				property: "og:url",
				content: "/services"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Home Services — ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "Certified local pros across twelve home trades. 24/7 nationwide dispatch."
			}
		],
		links: [{
			rel: "canonical",
			href: "/services"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "ItemList",
				name: "Home Services",
				itemListElement: SERVICE_TRADES.map((s, i) => ({
					"@type": "ListItem",
					position: i + 1,
					item: {
						"@type": "Service",
						name: s.name,
						description: s.description,
						provider: {
							"@type": "Organization",
							name: "ProLeadsGeneration"
						},
						areaServed: {
							"@type": "Country",
							name: "United States"
						},
						serviceType: s.name
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
//#endregion
//#region src/routes/reviews.tsx
var $$splitComponentImporter$15 = () => import("./reviews-PTtuZnwA.js");
var Route$15 = createFileRoute("/reviews")({
	head: () => ({
		meta: [
			{ title: "Customer Reviews — 4.9★ Rating | ProLeadsGeneration" },
			{
				name: "description",
				content: "Honest feedback from thousands of homeowners about our HVAC, plumbing, roofing and home service pros."
			},
			{
				property: "og:title",
				content: "Customer Reviews — ProLeadsGeneration"
			},
			{
				property: "og:description",
				content: "4.9★ average rating from 10,000+ verified homeowners nationwide."
			},
			{
				property: "og:url",
				content: "/reviews"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Customer Reviews — ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "See what 10,000+ verified homeowners say about our pros."
			}
		],
		links: [{
			rel: "canonical",
			href: "/reviews"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "ProLeadsGeneration",
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: "4.9",
					bestRating: "5",
					worstRating: "1",
					reviewCount: "8412"
				}
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
//#endregion
//#region src/routes/faq.tsx
var $$splitComponentImporter$14 = () => import("./faq-D4hSIJkR.js");
var FAQ_SCHEMA_ITEMS = [
	{
		q: "Are your technicians licensed and insured?",
		a: "Yes. Every pro in our network is licensed, background-checked, and fully insured in the state they serve."
	},
	{
		q: "Do you offer 24/7 emergency service?",
		a: "Yes — we dispatch around the clock, every day, with a 45-minute average response time nationwide."
	},
	{
		q: "How much does a service call cost?",
		a: "We use flat-rate diagnostics with upfront pricing before any work begins — no surprise fees."
	},
	{
		q: "What areas do you cover?",
		a: "All 50 U.S. states with certified local pros in every major metro area."
	},
	{
		q: "Do you offer a workmanship warranty?",
		a: "Yes — every job is backed by a 5-year workmanship warranty plus manufacturer parts warranties."
	},
	{
		q: "Can I get a same-day appointment?",
		a: "Same-day availability is offered in most metros — call or book online to check your area."
	}
];
var Route$14 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — Home Service Questions Answered | ProLeads" },
			{
				name: "description",
				content: "Answers to common questions about certifications, pricing, coverage, warranties and emergency response."
			},
			{
				property: "og:title",
				content: "FAQ — ProLeadsGeneration"
			},
			{
				property: "og:description",
				content: "Common questions about pricing, warranties, coverage and 24/7 emergency response."
			},
			{
				property: "og:url",
				content: "/faq"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "FAQ — ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "Pricing, warranties, coverage and emergency response — answered."
			}
		],
		links: [{
			rel: "canonical",
			href: "/faq"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQ_SCHEMA_ITEMS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
//#endregion
//#region src/routes/coverage.tsx
var $$splitComponentImporter$13 = () => import("./coverage-C_iyluxP.js");
var Route$13 = createFileRoute("/coverage")({
	head: () => ({
		meta: [
			{ title: "Nationwide Coverage — All 50 States | ProLeadsGeneration" },
			{
				name: "description",
				content: "Nationwide coverage across all 50 U.S. states with certified local pros in every major metro. 45-minute average response time."
			},
			{
				property: "og:title",
				content: "Nationwide Coverage — All 50 U.S. States"
			},
			{
				property: "og:description",
				content: "Certified local home service pros across every major U.S. metro. 24/7 dispatch, 45-minute average response."
			},
			{
				property: "og:url",
				content: "/coverage"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Nationwide Coverage — ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "Home service pros in every U.S. state. 24/7 dispatch."
			}
		],
		links: [{
			rel: "canonical",
			href: "/coverage"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$12 = () => import("./contact-Cev5OVq_.js");
var Route$12 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact Us — 24/7 Home Service Dispatch | ProLeads" },
			{
				name: "description",
				content: "Call 24/7 or send us a message. Nationwide dispatch for HVAC, plumbing, roofing and home services."
			},
			{
				property: "og:title",
				content: "Contact ProLeadsGeneration — 24/7 Nationwide Dispatch"
			},
			{
				property: "og:description",
				content: "Reach us anytime. Same-day booking for HVAC, plumbing, roofing and more across the U.S."
			},
			{
				property: "og:url",
				content: "/contact"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Contact ProLeadsGeneration"
			},
			{
				name: "twitter:description",
				content: "24/7 nationwide dispatch. Same-day home service."
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$11 = () => import("./auth-Bgm8q3oO.js");
var Route$11 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Admin Sign In — ProLeadsGeneration" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
//#endregion
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter$10 = () => import("./route-Di7iQBCH.js");
var Route$10 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ cause }) => {
		if (typeof window !== "undefined") {
			if (!document.cookie.split(";").some((c) => c.trim().startsWith("admin_session="))) throw redirect({ to: "/auth" });
		}
		try {
			const auth = await checkAuth();
			if (!auth || !auth.ok) throw redirect({ to: "/auth" });
			return {
				userId: auth.user?.id ?? null,
				email: auth.user?.email ?? null
			};
		} catch (e) {
			if (e?.isRedirect || e?._isRedirect || typeof e?.statusCode === "number") throw e;
			throw redirect({ to: "/auth" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$9 = () => import("./routes-vTQhu0fS.js");
var Route$9 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "ProLeadsGeneration — Premium Home Services Nationwide" },
			{
				name: "description",
				content: "Book certified local pros for HVAC, plumbing, roofing, pest control, electrical and garage door service. 24/7 across the USA."
			},
			{
				property: "og:title",
				content: "ProLeadsGeneration — Premium Home Services Nationwide"
			},
			{
				property: "og:description",
				content: "Certified local pros for HVAC, plumbing, roofing, pest control, electrical and garage door service. 24/7 across the USA."
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "ProLeadsGeneration — Premium Home Services Nationwide"
			},
			{
				name: "twitter:description",
				content: "Certified local pros for HVAC, plumbing, roofing and more. 24/7 nationwide."
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: [
					{
						q: "Are your technicians licensed and insured?",
						a: "Yes. Every pro in our network is licensed, background-checked, and fully insured in the state they serve."
					},
					{
						q: "Do you offer 24/7 emergency service?",
						a: "Yes — we dispatch around the clock, every day, with a 45-minute average response time nationwide."
					},
					{
						q: "How much does a service call cost?",
						a: "We use flat-rate diagnostics with upfront pricing before any work begins — no surprise fees."
					},
					{
						q: "What areas do you cover?",
						a: "All 50 U.S. states with certified local pros in every major metro area."
					},
					{
						q: "Do you offer a workmanship warranty?",
						a: "Yes — every job is backed by a 5-year workmanship warranty plus manufacturer parts warranties."
					}
				].map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/_authenticated/admin.tsx
var $$splitComponentImporter$8 = () => import("./admin-CV9vi59O.js");
var Route$8 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin — ProLeadsGeneration" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/_authenticated/admin.index.tsx
var $$splitComponentImporter$7 = () => import("./admin.index-CVJTMG5s.js");
var Route$7 = createFileRoute("/_authenticated/admin/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/_authenticated/admin.submissions.tsx
var $$splitComponentImporter$6 = () => import("./admin.submissions-CQGqJLmO.js");
var Route$6 = createFileRoute("/_authenticated/admin/submissions")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/_authenticated/admin.settings.tsx
var $$splitComponentImporter$5 = () => import("./admin.settings-CH0odo83.js");
var Route$5 = createFileRoute("/_authenticated/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/_authenticated/admin.services.tsx
var $$splitComponentImporter$4 = () => import("./admin.services-CqjIdNsg.js");
var Route$4 = createFileRoute("/_authenticated/admin/services")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/_authenticated/admin.reviews.tsx
var $$splitComponentImporter$3 = () => import("./admin.reviews-DdedJ5g6.js");
var Route$3 = createFileRoute("/_authenticated/admin/reviews")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/_authenticated/admin.faqs.tsx
var $$splitComponentImporter$2 = () => import("./admin.faqs-BCteCE55.js");
var Route$2 = createFileRoute("/_authenticated/admin/faqs")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/_authenticated/admin.coverage.tsx
var $$splitComponentImporter$1 = () => import("./admin.coverage-BEHteWkE.js");
var Route$1 = createFileRoute("/_authenticated/admin/coverage")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/_authenticated/admin.admins.tsx
var $$splitComponentImporter = () => import("./admin.admins-g6hyDm4O.js");
var Route = createFileRoute("/_authenticated/admin/admins")({
	head: () => ({ meta: [{ title: "Admin Users — ProLeadsGeneration" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var WhyRoute = Route$18.update({
	id: "/why",
	path: "/why",
	getParentRoute: () => Route$19
});
var SitemapDotxmlRoute = Route$17.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$19
});
var ServicesRoute = Route$16.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$19
});
var ReviewsRoute = Route$15.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$19
});
var FaqRoute = Route$14.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$19
});
var CoverageRoute = Route$13.update({
	id: "/coverage",
	path: "/coverage",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$12.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AuthenticatedAdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSubmissionsRoute = Route$6.update({
	id: "/submissions",
	path: "/submissions",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminServicesRoute = Route$4.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminReviewsRoute = Route$3.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminFaqsRoute = Route$2.update({
	id: "/faqs",
	path: "/faqs",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCoverageRoute = Route$1.update({
	id: "/coverage",
	path: "/coverage",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminAdminsRoute: Route.update({
		id: "/admins",
		path: "/admins",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminCoverageRoute,
	AuthenticatedAdminFaqsRoute,
	AuthenticatedAdminReviewsRoute,
	AuthenticatedAdminServicesRoute,
	AuthenticatedAdminSettingsRoute,
	AuthenticatedAdminSubmissionsRoute,
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ContactRoute,
	CoverageRoute,
	FaqRoute,
	ReviewsRoute,
	ServicesRoute,
	SitemapDotxmlRoute,
	WhyRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
