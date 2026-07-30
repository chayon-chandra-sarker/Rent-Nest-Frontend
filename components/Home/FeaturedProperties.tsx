"use client";

import { useState } from "react";
import { Bath, BedDouble, Heart, MapPin, Maximize, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: string;
  rating: number;
  image: string;
  featured?: boolean;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Sunlit Modern Apartment",
    location: "Downtown, Seattle",
    price: 2400,
    beds: 2,
    baths: 2,
    area: 1150,
    type: "Apartment",
    rating: 4.9,
    image: "/properties/apartment-1.png",
    featured: true,
  },
  {
    id: 2,
    title: "Contemporary Family House",
    location: "Bellevue, WA",
    price: 3200,
    beds: 4,
    baths: 3,
    area: 2100,
    type: "House",
    rating: 4.8,
    image: "/properties/house-2.png",
    featured: true,
  },
  {
    id: 3,
    title: "Cozy City Studio",
    location: "Capitol Hill, Seattle",
    price: 1450,
    beds: 1,
    baths: 1,
    area: 620,
    type: "Studio",
    rating: 4.7,
    image: "/properties/studio-3.png",
  },
  {
    id: 4,
    title: "Poolside Luxury Villa",
    location: "Scottsdale, AZ",
    price: 5600,
    beds: 5,
    baths: 4,
    area: 3400,
    type: "Villa",
    rating: 5.0,
    image: "/properties/villa-4.png",
    featured: true,
  },
  {
    id: 5,
    title: "Industrial Brick Loft",
    location: "Portland, OR",
    price: 2100,
    beds: 2,
    baths: 1,
    area: 1300,
    type: "Loft",
    rating: 4.8,
    image: "/properties/loft-5.png",
  },
  {
    id: 6,
    title: "Skyline View Condo",
    location: "San Francisco, CA",
    price: 4100,
    beds: 3,
    baths: 2,
    area: 1650,
    type: "Condo",
    rating: 4.9,
    image: "/properties/condo-6.png",
  },
];

function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <div
        className="relative  overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
            Featured
          </span>
        )}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
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
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {property.type}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-balance font-bold text-foreground">
            {property.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground">
            <Star className="size-4 fill-primary text-primary" />
            {property.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {property.location}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" />
            {property.beds} bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4" />
            {property.baths} ba
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4" />
            {property.area} ft²
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-extrabold text-foreground">
            ${property.price.toLocaleString()}
            <span className="text-sm font-medium text-muted-foreground">
              {" "}
              /mo
            </span>
          </p>
          <a
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View details
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProperties() {
  return (
    <section id="featured" className="bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Handpicked for you
            </span>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured properties
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
          >
            Explore all listings
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
