import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSubmissions, useServices, useReviews, useFaqs, useStates, type ContactSubmission } from "@/hooks/use-admin-data";
import { Inbox, Wrench, Star, HelpCircle, MapPin, TrendingUp, Eye, Pencil, Trash2, X, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { deleteSubmission, markSubmissionRead, updateSubmission } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const subs = useSubmissions();
  const services = useServices();
  const reviews = useReviews();
  const faqs = useFaqs();
  const states = useStates();
  const qc = useQueryClient();

  const [viewing, setViewing] = useState<ContactSubmission | null>(null);
  const [editing, setEditing] = useState<ContactSubmission | null>(null);
  const [saving, setSaving] = useState(false);

  const unread = subs.data?.filter((s) => !s.isRead).length ?? 0;

  const cards = [
    { label: "New Submissions", value: unread, total: subs.data?.length ?? 0, icon: Inbox, color: "bg-brand text-brand-foreground" },
    { label: "Services", value: services.data?.length ?? 0, icon: Wrench, color: "bg-navy text-navy-foreground" },
    { label: "Reviews", value: reviews.data?.length ?? 0, icon: Star, color: "bg-amber-500 text-white" },
    { label: "FAQs", value: faqs.data?.length ?? 0, icon: HelpCircle, color: "bg-emerald-500 text-white" },
    { label: "States Covered", value: states.data?.length ?? 0, icon: MapPin, color: "bg-sky-500 text-white" },
  ];

  const recent = subs.data?.slice(0, 5) ?? [];

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    try {
      await deleteSubmission({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["contact_submissions"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function handleView(s: ContactSubmission) {
    setViewing(s);
    if (!s.isRead) {
      try {
        await markSubmissionRead({ data: { id: s.id } });
        qc.invalidateQueries({ queryKey: ["contact_submissions"] });
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const { id, name, email, phone, city, service, message } = editing;
    try {
      await updateSubmission({ data: { id, name, email, phone, city, service, message } });
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["contact_submissions"] });
      setEditing(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-500">Overview of your site content and inbound leads.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </div>
              {c.total !== undefined && c.total !== c.value && (
                <span className="text-xs text-slate-400">of {c.total}</span>
              )}
            </div>
            <div className="mt-3 text-3xl font-display font-extrabold text-navy">{c.value}</div>
            <div className="text-xs font-medium uppercase tracking-widest text-slate-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand" />
            <h3 className="font-display text-lg font-bold text-navy">Recent Submissions</h3>
          </div>
          <Link to="/admin/submissions" className="text-xs font-semibold text-brand hover:underline">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No submissions yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-navy">{s.name}</span>
                    {!s.isRead && <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-foreground">New</span>}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {s.service || "General"} · {s.city || s.email}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-xs text-slate-400">{new Date(s.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => handleView(s)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="View details">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => setEditing({ ...s })} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* View modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewing(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-navy">{viewing.name}</h3>
                <p className="text-xs text-slate-500">{new Date(viewing.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setViewing(null)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`mailto:${viewing.email}`} className="flex items-center gap-2 text-slate-700 hover:text-brand"><Mail className="h-4 w-4 text-brand" /> {viewing.email}</a>
              {viewing.phone && <a href={`tel:${viewing.phone}`} className="flex items-center gap-2 text-slate-700 hover:text-brand"><Phone className="h-4 w-4 text-brand" /> {viewing.phone}</a>}
              {viewing.city && <div className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4 text-brand" /> {viewing.city}</div>}
              {viewing.service && <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs">{viewing.service}</div>}
            </div>
            {viewing.message && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap">{viewing.message}</div>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { setEditing({ ...viewing }); setViewing(null); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-navy hover:bg-slate-50">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button onClick={() => setViewing(null)} className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-navy-foreground hover:bg-navy/90">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setEditing(null)}>
          <form onSubmit={handleSaveEdit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-bold text-navy">Edit submission</h3>
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {(["name","email","phone","city","service"] as const).map((f) => (
                <label key={f} className="grid gap-1 text-xs">
                  <span className="font-semibold uppercase tracking-widest text-slate-500">{f}</span>
                  <input
                    value={editing[f] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f]: e.target.value })}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              ))}
              <label className="grid gap-1 text-xs">
                <span className="font-semibold uppercase tracking-widest text-slate-500">Message</span>
                <textarea
                  rows={4}
                  value={editing.message ?? ""}
                  onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:brightness-110 disabled:opacity-60">
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
