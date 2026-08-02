
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  Loader2,
  MapPin,
  Search,
  X,
  XCircle,
} from "lucide-react";

import {
  getTenantProperties,
  AdminProperty,
} from "@/service/property.service";

import { useRouter } from "next/navigation";

const TenantProperties = () => {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTenantProperties();

        // Only available properties
        const availableProperties = data.filter(
          (property) => property.isAvailable
        );

        setProperties(availableProperties);
      } catch (error) {
        console.error("Failed to fetch properties:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Search filter
  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return properties;
    }

    return properties.filter((property) => {
      const title = property.title?.toLowerCase() || "";
      const location = property.location?.toLowerCase() || "";
      const category =
        property.category?.name?.toLowerCase() || "";

      return (
        title.includes(query) ||
        location.includes(query) ||
        category.includes(query)
      );
    });
  }, [properties, searchTerm]);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Loading state
  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <Loader2 className="size-9 animate-spin text-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading available properties...
          </p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-8 shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <XCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Failed to load properties
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Find your next home
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Browse Properties
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore available properties and find the perfect
            place for you.
          </p>
        </div>

        {/* Property count */}
        <div className="flex w-fit items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm">
          <Building2 className="size-4 text-primary" />

          <span className="font-semibold">
            {filteredProperties.length}
          </span>

          <span className="text-muted-foreground">
            {searchTerm ? "Found" : "Available"}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
        <Search className="size-5 shrink-0 text-muted-foreground" />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by property name, location or category..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* No properties */}
      {properties.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
            <Building2 className="size-8 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            No properties available
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            There are currently no available properties.
            Please check again later.
          </p>
        </div>
      ) : filteredProperties.length === 0 ? (
        /* No search result */
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
            <Search className="size-7 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            No properties found
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            No property matches{" "}
            <span className="font-semibold text-foreground">
              &quot;{searchTerm}&quot;
            </span>
            .
          </p>

          <button
            type="button"
            onClick={clearSearch}
            className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Property Grid */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => (
            <article
              key={property.id}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm"
            >
              {/* Property Image / Placeholder */}
              <div className="relative flex h-48 items-center justify-center bg-primary/5">
                {/* No zoom effect */}
                <Building2 className="size-16 text-primary/30" />

                {/* Available */}
                <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                  Available
                </span>

                {/* Category */}
                <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  {property.category.name}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h2 className="truncate text-lg font-bold">
                  {property.title}
                </h2>

                {/* Location */}
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-primary" />

                  <span className="truncate">
                    {property.location}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <span className="text-xl font-bold text-primary">
                    ৳
                    {Number(property.price).toLocaleString()}
                  </span>

                  <span className="ml-1 text-xs text-muted-foreground">
                    / month
                  </span>
                </div>

                {/* Features */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {/* Bedrooms */}
                  <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs">
                    <BedDouble className="size-4 text-primary" />

                    <span>
                      {property.bedrooms} Bedrooms
                    </span>
                  </div>

                  {/* Bathrooms */}
                  <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs">
                    <Bath className="size-4 text-primary" />

                    <span>
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities
                    .slice(0, 3)
                    .map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}

                  {property.amenities.length > 3 && (
                    <span className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>

                {/* Landlord */}
                <div className="mt-5 border-t border-border/60 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Landlord
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {property.landlord.name}
                  </p>
                </div>

                {/* View Details */}
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/dashboard/properties/${property.id}`
                    )
                  }
                  className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TenantProperties;

