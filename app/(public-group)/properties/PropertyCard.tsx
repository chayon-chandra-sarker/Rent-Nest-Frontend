
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  MapPin,
  ArrowRight,
} from "lucide-react";

import type { AdminProperty } from "@/service/property.service";

interface PropertyCardProps {
  property: AdminProperty;
}

const PropertyCard = ({
  property,
}: PropertyCardProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}

        {/* Category */}
        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {property.category.name}
        </div>

        {/* Availability */}
        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            property.isAvailable
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {property.isAvailable
            ? "Available"
            : "Rented"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-lg font-bold">
          {property.title}
        </h2>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />

          <span className="line-clamp-1">
            {property.location}
          </span>
        </div>

        {/* Details */}
        <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-primary" />
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="size-4 text-primary" />
            <span>{property.bathrooms} Baths</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-extrabold text-primary">
              ${Number(property.price).toLocaleString()}
            </p>

            <p className="text-xs text-muted-foreground">
              per month
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:opacity-90"
          >
            View Details
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;

