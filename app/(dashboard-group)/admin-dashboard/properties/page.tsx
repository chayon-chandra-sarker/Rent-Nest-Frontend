"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BedDouble,
  Bath,
  MapPin,
  User,
  Home,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  getAllProperties,
  type AdminProperty,
} from "@/service/property.service";

import UserPagination from "@/components/AdminDashboard/Users/UserPagination";

export default function PropertiesTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

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

  // =========================
  // Loading
  // =========================
  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Loading properties...
        </p>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="font-medium text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load properties"}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    );
  }

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    properties.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProperties = properties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            All Properties
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage all rental properties.
          </p>
        </div>

        <div className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {properties.length} Properties
        </div>
      </div>

      {/* ================= PROPERTY CARDS ================= */}
      {properties.length > 0 ? (
        <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="group overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* ================= PROPERTY IMAGE ================= */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Home className="size-12 text-muted-foreground/40" />
                  </div>
                )}

                {/* Availability */}
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                    property.isAvailable
                      ? "bg-emerald-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {property.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              {/* ================= PROPERTY CONTENT ================= */}
              <div className="p-5">
                {/* Title + Location */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold">
                      {property.title?.trim()}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 shrink-0" />

                      <span className="truncate">
                        {property.location}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-5">
                  <span className="text-2xl font-bold">
                    ৳
                    {Number(property.price).toLocaleString()}
                  </span>

                  <span className="ml-1 text-sm text-muted-foreground">
                    / month
                  </span>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {/* Bedrooms */}
                  <div className="rounded-xl bg-muted/40 p-3 text-center">
                    <BedDouble className="mx-auto size-4 text-muted-foreground" />

                    <p className="mt-1 text-sm font-semibold">
                      {property.bedrooms}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Beds
                    </p>
                  </div>

                  {/* Bathrooms */}
                  <div className="rounded-xl bg-muted/40 p-3 text-center">
                    <Bath className="mx-auto size-4 text-muted-foreground" />

                    <p className="mt-1 text-sm font-semibold">
                      {property.bathrooms}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Baths
                    </p>
                  </div>

                  {/* Category */}
                  <div className="rounded-xl bg-muted/40 p-3 text-center">
                    <Home className="mx-auto size-4 text-muted-foreground" />

                    <p className="mt-1 truncate text-sm font-semibold">
                      {property.category?.name || "N/A"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Category
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t" />

                {/* ================= LANDLORD ================= */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Landlord
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Landlord Image */}
                    <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary">
                      {property.landlord?.image ? (
                        <Image
                          src={property.landlord.image}
                          alt={
                            property.landlord.name ||
                            "Landlord"
                          }
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        property.landlord?.name
                          ?.charAt(0)
                          .toUpperCase() || "L"
                      )}
                    </div>

                    {/* Landlord Info */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {property.landlord?.name ||
                          "Unknown Landlord"}
                      </p>

                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="size-3 shrink-0" />

                        <span className="truncate">
                          {property.landlord?.email ||
                            "No email"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= AMENITIES ================= */}
                {property.amenities?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.amenities
                      .slice(0, 4)
                      .map((amenity) => (
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
            </div>
          ))}
        </div>
      ) : (
        /* ================= EMPTY ================= */
        <div className="p-10 text-center">
          <Home className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No properties found
          </p>
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      {properties.length > 0 && totalPages > 1 && (
        <div className="border-t px-5 pb-6">
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}