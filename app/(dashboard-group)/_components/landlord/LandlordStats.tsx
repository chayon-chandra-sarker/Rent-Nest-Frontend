"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  CircleOff,
  Loader2,
} from "lucide-react";

import {
  getLandlordProperties,
  LandlordProperty,
} from "@/service/landlord-property.service";

const LandlordStats = () => {
  const [properties, setProperties] = useState<
    LandlordProperty[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await getLandlordProperties();

        setProperties(data);
      } catch (error) {
        console.error(
          "Failed to load landlord stats:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const totalProperties = properties.length;

  const availableProperties = properties.filter(
    (property) => property.isAvailable
  ).length;

  const unavailableProperties =
    properties.filter(
      (property) => !property.isAvailable
    ).length;

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-3xl border border-border/60 bg-card">
        <Loader2 className="size-5 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      icon: Building2,
      description: "All your properties",
    },
    {
      title: "Available",
      value: availableProperties,
      icon: CheckCircle2,
      description: "Currently available",
    },
    {
      title: "Unavailable",
      value: unavailableProperties,
      icon: CircleOff,
      description: "Currently unavailable",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <p className="mt-1 text-3xl font-bold">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LandlordStats;