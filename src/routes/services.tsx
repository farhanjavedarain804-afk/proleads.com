import { createFileRoute } from "@tanstack/react-router";
import { Phone, ArrowRight, Clock, Tag, CheckCircle2 } from "lucide-react";
import { PageHeader, CtaBanner } from "@/components/site-footer";
import { useServices, useSiteSettings } from "@/hooks/use-admin-data";
import { getIcon } from "@/lib/icon-map";

const SERVICE_TRADES = [
  { name: "HVAC Repair & Installation", description: "Heating, cooling, and ventilation service, replacement and maintenance." },
  { name: "Plumbing Services", description: "Leaks, water heaters, drain cleaning, repiping and fixture installs." },
  { name: "Roofing", description: "Roof repair, replacement, storm damage and gutter service." },
  { name: "Pest Control", description: "Residential and commercial pest, rodent and termite treatment." },
  { name: "Garage Door Service", description: "Spring, opener, panel and full garage door replacement." },
  { name: "Electrical", description: "Wiring, panels, EV chargers, lighting and safety inspections." },
  { name: "Water Damage Restoration", description: "Water extraction, drying, mold remediation and full restoration." },
  { name: "Appliance Repair", description: "Refrigerators, ovens, washers, dryers and dishwashers." },
  { name: "Handyman Services", description: "Drywall, carpentry, painting and small home repairs." },
  { name: "Landscaping", description: "Lawn care, irrigation, hardscaping and seasonal cleanup." },
  { name: "Cleaning Services", description: "Deep cleaning, move-in/out, and recurring residential cleaning." },
  { name: "Locksmith", description: "Lockouts, rekeys, smart locks and 24/7 emergency locksmith service." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Home Services — HVAC, Plumbing & More | ProLeads" },
      { name: "description", content: "HVAC, plumbing, roofing, pest control, garage door, electrical, water damage, appliance repair and more — from certified local pros." },
      { property: "og:title", content: "Home Services — HVAC, Plumbing, Roofing & More" },
      { property: "og:description", content: "Twelve trusted trades. One phone number. Certified local pros dispatched to your door — anywhere in the U.S." },
      { property: "og:url", content: "/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Home Services — ProLeadsGeneration" },
      { name: "twitter:description", content: "Certified local pros across twelve home trades. 24/7 nationwide dispatch." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Home Services",
          itemListElement: SERVICE_TRADES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@type": "Organization", name: "ProLeadsGeneration" },
              areaServed: { "@type": "Country", name: "United States" },
              serviceType: s.name,
            },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const CATEGORIES = [
  { label: "Emergency", desc: "24/7 same-day dispatch when things can't wait." },
  { label: "Maintenance", desc: "Seasonal tune-ups and quarterly plans that prevent breakdowns." },
  { label: "Installation", desc: "New systems installed to code with manufacturer warranties." },
  { label: "Restoration", desc: "Storm, water and fire damage restored end-to-end." },
];

function ServicesPage() {
  const { data: SERVICES = [] } = useServices();
  const { phone: PHONE, phoneTel: PHONE_TEL } = useSiteSettings();
  return (
    <>
      <PageHeader
        eyebrow="Our Expertise"
        title="Complete Home Solutions For Every Need"
        subtitle="Twelve trusted trades. One phone number. Certified local pros dispatched to your door — anywhere in the U.S."
      />

      {/* Category strip */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-background p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand">{c.label}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">All Services</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">Twelve trusted home service trades</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">Certified local pros dispatched nationwide — pick a service to get started.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = getIcon(s.iconName);
            return (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-navy/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-navy">{s.tag}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

              <ul className="mt-4 grid grid-cols-2 gap-y-1.5 gap-x-3 text-xs text-foreground/80">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" /> <span className="truncate">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-navy"><Tag className="h-3.5 w-3.5 text-brand" /> From {s.priceFrom}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5 text-brand" /> {s.responseTime}</span>
              </div>

              <a href={`tel:${PHONE_TEL}`} className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground hover:brightness-110 transition">
                <Phone className="h-3.5 w-3.5" /> Call {PHONE} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
            );
          })}
        </div>
      </section>

      {/* Pricing note */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Transparent Pricing</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">No surprises. Ever.</h2>
            <p className="mt-3 text-white/80">
              Every service starts with a flat-rate diagnostic. You approve a fixed, itemized quote before work begins.
              We honor the quoted price even if the job takes longer than expected.
            </p>
          </div>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-display font-bold text-brand-foreground hover:brightness-110 transition">
            <Phone className="h-5 w-5" /> Get a Free Quote
          </a>
        </div>
      </section>

      {/* Included in every job */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Included Free</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">What's included in every visit</h2>
          <p className="mt-4 text-muted-foreground">Ten things you'll never pay extra for — because good service is standard, not premium.</p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Free phone estimate","Shoe covers & drop cloths","Uniformed technician",
            "Photo documentation","Clean-up on completion","Same-crew return visits",
            "5-year workmanship warranty","Manufacturer parts warranty","Digital invoicing",
            "Follow-up satisfaction call",
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span className="text-navy">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal maintenance calendar */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Seasonal Checklist</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Year-round home maintenance</h2>
            <p className="mt-4 text-muted-foreground">Book ahead of season and save on emergency call-outs.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { season: "Spring", items: ["AC tune-up","Gutter cleaning","Roof inspection","Pest prevention"] },
              { season: "Summer", items: ["Refrigerant check","Deck & fence care","Sprinkler service","Attic ventilation"] },
              { season: "Fall", items: ["Furnace tune-up","Chimney sweep","Weatherstripping","Leaf & drain flush"] },
              { season: "Winter", items: ["Pipe insulation","Emergency heat repair","Ice-dam prevention","Generator check"] },
            ].map((s) => (
              <div key={s.season} className="rounded-2xl border border-border bg-background p-6">
                <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand">{s.season}</span>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-navy">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
