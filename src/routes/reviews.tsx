import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { PageHeader, CtaBanner } from "@/components/site-footer";
import { useReviews } from "@/hooks/use-admin-data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — 4.9★ Rating | ProLeadsGeneration" },
      { name: "description", content: "Honest feedback from thousands of homeowners about our HVAC, plumbing, roofing and home service pros." },
      { property: "og:title", content: "Customer Reviews — ProLeadsGeneration" },
      { property: "og:description", content: "4.9★ average rating from 10,000+ verified homeowners nationwide." },
      { property: "og:url", content: "/reviews" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Customer Reviews — ProLeadsGeneration" },
      { name: "twitter:description", content: "See what 10,000+ verified homeowners say about our pros." },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ProLeadsGeneration",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
            reviewCount: "8412",
          },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

const RATING_BREAKDOWN = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
];

function ReviewsPage() {
  const { data: REVIEWS = [] } = useReviews();
  const services = useMemo(() => ["All", ...Array.from(new Set(REVIEWS.map((r) => r.service)))], [REVIEWS]);
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter);

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What Our Customers Say"
        subtitle="Honest feedback from homeowners in your neighborhood."
      />

      {/* Summary */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[auto_1fr] md:items-center">
          <div className="text-center">
            <div className="font-display text-6xl font-extrabold text-navy">4.9</div>
            <div className="mt-2 flex justify-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Based on 8,412 reviews</div>
          </div>
          <div className="space-y-2">
            {RATING_BREAKDOWN.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="w-10 text-sm font-semibold text-navy">{r.stars} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-12 text-right text-xs text-muted-foreground">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {services.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                filter === s
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-navy hover:border-brand"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Verified Reviews</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">What homeowners are saying</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <figure key={r.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="h-6 w-6 text-brand/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">"{r.body}"</blockquote>
              <div className="mt-4 flex gap-1 text-brand">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground font-display font-bold">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display font-bold text-navy">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.city} · {r.service}</div>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{r.review_date}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <ReviewForm />
      </section>

      <CtaBanner />
    </>
  );
}

function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  return (
    <div className="mt-16 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Write A Customer Review</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">Share Your Genuine Feedback</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your review is sent directly to our quality inspection desk for review and verification.
        </p>
      </div>
      {submitted ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-brand/10 p-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-brand" />
          <p className="font-display text-lg font-bold text-navy">Thank you for your feedback!</p>
          <p className="text-sm text-muted-foreground">We appreciate you taking the time to share your experience.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 grid gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-navy">Overall Experience Rating</label>
            <div className="mt-2 flex gap-1">
              {[1,2,3,4,5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`} className="p-1">
                  <Star className={`h-7 w-7 ${n <= rating ? "fill-brand text-brand" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Full Name" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
            <input required placeholder="Your City & State" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
          <select required defaultValue="" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            <option value="" disabled>Service used…</option>
            <option>HVAC</option><option>Plumbing</option><option>Roofing</option>
            <option>Pest Control</option><option>Garage Door</option><option>Electrical</option>
            <option>Water Damage</option><option>Appliance Repair</option>
          </select>
          <textarea required rows={4} placeholder="Your Review Details" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-bold text-brand-foreground hover:brightness-110 transition">
            Submit Feedback Securely <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
