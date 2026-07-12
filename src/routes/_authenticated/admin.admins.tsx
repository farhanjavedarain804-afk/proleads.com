import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAdmins, createAdmin, deleteAdmin, resetAdminPassword } from "@/lib/admins.functions";
import { useIsAdmin } from "@/hooks/use-admin-data";
import { toast } from "sonner";
import { Shield, Trash2, Plus, KeyRound, Crown, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/admins")({
  head: () => ({
    meta: [
      { title: "Admin Users — ProLeadsGeneration" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminsPage,
});

function AdminsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: me, isLoading: meLoading } = useIsAdmin();

  const list = useServerFn(listAdmins);
  const create = useServerFn(createAdmin);
  const del = useServerFn(deleteAdmin);
  const resetPw = useServerFn(resetAdminPassword);

  const admins = useQuery({
    queryKey: ["admins"],
    queryFn: () => list(),
    enabled: !!me?.isSuperAdmin,
  });

  useEffect(() => {
    if (!meLoading && me && !me.isSuperAdmin) {
      toast.error("Super admin access required");
      navigate({ to: "/admin" });
    }
  }, [me, meLoading, navigate]);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [asSuper, setAsSuper] = useState(false);

  const createMut = useMutation({
    mutationFn: (input: { email: string; password: string; superAdmin: boolean }) =>
      create({ data: input }),
    onSuccess: () => {
      toast.success("Admin created");
      setEmail(""); setPassword(""); setAsSuper(false); setShowForm(false);
      qc.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (userId: string) => del({ data: { userId } }),
    onSuccess: () => {
      toast.success("Admin removed");
      qc.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetMut = useMutation({
    mutationFn: (input: { userId: string; password: string }) => resetPw({ data: input }),
    onSuccess: () => toast.success("Password updated"),
    onError: (e: Error) => toast.error(e.message),
  });

  if (!me?.isSuperAdmin) {
    return <div className="text-sm text-slate-500">Checking permissions…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Admin Users</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage who can sign in to the admin portal. Super admins can add and remove other admins.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm hover:bg-brand/90"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "New Admin"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMut.mutate({ email, password, superAdmin: asSuper });
          }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <h3 className="font-display text-lg font-bold text-navy">Create new admin</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="new-admin@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
              <input
                type="text" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={asSuper} onChange={(e) => setAsSuper(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
            Grant super admin (can also manage admins)
          </label>
          <div>
            <button
              type="submit" disabled={createMut.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-navy-foreground hover:bg-navy/90 disabled:opacity-50"
            >
              {createMut.isPending ? "Creating…" : "Create Admin"}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
          <Shield className="h-5 w-5 text-brand" />
          <h3 className="font-display text-lg font-bold text-navy">Current admins</h3>
        </div>
        {admins.isLoading ? (
          <div className="p-6 text-sm text-slate-400">Loading…</div>
        ) : (admins.data?.length ?? 0) === 0 ? (
          <div className="p-6 text-sm text-slate-400">No admins yet.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {admins.data!.map((a) => {
              const isSuper = a.roles.includes("super_admin");
              const isMe = a.user_id === me.userId;
              return (
                <li key={a.user_id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-navy">{a.email ?? a.user_id}</span>
                      {isSuper && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                          <Crown className="h-3 w-3" /> Super
                        </span>
                      )}
                      {isMe && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">You</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {a.created_at ? `Joined ${new Date(a.created_at).toLocaleDateString()}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const pw = prompt(`Set new password for ${a.email}:`);
                        if (!pw) return;
                        if (pw.length < 8) { toast.error("Password must be at least 8 characters"); return; }
                        resetMut.mutate({ userId: a.user_id, password: pw });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <KeyRound className="h-3.5 w-3.5" /> Reset password
                    </button>
                    <button
                      onClick={() => {
                        if (isMe) { toast.error("You cannot delete yourself"); return; }
                        if (!confirm(`Delete admin ${a.email}? This cannot be undone.`)) return;
                        deleteMut.mutate(a.user_id);
                      }}
                      disabled={isMe}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
