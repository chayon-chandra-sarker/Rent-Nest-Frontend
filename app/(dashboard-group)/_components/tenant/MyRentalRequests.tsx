
"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  XCircle,
  Banknote,
  CircleCheck,
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


  const formatDateTime = (date: string | null) => {
    if (!date) return "Not approved yet";

    return new Date(date).toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-10 shadow-sm">
        <div className="flex min-h-[350px] flex-col items-center justify-center">
          <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading your rental requests...
          </p>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-10 shadow-sm">
        <div className="mx-auto flex min-h-[300px] max-w-md flex-col items-center justify-center text-center">
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

  return (
    <section className="space-y-6">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Rental Requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your rental requests and their current status.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-primary/10 bg-primary/5 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Total Requests
          </p>

          <p className="text-xl font-bold text-primary">
            {rentals.length}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {rentals.map((rental) => {
          const status = getStatusConfig(rental.status);

          return (
            <article
              key={rental.id}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
            >
    
              <div className="border-b border-border/60 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Property Info */}

                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      <Building2 className="size-6" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold sm:text-lg">
                        {rental.property.title}
                      </h2>

                      <div className="mt-2 flex items-center gap-1.5">
                        <MapPin className="size-4 shrink-0 text-primary" />

                        <span className="truncate text-sm text-muted-foreground">
                          {rental.property.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}

                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                  >
                    {status.icon}

                    {status.label}
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Monthly Rent */}

                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2">
                      <Banknote className="size-4 text-primary" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Monthly Rent
                      </p>
                    </div>

                    <p className="mt-2 text-xl font-extrabold text-primary">
                      ৳
                      {Number(
                        rental.property.price
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* Property Availability */}

                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2">
                      <CircleCheck className="size-4 text-primary" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Property Status
                      </p>
                    </div>

                    <p
                      className={`mt-2 text-sm font-bold ${
                        rental.property.isAvailable
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {rental.property.isAvailable
                        ? "Available"
                        : "Currently Rented"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Requested At */}

                  <div className="rounded-2xl border border-border/60 p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-primary" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Requested At
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold leading-6">
                      {formatDateTime(rental.requestedAt)}
                    </p>
                  </div>

                  {/* Approved At */}

                  <div className="rounded-2xl border border-border/60 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500" />

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Approved At
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold leading-6">
                      {formatDateTime(rental.approvedAt)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/30 px-4 py-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Request ID
                    </span>

                    <span className="break-all text-xs font-medium text-foreground/70 sm:text-right">
                      {rental.id}
                    </span>
                  </div>
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

