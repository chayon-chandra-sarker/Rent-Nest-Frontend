
import Image from "next/image";
import Link from "next/link";
import { MapPin, Pencil } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  status: string;
  address: string | null;
  image: string | null;
}

export default function ProfileHeader({
  name,
  email,
  role,
  status,
  address,
  image,
}: ProfileHeaderProps) {
  const avatarLetter = name?.charAt(0)?.toUpperCase() || "U";

  const isActive = status?.toUpperCase() === "ACTIVE";

  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* User Section */}
          <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative mx-auto shrink-0 sm:mx-0">
              <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-[2rem] bg-primary/10 text-4xl font-bold text-primary shadow-inner ring-8 ring-primary/5">
                {image ? (
                  <Image
                    src={image}
                    alt={name || "Profile"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  avatarLetter
                )}
              </div>
            </div>

            {/* User Information */}
            <div className="min-w-0 text-center sm:text-left">
              {/* Name + Role */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {name || "User"}
                </h1>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {role || "USER"}
                </span>
              </div>

              {/* Email */}
              <p className="mt-2 truncate text-sm text-muted-foreground sm:text-base">
                {email || "No email available"}
              </p>

              {/* Status + Address */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {/* Status */}
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium">
                  <span
                    className={`size-2 rounded-full ${
                      isActive
                        ? "bg-emerald-500"
                        : "bg-muted-foreground"
                    }`}
                  />

                  {status || "UNKNOWN"}
                </span>

                {/* Address */}
                {address && (
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />

                    <span className="truncate">
                      {address}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Link
            href="/profile/edit"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
          >
            <Pencil className="size-4" />
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

