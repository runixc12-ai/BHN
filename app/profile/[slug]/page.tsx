import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { DIRECTORY_LISTINGS } from "@/lib/data";

export function generateStaticParams() {
  return DIRECTORY_LISTINGS.map((x) => ({ slug: x.slug }));
}

export function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = DIRECTORY_LISTINGS.find((x) => x.slug === slug);
    if (!p) return { title: "Profile" };
    return { title: p.name, description: p.headline };
  });
}

export default async function ProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = DIRECTORY_LISTINGS.find((x) => x.slug === slug);
  if (!profile) notFound();

  return (
    <>
      {profile.sponsored ? (
        <div className="border-b border-brand-200 bg-brand-50 dark:border-brand-400/30 dark:bg-brand-500/10">
          <div className="container-page py-2.5 text-xs font-medium text-brand-800 dark:text-brand-300">
            Sponsored listing.{" "}
            <Link href="/directory" className="underline underline-offset-2">
              Back to directory
            </Link>
          </div>
        </div>
      ) : (
        <div className="border-b border-amber-300 bg-amber-50 dark:border-amber-400/40 dark:bg-amber-500/10">
          <div className="container-page py-2.5 text-xs font-medium text-amber-900 dark:text-amber-100">
            Sample listing. Not a real person or organization. It only shows the
            format a listing would take.
          </div>
        </div>
      )}

      <section className="container-page pb-10 pt-12 sm:pb-14 sm:pt-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="chip">
              <span className="h-2 w-2 rounded-full bg-brand-600/70" />
              {profile.type} profile
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {profile.headline}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="brand">{profile.format}</Badge>
              <Badge tone="neutral">{profile.location}</Badge>
              <Badge tone="neutral">Availability: {profile.availability}</Badge>
              <Badge tone="brand">{profile.paymentBadge}</Badge>
            </div>
          </div>

          <div className="surface w-full max-w-md p-6">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Connect</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Bitcoin Health Network is informational only. Contact providers or organizations
              directly to confirm scope, terms, and pricing.{" "}
              <Link href="/disclaimer" className="link">
                Read disclaimer
              </Link>
              .
            </p>
            <div className="mt-5 grid gap-3">
              <ButtonLink href="/directory" variant="secondary" className="w-full">
                Back to directory
              </ButtonLink>
              <ButtonLink href="/directory" className="w-full">
                View similar listings
              </ButtonLink>
              <div className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Payment note
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {profile.paymentBadge}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Confirm details directly with the listing. Bitcoin payments may involve volatility
                  and user responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="border-t border-slate-200/70 bg-white dark:border-white/10 dark:bg-transparent">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="card p-6">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">About</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{profile.bio}</p>

                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Credentials and trust signals
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {profile.verifiedSignals.map((x) => (
                        <span
                          key={x}
                          className="pill"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      Placeholders. In a real product, verification should be explicit, reviewable,
                      and privacy-aware.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delayMs={80}>
                <div className="mt-6 card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Services</div>
                    <Badge tone="brand">Overview</Badge>
                  </div>
                  <div className="mt-4 space-y-4">
                    {profile.services.map((s) => (
                      <div
                        key={s.name}
                        className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] p-5"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{s.name}</div>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                              {s.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="neutral">{s.duration}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delayMs={120}>
                <div className="mt-6 card p-6">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">Links</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Placeholder links. In a real directory, profiles should point to clear contact
                    methods and primary sources.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {profile.links.map((l) => (
                      <div key={l.href} className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] p-5">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{l.label}</div>
                        <div className="mt-2 text-sm">
                          <Link href={l.href} className="link">
                            {l.href}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn>
                <div className="card p-6">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">Availability</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Placeholder availability module. A real product could support time zones, async
                    intake, and clear cancellation terms.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                      <div
                        key={d}
                        className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] p-3 text-center"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {d}
                        </div>
                        <div className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                          {i % 2 === 0 ? "2 slots" : "1 slot"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delayMs={80}>
                <div className="mt-6 card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Reviews</div>
                    <Badge tone="accent">Web of trust</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Reviews are weighted by Nostr&rsquo;s web of trust: you see
                    ratings from people connected to you, not anonymous strangers.{" "}
                    <Link href="/reviews" className="link">
                      How trust works
                    </Link>
                    .
                  </p>
                  <div className="mt-4 space-y-3">
                    {profile.reviews.map((r, ri) => (
                      <div key={ri} className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{r.rating} / 5</div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">"{r.quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

