import { Link, useRouterState, useNavigate, Outlet } from "@tanstack/react-router";
import { useSiteSettings, useIsAdmin } from "@/hooks/use-admin-data";
import {
  LayoutDashboard, Wrench, Star, HelpCircle, MapPin, Inbox,
  Settings, LogOut, Menu, X, ExternalLink, Shield,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { logout } from "@/lib/auth.functions";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean; superOnly?: boolean };
const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/coverage", label: "Coverage", icon: MapPin },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
  { to: "/admin/admins", label: "Admin Users", icon: Shield, superOnly: true },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const settings = useSiteSettings();
  const { data: admin } = useIsAdmin();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await logout();
    } catch {
      // ignore
    }
    // Remove local storage flag on sign out
    localStorage.removeItem("admin_session_active");
    toast.success("Signed out");
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed isolate inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link to="/admin" className="font-display text-lg font-extrabold text-navy">
            Admin<span className="text-brand">.</span>
          </Link>
          <button className="lg:hidden text-slate-500" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.filter((n) => !n.superOnly || admin?.isSuperAdmin).map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? path === to : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to as string}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand text-brand-foreground shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Signed in</div>
            <div className="mt-1 truncate text-sm font-semibold text-navy">{settings.adminDisplayName}</div>
            <div className="truncate text-xs text-slate-500">{admin?.email}</div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View live site
          </a>
          <button
            onClick={signOut}
            disabled={signingOut}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut className="h-3.5 w-3.5" /> {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
          <button className="lg:hidden text-slate-600" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-navy">Admin Portal</h1>
          <div className="ml-auto text-xs text-slate-500 hidden sm:block">
            Managing <span className="font-semibold text-navy">proleadsgeneration.com</span>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
