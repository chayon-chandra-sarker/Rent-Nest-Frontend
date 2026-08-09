
import {
  ArrowRight,
  Building2,
  House,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid min-h-[520px] items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              <Building2 className="size-4" />
              About RentNest
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Finding a place to live
              <span className="block text-primary">
                should feel simple.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              RentNest is a modern rental platform designed to make
              discovering, exploring, and renting properties easier.
              Find a place that fits your lifestyle without the usual
              hassle.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Properties
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-2xl">
              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:32px_32px]" />

              <div className="relative">
                {/* Main Icon */}
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-primary/10">
                  <div className="flex size-28 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl sm:size-36">
                    <House className="size-14 sm:size-20" />
                  </div>
                </div>

                {/* Floating Location Card */}
                <div className="absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-lg sm:-left-6">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Find your place
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      Right location
                    </p>
                  </div>
                </div>

                {/* Floating Property Card */}
                <div className="absolute -right-3 top-8 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-lg sm:-right-6">
                  <p className="text-xs text-muted-foreground">
                    Property
                  </p>

                  <p className="mt-1 text-sm font-bold text-foreground">
                    Made for you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

