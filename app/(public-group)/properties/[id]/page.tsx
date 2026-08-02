import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  MapPin,
  User,
} from "lucide-react";

import { getSingleProperty, AdminProperty } from "@/service/property.service";
import RequestRentalButton from "@/app/(dashboard-group)/_components/tenant/RequestRentalButton";

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PropertyDetailsPage = async ({ params }: PropertyDetailsPageProps) => {
  const { id } = await params;

  let property: AdminProperty | null = null;
  let errorMessage = "";

  try {
    property = await getSingleProperty(id);
  } catch (error) {
    console.error("Failed to load property:", error);

    errorMessage =
      error instanceof Error ? error.message : "Failed to load property";
  }

  if (errorMessage || !property) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Back to Properties
          </Link>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <Building2 className="mx-auto size-12 text-red-500/50" />

            <h1 className="mt-4 text-xl font-bold text-red-500">
              Property Not Found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {errorMessage || "This property could not be found."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to Properties
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative aspect-[16/8] w-full bg-primary/5">
            {property.image ? (
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Building2 className="size-20 text-primary/20" />
              </div>
            )}

            {/* Category */}

            <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold backdrop-blur">
              {property.category.name}
            </span>

            {/* Availability */}

            <span
              className={`absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-bold ${
                property.isAvailable
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {property.isAvailable ? "Available" : "Rented"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}

          <div className="space-y-8">
            {/* Title */}

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {property.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-5 shrink-0 text-primary" />
                {property.location}
              </p>
            </div>

            {/* Features */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <BedDouble className="size-5 text-primary" />

                <p className="mt-3 text-xs text-muted-foreground">Bedrooms</p>

                <p className="mt-1 text-lg font-bold">{property.bedrooms}</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <Bath className="size-5 text-primary" />

                <p className="mt-3 text-xs text-muted-foreground">Bathrooms</p>

                <p className="mt-1 text-lg font-bold">{property.bathrooms}</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <Building2 className="size-5 text-primary" />

                <p className="mt-3 text-xs text-muted-foreground">
                  Property Type
                </p>

                <p className="mt-1 text-lg font-bold">
                  {property.category.name}
                </p>
              </div>
            </div>

            {/* Description */}

            <div>
              <h2 className="text-xl font-bold">About this property</h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {property.description}
              </p>
            </div>

            {/* Amenities */}

            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold">Amenities</h2>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <CheckCircle2 className="size-4 text-primary" />

                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord */}

            <div>
              <h2 className="text-xl font-bold">Property Owner</h2>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                  {property.landlord.image ? (
                    <Image
                      src={property.landlord.image}
                      alt={property.landlord.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <User className="size-6 text-primary" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-bold">{property.landlord.name}</p>

                  <p className="truncate text-sm text-muted-foreground">
                    {property.landlord.email}
                  </p>

                  {property.landlord.phone && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {property.landlord.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - PRICE CARD */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Monthly Rent</p>

              <div className="mt-1">
                <span className="text-3xl font-extrabold text-primary">
                  ৳{Number(property.price).toLocaleString()}
                </span>

                <span className="ml-1 text-sm text-muted-foreground">
                  / month
                </span>
              </div>

              <div className="my-6 border-t border-border" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Availability</span>

                <span
                  className={
                    property.isAvailable
                      ? "font-semibold text-emerald-500"
                      : "font-semibold text-red-500"
                  }
                >
                  {property.isAvailable ? "Available" : "Currently Rented"}
                </span>
              </div>

              {property.isAvailable ? (
                <RequestRentalButton propertyId={property.id} />
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-6 h-12 w-full rounded-xl bg-muted px-5 text-sm font-bold text-muted-foreground"
                >
                  Currently Unavailable
                </button>
              )}

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Contact the landlord before making any payment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetailsPage;
