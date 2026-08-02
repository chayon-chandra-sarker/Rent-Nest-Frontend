"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  User,
  XCircle,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getLandlordRentalRequests, RentalRequest, updateRentalRequest } from "@/service/rental-request.service";


const RentalRequestsPage = () => {
  const queryClient = useQueryClient();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // =========================
  // GET LANDLORD REQUESTS
  // =========================

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery<RentalRequest[]>({
    queryKey: ["landlord-rental-requests"],
    queryFn: getLandlordRentalRequests,
  });

  // =========================
  // UPDATE REQUEST
  // =========================

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "APPROVED" | "REJECTED";
    }) => updateRentalRequest(id, status),

    onMutate: ({ id }) => {
      setUpdatingId(id);
    },

    onSuccess: (_, variables) => {
      toast.success(
        variables.status === "APPROVED"
          ? "Rental request approved successfully"
          : "Rental request rejected successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["landlord-rental-requests"],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update rental request"
      );
    },

    onSettled: () => {
      setUpdatingId(null);
    },
  });

  // =========================
  // HANDLE UPDATE
  // =========================

  const handleUpdate = (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    if (updateMutation.isPending) return;

    updateMutation.mutate({
      id,
      status,
    });
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            Loading rental requests...
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <XCircle className="mx-auto size-12 text-red-500/60" />

            <h2 className="mt-4 text-xl font-bold text-red-500">
              Failed to load rental requests
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (requests.length === 0) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Landlord Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Rental Requests
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage rental requests from tenants.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-border p-12 text-center">
            <Clock3 className="mx-auto size-12 text-muted-foreground/40" />

            <h2 className="mt-4 text-xl font-bold">
              No Rental Requests
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You don&apos;t have any rental requests yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Landlord Dashboard
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Rental Requests
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Review and manage tenant rental requests.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">
                Total Requests:
              </span>{" "}
              <span className="font-bold">
                {requests.length}
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            REQUEST GRID
        ========================= */}

        <div className="grid gap-6 lg:grid-cols-2">
          {requests.map((request) => {
            const isUpdating =
              updatingId === request.id;

            return (
              <article
                key={request.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg"
              >
                {/* =========================
                    PROPERTY IMAGE
                ========================= */}

                <div className="relative aspect-[16/7] overflow-hidden bg-primary/5">
                  {request.property.image ? (
                    <Image
                      src={request.property.image}
                      alt={request.property.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="size-7 text-primary/50" />
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground">
                          No property image
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status */}

                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur ${
                      request.status === "PENDING"
                        ? "bg-amber-500/90 text-white"
                        : request.status === "APPROVED"
                          ? "bg-emerald-500/90 text-white"
                          : request.status === "REJECTED"
                            ? "bg-red-500/90 text-white"
                            : request.status === "ACTIVE"
                              ? "bg-blue-500/90 text-white"
                              : "bg-gray-500/90 text-white"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                {/* =========================
                    CONTENT
                ========================= */}

                <div className="p-5">
                  {/* Property */}

                  <div>
                    <h2 className="text-xl font-bold">
                      {request.property.title}
                    </h2>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 text-primary" />
                      {request.property.location}
                    </p>
                  </div>

                  {/* Price */}

                  <div className="mt-4">
                    <span className="text-xl font-extrabold">
                      ৳
                      {Number(
                        request.property.price
                      ).toLocaleString()}
                    </span>

                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>

                  {/* =========================
                      TENANT
                  ========================= */}

                  <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Tenant Information
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                        {request.tenant.image ? (
                          <Image
                            src={request.tenant.image}
                            alt={request.tenant.name}
                            width={44}
                            height={44}
                            className="size-full object-cover"
                          />
                        ) : (
                          <User className="size-5 text-primary" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold">
                          {request.tenant.name}
                        </p>

                        <p className="truncate text-sm text-muted-foreground">
                          {request.tenant.email}
                        </p>

                        {request.tenant.phone && (
                          <p className="text-xs text-muted-foreground">
                            {request.tenant.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      REQUEST INFO
                  ========================= */}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border p-3">
                      <p className="text-xs text-muted-foreground">
                        Requested
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {new Date(
                          request.requestedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border p-3">
                      <p className="text-xs text-muted-foreground">
                        Property Status
                      </p>

                      <p
                        className={`mt-1 text-sm font-semibold ${
                          request.property.isAvailable
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {request.property.isAvailable
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </div>
                  </div>

                  {/* =========================
                      ACTIONS
                  ========================= */}

                  {request.status === "PENDING" && (
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdate(
                            request.id,
                            "REJECTED"
                          )
                        }
                        disabled={isUpdating}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 text-sm font-bold text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isUpdating &&
                        updateMutation.variables
                          ?.status === "REJECTED" ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <XCircle className="size-4" />
                        )}

                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdate(
                            request.id,
                            "APPROVED"
                          )
                        }
                        disabled={isUpdating}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isUpdating &&
                        updateMutation.variables
                          ?.status === "APPROVED" ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="size-4" />
                        )}

                        Approve
                      </button>
                    </div>
                  )}

                  {/* Approved */}

                  {request.status === "APPROVED" && (
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-5" />
                      Rental Request Approved
                    </div>
                  )}

                  {/* Rejected */}

                  {request.status === "REJECTED" && (
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500">
                      <XCircle className="size-5" />
                      Rental Request Rejected
                    </div>
                  )}

                  {/* Active */}

                  {request.status === "ACTIVE" && (
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-500">
                      <CheckCircle2 className="size-5" />
                      Rental is Active
                    </div>
                  )}

                  {/* Completed */}

                  {request.status === "COMPLETED" && (
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-bold text-muted-foreground">
                      Rental Completed
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default RentalRequestsPage;