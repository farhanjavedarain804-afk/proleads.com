import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, TrendingUp } from "lucide-react";
import { PageHeader, CtaBanner } from "@/components/site-footer";
import { useSiteSettings, useStates, useCities } from "@/hooks/use-admin-data";
import { useMemo } from "react";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Nationwide Coverage — All 50 States | ProLeadsGeneration" },
      { name: "description", content: "Nationwide coverage across all 50 U.S. states with certified local pros in every major metro. 45-minute average response time." },
      { property: "og:title", content: "Nationwide Coverage — All 50 U.S. States" },
      { property: "og:description", content: "Certified local home service pros across every major U.S. metro. 24/7 dispatch, 45-minute average response." },
      { property: "og:url", content: "/coverage" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Nationwide Coverage — ProLeadsGeneration" },
      { name: "twitter:description", content: "Home service pros in every U.S. state. 24/7 dispatch." },
    ],
    links: [{ rel: "canonical", href: "/coverage" }],
  }),
  component: CoveragePage,
});

const REGIONS = [
  { name: "West Coast", states: ["California", "Oregon", "Washington", "Nevada", "Arizona"], techs: "1,240+" },
  { name: "South", states: ["Texas", "Florida", "Georgia", "North Carolina", "Tennessee"], techs: "1,890+" },
  { name: "Northeast", states: ["New York", "Pennsylvania", "Massachusetts", "New Jersey", "Connecticut"], techs: "980+" },
  { name: "Midwest", states: ["Illinois", "Ohio", "Michigan", "Missouri", "Indiana"], techs: "1,120+" },
  { name: "Mountain", states: ["Colorado", "Utah", "Idaho", "Montana", "Wyoming"], techs: "420+" },
  { name: "Southwest", states: ["New Mexico", "Oklahoma", "Arkansas", "Louisiana", "Alabama"], techs: "610+" },
];

function CoveragePage() {
  const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();
  const { data: statesData = [] } = useStates();
  const { data: citiesData = [] } = useCities();
  const STATES = statesData.map((s) => s.name);
  const CITIES = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const s of statesData) {
      const list = citiesData.filter((c) => c.state_id === s.id).map((c) => c.name);
      if (list.length) map[s.name] = list;
    }
    return map;
  }, [statesData, citiesData]);
  return (
    <>
      <PageHeader
        eyebrow="Our Reach"
        title="Proudly Serving Communities Nationwide"
        subtitle="Every state. Every city. One trusted network of vetted home service professionals."
      />

      {/* Metrics */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { icon: MapPin, v: "50", l: "U.S. States" },
            { icon: TrendingUp, v: "480+", l: "Metro Areas" },
            { icon: Clock, v: "45 min", l: "Avg Response" },
            { icon: Phone, v: "24/7", l: "Dispatch" },
          ].map(({ icon: Icon, v, l }) => (
            <div key={l} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Icon className="h-5 w-5" /></div>
              <div>
                <div className="font-display text-2xl font-extrabold text-navy">{v}</div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Regional Networks</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Local pros in every region</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-navy">{r.name}</h3>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{r.techs} techs</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.states.map((s) => (
                  <li key={s} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-navy">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Major Metros</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Dense coverage in the cities you live in</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(CITIES).map(([state, cities]) => (
              <div key={state} className="rounded-2xl border border-border bg-background p-5">
                <div className="font-display text-lg font-bold text-navy">{state}</div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {cities.map((c) => (
                    <li key={c} className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" /> {c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All states */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Every State</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">All 50 states covered</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {STATES.map((s) => (
            <span key={s} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-navy">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6 text-center sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Nationwide Network</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">Not sure if we cover your city?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Call and we'll route you to the closest licensed pro in minutes.</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition">
            <Phone className="h-4 w-4" /> Call Nationwide: {PHONE}
          </a>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
