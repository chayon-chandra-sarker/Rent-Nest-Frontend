
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Send,
  KeyRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Properties",
    description:
      "Browse available properties using categories, locations, and filters to find what fits your needs.",
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Explore Details",
    description:
      "Check property information, amenities, pricing, location, and availability before making a decision.",
  },
  {
    number: "03",
    icon: Send,
    title: "Send Rental Request",
    description:
      "Found the right place? Send a rental request to the landlord directly through RentNest.",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Move Into Your New Place",
    description:
      "Complete the rental process and take the next step toward your new home.",
  },
];

const HowRentNestWorks = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Renting made{" "}
            <span className="text-primary">simple</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            From discovering a property to finding your next home,
            RentNest keeps the process simple and straightforward.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-border lg:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative text-center"
              >
                {/* Icon */}
                <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>

                {/* Number */}
                <span className="mt-5 block text-xs font-bold tracking-widest text-primary">
                  STEP {step.number}
                </span>

                {/* Content */}
                <h3 className="mt-2 text-lg font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {/* Arrow */}
                {step.number !== "04" && (
                  <ArrowRight className="mx-auto mt-5 hidden size-4 text-border lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowRentNestWorks;

