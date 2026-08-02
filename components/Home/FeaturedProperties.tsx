"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  Heart,
  Loader2,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { getTenantProperties, AdminProperty } from "@/service/property.service";

function PropertyCard({ property }: { property: AdminProperty }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      {/* =========================
          IMAGE
      ========================= */}

      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
      >
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/5">
            <Building2 className="size-16 text-primary/20" />
          </div>
        )}

        {/* Available Status */}

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur",
            property.isAvailable
              ? "bg-emerald-500/90 text-white"
              : "bg-red-500/90 text-white",
          )}
        >
          {property.isAvailable ? "Available" : "Rented"}
        </span>

        {/* Favorite */}

        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              liked ? "fill-primary text-primary" : "text-foreground",
            )}
          />
        </button>

        {/* Category */}

        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {property.category.name}
        </span>
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div className="p-5">
        {/* Title */}

        <h3 className="line-clamp-1 text-balance font-bold text-foreground">
          {property.title}
        </h3>

        {/* Location */}

        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />

          <span className="truncate">{property.location}</span>
        </p>

        {/* Features */}

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" />
            {property.bedrooms} bd
          </span>

          <span className="flex items-center gap-1.5">
            <Bath className="size-4" />
            {property.bathrooms} ba
          </span>
        </div>

        {/* Amenities */}

        {property.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Price + Details */}

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-lg font-extrabold text-foreground">
            ৳{Number(property.price).toLocaleString()}
            <span className="text-sm font-medium text-muted-foreground">
              {" "}
              /month
            </span>
          </p>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<AdminProperty[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // LOAD PROPERTIES
  // =========================

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTenantProperties();

        // Home page-এ শুধু ৬টা property
        setProperties(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to load properties:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load properties",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <section id="featured" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================
            HEADER
        ========================= */}

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Handpicked for you
            </span>

            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured properties
            </h2>

            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Discover available rental properties from our landlords.
            </p>
          </div>

          {/* Explore All */}

          <Link
            href="/properties"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
          >
            Explore all listings
          </Link>
        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />

              <span>Loading properties...</span>
            </div>
          </div>
        )}

        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="font-semibold text-red-500">
              Failed to load properties
            </p>

            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* =========================
            EMPTY
        ========================= */}

        {!loading && !error && properties.length === 0 && (
          <div className="mt-10 flex min-h-[250px] flex-col items-center justify-center rounded-3xl border border-dashed border-border p-8 text-center">
            <Building2 className="size-12 text-muted-foreground/40" />

            <h3 className="mt-4 text-lg font-bold">No Properties Available</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no rental properties available right now.
            </p>
          </div>
        )}

        {/* =========================
            PROPERTY GRID
        ========================= */}

        {!loading && !error && properties.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
