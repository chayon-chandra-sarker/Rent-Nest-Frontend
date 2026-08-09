
import {
  Headphones,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const supportOptions = [
  {
    icon: MessageCircle,
    title: "General Support",
    description:
      "Have a question about RentNest? Our support team is here to help with your general questions.",
    action: "Ask a question",
  },
  {
    icon: Headphones,
    title: "Rental Assistance",
    description:
      "Need help finding or renting a property? Get assistance throughout your rental journey.",
    action: "Get rental help",
  },
  {
    icon: ShieldCheck,
    title: "Landlord Support",
    description:
      "Having trouble managing your property or rental requests? We are here to support landlords.",
    action: "Get landlord help",
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Send us a detailed message and our team will get back to you with the information you need.",
    action: "Email our team",
  },
];

const SupportOptions = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Support Center
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How can we{" "}
            <span className="text-primary">help?</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Choose the type of support you need and let us help you
            get the most out of RentNest.
          </p>
        </div>

        {/* Support Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 size-28 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-lg font-bold text-foreground">
                    {option.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {option.description}
                  </p>

                  {/* Action */}
                  <div className="mt-5 text-sm font-semibold text-primary">
                    {option.action}
                  </div>

                  {/* Bottom line */}
                  <div className="mt-4 h-px w-full bg-border/60">
                    <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportOptions;

