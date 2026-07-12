import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Phone, Wrench, MapPin, ChevronDown, BadgeCheck, Star, Clock, Sparkles, ArrowRight,
  CheckCircle2, ShieldCheck, Quote,
} from "lucide-react";
import heroImg from "../assets/hero.jpg";
import heroVideo from "../assets/hero-bg.mp4.asset.json";
import { STATS, VALUES, PROCESS_STEPS } from "@/lib/site-data";
import { useServices, useReviews, useFaqs, useStates, useCities, useSiteSettings } from "@/hooks/use-admin-data";
import { getIcon } from "@/lib/icon-map";
import { CtaBanner } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProLeadsGeneration — Premium Home Services Nationwide" },
      { name: "description", content: "Book certified local pros for HVAC, plumbing, roofing, pest control, electrical and garage door service. 24/7 across the USA." },
      { property: "og:title", content: "ProLeadsGeneration — Premium Home Services Nationwide" },
      { property: "og:description", content: "Certified local pros for HVAC, plumbing, roofing, pest control, electrical and garage door service. 24/7 across the USA." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ProLeadsGeneration — Premium Home Services Nationwide" },
      { name: "twitter:description", content: "Certified local pros for HVAC, plumbing, roofing and more. 24/7 nationwide." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "Are your technicians licensed and insured?", a: "Yes. Every pro in our network is licensed, background-checked, and fully insured in the state they serve." },
            { q: "Do you offer 24/7 emergency service?", a: "Yes — we dispatch around the clock, every day, with a 45-minute average response time nationwide." },
            { q: "How much does a service call cost?", a: "We use flat-rate diagnostics with upfront pricing before any work begins — no surprise fees." },
            { q: "What areas do you cover?", a: "All 50 U.S. states with certified local pros in every major metro area." },
            { q: "Do you offer a workmanship warranty?", a: "Yes — every job is backed by a 5-year workmanship warranty plus manufacturer parts warranties." },
          ].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
  const { data: SERVICES = [] } = useServices();
  const { data: REVIEWS = [] } = useReviews();
  const { data: FAQS = [] } = useFaqs();
  const { data: statesData = [] } = useStates();
  const { data: citiesData = [] } = useCities();
  const STATES = statesData.map((s) => s.name);
  const CITIES = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const s of statesData) {
      map[s.name] = citiesData.filter((c) => c.state_id === s.id).map((c) => c.name);
    }
    return map;
  }, [statesData, citiesData]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState<null | { state: string; city: string }>(null);
  const cityList = useMemo(
    () => (state && state !== "USA" ? (CITIES[state] ?? [`${state} — Main Metro`, `${state} — Suburbs`, `${state} — Countywide`]) : []),
    [state, CITIES],
  );

  const handleFindPro = () => {
    if (!state) {
      setAvailability(null);
      return;
    }
    setAvailability({ state, city: city || (state === "USA" ? "Nationwide" : `${state} area`) });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <video
          src={heroVideo.url}
          poster={heroImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/95" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Nationwide Home Service Network
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Premium Nationwide <span className="text-brand">Home Services</span> Network
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              Premium Heating, Cooling, Plumbing, Roofing, Pest and Garage Door expert solutions across the United States — booked in minutes.
            </p>
          </div>

          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <div className="relative">
                <select value={state} onChange={(e) => { setState(e.target.value); setCity(""); setAvailability(null); }}
                  aria-label="Select your state"
                  className="w-full appearance-none rounded-xl bg-white px-4 py-3 pr-10 text-sm font-medium text-navy shadow-sm outline-none ring-brand focus:ring-2">
                  <option value="">-- Select Your State --</option>
                  <option value="USA">Whole USA (Nationwide)</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/60" />
              </div>
              <div className="relative">
                <select value={city} onChange={(e) => { setCity(e.target.value); setAvailability(null); }}
                  aria-label="Select your city"
                  className="w-full appearance-none rounded-xl bg-white px-4 py-3 pr-10 text-sm font-medium text-navy shadow-sm outline-none ring-brand focus:ring-2">
                  <option value="">{state ? "-- Select Your City --" : "-- Select a State First --"}</option>
                  {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
                  {state && <option value={`Other in ${state}`}>Other city in {state}</option>}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/60" />
              </div>
              <button type="button" onClick={handleFindPro}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:brightness-110 transition disabled:opacity-60"
                disabled={!state}>
                <MapPin className="h-4 w-4" /> Find Local Pro
              </button>
            </div>
            {availability && (
              <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-left sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Great news — we're available in {availability.city}
                      {availability.state !== "USA" && availability.city !== `${availability.state} area` ? `, ${availability.state}` : ""}!
                    </div>
                    <div className="text-xs text-white/75">
                      Certified local pros are ready to dispatch. Call now or browse services to book.
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground hover:brightness-110">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                  <Link to="/services" className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20">
                    Services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg hover:brightness-110 transition">
              <Wrench className="h-4 w-4" /> View Services
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>

          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/85 sm:text-sm">
            <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand" /> Fully Licensed & Insured</span>
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-brand" /> 4.9/5 Rated Experts</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> Same-Day Response</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:py-14 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Our Expertise</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Complete Home Solutions For Every Need
          </h2>
          <p className="mt-4 text-muted-foreground">
            Twelve trusted trades. One phone number. Certified local pros dispatched to your door.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => {
            const Icon = getIcon(s.icon_name);
            return (
            <article key={s.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-navy/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-navy">{s.tag}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition">
            See all 12 services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Why Choose Us</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Six guarantees on every job</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-background p-6">
                <CheckCircle2 className="h-6 w-6 text-brand" />
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Simple Steps</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">How It Works</h2>
          </div>
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="font-display text-5xl font-extrabold text-brand">{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews strip */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Real feedback from real neighbors</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <figure key={r.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="h-6 w-6 text-brand/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed">"{r.body}"</blockquote>
              <div className="mt-4 flex gap-1 text-brand">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">— {r.name}, {r.city}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Coverage teaser */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Nationwide Reach</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Serving all 50 states</h2>
            <p className="mt-4 text-muted-foreground">
              From coast to coast — 480+ metros, 6,000+ certified pros and 45-minute average response time in major cities.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["California","Texas","Florida","New York","Georgia","Arizona","North Carolina","Illinois","Ohio","Colorado"].map((s) => (
                <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-navy">{s}</span>
              ))}
            </div>
            <Link to="/coverage" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              See full coverage map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "50", l: "States" },
              { v: "480+", l: "Metros" },
              { v: "6,000+", l: "Pros" },
              { v: "45 min", l: "Avg Response" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-background p-6 text-center">
                <div className="font-display text-3xl font-extrabold text-navy">{s.v}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ preview */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">FAQ</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Common Questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.slice(0, 4).map((f) => (
              <details key={f.id} className="group rounded-2xl border border-border bg-background">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-bold text-navy">
                  {f.question}
                  <ChevronDown className="h-5 w-5 text-brand transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground">{f.answer}</div>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* How we compare */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Compare</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">How ProLeads compares</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
            <div className="grid grid-cols-4 border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <div className="px-4 py-4 sm:px-6">Feature</div>
              <div className="px-4 py-4 text-center text-brand sm:px-6">ProLeads</div>
              <div className="px-4 py-4 text-center sm:px-6">Local Solo</div>
              <div className="px-4 py-4 text-center sm:px-6">Big-box Chain</div>
            </div>
            {[
              ["Licensed & insured pros", "yes", "maybe", "yes"],
              ["24/7 emergency dispatch", "yes", "no", "limited"],
              ["Upfront flat-rate pricing", "yes", "varies", "no"],
              ["5-year workmanship warranty", "yes", "1 year", "1 year"],
              ["Same-day availability", "yes", "no", "sometimes"],
              ["Nationwide coverage", "50 states", "1 city", "regional"],
            ].map((row, i) => (
              <div key={row[0]} className={`grid grid-cols-4 items-center text-sm ${i % 2 ? "bg-muted/20" : ""}`}>
                <div className="px-4 py-3.5 font-medium text-navy sm:px-6">{row[0]}</div>
                {row.slice(1).map((v, j) => (
                  <div key={j} className="px-4 py-3.5 text-center sm:px-6">
                    {v === "yes" ? <CheckCircle2 className="mx-auto h-5 w-5 text-brand" /> : <span className="text-xs text-muted-foreground">{v}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badge strip */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Fully Insured</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand" /> Licensed in 50 States</span>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-brand" /> 4.9/5 · 8,400+ Reviews</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> 24/7 Support</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand" /> BBB A+ Accredited</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand" /> HomeAdvisor Elite</span>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
