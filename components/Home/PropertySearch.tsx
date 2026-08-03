
"use client";

import {
  MapPin,
  Building2,
  DollarSign,
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface PropertySearchProps {
  location: string;
  category: string;
  price: string;
  availability: string;
  sort: string;

  onLocationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onSearch: () => void;
}

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

const PropertySearch = ({
  location,
  category,
  price,
  availability,
  sort,
  onLocationChange,
  onCategoryChange,
  onPriceChange,
  onAvailabilityChange,
  onSortChange,
  onSearch,
}: PropertySearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {/* Location */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Location
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <MapPin className="size-4 shrink-0 text-primary" />

            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="City or area"
              className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </span>
        </label>

        {/* Category */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Category
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <Building2 className="size-4 shrink-0 text-primary" />

            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* Price */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Price range
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <DollarSign className="size-4 shrink-0 text-primary" />

            <select
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
            >
              {priceRanges.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* Availability */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Availability
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <SlidersHorizontal className="size-4 shrink-0 text-primary" />

            <select
              value={availability}
              onChange={(e) =>
                onAvailabilityChange(e.target.value)
              }
              className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
            >
              <option value="all">
                All properties
              </option>

              <option value="available">
                Available only
              </option>

              <option value="rented">
                Rented only
              </option>
            </select>
          </span>
        </label>

        {/* Sort */}
        <label className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Sort by
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <SlidersHorizontal className="size-4 shrink-0 text-primary" />

            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none"
            >
              <option value="default">
                Recommended
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="newest">
                Newest first
              </option>
            </select>
          </span>
        </label>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
      >
        <Search className="size-4" />
        Search properties
      </button>
    </form>
  );
};

export default PropertySearch;

