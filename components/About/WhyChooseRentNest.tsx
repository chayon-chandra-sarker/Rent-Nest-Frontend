
import {
  Clock3,
  HeartHandshake,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: SearchCheck,
    title: "Easy Property Search",
    description:
      "Find properties quickly with simple categories, locations, and useful search filters.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Listings",
    description:
      "Explore property listings with clear details so you can make confident decisions.",
  },
  {
    icon: Clock3,
    title: "Save Your Time",
    description:
      "Spend less time browsing and more time discovering properties that fit your needs.",
  },
  {
    icon: HeartHandshake,
    title: "Better Renting Experience",
    description:
      "RentNest is designed to make the journey from property discovery to renting simple and convenient.",
  },
];

const WhyChooseRentNest = () => {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why RentNest
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why choose{" "}
            <span className="text-primary">RentNest?</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Everything you need to discover a property and enjoy a
            smoother rental experience in one place.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border/60 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-bold text-foreground">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRentNest;

