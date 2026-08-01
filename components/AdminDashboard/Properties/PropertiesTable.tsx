"use client";

import { useQuery } from "@tanstack/react-query";
import { BedDouble, Bath, MapPin, User, Home } from "lucide-react";

import {
  getAllProperties,
  type AdminProperty,
} from "@/service/property.service";
import Image from "next/image";

export default function PropertiesTable() {
  const {
    data: properties = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AdminProperty[]>({
    queryKey: ["admin-properties"],
    queryFn: getAllProperties,
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Loading properties...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="font-medium text-destructive">
          {error instanceof Error ? error.message : "Failed to load properties"}
        </p>

        <button
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">All Properties</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage all rental properties.
          </p>
        </div>

        <div className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {properties.length} Properties
        </div>
      </div>

      {/* Properties */}
      <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="rounded-2xl border bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">
                  {property.title.trim()}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {property.location}
                </p>
              </div>

              {/* Availability */}
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  property.isAvailable
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {property.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-5">
              <span className="text-2xl font-bold">
                ৳{Number(property.price).toLocaleString()}
              </span>

              <span className="ml-1 text-sm text-muted-foreground">
                / month
              </span>
            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center">
                <BedDouble className="mx-auto size-4 text-muted-foreground" />

                <p className="mt-1 text-sm font-semibold">
                  {property.bedrooms}
                </p>

                <p className="text-xs text-muted-foreground">Beds</p>
              </div>

              <div className="rounded-xl bg-muted/40 p-3 text-center">
                <Bath className="mx-auto size-4 text-muted-foreground" />

                <p className="mt-1 text-sm font-semibold">
                  {property.bathrooms}
                </p>

                <p className="text-xs text-muted-foreground">Baths</p>
              </div>

              <div className="rounded-xl bg-muted/40 p-3 text-center">
                <Home className="mx-auto size-4 text-muted-foreground" />

                <p className="mt-1 truncate text-sm font-semibold">
                  {property.category.name}
                </p>

                <p className="text-xs text-muted-foreground">Category</p>
              </div>
            </div>

            {/* Landlord */}
            <div className="mt-5 border-t pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Landlord
              </p>

              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary">
                  {property.landlord.image ? (
                    <Image
                      src={property.landlord.image || "/placeholder.svg"}
                      alt={property.landlord.name || "Landlord"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    property.landlord.name?.charAt(0).toUpperCase() || "L"
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {property.landlord.name}
                  </p>

                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="size-3" />
                    {property.landlord.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty */}
      {properties.length === 0 && (
        <div className="p-10 text-center">
          <Home className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-3 font-medium">No properties found</p>
        </div>
      )}
    </section>
  );
}
