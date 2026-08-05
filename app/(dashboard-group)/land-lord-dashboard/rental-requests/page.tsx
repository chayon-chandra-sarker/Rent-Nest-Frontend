
"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  XCircle,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getLandlordRentalRequests,
  RentalRequest,
  updateRentalRequest,
} from "@/service/rental-request.service";

const RentalRequestsPage = () => {
  const queryClient = useQueryClient();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery<RentalRequest[]>({
    queryKey: ["landlord-rental-requests"],
    queryFn: getLandlordRentalRequests,
  });

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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-4 sm:p-6">
        <div className="mx-auto flex min-h-[300px] max-w-7xl items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            Loading rental requests...
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-background p-4 sm:p-6">
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

  if (requests.length === 0) {
    return (
      <main className="min-h-screen bg-background p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              Landlord Dashboard
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Rental Requests
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Review and manage tenant rental requests.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-border p-10 text-center">
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

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Landlord Dashboard
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Rental Requests
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Review and manage tenant rental requests.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">
                Total Requests:
              </span>{" "}
              <span className="font-bold">
                {requests.length}
              </span>
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              {/* TABLE HEAD */}

              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Property
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Tenant
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Price
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Requested
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Property
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Request
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-border">
                {requests.map((request) => {
                  const isUpdating =
                    updatingId === request.id;

                  return (
                    <tr
                      key={request.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      {/* PROPERTY */}

                      <td className="px-5 py-4">
                        <div className="max-w-[220px]">
                          <p className="truncate font-bold">
                            {request.property.title}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3.5 shrink-0 text-primary" />

                            <span className="truncate">
                              {request.property.location}
                            </span>
                          </p>
                        </div>
                      </td>

                      {/* TENANT */}

                      <td className="px-5 py-4">
                        <div className="max-w-[180px]">
                          <p className="truncate text-sm font-semibold">
                            {request.tenant.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {request.tenant.email}
                          </p>

                          {request.tenant.phone && (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {request.tenant.phone}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* PRICE */}

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="font-bold">
                          ৳
                          {Number(
                            request.property.price
                          ).toLocaleString()}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          / month
                        </p>
                      </td>

                      {/* REQUESTED DATE */}

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="text-sm font-medium">
                          {new Date(
                            request.requestedAt
                          ).toLocaleDateString()}
                        </p>
                      </td>

                      {/* PROPERTY STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            request.property.isAvailable
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {request.property.isAvailable
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </td>

                      {/* REQUEST STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            request.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-500"
                              : request.status === "APPROVED"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : request.status === "REJECTED"
                                  ? "bg-red-500/10 text-red-500"
                                  : request.status === "ACTIVE"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {request.status === "PENDING" ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdate(
                                    request.id,
                                    "REJECTED"
                                  )
                                }
                                disabled={isUpdating}
                                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/5 px-3 text-xs font-bold text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUpdating &&
                                updateMutation.variables
                                  ?.status ===
                                  "REJECTED" ? (
                                  <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                  <XCircle className="size-3.5" />
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
                                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUpdating &&
                                updateMutation.variables
                                  ?.status ===
                                  "APPROVED" ? (
                                  <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="size-3.5" />
                                )}

                                Approve
                              </button>
                            </>
                          ) : request.status === "APPROVED" ? (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="size-3.5" />
                              Approved
                            </span>
                          ) : request.status === "REJECTED" ? (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500">
                              <XCircle className="size-3.5" />
                              Rejected
                            </span>
                          ) : request.status === "ACTIVE" ? (
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-500">
                              <CheckCircle2 className="size-3.5" />
                              Active
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-muted-foreground">
                              Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE NOTE */}

        <p className="mt-3 text-xs text-muted-foreground sm:hidden">
          Swipe horizontally to view all rental request details.
        </p>
      </div>
    </main>
  );
};

export default RentalRequestsPage;

