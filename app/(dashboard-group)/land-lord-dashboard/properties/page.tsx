
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  MapPin,
  BedDouble,
  Bath,
  Pencil,
  Building2,
} from "lucide-react";

import {
  getLandlordProperties,
  LandlordProperty,
} from "@/service/property.service";

import DeletePropertyButton from "../../_components/landlord/DeletePropertyButton";

const LandlordPropertiesPage = async () => {
  let properties: LandlordProperty[] = [];

  try {
    properties = await getLandlordProperties();
  } catch (error) {
    console.error("Failed to load landlord properties:", error);
  }

  return (
    <section className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            My Properties
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage all your rental properties from here.
          </p>
        </div>

        <Link
          href="/land-lord-dashboard/properties/create"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Property
        </Link>
      </div>

      {/* ================= EMPTY STATE ================= */}

      {properties.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-border/60 bg-card">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <Building2 className="size-8 text-primary" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No Properties Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              You have not added any properties yet. Start by creating your
              first rental property.
            </p>

            <Link
              href="/land-lord-dashboard/properties/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
            >
              <Plus className="size-4" />
              Add Property
            </Link>
          </div>
        </div>
      ) : (
        /* ================= PROPERTY GRID ================= */

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm"
            >
              {/* ================= PROPERTY IMAGE ================= */}

              <div className="relative h-48 w-full overflow-hidden bg-primary/5">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="size-16 text-primary/20" />
                  </div>
                )}
              </div>

              {/* ================= CONTENT ================= */}

              <div className="space-y-4 p-5">
                {/* Title + Status */}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold">
                      {property.title}
                    </h2>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 shrink-0 text-primary" />

                      <span className="truncate">
                        {property.location}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                      property.isAvailable
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {property.isAvailable
                      ? "Available"
                      : "Rented"}
                  </span>
                </div>

                {/* Category */}

                <div>
                  <span className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium">
                    {property.category.name}
                  </span>
                </div>

                {/* Price */}

                <div>
                  <span className="text-2xl font-bold text-primary">
                    ৳{Number(property.price).toLocaleString()}
                  </span>

                  <span className="ml-1 text-xs text-muted-foreground">
                    / month
                  </span>
                </div>

                {/* Features */}

                <div className="grid grid-cols-2 gap-2">
                  {/* Bedrooms */}

                  <div className="flex items-center gap-2 rounded-xl border border-border/60 p-3">
                    <BedDouble className="size-4 text-primary" />

                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Bedrooms
                      </p>

                      <p className="text-sm font-semibold">
                        {property.bedrooms}
                      </p>
                    </div>
                  </div>

                  {/* Bathrooms */}

                  <div className="flex items-center gap-2 rounded-xl border border-border/60 p-3">
                    <Bath className="size-4 text-primary" />

                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Bathrooms
                      </p>

                      <p className="text-sm font-semibold">
                        {property.bathrooms}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}

                <div>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">
                    Amenities
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {property.amenities
                      .slice(0, 4)
                      .map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Actions */}

                <div className="flex gap-2 border-t border-border/60 pt-4">
                  {/* View */}

                  <Link
                    href={`/land-lord-dashboard/properties/${property.id}`}
                    className="flex-1 rounded-xl border border-border px-3 py-2.5 text-center text-xs font-semibold transition-colors hover:bg-muted"
                  >
                    View
                  </Link>

                  {/* Edit */}

                  <Link
                    href={`/land-lord-dashboard/properties/${property.id}/edit`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold transition-colors hover:bg-muted"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Link>

                  {/* Delete */}

                  <DeletePropertyButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LandlordPropertiesPage;

