
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Send,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  createRentalRequest,
  getMyRentalRequests,
  MyRentalRequest,
} from "@/service/rental.service";

interface RequestRentalButtonProps {
  propertyId: string;
}

const RequestRentalButton = ({
  propertyId,
}: RequestRentalButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const [request, setRequest] =
    useState<MyRentalRequest | null>(null);

  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!propertyId) {
        setChecking(false);
        return;
      }

      try {
        setChecking(true);

        const requests = await getMyRentalRequests();

        const existingRequest = requests.find(
          (item) => item.propertyId === propertyId
        );

        setRequest(existingRequest || null);
      } catch (error) {
        console.error(
          "Failed to check rental request:",
          error
        );
      } finally {
        setChecking(false);
      }
    };

    checkExistingRequest();
  }, [propertyId]);

  const handleRequest = async () => {
    if (!propertyId || loading) return;

    // Already pending or approved
    if (
      request?.status === "PENDING" ||
      request?.status === "APPROVED"
    ) {
      return;
    }

    try {
      setLoading(true);

      const newRequest =
        await createRentalRequest(propertyId);

      setRequest(newRequest);

      toast.success(
        "Rental request sent successfully!"
      );
    } catch (error) {
      console.error(
        "Rental request error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to send rental request";

      // Backend says request already exists
      if (
        message
          .toLowerCase()
          .includes("rental request already exists")
      ) {
        toast.info(
          "You have already requested this property."
        );

        // Refresh existing request
        try {
          const requests =
            await getMyRentalRequests();

          const existingRequest = requests.find(
            (item) =>
              item.propertyId === propertyId
          );

          setRequest(existingRequest || null);
        } catch (refreshError) {
          console.error(
            "Failed to refresh rental requests:",
            refreshError
          );
        }
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  
  if (checking) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-muted px-5 py-3 text-sm font-bold text-muted-foreground"
      >
        <Loader2 className="size-4 animate-spin" />
        Checking Request...
      </button>
    );
  }


  if (request?.status === "PENDING") {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-amber-500/10 px-5 py-3 text-sm font-bold text-amber-600 dark:text-amber-400"
      >
        <Clock3 className="size-4" />
        Request Pending
      </button>
    );
  }


  if (request?.status === "APPROVED") {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-400"
      >
        <CheckCircle2 className="size-4" />
        Rental Approved
      </button>
    );
  }

  if (request?.status === "REJECTED") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-red-500">
          <XCircle className="size-4" />
          Previous request was rejected
        </div>

        <button
          type="button"
          onClick={handleRequest}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Request Again
            </>
          )}
        </button>
      </div>
    );
  }


  return (
    <button
      type="button"
      onClick={handleRequest}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending Request...
        </>
      ) : (
        <>
          <Send className="size-4" />
          Request to Rent
        </>
      )}
    </button>
  );
};

export default RequestRentalButton;

