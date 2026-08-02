
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import {
  getTenantProperties,
  AdminProperty,
} from "@/service/property.service";

const ITEMS_PER_PAGE = 9;

type PropertiesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PropertiesPage = async ({
  searchParams,
}: PropertiesPageProps) => {
  let properties: AdminProperty[] = [];
  let errorMessage = "";

  try {
    properties = await getTenantProperties();
  } catch (error) {
    console.error("Failed to load properties:", error);

    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load properties";
  }

  // =========================
  // CURRENT PAGE
  // =========================

  const params = await searchParams;

  const pageNumber = Number(params.page) || 1;

  const totalPages = Math.ceil(
    properties.length / ITEMS_PER_PAGE
  );

  const currentPage =
    pageNumber < 1
      ? 1
      : pageNumber > totalPages && totalPages > 0
        ? totalPages
        : pageNumber;

  // =========================
  // PAGINATION
  // =========================

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const currentProperties =
    properties.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            RentNest Listings
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            All Properties
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Find the perfect rental property for you.
          </p>

          {properties.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing{" "}
              {startIndex + 1}-
              {Math.min(
                endIndex,
                properties.length
              )}{" "}
              of {properties.length} properties
            </p>
          )}
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {errorMessage ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">

            <Building2 className="mx-auto size-12 text-red-500/50" />

            <h2 className="mt-4 text-xl font-bold text-red-500">
              Failed to Load Properties
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {errorMessage}
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>

          </div>
        ) : properties.length === 0 ? (

          /* =========================
              EMPTY STATE
          ========================= */

          <div className="rounded-3xl border border-border bg-card p-12 text-center">

            <Building2 className="mx-auto size-12 text-muted-foreground/50" />

            <h2 className="mt-4 text-xl font-bold">
              No Properties Found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There are no rental properties available right now.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>

          </div>

        ) : (

          <>
            {/* =========================
                PROPERTY GRID
            ========================= */}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {currentProperties.map(
                (property: AdminProperty) => (

                  <article
                    key={property.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
                  >

                    {/* =========================
                        IMAGE
                    ========================= */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">

                      {property.image ? (
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Building2 className="size-16 text-primary/20" />
                        </div>
                      )}

                      {/* Category */}

                      <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                        {property.category.name}
                      </span>

                      {/* Availability */}

                      <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                          property.isAvailable
                            ? "bg-emerald-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}
                      >
                        {property.isAvailable
                          ? "Available"
                          : "Rented"}
                      </span>

                    </div>

                    {/* =========================
                        CONTENT
                    ========================= */}

                    <div className="p-5">

                      {/* Title */}

                      <h2 className="truncate text-lg font-bold">
                        {property.title}
                      </h2>

                      {/* Location */}

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0 text-primary" />

                        <span className="truncate">
                          {property.location}
                        </span>
                      </p>

                      {/* Features */}

                      <div className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-sm text-muted-foreground">

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

                          {property.amenities
                            .slice(0, 4)
                            .map((amenity) => (
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

                      <div className="mt-5 flex items-center justify-between gap-3">

                        <p className="text-lg font-extrabold">
                          ৳
                          {Number(
                            property.price
                          ).toLocaleString()}

                          <span className="text-sm font-medium text-muted-foreground">
                            {" "}
                            /mo
                          </span>
                        </p>

                        <Link
                          href={`/properties/${property.id}`}
                          className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                        >
                          View details
                        </Link>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4">

                {/* Result info */}

                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">

                  {/* Previous */}

                  {currentPage > 1 ? (
                    <Link
                      href={`/properties?page=${currentPage - 1}`}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold transition hover:bg-muted"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </Link>
                  ) : (
                    <span className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 text-sm font-semibold text-muted-foreground">
                      <ChevronLeft className="size-4" />
                      Previous
                    </span>
                  )}

                  {/* Page Numbers */}

                  <div className="flex items-center gap-1">

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (

                      <Link
                        key={page}
                        href={`/properties?page=${page}`}
                        className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                          page === currentPage
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-card hover:bg-muted"
                        }`}
                      >
                        {page}
                      </Link>

                    ))}

                  </div>

                  {/* Next */}

                  {currentPage < totalPages ? (
                    <Link
                      href={`/properties?page=${currentPage + 1}`}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold transition hover:bg-muted"
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 text-sm font-semibold text-muted-foreground">
                      Next
                      <ChevronRight className="size-4" />
                    </span>
                  )}

                </div>

              </div>
            )}

          </>
        )}

      </section>
    </main>
  );
};

export default PropertiesPage;

