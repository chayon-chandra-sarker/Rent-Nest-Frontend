"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FolderOpen,
  Home,
  CalendarDays,
} from "lucide-react";

import {
  getAllCategories,
  type Category,
} from "@/service/category.service";

const CategoriesTable = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: getAllCategories,
  });

  // Loading
  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Loading categories...
        </p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="font-medium text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load categories"}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Property Categories
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View all property categories and their properties.
          </p>
        </div>

        <div className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {categories.length} Categories
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Properties
              </th>

              <th className="px-6 py-4">
                Created
              </th>

              <th className="px-6 py-4">
                Updated
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b last:border-b-0 transition hover:bg-muted/20"
              >
                {/* Category */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FolderOpen className="size-5" />
                    </div>

                    <div>
                      <p className="font-semibold capitalize">
                        {category.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Category
                      </p>
                    </div>
                  </div>
                </td>

                {/* Properties Count */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-muted-foreground" />

                    <span className="font-semibold">
                      {category._count.properties}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {category._count.properties === 1
                        ? "Property"
                        : "Properties"}
                    </span>
                  </div>
                </td>

                {/* Created */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />

                    {new Date(
                      category.createdAt
                    ).toLocaleDateString()}
                  </div>
                </td>

                {/* Updated */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />

                    {new Date(
                      category.updatedAt
                    ).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y md:hidden">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-5"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderOpen className="size-5" />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold capitalize">
                  {category.name}
                </h3>

                <p className="text-xs text-muted-foreground">
                  Property Category
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Properties */}
              <div className="rounded-xl bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Home className="size-4" />

                  <span className="text-xs">
                    Properties
                  </span>
                </div>

                <p className="mt-1 text-lg font-bold">
                  {category._count.properties}
                </p>
              </div>

              {/* Created */}
              <div className="rounded-xl bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4" />

                  <span className="text-xs">
                    Created
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold">
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {categories.length === 0 && (
        <div className="p-10 text-center">
          <FolderOpen className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No categories found
          </p>
        </div>
      )}
    </section>
  );
};

export default CategoriesTable;