import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Amara Johnson',
    role: 'Tenant · Seattle',
    quote:
      'RentNest made finding my apartment unbelievably easy. The listings were accurate, verified, and I moved in within a week of searching.',
    initials: 'AJ',
  },
  {
    name: 'David Chen',
    role: 'Landlord · Portland',
    quote:
      'As a property owner, I love how simple it is to manage requests and connect with quality tenants. The dashboard is a game changer.',
    initials: 'DC',
  },
  {
    name: 'Sofia Martinez',
    role: 'Tenant · San Francisco',
    quote:
      'No hidden fees, transparent pricing, and responsive support. RentNest is exactly what the rental market needed. Highly recommend.',
    initials: 'SM',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          Loved by renters
        </span>
        <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Trusted by thousands of happy tenants
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {t.initials}
              </span>
              <span>
                <span className="block font-bold text-foreground">{t.name}</span>
                <span className="block text-sm text-muted-foreground">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
