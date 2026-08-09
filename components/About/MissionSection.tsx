
import {
  CheckCircle2,
  Heart,
  Search,
  ShieldCheck,
} from "lucide-react";

const missionPoints = [
  {
    icon: Search,
    title: "Easy Discovery",
    description:
      "Make it simple to discover properties that match your needs, location, and lifestyle.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Choices",
    description:
      "Help renters explore reliable property listings with clear and useful information.",
  },
  {
    icon: Heart,
    title: "Better Living",
    description:
      "Connect people with spaces where they can feel comfortable, safe, and truly at home.",
  },
];

const MissionSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Making property renting
              <span className="block text-primary">
                easier for everyone.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              At RentNest, our goal is to simplify the rental experience.
              We bring properties, locations, and useful information together
              so renters can spend less time searching and more time finding
              the right place.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>

              <p className="text-sm font-semibold text-foreground">
                A smarter way to find your next home
              </p>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {missionPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

