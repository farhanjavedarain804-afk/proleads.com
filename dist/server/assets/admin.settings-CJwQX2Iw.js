import { o as useSiteSettings, r as useIsAdmin, y as updateSiteSettings } from "./use-admin-data-B0r3MH-a.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { KeyRound, Lock, Mail, MapPin, Phone, Save, User } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.settings.tsx?tsr-split=component
function AdminSettings() {
	const settings = useSiteSettings();
	const { data: admin } = useIsAdmin();
	const qc = useQueryClient();
	const [form, setForm] = useState(settings);
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		setForm(settings);
	}, [settings.id]);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	async function saveSettings() {
		setSaving(true);
		try {
			await updateSiteSettings({ data: {
				id: settings.id,
				phone: form.phone,
				phoneTel: form.phoneTel,
				email: form.email,
				address: form.address,
				adminDisplayName: form.adminDisplayName
			} });
			toast.success("Settings saved — visible across the site");
			qc.invalidateQueries({ queryKey: ["site_settings"] });
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	}
	async function updatePassword() {
		if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters");
		if (newPassword !== confirmPassword) return toast.error("Passwords don't match");
		toast.success("Password change requires full auth system — functionality coming soon");
		setNewPassword("");
		setConfirmPassword("");
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-3xl",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-2xl font-extrabold text-navy",
				children: "Settings"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-slate-500",
				children: "Update site info and your profile."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-display text-lg font-bold text-navy",
						children: "Site Information"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-500",
						children: "Shown on your public website — updates apply immediately."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(F, {
								icon: User,
								label: "Admin display name",
								value: form.adminDisplayName,
								onChange: (v) => setForm({
									...form,
									adminDisplayName: v
								})
							}),
							/* @__PURE__ */ jsx(F, {
								icon: Phone,
								label: "Phone (display)",
								value: form.phone,
								onChange: (v) => setForm({
									...form,
									phone: v
								})
							}),
							/* @__PURE__ */ jsx(F, {
								icon: Phone,
								label: "Phone (tel: link)",
								value: form.phoneTel,
								onChange: (v) => setForm({
									...form,
									phoneTel: v
								}),
								hint: "e.g. +18885550199"
							}),
							/* @__PURE__ */ jsx(F, {
								icon: Mail,
								label: "Contact email",
								value: form.email,
								onChange: (v) => setForm({
									...form,
									email: v
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx(F, {
									icon: MapPin,
									label: "Business address",
									value: form.address,
									onChange: (v) => setForm({
										...form,
										address: v
									})
								})
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex justify-end",
						children: /* @__PURE__ */ jsxs("button", {
							onClick: saveSettings,
							disabled: saving,
							className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110 disabled:opacity-60",
							children: [
								/* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
								" ",
								saving ? "Saving…" : "Save site info"
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-display text-lg font-bold text-navy",
						children: "Account"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-500",
						children: "Your login credentials."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 space-y-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500",
							children: "Current email"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold text-navy",
							children: admin?.email
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-slate-200 p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-sm font-semibold text-navy",
									children: [/* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-brand" }), " Change password"]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 grid gap-2 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "password",
										value: newPassword,
										onChange: (e) => setNewPassword(e.target.value),
										placeholder: "New password",
										className: "rounded-xl border border-slate-200 px-3 py-2 text-sm"
									}), /* @__PURE__ */ jsx("input", {
										type: "password",
										value: confirmPassword,
										onChange: (e) => setConfirmPassword(e.target.value),
										placeholder: "Confirm password",
										className: "rounded-xl border border-slate-200 px-3 py-2 text-sm"
									})]
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: updatePassword,
									className: "mt-3 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground hover:bg-navy/90",
									children: [/* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4" }), " Update password"]
								})
							]
						})]
					})
				]
			})
		]
	});
}
function F({ icon: Icon, label, value, onChange, hint }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("label", {
			className: "mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500",
			children: [
				/* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
				" ",
				label
			]
		}),
		/* @__PURE__ */ jsx("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
		}),
		hint && /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-xs text-slate-400",
			children: hint
		})
	] });
}
//#endregion
export { AdminSettings as component };
