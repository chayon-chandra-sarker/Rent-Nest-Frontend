"use client";

import type React from "react";
import { useState } from "react";
import {
  MapPin,
  Building2,
  DollarSign,
  Search,
  Star,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

const categories = [
  "Any type",
  "Apartment",
  "House",
  "Villa",
  "Studio",
  "Loft",
  "Condo",
];
const priceRanges = [
  "Any price",
  "$500 – $1,000",
  "$1,000 – $2,000",
  "$2,000 – $3,500",
  "$3,500+",
];

export function Hero() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState(priceRanges[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("[v0] Search submitted:", { location, category, price });
  }

  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-foreground">
            <ShieldCheck className="size-4 text-primary" />
            12,000+ verified rentals
          </span>

          <h1 className="mt-5 text-pretty text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find a place you&apos;ll love to call home
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Discover and rent verified properties in minutes. RentNest connects
            tenants with trusted landlords so you can search, tour, and move in
            without the hassle.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/5"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Location
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                  <MapPin className="size-4 shrink-0 text-primary" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or area"
                    className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Category
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                  <Building2 className="size-4 shrink-0 text-primary" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Price range
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                  <DollarSign className="size-4 shrink-0 text-primary" />
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
                  >
                    {priceRanges.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Search className="size-4" />
              Search properties
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-2xl font-extrabold text-foreground">12K+</p>
              <p className="text-sm text-muted-foreground">Listings</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-foreground">8K+</p>
              <p className="text-sm text-muted-foreground">Happy tenants</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-2xl font-extrabold text-foreground">
                4.9
                <Star className="size-5 fill-primary text-primary" />
              </p>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-foreground/10 sm:h-[400px] lg:h-[520px]">
            <Image
              src="/properties/hero-home.png"
              alt="Modern luxury home available for rent on RentNest"
              fill
              priority
              className="object-cover"
            />
          </div>
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
