import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSiteSettings, useIsAdmin } from "@/hooks/use-admin-data";
import { Save, User, Phone, Mail, MapPin, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { updateSiteSettings } from "@/lib/db.functions";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const settings = useSiteSettings();
  const { data: admin } = useIsAdmin();
  const qc = useQueryClient();

  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(settings); }, [settings.id]); // eslint-disable-line

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function saveSettings() {
    setSaving(true);
    try {
      await updateSiteSettings({
        data: {
          id: settings.id,
          phone: form.phone,
          phoneTel: form.phoneTel,
          email: form.email,
          address: form.address,
          adminDisplayName: form.adminDisplayName,
        }
      });
      toast.success("Settings saved — visible across the site");
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function updatePassword() {
    if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return toast.error("Passwords don't match");
    // In a real implementation, this would call an updateUser server function
    toast.success("Password change requires full auth system — functionality coming soon");
    setNewPassword(""); setConfirmPassword("");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-navy">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Update site info and your profile.</p>
      </div>

      {/* Site info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-lg font-bold text-navy">Site Information</h3>
        <p className="text-sm text-slate-500">Shown on your public website — updates apply immediately.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <F icon={User} label="Admin display name" value={form.adminDisplayName} onChange={(v) => setForm({ ...form, adminDisplayName: v })} />
          <F icon={Phone} label="Phone (display)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <F icon={Phone} label="Phone (tel: link)" value={form.phoneTel} onChange={(v) => setForm({ ...form, phoneTel: v })} hint="e.g. +18885550199" />
          <F icon={Mail} label="Contact email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div className="sm:col-span-2">
            <F icon={MapPin} label="Business address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={saveSettings} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110 disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save site info"}
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-lg font-bold text-navy">Account</h3>
        <p className="text-sm text-slate-500">Your login credentials.</p>

        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Current email</div>
            <div className="text-sm font-semibold text-navy">{admin?.email}</div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy"><Lock className="h-4 w-4 text-brand" /> Change password</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <button onClick={updatePassword} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground hover:bg-navy/90">
              <KeyRound className="h-4 w-4" /> Update password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function F({ icon: Icon, label, value, onChange, hint }: { icon: typeof User; label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
        <Icon className="h-3.5 w-3.5" /> {label}
      </label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
    </div>
  );
}
