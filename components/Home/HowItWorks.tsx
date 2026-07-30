import { Search, CalendarCheck, KeyRound } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Search & discover',
    description:
      'Filter by location, price, and category to find verified properties that match exactly what you are looking for.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Request & tour',
    description:
      'Send a rental request or schedule a tour directly with the landlord in just a few clicks.',
  },
  {
    icon: KeyRound,
    step: '03',
    title: 'Rent & move in',
    description:
      'Get approved, pay securely online, and receive your keys. Welcome to your new home with RentNest.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Simple process
          </span>
          <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How RentNest works
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Renting your dream home is just three easy steps away.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-9 hidden h-px w-full bg-gradient-to-r from-primary/40 to-transparent md:block"
                />
              )}
              <span className="relative z-10 flex size-16 items-center justify-center rounded-2xl bg-card text-primary shadow-md ring-1 ring-border">
                <item.icon className="size-8" />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
