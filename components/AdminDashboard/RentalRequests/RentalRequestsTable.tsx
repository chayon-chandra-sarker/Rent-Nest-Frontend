"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
  BedDouble,
  Bath,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getAllRentalRequests,
  RentalRequest,
} from "@/service/rental-request.service";

const ITEMS_PER_PAGE = 6;

const RentalRequestsTable = () => {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllRentalRequests();

        setRequests(data);
      } catch (error) {
        console.error("Fetch rental requests error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch rental requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentRequests = requests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // STATUS
  // ==========================================

  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return {
          label: "Approved",
          className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
          dot: "bg-emerald-500",
          icon: <CheckCircle2 className="size-4" />,
        };

      case "REJECTED":
        return {
          label: "Rejected",
          className:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
          dot: "bg-red-500",
          icon: <XCircle className="size-4" />,
        };

      default:
        return {
          label: "Pending",
          className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
          dot: "bg-amber-500",
          icon: <Clock3 className="size-4" />,
        };
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading rental requests...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-12 shadow-sm">
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

  return (
    <section className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-border/60 px-5 py-6 sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Home className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Rental Requests
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Review and monitor tenant rental applications.
              </p>
            </div>
          </div>

          <div className="w-fit rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">
              Total Requests
            </p>

            <p className="text-lg font-bold text-primary">
              {requests.length}
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          EMPTY
      ========================================== */}

      {requests.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Home className="size-7 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-bold">No rental requests</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are currently no rental requests available.
          </p>
        </div>
      ) : (
        <>
          {/* ==========================================
              DESKTOP TABLE
          ========================================== */}

          <div className="hidden overflow-x-auto xl:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20">
                  <th className="px-7 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Tenant
                  </th>

                  <th className="px-7 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Property
                  </th>

                  <th className="px-7 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Monthly Rent
                  </th>

                  <th className="px-7 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Requested
                  </th>

                  <th className="px-7 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentRequests.map((request) => {
                  const status = getStatusConfig(request.status);

                  return (
                    <tr
                      key={request.id}
                      className="border-b border-border/50 transition hover:bg-muted/20 last:border-0"
                    >
                      {/* TENANT */}

                      <td className="px-7 py-6 align-top">
                        <div className="flex min-w-[230px] items-start gap-3">
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <User className="size-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {request.tenant.name}
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <Mail className="size-3.5 text-muted-foreground" />

                              <span className="truncate text-xs text-muted-foreground">
                                {request.tenant.email}
                              </span>
                            </div>

                            {request.tenant.phone && (
                              <div className="mt-1.5 flex items-center gap-2">
                                <Phone className="size-3.5 text-muted-foreground" />

                                <span className="text-xs text-muted-foreground">
                                  {request.tenant.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* PROPERTY */}

                      <td className="px-7 py-6 align-top">
                        <div className="min-w-[260px]">
                          <p className="truncate text-sm font-bold">
                            {request.property.title}
                          </p>

                          <div className="mt-2 flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />

                            <span className="truncate text-xs text-muted-foreground">
                              {request.property.location}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-semibold">
                              {request.property.category.name}
                            </span>

                            <span className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[11px] font-semibold">
                              <BedDouble className="size-3" />
                              {request.property.bedrooms}
                            </span>

                            <span className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[11px] font-semibold">
                              <Bath className="size-3" />
                              {request.property.bathrooms}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* RENT */}

                      <td className="px-7 py-6 align-top">
                        <p className="text-base font-extrabold text-primary">
                          ৳
                          {Number(
                            request.property.price
                          ).toLocaleString()}
                        </p>

                        <p className="mt-1 text-[11px] text-muted-foreground">
                          per month
                        </p>
                      </td>

                      {/* DATE */}

                      <td className="px-7 py-6 align-top">
                        <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2.5">
                          <CalendarDays className="size-4 text-muted-foreground" />

                          <span className="whitespace-nowrap text-xs font-semibold">
                            {formatDate(request.requestedAt)}
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-7 py-6 align-top">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${status.dot}`}
                          />

                          {status.icon}

                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ==========================================
              MOBILE / TABLET CARDS
          ========================================== */}

          <div className="grid gap-7 p-5 sm:gap-8 sm:p-7 xl:hidden">
            {currentRequests.map((request) => {
              const status = getStatusConfig(request.status);

              return (
                <article
                  key={request.id}
                  className="group overflow-hidden rounded-3xl border border-border/70 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ==============================
                      TENANT HEADER
                  ============================== */}

                  <div className="border-b border-border/60 bg-card p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <User className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate text-base font-bold sm:text-lg">
                            {request.tenant.name}
                          </h2>

                          <div className="mt-2 flex items-center gap-2">
                            <Mail className="size-3.5 shrink-0 text-muted-foreground" />

                            <span className="truncate text-xs text-muted-foreground sm:text-sm">
                              {request.tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold ${status.className}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${status.dot}`}
                        />

                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* ==============================
                      PROPERTY
                  ============================== */}

                  <div className="p-5 sm:p-6">
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Home className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold sm:text-base">
                            {request.property.title}
                          </p>

                          <div className="mt-2 flex items-center gap-1.5">
                            <MapPin className="size-3.5 shrink-0 text-primary" />

                            <span className="truncate text-xs text-muted-foreground sm:text-sm">
                              {request.property.location}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-background px-3 py-1.5 text-[10px] font-bold shadow-sm">
                              {request.property.category.name}
                            </span>

                            <span className="flex items-center gap-1 rounded-lg bg-background px-3 py-1.5 text-[10px] font-bold shadow-sm">
                              <BedDouble className="size-3" />

                              {request.property.bedrooms} Beds
                            </span>

                            <span className="flex items-center gap-1 rounded-lg bg-background px-3 py-1.5 text-[10px] font-bold shadow-sm">
                              <Bath className="size-3" />

                              {request.property.bathrooms} Baths
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ==============================
                        DETAILS
                    ============================== */}

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Monthly Rent
                        </p>

                        <p className="mt-2 text-lg font-extrabold text-primary">
                          ৳
                          {Number(
                            request.property.price
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Requested
                        </p>

                        <div className="mt-2 flex items-center gap-1.5">
                          <CalendarDays className="size-3.5 text-primary" />

                          <p className="text-xs font-bold">
                            {formatDate(request.requestedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PHONE */}

                    {request.tenant.phone && (
                      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                          <Phone className="size-4 text-primary" />
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Phone
                          </p>

                          <span className="text-xs font-semibold">
                            {request.tenant.phone}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* ==========================================
              PAGINATION
          ========================================== */}

          {totalPages > 1 && (
            <div className="mt-2 border-t border-border/60 px-5 py-6 sm:px-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Showing */}

                <p className="text-center text-xs font-medium text-muted-foreground sm:text-left">
                  Showing{" "}
                  <span className="font-bold text-foreground">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-foreground">
                    {Math.min(endIndex, requests.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-foreground">
                    {requests.length}
                  </span>{" "}
                  requests
                </p>

                {/* Controls */}

                <div className="flex items-center justify-center gap-2">
                  {/* Previous */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4" />

                    <span className="hidden sm:inline">
                      Previous
                    </span>
                  </button>

                  {/* Page Numbers */}

                  <div className="flex items-center gap-1.5">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => {
                        const page = index + 1;

                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() =>
                              handlePageChange(page)
                            }
                            className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Next */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(currentPage + 1)
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">
                      Next
                    </span>

                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RentalRequestsTable;