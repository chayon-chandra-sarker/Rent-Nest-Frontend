import { ShieldCheck, Wallet, Headphones, Zap } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Verified listings',
    description:
      'Every property and landlord is screened and verified, so you always know exactly what you are renting.',
  },
  {
    icon: Wallet,
    title: 'No hidden fees',
    description:
      'Transparent pricing with clearly itemized costs. What you see is exactly what you pay, every time.',
  },
  {
    icon: Zap,
    title: 'Instant requests',
    description:
      'Send rental requests and book tours in seconds. Get responses from landlords faster than ever.',
  },
  {
    icon: Headphones,
    title: '24/7 support',
    description:
      'Our dedicated support team is always here to help you through every step of your rental journey.',
  },
]

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          Why RentNest
        </span>
        <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          The smarter way to rent your next home
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          We built RentNest to make renting feel effortless, transparent, and
          genuinely trustworthy for everyone involved.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <benefit.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
