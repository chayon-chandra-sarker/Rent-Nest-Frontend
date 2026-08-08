
"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import CategoryCard from "./CategoryCard";
import {
  getPublicCategories,
  type PublicCategory,
} from "@/service/public-category.service";

const PopularCategories = () => {
  const [categories, setCategories] = useState<
    PublicCategory[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error,
        );

        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section
      id="categories"
      className="border-b border-border/50 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-primary">
              Explore
            </p>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
              Popular Categories
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Explore different types of rental spaces and
              find the one that fits your lifestyle.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
          >
            Browse properties

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-border/60 bg-card">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Loader2 className="size-5 animate-spin text-primary" />

              Loading categories...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
            <h3 className="text-lg font-bold text-foreground">
              Unable to load categories
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        )}

        {/* Dynamic Categories */}
        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          )}

        {/* Empty */}
        {!loading &&
          !error &&
          categories.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <h3 className="text-lg font-bold text-foreground">
                No categories available
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Categories will appear here once they are
                available.
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

export default PopularCategories;

