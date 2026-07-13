import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-admin-data";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/why", label: "Why Us" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { phone, phoneTel: PHONE_TEL } = useSiteSettings();
  const PHONE = phone;

  return (
    <>
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm">
          <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
          <span className="truncate">Emergency Services Available 24/7 Across the United States</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:grid-cols-3">
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={logo}
              alt="ProLeadsGeneration — We Generate. You Grow."
              className="h-8 w-auto sm:h-9 object-contain"
              width={1600}
              height={800}
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-6 text-sm font-medium whitespace-nowrap">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-brand" }}
                className="whitespace-nowrap hover:text-brand transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:brightness-110 transition"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm font-medium">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "rounded-lg px-3 py-2 bg-muted text-brand" }}
                  className="rounded-lg px-3 py-2 hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 font-semibold text-brand-foreground"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
