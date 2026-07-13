import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { deleteSubmission, markSubmissionRead } from "@/lib/db.functions";
import { useSubmissions } from "@/hooks/use-admin-data";
import { Mail, Phone, MapPin, Trash2, CheckCircle2, Circle, Inbox } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  component: AdminSubmissions,
});

function AdminSubmissions() {
  const { data: subs = [] } = useSubmissions();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? subs.filter((s) => !s.isRead) : subs;

  async function toggleRead(id: string, isRead: boolean) {
    if (!isRead) {
      try {
        await markSubmissionRead({ data: { id } });
        qc.invalidateQueries({ queryKey: ["contact_submissions"] });
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    try {
      await deleteSubmission({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["contact_submissions"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy">Form Submissions</h2>
          <p className="mt-1 text-sm text-slate-500">Contact form entries from your website visitors.</p>
        </div>
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          <button onClick={() => setFilter("all")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === "all" ? "bg-brand text-brand-foreground" : "text-slate-600"}`}>
            All ({subs.length})
          </button>
          <button onClick={() => setFilter("unread")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === "unread" ? "bg-brand text-brand-foreground" : "text-slate-600"}`}>
            Unread ({subs.filter((s) => !s.isRead).length})
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Inbox className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => (
            <div key={s.id} className={`rounded-2xl border ${s.isRead ? "border-slate-200 bg-white" : "border-brand/30 bg-brand/5"} p-5 shadow-sm`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-navy">{s.name}</h3>
                    {!s.isRead && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-foreground">New</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1 hover:text-brand"><Mail className="h-3 w-3" /> {s.email}</a>
                    {s.phone && <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1 hover:text-brand"><Phone className="h-3 w-3" /> {s.phone}</a>}
                    {s.city && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.city}</span>}
                    {s.service && <span className="rounded-full bg-slate-100 px-2 py-0.5">{s.service}</span>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleRead(s.id, s.isRead)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title={s.isRead ? "Mark unread" : "Mark read"}>
                    {s.isRead ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </button>
                  <button onClick={() => onDelete(s.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              {s.message && <p className="mt-3 rounded-xl bg-white/60 p-3 text-sm text-slate-700 whitespace-pre-wrap">{s.message}</p>}
              <div className="mt-3 text-xs text-slate-400">{new Date(s.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
