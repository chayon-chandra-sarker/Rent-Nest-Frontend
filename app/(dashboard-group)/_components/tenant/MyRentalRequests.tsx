"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  XCircle,
  Banknote,
  CircleCheck,
  Loader2,
  Activity,
  BadgeCheck,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import {
  getMyRentalRequests,
  MyRentalRequest,
} from "@/service/rental.service";

const MyRentalRequests = () => {

  const {
    data: rentals = [],
    isLoading,
    isError,
    error,
  } = useQuery<MyRentalRequest[]>({
    queryKey: ["my-rental-requests"],
    queryFn: getMyRentalRequests,
  });

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

      case "ACTIVE":
        return {
          label: "Active",
          className:
            "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
          icon: <Activity className="size-4" />,
        };

      case "COMPLETED":
        return {
          label: "Completed",
          className:
            "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400",
          icon: <BadgeCheck className="size-4" />,
        };

      case "PENDING":
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

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-10 shadow-sm">
        <div className="flex min-h-[350px] flex-col items-center justify-center">
          <Loader2 className="size-9 animate-spin text-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading your rental requests...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
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
            {error instanceof Error
              ? error.message
              : "Failed to fetch rental requests"}
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
                  {/* Property */}

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

                    <p className="mt-1 text-xs text-muted-foreground">
                      per month
                    </p>
                  </div>

                  {/* Property Status */}

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
                      {formatDateTime(
                        rental.requestedAt
                      )}
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
                      {formatDateTime(
                        rental.approvedAt
                      )}
                    </p>
                  </div>
                </div>

                {rental.status === "PENDING" && (
                  <div className="rounded-2xl bg-amber-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                      <Clock3 className="size-4" />
                      Waiting for landlord approval.
                    </div>
                  </div>
                )}

                {rental.status === "APPROVED" && (
                  <div className="rounded-2xl bg-emerald-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-4" />
                      Your rental request has been approved.
                    </div>
                  </div>
                )}

                {rental.status === "REJECTED" && (
                  <div className="rounded-2xl bg-red-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                      <XCircle className="size-4" />
                      Your rental request was rejected.
                    </div>
                  </div>
                )}

                {rental.status === "ACTIVE" && (
                  <div className="rounded-2xl bg-blue-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <Activity className="size-4" />
                      Your rental is currently active.
                    </div>
                  </div>
                )}

                {rental.status === "COMPLETED" && (
                  <div className="rounded-2xl bg-purple-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                      <BadgeCheck className="size-4" />
                      This rental has been completed.
                    </div>
                  </div>
                )}

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