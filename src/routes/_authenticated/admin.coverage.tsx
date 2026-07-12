import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStates, useCities } from "@/hooks/use-admin-data";
import { Plus, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { addState, deleteState, addCity, deleteCity } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/coverage")({
  component: AdminCoverage,
});

function AdminCoverage() {
  const { data: states = [] } = useStates();
  const { data: cities = [] } = useCities();
  const qc = useQueryClient();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");

  const currentStateId = selectedState ?? states[0]?.id ?? null;
  const currentState = states.find((s) => s.id === currentStateId);
  const stateCities = cities.filter((c) => c.stateId === currentStateId);

  async function handleAddState() {
    if (!newState.trim()) return;
    try {
      await addState({ data: { name: newState.trim(), sortOrder: states.length + 1 } });
      toast.success("State added");
      setNewState("");
      qc.invalidateQueries({ queryKey: ["coverage_states"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function handleDeleteState(id: string) {
    if (!confirm("Delete this state and all its cities?")) return;
    try {
      await deleteState({ data: { id } });
      toast.success("State deleted");
      qc.invalidateQueries({ queryKey: ["coverage_states"] });
      qc.invalidateQueries({ queryKey: ["coverage_cities"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function handleAddCity() {
    if (!newCity.trim() || !currentStateId) return;
    try {
      await addCity({ data: { stateId: currentStateId, name: newCity.trim(), sortOrder: stateCities.length + 1 } });
      toast.success("City added");
      setNewCity("");
      qc.invalidateQueries({ queryKey: ["coverage_cities"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function handleDeleteCity(id: string) {
    if (!confirm("Delete this city?")) return;
    try {
      await deleteCity({ data: { id } });
      toast.success("City deleted");
      qc.invalidateQueries({ queryKey: ["coverage_cities"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-navy">Coverage</h2>
        <p className="mt-1 text-sm text-slate-500">Manage the states and cities you serve.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-display font-bold text-navy flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> States ({states.length})</h3>
          <div className="mt-3 flex gap-2">
            <input value={newState} onChange={(e) => setNewState(e.target.value)} placeholder="Add state" className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <button onClick={handleAddState} className="rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground"><Plus className="h-4 w-4" /></button>
          </div>
          <ul className="mt-4 max-h-[500px] space-y-1 overflow-y-auto">
            {states.map((s) => (
              <li key={s.id} className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer ${s.id === currentStateId ? "bg-brand/10 text-brand font-semibold" : "hover:bg-slate-100 text-slate-700"}`} onClick={() => setSelectedState(s.id)}>
                <span>{s.name}</span>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteState(s.id); }} className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 rounded p-1"><Trash2 className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-display font-bold text-navy">
            Cities in {currentState?.name ?? "—"} ({stateCities.length})
          </h3>
          {currentStateId && (
            <div className="mt-3 flex gap-2">
              <input value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Add city" className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" />
              <button onClick={handleAddCity} className="rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground"><Plus className="h-4 w-4" /></button>
            </div>
          )}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {stateCities.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <span className="text-slate-700">{c.name}</span>
                <button onClick={() => handleDeleteCity(c.id)} className="text-red-500 hover:bg-red-50 rounded p-1"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ))}
            {stateCities.length === 0 && <p className="text-sm text-slate-400 col-span-2">No cities yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
