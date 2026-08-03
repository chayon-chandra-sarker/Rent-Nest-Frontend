"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  createLandlordRequest,
  type LandlordRequest,
} from "@/service/landlord-request.service";

interface BecomeLandlordCardProps {
  role: "TENANT" | "LANDLORD" | "ADMIN";
  initialRequest?: LandlordRequest | null;
}

const BecomeLandlordCard = ({
  role,
  initialRequest = null,
}: BecomeLandlordCardProps) => {
  const [request, setRequest] =
    useState<LandlordRequest | null>(initialRequest);

  const [loading, setLoading] = useState(false);

  if (role !== "TENANT") {
    return null;
  }

  const handleRequest = async () => {
    try {
      setLoading(true);

      const result = await createLandlordRequest();

      setRequest(result);

      toast.success(
        "Landlord request submitted successfully.",
      );
    } catch (error) {
      console.error(
        "Landlord request error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit landlord request.",
      );
    } finally {
      setLoading(false);
    }
  };

 
  if (request?.status === "PENDING") {
    return (
      <section className="rounded-3xl border border-yellow-500/20 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10">
            <ShieldCheck className="size-5 text-yellow-600" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold">
              Landlord Request Pending
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your request has been submitted successfully.
              Please wait for admin approval.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-600">
              <span className="size-1.5 rounded-full bg-yellow-500" />
              Pending Review
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (request?.status === "APPROVED") {
    return (
      <section className="rounded-3xl border border-green-500/20 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/10">
            <CheckCircle2 className="size-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-base font-bold">
              Landlord Request Approved
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your landlord request has been approved.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (request?.status === "REJECTED") {
    return (
      <section className="rounded-3xl border border-red-500/20 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
            <XCircle className="size-5 text-red-500" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold">
              Landlord Request Rejected
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your previous request was rejected. You can
              submit another request.
            </p>

            <button
              type="button"
              onClick={handleRequest}
              disabled={loading}
              className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}

              {loading
                ? "Submitting..."
                : "Apply Again"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-base font-bold">
              Become a Landlord
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
              Want to list your property on RentNest?
              Submit a request to become a landlord.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRequest}
          disabled={loading}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}

          {loading
            ? "Submitting..."
            : "Become a Landlord"}
        </button>
      </div>
    </section>
  );
};

export default BecomeLandlordCard;