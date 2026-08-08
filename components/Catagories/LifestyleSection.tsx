
import {
  ArrowRight,
  Building2,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const lifestyles = [
  {
    title: "Modern Living",
    description:
      "Discover stylish apartments and modern homes designed for comfortable city living.",
    icon: Building2,
    href: "/properties",
    accent: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Luxury Lifestyle",
    description:
      "Explore premium villas and elegant properties made for a sophisticated lifestyle.",
    icon: Sparkles,
    href: "/properties",
    accent: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Peaceful Living",
    description:
      "Find quiet and comfortable homes in locations where you can relax and feel at home.",
    icon: Heart,
    href: "/properties",
    accent: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Prime Locations",
    description:
      "Choose properties in convenient locations close to work, shopping, and everyday essentials.",
    icon: MapPin,
    href: "/properties",
    accent: "bg-emerald-500/10 text-emerald-500",
  },
];

const LifestyleSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="size-4" />
            Find Your Lifestyle
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A place that fits your{" "}
            <span className="text-primary">lifestyle</span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Whether you prefer modern city living, luxury spaces, or a
            peaceful home, discover a property that feels right for you.
          </p>
        </div>

        {/* Lifestyle Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lifestyles.map((lifestyle) => {
            const Icon = lifestyle.icon;

            return (
              <Link
                key={lifestyle.title}
                href={lifestyle.href}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${lifestyle.accent}`}
                  >
                    <Icon className="size-5" />
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {lifestyle.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {lifestyle.description}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore properties
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-5 h-px w-full bg-border/60">
                    <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;

