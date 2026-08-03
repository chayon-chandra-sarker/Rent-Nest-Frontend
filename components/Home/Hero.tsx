"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShieldCheck } from "lucide-react";
import Image from "next/image";

import PropertySearch from "./PropertySearch";

export function Hero() {
const router = useRouter();

const [location, setLocation] = useState("");
const [category, setCategory] = useState("Any type");
const [price, setPrice] = useState("Any price");
const [availability, setAvailability] = useState("all");
const [sort, setSort] = useState("default");

const handleSearch = () => {
const params = new URLSearchParams();

// Location
if (location.trim()) {
  params.set("location", location.trim());
}

// Category
if (category !== "Any type") {
  params.set("category", category);
}

// Price
if (price !== "Any price") {
  params.set("price", price);
}

// Availability
if (availability !== "all") {
  params.set("availability", availability);
}

// Sort
if (sort !== "default") {
  params.set("sort", sort);
}

const queryString = params.toString();

router.push(
  queryString
    ? `/properties?${queryString}`
    : "/properties"
);


};

return ( <section className="relative overflow-hidden bg-secondary/40"> <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">

    {/* LEFT */}
    <div className="flex flex-col justify-center">

      {/* Badge */}
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-foreground">
        <ShieldCheck className="size-4 text-primary" />
        12,000+ verified rentals
      </span>

      {/* Heading */}
      <h1 className="mt-5 text-pretty text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Find a place you&apos;ll love to call home
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Discover and rent verified properties in minutes.
        RentNest connects tenants with trusted landlords so
        you can search, tour, and move in without the hassle.
      </p>

      {/* PROPERTY SEARCH */}
      <PropertySearch
        location={location}
        category={category}
        price={price}
        availability={availability}
        sort={sort}
        onLocationChange={setLocation}
        onCategoryChange={setCategory}
        onPriceChange={setPrice}
        onAvailabilityChange={setAvailability}
        onSortChange={setSort}
        onSearch={handleSearch}
      />

      {/* STATS */}
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">

        {/* Listings */}
        <div>
          <p className="text-2xl font-extrabold text-foreground">
            12K+
          </p>

          <p className="text-sm text-muted-foreground">
            Listings
          </p>
        </div>

        {/* Tenants */}
        <div>
          <p className="text-2xl font-extrabold text-foreground">
            8K+
          </p>

          <p className="text-sm text-muted-foreground">
            Happy tenants
          </p>
        </div>

        {/* Rating */}
        <div>
          <p className="flex items-center gap-1 text-2xl font-extrabold text-foreground">
            4.9

            <Star className="size-5 fill-primary text-primary" />
          </p>

          <p className="text-sm text-muted-foreground">
            Average rating
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative flex items-center">

      <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-foreground/10 sm:h-[400px] lg:h-[520px]">
        <Image
          src="/properties/hero-home.png"
          alt="Modern luxury home available for rent on RentNest"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Verified Listing Card */}
      <div className="absolute -bottom-5 left-5 hidden max-w-[240px] rounded-2xl border border-border bg-card p-4 shadow-xl sm:block">
        <div className="flex items-center gap-3">

          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ShieldCheck className="size-5" />
          </span>

          <div>
            <p className="text-sm font-bold text-foreground">
              Verified listing
            </p>

            <p className="text-xs text-muted-foreground">
              Every home is screened
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

);
}
