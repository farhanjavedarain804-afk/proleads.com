import { t as logo_default } from "./logo-DQUycLDj.js";
import { n as login, t as checkAuth } from "./auth.functions-DVSjue4P.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [checking, setChecking] = useState(true);
	useEffect(() => {
		checkAuth().then((auth) => {
			if (auth?.ok) window.location.href = "/admin";
			else setChecking(false);
		}).catch(() => {
			setChecking(false);
		});
	}, []);
	async function onSubmit(e) {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			if (!(await login({ data: {
				email,
				password
			} }))?.ok) throw new Error("Login failed. Please check your credentials.");
			toast.success("Signed in successfully!");
			window.location.href = "/admin";
		} catch (err) {
			const msg = typeof err?.message === "string" && err.message.length < 200 ? err.message : "Sign in failed. Please try again.";
			toast.error(msg);
			setLoading(false);
		}
	}
	if (checking) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-100",
		children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" })
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-hidden bg-slate-100 flex items-center justify-center px-4 py-12",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-brand/30" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-[40%] bg-navy/20 rotate-12" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 min-h-[560px]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col items-center justify-center p-10 text-white",
						style: { background: "linear-gradient(135deg, oklch(0.28 0.06 260) 0%, oklch(0.22 0.05 260) 55%, oklch(0.18 0.04 260) 100%)" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "pointer-events-none absolute inset-0 overflow-hidden",
							children: [
								/* @__PURE__ */ jsx("div", { className: "absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-white/10" }),
								/* @__PURE__ */ jsx("div", { className: "absolute right-8 top-16 h-6 w-6 rotate-45 bg-white/15" }),
								/* @__PURE__ */ jsx("div", { className: "absolute right-20 bottom-24 h-10 w-10 rotate-45 border border-white/25" }),
								/* @__PURE__ */ jsx("div", {
									className: "absolute left-10 top-10",
									children: /* @__PURE__ */ jsx("img", {
										src: logo_default,
										alt: "ProLeadsGeneration company logo",
										className: "h-10 w-auto brightness-0 invert"
									})
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative text-center max-w-xs",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-4xl font-extrabold tracking-tight",
									children: "Admin Portal"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-sm leading-relaxed text-white/90",
									children: "Sign in to manage your website content, reviews, submissions and settings."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-8 inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80",
									children: "Authorized users only"
								})
							]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col items-center justify-center p-10",
						children: /* @__PURE__ */ jsxs("div", {
							className: "w-full max-w-sm",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-6 flex justify-center",
									children: /* @__PURE__ */ jsx("img", {
										src: logo_default,
										alt: "ProLeadsGeneration company logo",
										className: "h-12 w-auto"
									})
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-center font-display text-3xl font-extrabold text-navy",
									children: "Sign In"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-6 text-center text-xs text-slate-400",
									children: "Enter your admin credentials:"
								}),
								/* @__PURE__ */ jsxs("form", {
									onSubmit,
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx(Mail, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ jsx("input", {
												id: "admin-email",
												type: "email",
												required: true,
												autoComplete: "email",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												placeholder: "Email",
												className: "w-full rounded-md bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand/40"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [
												/* @__PURE__ */ jsx(Lock, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
												/* @__PURE__ */ jsx("input", {
													id: "admin-password",
													type: showPassword ? "text" : "password",
													required: true,
													minLength: 6,
													autoComplete: "current-password",
													value: password,
													onChange: (e) => setPassword(e.target.value),
													placeholder: "Password",
													className: "w-full rounded-md bg-slate-100 py-3 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand/40"
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setShowPassword((s) => !s),
													className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700",
													"aria-label": showPassword ? "Hide password" : "Show password",
													children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
												})
											]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "pt-3 flex justify-center",
											children: /* @__PURE__ */ jsx("button", {
												id: "admin-submit",
												type: "submit",
												disabled: loading,
												className: "inline-flex items-center justify-center rounded-full bg-brand px-12 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand/90 disabled:opacity-50",
												children: loading ? "Signing in…" : "Sign In"
											})
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-8 text-center text-xs text-slate-400",
									children: "New admin accounts can only be created by a super admin from inside the portal."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 text-center",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/",
										className: "text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors",
										children: "← Back to site"
									})
								})
							]
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { AuthPage as component };
