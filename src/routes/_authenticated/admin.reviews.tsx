import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useReviews, type Review } from "@/hooks/use-admin-data";
import { Plus, Pencil, Trash2, X, Save, Star } from "lucide-react";
import { toast } from "sonner";
import { upsertReview, deleteReview } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: AdminReviews,
});

const EMPTY: Partial<Review> = { name: "", city: "", service: "", rating: 5, reviewDate: "", body: "", sortOrder: 0 };

function AdminReviews() {
  const { data: reviews = [] } = useReviews();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Review> | null>(null);

  async function onSave() {
    if (!editing) return;
    try {
      await upsertReview({
        data: {
          id: editing.id,
          name: editing.name!,
          city: editing.city ?? "",
          service: editing.service ?? "",
          rating: Number(editing.rating) || 5,
          reviewDate: editing.reviewDate ?? "",
          body: editing.body!,
          sortOrder: Number(editing.sortOrder) || 0,
        }
      });
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["reviews"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy">Reviews</h2>
          <p className="mt-1 text-sm text-slate-500">Customer testimonials shown on your website.</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY, sortOrder: reviews.length + 1 })} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110">
          <Plus className="h-4 w-4" /> Add review
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display font-bold text-navy">{r.name}</div>
                <div className="text-xs text-slate-500">{r.city} · {r.service}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(r)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => onDelete(r.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-2 flex">
              {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="mt-2 line-clamp-4 text-sm text-slate-600">{r.body}</p>
            <div className="mt-3 text-xs text-slate-400">{r.reviewDate}</div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy">{editing.id ? "Edit review" : "New review"}</h3>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <F label="Name" value={editing.name ?? ""} onChange={(v) => setEditing({ ...editing, name: v })} />
              <F label="City" value={editing.city ?? ""} onChange={(v) => setEditing({ ...editing, city: v })} />
              <F label="Service" value={editing.service ?? ""} onChange={(v) => setEditing({ ...editing, service: v })} />
              <F label="Rating (1-5)" type="number" value={String(editing.rating ?? 5)} onChange={(v) => setEditing({ ...editing, rating: Number(v) })} />
              <F label="Date label" value={editing.reviewDate ?? ""} onChange={(v) => setEditing({ ...editing, reviewDate: v })} />
              <F label="Sort order" type="number" value={String(editing.sortOrder ?? 0)} onChange={(v) => setEditing({ ...editing, sortOrder: Number(v) })} />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Review</label>
                <textarea rows={5} value={editing.body ?? ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={onSave} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"><Save className="h-4 w-4" /> Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function F({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
    </div>
  );
}
