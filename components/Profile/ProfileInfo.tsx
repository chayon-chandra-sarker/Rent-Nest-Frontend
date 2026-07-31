
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

interface ProfileInfoProps {
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string | null;
  address: string | null;
  createdAt: string;
}

export default function ProfileInfo({
  name,
  email,
  role,
  status,
  phone,
  address,
  createdAt,
}: ProfileInfoProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const isActive = status?.toUpperCase() === "ACTIVE";

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card/80 p-6 shadow-sm backdrop-blur-xl sm:p-8">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <User className="size-6" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your account details and personal information
            </p>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="group rounded-2xl border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Full Name
                </p>

                <p className="mt-1 truncate font-semibold">
                  {name || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group rounded-2xl border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email Address
                </p>

                <p className="mt-1 truncate font-semibold">
                  {email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group rounded-2xl border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </p>

                <p className="mt-1 truncate font-semibold">
                  {phone || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="group rounded-2xl border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Address
                </p>

                <p className="mt-1 font-semibold">
                  {address || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="group rounded-2xl border bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:col-span-2">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDays className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Member Since
                </p>

                <p className="mt-1 font-semibold">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border bg-background/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Account Status
              </p>

              <p className="mt-1 font-semibold">
                {status || "Unknown"}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                isActive ? "bg-emerald-500" : "bg-destructive"
              }`}
            />

            {status || "Unknown"}
          </span>
        </div>

        {/* Role */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Account Role
            </p>

            <p className="mt-1 text-base font-bold capitalize">
              {role || "User"}
            </p>
          </div>

          <div className="w-fit rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {role || "User"}
          </div>
        </div>
      </div>
    </section>
  );
}

