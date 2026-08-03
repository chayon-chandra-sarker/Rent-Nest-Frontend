"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import {
  getAllLandlordRequests,
  updateLandlordRequestStatus,
  type LandlordRequest,
} from "@/service/landlord-request.service";
import LandlordRequestPagination from "./LandlordRequestPagination";

const ITEMS_PER_PAGE = 6;

const LandlordRequestsPage = () => {
  const [requests, setRequests] = useState<LandlordRequest[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllLandlordRequests();

        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch landlord requests:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load landlord requests.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return requests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [requests, currentPage]);

  const handleStatusUpdate = async (
    requestId: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    const request = requests.find((item) => item.id === requestId);

    if (!request) return;

    try {
      setUpdatingId(requestId);

      const updatedRequest = await updateLandlordRequestStatus(
        requestId,
        status,
      );

      setRequests((currentRequests) =>
        currentRequests.map((item) =>
          item.id === updatedRequest.id ? updatedRequest : item,
        ),
      );

      toast.success(
        status === "APPROVED"
          ? "Landlord request approved successfully."
          : "Landlord request rejected successfully.",
      );
    } catch (error) {
      console.error("Failed to update landlord request:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update landlord request.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="size-5 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Landlord Requests
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Review users requesting landlord access.
                </p>
              </div>
            </div>
          </div>

          {!loading && !error && requests.length > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm">
              <span className="size-2 rounded-full bg-primary" />
              {requests.length} {requests.length === 1 ? "Request" : "Requests"}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex min-h-60 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="size-5 animate-spin text-primary" />
              </div>

              <p className="text-sm text-muted-foreground">
                Loading landlord requests...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <XCircle className="mx-auto size-9 text-red-500/70" />

            <h2 className="mt-3 font-bold text-red-500">
              Failed to load requests
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && requests.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="size-6 text-primary" />
            </div>

            <h2 className="mt-4 text-lg font-bold">No landlord requests</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no landlord requests to review.
            </p>
          </div>
        )}

        {/* Requests */}
        {!loading && !error && requests.length > 0 && (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {paginatedRequests.map((request) => {
                const isUpdating = updatingId === request.id;
                const isPending = request.status === "PENDING";

                return (
                  <article
                    key={request.id}
                    className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        {request.user.image ? (
                          <Image
                            src={request.user.image}
                            alt={request.user.name}
                            width={40}
                            height={40}
                            className="size-10 shrink-0 rounded-lg object-cover ring-2 ring-primary/10"
                          />
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <UserRound className="size-4.5" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-bold">
                            {request.user.name}
                          </h2>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Landlord request
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold ${
                          request.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : request.status === "APPROVED"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    {/* User Information */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {/* Email */}
                      <div className="flex min-w-0 items-center gap-1.5">
                        <Mail className="size-3.5 shrink-0 text-primary" />

                        <span className="truncate text-[11px] text-muted-foreground">
                          {request.user.email}
                        </span>
                      </div>

                      {/* Phone */}
                      {request.user.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="size-3.5 shrink-0 text-primary" />

                          <span className="text-[11px] text-muted-foreground">
                            {request.user.phone}
                          </span>
                        </div>
                      )}

                      {/* Address */}
                      {request.user.address && (
                        <div className="flex min-w-0 items-center gap-1.5">
                          <MapPin className="size-3.5 shrink-0 text-primary" />

                          <span className="truncate text-[11px] text-muted-foreground">
                            {request.user.address}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="mt-3 border-t border-border pt-2.5">
                      <p className="text-[10px] text-muted-foreground">
                        Requested{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    {isPending ? (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {/* Approve */}
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(request.id, "APPROVED")
                          }
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isUpdating ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="size-3.5" />
                          )}
                          Approve
                        </button>

                        {/* Reject */}
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(request.id, "REJECTED")
                          }
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 px-3 text-xs font-bold text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isUpdating ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <XCircle className="size-3.5" />
                          )}
                          Reject
                        </button>
                      </div>
                    ) : (
                      /* Completed Status */
                      <div className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-center">
                        <p className="text-[11px] font-semibold capitalize">
                          Request {request.status.toLowerCase()}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <LandlordRequestPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default LandlordRequestsPage;
