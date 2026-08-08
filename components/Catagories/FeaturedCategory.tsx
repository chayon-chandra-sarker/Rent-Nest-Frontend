"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  DoorOpen,
  House,
  Palmtree,
  SquareParking,
} from "lucide-react";
import Link from "next/link";

import {
  getPublicCategories,
  type PublicCategory,
} from "@/service/public-category.service";

const categoryIcons = {
  villa: Palmtree,
  home: House,
  apartment: Building2,
  parking: SquareParking,
  house: DoorOpen,
};

const categoryDescriptions = {
  villa:
    "Spacious and luxurious properties for a premium living experience.",
  home:
    "Comfortable homes designed for everyday living and relaxation.",
  apartment:
    "Modern apartments perfect for comfortable city living.",
  parking:
    "Secure and convenient parking spaces for your vehicle.",
  house:
    "Private houses offering comfort, space, and privacy.",
};

const FeaturedCategories = () => {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getPublicCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Featured Categories
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore our{" "}
            <span className="text-primary">
              featured categories
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Discover the perfect property type that matches your
            lifestyle and needs.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => {
            const categoryName =
              category.name.trim().toLowerCase();

            const Icon =
              categoryIcons[
                categoryName as keyof typeof categoryIcons
              ] ?? Building2;

            const description =
              categoryDescriptions[
                categoryName as keyof typeof categoryDescriptions
              ] ??
              "Explore quality properties available in this category.";

            const propertyCount =
              category._count.properties;

            return (
              <Link
                key={category.id}
                href={`/properties?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </div>

                    <div className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {category.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  {/* Property Count */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-sm text-muted-foreground">
                      Available properties
                    </span>

                    <span className="font-semibold text-primary">
                      {propertyCount}
                    </span>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-4 h-px w-full bg-border/60">
                    <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;