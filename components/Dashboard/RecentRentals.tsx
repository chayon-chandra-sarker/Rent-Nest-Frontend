"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  XCircle,
} from "lucide-react";

import { MyRentalRequest } from "@/service/rental.service";

interface RecentRentalsProps {
  rentalRequests: MyRentalRequest[];
  loading: boolean;
}

const RecentRentals = ({
  rentalRequests,
  loading,
}: RecentRentalsProps) => {
  const rentals = rentalRequests.slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatus = (
    status: MyRentalRequest["status"]
  ) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Approved",
          className:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          icon: <CheckCircle2 className="size-3.5" />,
        };

      case "REJECTED":
        return {
          label: "Rejected",
          className:
            "bg-red-500/10 text-red-600 dark:text-red-400",
          icon: <XCircle className="size-3.5" />,
        };

      default:
        return {
          label: "Pending",
          className:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          icon: <Clock3 className="size-3.5" />,
        };
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">
            Recent Rentals
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest rental requests
          </p>
        </div>

        <Building2 className="size-5 text-muted-foreground" />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-5 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-muted/50"
            />
          ))}
        </div>
      ) : rentals.length === 0 ? (
        /* Empty */
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
            <Building2 className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-sm font-medium">
            No rental requests yet
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your rental activity will appear here.
          </p>
        </div>
      ) : (
        /* Rentals */
        <div className="mt-5 space-y-3">
          {rentals.map((rental) => {
            const status = getStatus(rental.status);

            return (
              <div
                key={rental.id}
                className="rounded-xl border border-border/60 p-4 transition hover:bg-muted/20"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">

                  {/* Property */}
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      {rental.property.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />

                      <span className="truncate">
                        {rental.property.location}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${status.className}`}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </div>

                {/* Bottom */}
                <div className="mt-3 flex items-center justify-between">

                  {/* Price */}
                  <div>
                    <span className="text-sm font-bold text-primary">
                      ৳
                      {Number(
                        rental.property.price
                      ).toLocaleString()}
                    </span>

                    <span className="ml-1 text-[10px] text-muted-foreground">
                      / month
                    </span>
                  </div>

                  {/* Requested date */}
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <CalendarDays className="size-3.5" />

                    {formatDate(rental.requestedAt)}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentRentals;