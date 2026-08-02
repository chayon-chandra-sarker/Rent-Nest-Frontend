"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Building2,
  Loader2,
  MapPin,
} from "lucide-react";

import {
  getLandlordProperties,
  LandlordProperty,
} from "@/service/landlord-property.service";

const LandlordProperties = () => {
  const [properties, setProperties] = useState<
    LandlordProperty[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getLandlordProperties();

        setProperties(data);
      } catch (error) {
        console.error(
          "Failed to load landlord properties:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading properties...</span>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
        <p className="font-semibold text-red-500">
          Failed to load properties
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {error}
        </p>
      </div>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (properties.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border p-8 text-center">
        <Building2 className="size-12 text-muted-foreground/50" />

        <h2 className="mt-4 text-lg font-bold">
          No Properties Found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          You have not added any properties yet.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Properties
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your rental properties from here.
          </p>
        </div>

        <div className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
          {properties.length} Properties
        </div>
      </div>

      {/* Property Grid */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {properties.map((property) => (
          <div
            key={property.id}
            className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            {/* Property Image */}

            <div className="relative h-52 w-full overflow-hidden bg-muted">

              {property.image ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/5">
                  <Building2 className="size-16 text-primary/20" />
                </div>
              )}

            </div>

            {/* Content */}

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
                  className={
                    property.isAvailable
                      ? "shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-500"
                      : "shrink-0 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-red-500"
                  }
                >
                  {property.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              {/* Category */}

              <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {property.category.name}
              </span>

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

                <div className="flex items-center gap-2 rounded-xl border border-border/60 p-3">
                  <BedDouble className="size-4 text-primary" />

                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Bedrooms
                    </p>

                    <p className="text-sm font-semibold">
                      {property.bedrooms}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border/60 p-3">
                  <Bath className="size-4 text-primary" />

                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Bathrooms
                    </p>

                    <p className="text-sm font-semibold">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>

              </div>

              {/* Description */}

              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                {property.description}
              </p>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default LandlordProperties;