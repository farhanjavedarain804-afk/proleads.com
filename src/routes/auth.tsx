import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkAuth, login } from "@/lib/auth.functions";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — ProLeadsGeneration" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // On mount: if already logged in, redirect to admin
  useEffect(() => {
    checkAuth()
      .then((auth) => {
        if (auth?.ok) {
          // Use full reload so the authenticated route guard sees the session cookie
          window.location.href = "/admin";
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        setChecking(false);
      });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const auth = await login({ data: { email, password } });
      if (!auth?.ok) throw new Error("Login failed. Please check your credentials.");
      toast.success("Signed in successfully!");
      // Full page reload so the new session cookie is available to the server
      window.location.href = "/admin";
    } catch (err: any) {
      // Show a clean message — never expose raw error objects
      const msg =
        typeof err?.message === "string" && err.message.length < 200
          ? err.message
          : "Sign in failed. Please try again.";
      toast.error(msg);
      setLoading(false);
    }
  }

  // Show nothing while checking existing session to avoid flash
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-brand/30" />
      <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-[40%] bg-navy/20 rotate-12" />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="grid md:grid-cols-2 min-h-[560px]">
          {/* Welcome panel */}
          <div
            className="relative flex flex-col items-center justify-center p-10 text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.28 0.06 260) 0%, oklch(0.22 0.05 260) 55%, oklch(0.18 0.04 260) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="absolute right-8 top-16 h-6 w-6 rotate-45 bg-white/15" />
              <div className="absolute right-20 bottom-24 h-10 w-10 rotate-45 border border-white/25" />
              <div className="absolute left-10 top-10">
                <img src={logo} alt="ProLeadsGeneration company logo" className="h-10 w-auto brightness-0 invert" />
              </div>
            </div>

            <div className="relative text-center max-w-xs">
              <h2 className="font-display text-4xl font-extrabold tracking-tight">Admin Portal</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                Sign in to manage your website content, reviews, submissions and settings.
              </p>
              <div className="mt-8 inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Authorized users only
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center justify-center p-10">
            <div className="w-full max-w-sm">
              <div className="mb-6 flex justify-center">
                <img src={logo} alt="ProLeadsGeneration company logo" className="h-12 w-auto" />
              </div>
              <h1 className="text-center font-display text-3xl font-extrabold text-navy">Sign In</h1>
              <p className="mt-6 text-center text-xs text-slate-400">Enter your admin credentials:</p>

              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-md bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-md bg-slate-100 py-3 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="pt-3 flex justify-center">
                  <button
                    id="admin-submit"
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-full bg-brand px-12 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand/90 disabled:opacity-50"
                  >
                    {loading ? "Signing in…" : "Sign In"}
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-xs text-slate-400">
                New admin accounts can only be created by a super admin from inside the portal.
              </p>

              <div className="mt-6 text-center">
                <Link to="/" className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                  ← Back to site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
