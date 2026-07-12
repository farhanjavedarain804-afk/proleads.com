import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Award, Users, Leaf, ShieldCheck, BadgeCheck, Star, Trophy } from "lucide-react";
import heroImg from "../assets/hero.jpg";
import { PageHeader, CtaBanner } from "@/components/site-footer";
import { VALUES, PROCESS_STEPS, STATS } from "@/lib/site-data";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: "Why Choose Us — Trusted Service Pros | ProLeads" },
      { name: "description", content: "Trusted by 10,000+ homeowners. Same-day service, background-checked techs, upfront pricing and a 5-year workmanship warranty." },
      { property: "og:title", content: "Why Choose ProLeadsGeneration" },
      { property: "og:description", content: "Background-checked techs, upfront pricing, 5-year workmanship warranty. Trusted by 10,000+ homeowners." },
      { property: "og:url", content: "/why" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Why Choose ProLeadsGeneration" },
      { name: "twitter:description", content: "Certified, background-checked pros with a 5-year workmanship warranty." },
    ],
    links: [{ rel: "canonical", href: "/why" }],
  }),
  component: WhyPage,
});

const MISSION = [
  { icon: Award, title: "Excellence", body: "Every technician is vetted, certified and continuously trained on the latest standards." },
  { icon: Users, title: "Community", body: "We hire locally and invest in the neighborhoods our pros serve every day." },
  { icon: Leaf, title: "Sustainability", body: "We default to low-VOC materials, high-efficiency equipment and ENERGY STAR products." },
];

function WhyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why Choose Us"
        title="Trusted by 10,000+ Local Homeowners"
        subtitle="Unmatched home maintenance expertise backed by transparent guarantees and technicians who treat your property like their own."
      />

      {/* Stats */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-navy sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Our Promise</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Six guarantees on every job</h2>
            <ul className="mt-8 space-y-6">
              {VALUES.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-navy">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <img src={heroImg} alt="Certified technician on the job" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 text-navy-foreground shadow-xl">
              <div className="font-display text-4xl font-extrabold text-brand">15+</div>
              <div className="text-xs font-semibold uppercase tracking-widest">Years Pro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Our Mission</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Homeowners first. Always.</h2>
            <p className="mt-4 text-muted-foreground">
              We're building the most trusted home service network in America — with fair prices, honest advice and craftsmanship you can feel every day.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MISSION.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-background p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Simple Steps</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Getting Restored Is Simple</h2>
          </div>
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="font-display text-5xl font-extrabold text-brand">{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Recognitions</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">Certifications & industry awards</h2>
          <p className="mt-4 text-muted-foreground">Backed by the standards homeowners trust — audited, accredited and continuously vetted.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BadgeCheck, title: "BBB A+ Accredited", body: "Better Business Bureau accredited since 2014 with an A+ rating." },
            { icon: Trophy, title: "HomeAdvisor Elite", body: "Top 1% of pros nationwide — Elite Service Award for 6 years running." },
            { icon: ShieldCheck, title: "NATE-Certified HVAC", body: "North American Technician Excellence certified across all HVAC crews." },
            { icon: Star, title: "Angi Super Service", body: "Angi Super Service Award recipient — 4.9-star customer rating." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team vetting */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">The Team</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">6,000+ pros. One promise.</h2>
            <p className="mt-4 text-muted-foreground">
              Every technician in our network completes a 4-step vetting process: license verification, insurance audit, background check, and hands-on skills evaluation. We invest in ongoing training so your home gets the best.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["License verified","Insurance audited","Background checked","Drug-tested","Skills tested","Uniformed & badged"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-navy">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "6,000+", l: "Vetted Pros" },
              { v: "98%", l: "Same-Day Fill Rate" },
              { v: "4.9/5", l: "Customer Rating" },
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

      <CtaBanner />
    </>
  );
}
