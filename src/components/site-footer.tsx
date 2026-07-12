import { Link } from "@tanstack/react-router";
import { Phone, Clock, MapPin } from "lucide-react";
import { SERVICES } from "@/lib/site-data";
import { useSiteSettings, useServices } from "@/hooks/use-admin-data";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
  const { data: dbServices } = useServices();
  const servicesList = dbServices && dbServices.length > 0 ? dbServices : SERVICES.map((s) => ({ id: s.slug, title: s.title }));
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="rounded-xl bg-white/95 p-3 inline-block">
            <img src={logo} alt="ProLeadsGeneration company logo" className="h-12 w-auto" width={1600} height={800} loading="lazy" />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Connecting homeowners nationwide with licensed, insured and background-checked home service pros.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {servicesList.map((s) => (
              <li key={s.id}><Link to="/services" className="hover:text-brand">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/why" className="hover:text-brand">Why Us</Link></li>
            <li><Link to="/coverage" className="hover:text-brand">Coverage</Link></li>
            <li><Link to="/reviews" className="hover:text-brand">Reviews</Link></li>
            <li><Link to="/faq" className="hover:text-brand">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 hover:text-brand"><Phone className="h-4 w-4" /> {PHONE}</a></li>
            <li className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> 24/7 Emergency Dispatch</li>
            <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> All 50 U.S. States</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row">
          <span>© {new Date().getFullYear()} ProLeadsGeneration. All rights reserved.</span>
          <span className="text-center">
            Developed By{" "}
            <a href="https://www.devionic.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
              Devionic (Private) Limited
            </a>{" "}
            |{" "}
            <a href="https://wa.me/923177121841" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              +92-317-7121841 WhatsApp
            </a>{" "}
            |{" "}
            <a href="https://www.devionic.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              www.devionic.com
            </a>{" "}
            |{" "}
            <a href="mailto:info@devionic.com" className="hover:text-brand">
              info@devionic.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function CtaBanner() {
  const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-[1fr_auto] sm:items-center sm:py-20">
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Need Expert Assistance Immediately?
          </h2>
          <p className="mt-2 text-brand-foreground/90">
            Call now and we'll dispatch a licensed pro to your door — 24/7, nationwide.
          </p>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 font-display text-base font-bold text-navy-foreground shadow-xl hover:bg-navy/90 transition"
        >
          <Phone className="h-5 w-5" /> {PHONE}
        </a>
      </div>
    </section>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-white/80">{subtitle}</p>}
      </div>
    </section>
  );
}
