import { d as deleteCity, h as deleteState, l as addCity, s as useStates, t as useCities, u as addState } from "./use-admin-data-Ik71BfQt.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.coverage.tsx?tsr-split=component
function AdminCoverage() {
	const { data: states = [] } = useStates();
	const { data: cities = [] } = useCities();
	const qc = useQueryClient();
	const [selectedState, setSelectedState] = useState(null);
	const [newState, setNewState] = useState("");
	const [newCity, setNewCity] = useState("");
	const currentStateId = selectedState ?? states[0]?.id ?? null;
	const currentState = states.find((s) => s.id === currentStateId);
	const stateCities = cities.filter((c) => c.stateId === currentStateId);
	async function handleAddState() {
		if (!newState.trim()) return;
		try {
			await addState({ data: {
				name: newState.trim(),
				sortOrder: states.length + 1
			} });
			toast.success("State added");
			setNewState("");
			qc.invalidateQueries({ queryKey: ["coverage_states"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function handleDeleteState(id) {
		if (!confirm("Delete this state and all its cities?")) return;
		try {
			await deleteState({ data: { id } });
			toast.success("State deleted");
			qc.invalidateQueries({ queryKey: ["coverage_states"] });
			qc.invalidateQueries({ queryKey: ["coverage_cities"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function handleAddCity() {
		if (!newCity.trim() || !currentStateId) return;
		try {
			await addCity({ data: {
				stateId: currentStateId,
				name: newCity.trim(),
				sortOrder: stateCities.length + 1
			} });
			toast.success("City added");
			setNewCity("");
			qc.invalidateQueries({ queryKey: ["coverage_cities"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function handleDeleteCity(id) {
		if (!confirm("Delete this city?")) return;
		try {
			await deleteCity({ data: { id } });
			toast.success("City deleted");
			qc.invalidateQueries({ queryKey: ["coverage_cities"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "font-display text-2xl font-extrabold text-navy",
			children: "Coverage"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-slate-500",
			children: "Manage the states and cities you serve."
		})] }), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-[320px_1fr]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
				children: [
					/* @__PURE__ */ jsxs("h3", {
						className: "font-display font-bold text-navy flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-brand" }),
							" States (",
							states.length,
							")"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							value: newState,
							onChange: (e) => setNewState(e.target.value),
							placeholder: "Add state",
							className: "flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
						}), /* @__PURE__ */ jsx("button", {
							onClick: handleAddState,
							className: "rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground",
							children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-4 max-h-[500px] space-y-1 overflow-y-auto",
						children: states.map((s) => /* @__PURE__ */ jsxs("li", {
							className: `group flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer ${s.id === currentStateId ? "bg-brand/10 text-brand font-semibold" : "hover:bg-slate-100 text-slate-700"}`,
							onClick: () => setSelectedState(s.id),
							children: [/* @__PURE__ */ jsx("span", { children: s.name }), /* @__PURE__ */ jsx("button", {
								onClick: (e) => {
									e.stopPropagation();
									handleDeleteState(s.id);
								},
								className: "opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 rounded p-1",
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
							})]
						}, s.id))
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
				children: [
					/* @__PURE__ */ jsxs("h3", {
						className: "font-display font-bold text-navy",
						children: [
							"Cities in ",
							currentState?.name ?? "—",
							" (",
							stateCities.length,
							")"
						]
					}),
					currentStateId && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							value: newCity,
							onChange: (e) => setNewCity(e.target.value),
							placeholder: "Add city",
							className: "flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
						}), /* @__PURE__ */ jsx("button", {
							onClick: handleAddCity,
							className: "rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground",
							children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2",
						children: [stateCities.map((c) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-slate-700",
								children: c.name
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => handleDeleteCity(c.id),
								className: "text-red-500 hover:bg-red-50 rounded p-1",
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
							})]
						}, c.id)), stateCities.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-400 col-span-2",
							children: "No cities yet."
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AdminCoverage as component };
