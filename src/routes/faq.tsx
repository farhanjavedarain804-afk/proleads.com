import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search, Phone } from "lucide-react";
import { PageHeader, CtaBanner } from "@/components/site-footer";
import { useFaqs, useSiteSettings } from "@/hooks/use-admin-data";

const FAQ_SCHEMA_ITEMS = [
  {
    q: "Are your technicians licensed and insured?",
    a: "Yes. Every pro in our network is licensed, background-checked, and fully insured in the state they serve.",
  },
  {
    q: "Do you offer 24/7 emergency service?",
    a: "Yes — we dispatch around the clock, every day, with a 45-minute average response time nationwide.",
  },
  {
    q: "How much does a service call cost?",
    a: "We use flat-rate diagnostics with upfront pricing before any work begins — no surprise fees.",
  },
  {
    q: "What areas do you cover?",
    a: "All 50 U.S. states with certified local pros in every major metro area.",
  },
  {
    q: "Do you offer a workmanship warranty?",
    a: "Yes — every job is backed by a 5-year workmanship warranty plus manufacturer parts warranties.",
  },
  {
    q: "Can I get a same-day appointment?",
    a: "Same-day availability is offered in most metros — call or book online to check your area.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Home Service Questions Answered | ProLeads" },
      { name: "description", content: "Answers to common questions about certifications, pricing, coverage, warranties and emergency response." },
      { property: "og:title", content: "FAQ — ProLeadsGeneration" },
      { property: "og:description", content: "Common questions about pricing, warranties, coverage and 24/7 emergency response." },
      { property: "og:url", content: "/faq" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "FAQ — ProLeadsGeneration" },
      { name: "twitter:description", content: "Pricing, warranties, coverage and emergency response — answered." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_SCHEMA_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const CATEGORIES = [
  { title: "Booking & Scheduling", topics: ["Same-day availability", "Online booking", "Reschedule / cancel", "Emergency dispatch"] },
  { title: "Pricing & Payments", topics: ["Flat-rate diagnostics", "Financing options", "Accepted payment methods", "Estimates & quotes"] },
  { title: "Warranties & Guarantees", topics: ["Workmanship warranty", "Parts warranty", "Satisfaction promise", "Insurance claims"] },
  { title: "Coverage & Availability", topics: ["Service areas", "24/7 dispatch", "Rural coverage", "Commercial jobs"] },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const { data: FAQS = [] } = useFaqs();
  const { phone: PHONE, phone_tel: PHONE_TEL } = useSiteSettings();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [query, FAQS]);

  return (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know before you book." />

      {/* Search */}
      <section className="mx-auto max-w-3xl px-4 pt-10">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-base font-bold text-navy">{c.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {c.topics.map((t) => <li key={t}>• {t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ list */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No questions match "{query}". Try different keywords or call us directly.
            </p>
          )}
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.id} className="rounded-2xl border border-border bg-background transition-shadow hover:shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="min-w-0 font-display font-bold text-navy">{f.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground">{f.answer}</div>}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-navy">Still have questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Our dispatch team is available 24/7 for anything not covered above.</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90 transition">
            <Phone className="h-4 w-4" /> Call {PHONE}
          </a>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
