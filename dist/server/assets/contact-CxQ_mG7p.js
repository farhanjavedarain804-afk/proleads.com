import { a as useServices, o as useSiteSettings, v as submitContactForm } from "./use-admin-data-Ik71BfQt.js";
import { n as PageHeader } from "./site-footer-DMGk8vbH.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/contact.tsx?tsr-split=component
var OFFICES = [
	{
		city: "Austin, TX",
		role: "Headquarters",
		hours: "Mon–Sun · 24/7 dispatch"
	},
	{
		city: "Phoenix, AZ",
		role: "West Regional",
		hours: "Mon–Sun · 24/7 dispatch"
	},
	{
		city: "Charlotte, NC",
		role: "East Regional",
		hours: "Mon–Sun · 24/7 dispatch"
	},
	{
		city: "Chicago, IL",
		role: "Midwest Regional",
		hours: "Mon–Sun · 24/7 dispatch"
	}
];
function ContactPage() {
	const { phone: PHONE, phone_tel: PHONE_TEL, email: EMAIL, address: ADDRESS } = useSiteSettings();
	const { data: services = [] } = useServices();
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		city: "",
		service: "",
		urgency: "",
		message: ""
	});
	const CONTACT_METHODS = [
		{
			icon: Phone,
			label: "24/7 Dispatch",
			value: PHONE,
			href: `tel:${PHONE_TEL}`
		},
		{
			icon: Mail,
			label: "Email Support",
			value: EMAIL,
			href: `mailto:${EMAIL}`
		},
		{
			icon: MessageSquare,
			label: "Text a Dispatcher",
			value: "Reply within 5 min",
			href: `sms:${PHONE_TEL}`
		},
		{
			icon: MapPin,
			label: "Headquarters",
			value: ADDRESS
		}
	];
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			await submitContactForm({ data: {
				name: form.name,
				email: form.email,
				phone: form.phone,
				city: form.city,
				service: form.service,
				message: `${form.urgency ? `Urgency: ${form.urgency}\n` : ""}${form.message}`
			} });
			toast.success("Message sent");
			setSubmitted(true);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Get In Touch",
			title: "Talk To A Home Service Expert",
			subtitle: "Call our 24/7 dispatch or send a message — a specialist will reach out within one business hour."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 py-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => {
					return /* @__PURE__ */ jsxs(href ? "a" : "div", {
						...href ? { href } : {},
						className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: label
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-1 font-display font-bold text-navy break-words",
								children: value
							})]
						})]
					}, label);
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ jsx("h3", {
									className: "font-display text-lg font-bold text-navy",
									children: "Hours & Response Times"
								})]
							}), /* @__PURE__ */ jsxs("ul", {
								className: "mt-4 space-y-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: "Phone dispatch" }), /* @__PURE__ */ jsx("span", {
											className: "font-semibold text-navy",
											children: "24/7"
										})]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: "Emergency response" }), /* @__PURE__ */ jsx("span", {
											className: "font-semibold text-navy",
											children: "30–90 min"
										})]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: "Standard bookings" }), /* @__PURE__ */ jsx("span", {
											className: "font-semibold text-navy",
											children: "Same-day / next-day"
										})]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: "Email replies" }), /* @__PURE__ */ jsx("span", {
											className: "font-semibold text-navy",
											children: "Under 1 hour"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ jsx("h3", {
									className: "font-display text-lg font-bold text-navy",
									children: "Regional Offices"
								})]
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-4 space-y-3 text-sm",
								children: OFFICES.map((o) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-display font-bold text-navy",
										children: o.city
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: o.role
									})] }), /* @__PURE__ */ jsx("div", {
										className: "text-right text-xs text-muted-foreground",
										children: o.hours
									})]
								}, o.city))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ jsx("h3", {
									className: "font-display text-lg font-bold text-navy",
									children: "Your Info Is Protected"
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "We never sell your data. Your contact info is used only to dispatch a licensed pro to your address."
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-2xl font-bold text-navy",
							children: "Send Us A Message"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "We reply within one business hour."
						}),
						submitted ? /* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-col items-center gap-3 rounded-2xl bg-brand/10 p-8 text-center",
							children: [
								/* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-brand" }),
								/* @__PURE__ */ jsx("p", {
									className: "font-display text-lg font-bold text-navy",
									children: "Message sent!"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "A specialist will contact you shortly."
								})
							]
						}) : /* @__PURE__ */ jsxs("form", {
							onSubmit: handleSubmit,
							className: "mt-6 grid gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsx("input", {
										required: true,
										placeholder: "Full Name",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "tel",
										placeholder: "Phone Number",
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									required: true,
									type: "email",
									placeholder: "Email Address",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
								}),
								/* @__PURE__ */ jsx("input", {
									required: true,
									placeholder: "City & State",
									value: form.city,
									onChange: (e) => setForm({
										...form,
										city: e.target.value
									}),
									className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("select", {
										required: true,
										value: form.service,
										onChange: (e) => setForm({
											...form,
											service: e.target.value
										}),
										className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											disabled: true,
											children: "Choose a service…"
										}), services.map((s) => /* @__PURE__ */ jsx("option", {
											value: s.title,
											children: s.title
										}, s.id))]
									}), /* @__PURE__ */ jsxs("select", {
										required: true,
										value: form.urgency,
										onChange: (e) => setForm({
											...form,
											urgency: e.target.value
										}),
										className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												disabled: true,
												children: "Urgency…"
											}),
											/* @__PURE__ */ jsx("option", { children: "Emergency (24/7)" }),
											/* @__PURE__ */ jsx("option", { children: "Same-day" }),
											/* @__PURE__ */ jsx("option", { children: "This week" }),
											/* @__PURE__ */ jsx("option", { children: "Just an estimate" })
										]
									})]
								}),
								/* @__PURE__ */ jsx("textarea", {
									required: true,
									rows: 4,
									placeholder: "Describe your issue",
									value: form.message,
									onChange: (e) => setForm({
										...form,
										message: e.target.value
									}),
									className: "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex items-start gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										defaultChecked: true,
										className: "mt-0.5"
									}), "I agree to be contacted about my request. We never share your info."]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: loading,
									className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-bold text-brand-foreground hover:brightness-110 transition disabled:opacity-60",
									children: loading ? "Sending…" : /* @__PURE__ */ jsxs(Fragment, { children: ["Send Message ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })] })
								})
							]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { ContactPage as component };
