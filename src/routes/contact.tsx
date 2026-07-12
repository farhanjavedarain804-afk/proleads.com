import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Clock, MapPin, CheckCircle2, ArrowRight, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/site-footer";
import { useSiteSettings, useServices } from "@/hooks/use-admin-data";
import { submitContactForm } from "@/lib/db.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — 24/7 Home Service Dispatch | ProLeads" },
      { name: "description", content: "Call 24/7 or send us a message. Nationwide dispatch for HVAC, plumbing, roofing and home services." },
      { property: "og:title", content: "Contact ProLeadsGeneration — 24/7 Nationwide Dispatch" },
      { property: "og:description", content: "Reach us anytime. Same-day booking for HVAC, plumbing, roofing and more across the U.S." },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact ProLeadsGeneration" },
      { name: "twitter:description", content: "24/7 nationwide dispatch. Same-day home service." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const OFFICES = [
  { city: "Austin, TX", role: "Headquarters", hours: "Mon–Sun · 24/7 dispatch" },
  { city: "Phoenix, AZ", role: "West Regional", hours: "Mon–Sun · 24/7 dispatch" },
  { city: "Charlotte, NC", role: "East Regional", hours: "Mon–Sun · 24/7 dispatch" },
  { city: "Chicago, IL", role: "Midwest Regional", hours: "Mon–Sun · 24/7 dispatch" },
];

function ContactPage() {
  const { phone: PHONE, phone_tel: PHONE_TEL, email: EMAIL, address: ADDRESS } = useSiteSettings();
  const { data: services = [] } = useServices();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", service: "", urgency: "", message: "" });

  const CONTACT_METHODS = [
    { icon: Phone, label: "24/7 Dispatch", value: PHONE, href: `tel:${PHONE_TEL}` },
    { icon: Mail, label: "Email Support", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MessageSquare, label: "Text a Dispatcher", value: "Reply within 5 min", href: `sms:${PHONE_TEL}` },
    { icon: MapPin, label: "Headquarters", value: ADDRESS },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm({
        data: {
          name: form.name, email: form.email, phone: form.phone,
          city: form.city, service: form.service,
          message: `${form.urgency ? `Urgency: ${form.urgency}\n` : ""}${form.message}`,
        }
      });
      toast.success("Message sent");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Talk To A Home Service Expert"
        subtitle="Call our 24/7 dispatch or send a message — a specialist will reach out within one business hour."
      />

      {/* Quick contact grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => {
            const Wrapper: React.ElementType = href ? "a" : "div";
            return (
              <Wrapper
                key={label}
                {...(href ? { href } : {})}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="mt-1 font-display font-bold text-navy break-words">{value}</div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Main form + info */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-navy">Hours & Response Times</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Phone dispatch</span><span className="font-semibold text-navy">24/7</span></li>
                <li className="flex justify-between"><span>Emergency response</span><span className="font-semibold text-navy">30–90 min</span></li>
                <li className="flex justify-between"><span>Standard bookings</span><span className="font-semibold text-navy">Same-day / next-day</span></li>
                <li className="flex justify-between"><span>Email replies</span><span className="font-semibold text-navy">Under 1 hour</span></li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-navy">Regional Offices</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {OFFICES.map((o) => (
                  <li key={o.city} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-display font-bold text-navy">{o.city}</div>
                      <div className="text-xs text-muted-foreground">{o.role}</div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">{o.hours}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-navy">Your Info Is Protected</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                We never sell your data. Your contact info is used only to dispatch a licensed pro to your address.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-bold text-navy">Send Us A Message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We reply within one business hour.</p>
            {submitted ? (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-brand/10 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-brand" />
                <p className="font-display text-lg font-bold text-navy">Message sent!</p>
                <p className="text-sm text-muted-foreground">A specialist will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                  <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                </div>
                <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                <input required placeholder="City & State" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
                    <option value="" disabled>Choose a service…</option>
                    {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                  <select required value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
                    <option value="" disabled>Urgency…</option>
                    <option>Emergency (24/7)</option>
                    <option>Same-day</option>
                    <option>This week</option>
                    <option>Just an estimate</option>
                  </select>
                </div>
                <textarea required rows={4} placeholder="Describe your issue" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" defaultChecked className="mt-0.5" />
                  I agree to be contacted about my request. We never share your info.
                </label>
                <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-bold text-brand-foreground hover:brightness-110 transition disabled:opacity-60">
                  {loading ? "Sending…" : <>Send Message <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
