
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  Edit,
  MapPin,
  Banknote,
  Tag,
  XCircle,
} from "lucide-react";

import {
  getSingleProperty,
  AdminProperty,
} from "@/service/property.service";

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PropertyDetailsPage = async ({
  params,
}: PropertyDetailsPageProps) => {
  const { id } = await params;

  let property: AdminProperty | null = null;
  let error = "";

  try {
    property = await getSingleProperty(id);
  } catch (err) {
    console.error("Failed to load property:", err);

    error =
      err instanceof Error
        ? err.message
        : "Failed to load property";
  }

  if (error || !property) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-500/10">
            <XCircle className="size-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold">
            Property Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {error || "The property could not be found."}
          </p>

          <Link
            href="/land-lord-dashboard/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Back to My Properties
          </Link>
        </div>
      </section>
    );
  }

  const formattedPrice = Number(
    property.price
  ).toLocaleString();

  const formattedDate = new Date(
    property.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="space-y-6">


      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <Link
            href="/land-lord-dashboard/properties"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to My Properties
          </Link>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Property Details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View all information about your property.
          </p>
        </div>

        <Link
          href={`/land-lord-dashboard/properties/${property.id}/edit`}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          <Edit className="size-4" />
          Edit Property
        </Link>

      </div>

      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">

        <div className="relative h-[280px] w-full overflow-hidden bg-primary/5 sm:h-[400px]">

          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="size-24 text-primary/20" />
            </div>
          )}

          {/* Availability */}

          <div className="absolute right-5 top-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md ${
                property.isAvailable
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {property.isAvailable ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <XCircle className="size-4" />
              )}

              {property.isAvailable
                ? "Available"
                : "Currently Rented"}
            </span>
          </div>

        </div>

        <div className="space-y-7 p-5 sm:p-8">

          {/* Title */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div className="min-w-0">

              <div className="mb-2 flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium">
                  <Tag className="size-3.5" />
                  {property.category.name}
                </span>

              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                {property.title}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />

                <span>
                  {property.location}
                </span>
              </div>

            </div>

            {/* Price */}

            <div className="shrink-0 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">

              <div className="flex items-center gap-2 text-muted-foreground">
                <Banknote className="size-4 text-primary" />

                <span className="text-xs font-semibold">
                  Monthly Rent
                </span>
              </div>

              <p className="mt-1 text-2xl font-extrabold text-primary">
                ৳{formattedPrice}
              </p>

            </div>

          </div>

          <div className="grid gap-3 sm:grid-cols-3">

            {/* Bedrooms */}

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <BedDouble className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Bedrooms
                  </p>

                  <p className="text-lg font-bold">
                    {property.bedrooms}
                  </p>
                </div>

              </div>

            </div>

            {/* Bathrooms */}

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Bath className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Bathrooms
                  </p>

                  <p className="text-lg font-bold">
                    {property.bathrooms}
                  </p>
                </div>

              </div>

            </div>

            {/* Category */}

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="size-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Category
                  </p>

                  <p className="truncate text-lg font-bold">
                    {property.category.name}
                  </p>
                </div>

              </div>

            </div>

          </div>

          <div className="border-t border-border/60 pt-6">

            <h3 className="text-lg font-bold">
              Description
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {property.description}
            </p>

          </div>

          <div>

            <h3 className="text-lg font-bold">
              Amenities
            </h3>

            {property.amenities.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">

                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium"
                  >
                    {amenity}
                  </span>
                ))}

              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No amenities added.
              </p>
            )}

          </div>

          <div className="grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2">

            {/* Created */}

            <div className="rounded-2xl border border-border/60 p-4">

              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />

                <p className="text-xs font-semibold text-muted-foreground">
                  Created At
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold">
                {formattedDate}
              </p>

            </div>

            {/* Status */}

            <div className="rounded-2xl border border-border/60 p-4">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />

                <p className="text-xs font-semibold text-muted-foreground">
                  Property Status
                </p>
              </div>

              <p
                className={`mt-2 text-sm font-bold ${
                  property.isAvailable
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {property.isAvailable
                  ? "Available for Rent"
                  : "Currently Rented"}
              </p>

            </div>

          </div>


          <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row">

            <Link
              href="/land-lord-dashboard/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back to Properties
            </Link>

            <Link
              href={`/land-lord-dashboard/properties/${property.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              <Edit className="size-4" />
              Edit Property
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PropertyDetailsPage;

