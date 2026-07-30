import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-center sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-16 size-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-background sm:text-4xl lg:text-5xl">
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-background/70">
            Join thousands of renters who found their perfect place on RentNest.
            Start your search today, it&apos;s completely free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#featured"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Browse properties
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-background/25 px-7 text-sm font-semibold text-background transition-colors hover:bg-background/10 sm:w-auto"
            >
              List your property
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
