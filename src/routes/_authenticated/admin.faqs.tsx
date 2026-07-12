import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFaqs, type Faq } from "@/hooks/use-admin-data";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";
import { upsertFaq, deleteFaq } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  component: AdminFaqs,
});

function AdminFaqs() {
  const { data: faqs = [] } = useFaqs();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);

  async function onSave() {
    if (!editing) return;
    try {
      await upsertFaq({
        data: {
          id: editing.id,
          question: editing.question!,
          answer: editing.answer!,
          sortOrder: Number(editing.sortOrder) || 0,
        }
      });
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["faqs"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await deleteFaq({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["faqs"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy">FAQs</h2>
          <p className="mt-1 text-sm text-slate-500">Frequently asked questions displayed on your site.</p>
        </div>
        <button onClick={() => setEditing({ question: "", answer: "", sortOrder: faqs.length + 1 })} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-navy">{f.question}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.answer}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button onClick={() => setEditing(f)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => onDelete(f.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy">{editing.id ? "Edit FAQ" : "New FAQ"}</h3>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Question</label>
                <input value={editing.question ?? ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Answer</label>
                <textarea rows={5} value={editing.answer ?? ""} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">Sort order</label>
                <input type="number" value={editing.sortOrder ?? 0} onChange={(e) => setEditing({ ...editing, sortOrder: Number(e.target.value) })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
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
