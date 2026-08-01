"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  XCircle,
} from "lucide-react";

import {
  getMyRentalRequests,
  MyRentalRequest,
} from "@/service/rental.service";

const MyRentalRequests = () => {
  const [rentals, setRentals] = useState<MyRentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyRentalRequests();

        setRentals(data);
      } catch (error) {
        console.error("Fetch my rental requests error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch rental requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // =========================
  // STATUS CONFIG
  // =========================

  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return {
          label: "Approved",
          className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
          icon: <CheckCircle2 className="size-4" />,
        };

      case "REJECTED":
        return {
          label: "Rejected",
          className:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
          icon: <XCircle className="size-4" />,
        };

      default:
        return {
          label: "Pending",
          className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
          icon: <Clock3 className="size-4" />,
        };
    }
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date: string | null) => {
    if (!date) return "Not approved yet";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-10 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading your rental requests...
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-10 shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <XCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Failed to load rental requests
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (rentals.length === 0) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
          <Building2 className="size-7 text-muted-foreground" />
        </div>

        <h2 className="mt-5 text-lg font-bold">
          No rental requests
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          You have not submitted any rental requests yet.
        </p>
      </section>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            My Rental Requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track the status of your rental requests.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-primary/10 bg-primary/5 px-4 py-2">
          <p className="text-xs text-muted-foreground">
            Total Requests
          </p>

          <p className="text-lg font-bold text-primary">
            {rentals.length}
          </p>
        </div>
      </div>

      {/* Rental Cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {rentals.map((rental) => {
          const status = getStatusConfig(rental.status);

          return (
            <article
              key={rental.id}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="border-b border-border/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Building2 className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold">
                        {rental.property.title}
                      </h2>

                      <div className="mt-1.5 flex items-center gap-1.5">
                        <MapPin className="size-3.5 shrink-0 text-primary" />

                        <span className="truncate text-xs text-muted-foreground">
                          {rental.property.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold ${status.className}`}
                  >
                    {status.icon}

                    {status.label}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-4 p-5">
                {/* Price */}
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Monthly Rent
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-primary">
                    ৳{Number(
                      rental.property.price
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Dates */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Requested */}
                  <div className="rounded-xl border border-border/60 p-3.5">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-primary" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Requested
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold">
                      {formatDate(rental.requestedAt)}
                    </p>
                  </div>

                  {/* Approved */}
                  <div className="rounded-xl border border-border/60 p-3.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Approved
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold">
                      {formatDate(rental.approvedAt)}
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Property Status
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      rental.property.isAvailable
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {rental.property.isAvailable
                      ? "Available"
                      : "Currently Rented"}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MyRentalRequests;