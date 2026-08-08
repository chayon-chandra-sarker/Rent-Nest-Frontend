
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const CategoriesHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-secondary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" />

            Explore RentNest
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Find a Space That
            <span className="block text-primary">
              Fits Your Lifestyle
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore different rental categories and discover
            spaces designed for the way you live, work, and grow.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_8px_25px_rgba(0,220,229,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(0,220,229,0.32)]"
            >
              Browse Properties

              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#categories"
              className="inline-flex items-center rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesHero;

