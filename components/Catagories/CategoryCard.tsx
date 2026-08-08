import type { PublicCategory } from "@/service/public-category.service";
import {
  ArrowUpRight,
  Building2,
  DoorOpen,
  House,
  Palmtree,
  SquareParking,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

type CategoryCardProps = {
  category: PublicCategory;
};

type IconComponent = ComponentType<{
  className?: string;
}>;

const categoryIcons: Record<string, IconComponent> = {
  villa: Palmtree,
  home: House,
  apartment: Building2,
  parking: SquareParking,
  house: DoorOpen,
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const propertyCount = category._count.properties;

  const categoryName = category.name.trim().toLowerCase();

  // Get unique icon for each category
  const Icon = categoryIcons[categoryName] ?? Building2;

  return (
    <Link
      href={`/properties?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
    >
      {/* Hover Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        {/* Icon + Arrow */}
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </div>

          <div className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {category.name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {propertyCount}{" "}
            {propertyCount === 1 ? "Property" : "Properties"} available
          </p>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 h-px w-full bg-border/60">
          <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>

        {/* CTA */}
        <p className="mt-4 text-sm font-semibold text-primary">
          Explore category
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;