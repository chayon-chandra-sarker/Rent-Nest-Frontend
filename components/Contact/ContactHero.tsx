
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid min-h-[430px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              <Mail className="size-4" />
              Contact RentNest
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Let&apos;s talk about
              <span className="block text-primary">
                your next place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question about a property, rental request, or
              RentNest? Send us a message and our team will be happy
              to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {/* Email */}
            <div className="rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email us
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    chayon438@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Call us
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    +8801779-188207
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Our location
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    Dhaka, Bangladesh
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

export default ContactHero;

