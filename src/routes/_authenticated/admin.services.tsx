import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServices, type Service } from "@/hooks/use-admin-data";
import { ICON_NAMES, getIcon } from "@/lib/icon-map";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";
import { upsertService, deleteService } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: AdminServices,
});

type FormState = Partial<Service> & { featuresText?: string };
const EMPTY: FormState = {
  slug: "", iconName: "Wrench", title: "", description: "", tag: "",
  features: [], priceFrom: "", responseTime: "", sortOrder: 0, featuresText: "",
};

function AdminServices() {
  const { data: services = [] } = useServices();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<FormState | null>(null);

  async function onSave() {
    if (!editing) return;
    try {
      await upsertService({
        data: {
          id: editing.id,
          slug: editing.slug!,
          iconName: editing.iconName!,
          title: editing.title!,
          description: editing.description!,
          tag: editing.tag ?? "",
          features: (editing.featuresText ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
          priceFrom: editing.priceFrom ?? "",
          responseTime: editing.responseTime ?? "",
          sortOrder: Number(editing.sortOrder) || 0,
        }
      });
      toast.success(editing.id ? "Service updated" : "Service created");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["services"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["services"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  function openEdit(s: Service) {
    setEditing({ ...s, featuresText: (s.features ?? []).join("\n") });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy">Services</h2>
          <p className="mt-1 text-sm text-slate-500">Add, edit or remove the services displayed on your site.</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY, sortOrder: services.length + 1 })}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110"
        >
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = getIcon(s.iconName);
          return (
            <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(s.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="mt-3 font-display font-bold text-navy">{s.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{s.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{s.slug}</span>
                {s.priceFrom && <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">From {s.priceFrom}</span>}
                {s.responseTime && <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">{s.responseTime}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy">
                {editing.id ? "Edit service" : "New service"}
              </h3>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Slug" value={editing.slug ?? ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Icon</label>
                <select value={editing.iconName} onChange={(e) => setEditing({ ...editing, iconName: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Field label="Tag" value={editing.tag ?? ""} onChange={(v) => setEditing({ ...editing, tag: v })} />
              <Field label="Price from" value={editing.priceFrom ?? ""} onChange={(v) => setEditing({ ...editing, priceFrom: v })} />
              <Field label="Response time" value={editing.responseTime ?? ""} onChange={(v) => setEditing({ ...editing, responseTime: v })} />
              <Field label="Sort order" type="number" value={String(editing.sortOrder ?? 0)} onChange={(v) => setEditing({ ...editing, sortOrder: Number(v) })} />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Description</label>
                <textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Features (one per line)</label>
                <textarea rows={6} value={editing.featuresText ?? ""} onChange={(e) => setEditing({ ...editing, featuresText: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-mono" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={onSave} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:brightness-110">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
    </div>
  );
}
