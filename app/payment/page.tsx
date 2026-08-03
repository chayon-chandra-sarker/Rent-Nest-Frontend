"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

import { verifyCheckoutSession } from "@/service/payment.service";

type VerificationState =
  | "loading"
  | "success"
  | "error";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const success =
    searchParams.get("success") === "true";

  const canceled =
    searchParams.get("canceled") === "true";

  const sessionId =
    searchParams.get("session_id");

  const [verificationState, setVerificationState] =
    useState<VerificationState>(
      success && sessionId ? "loading" : "success",
    );

  useEffect(() => {
    if (!success || !sessionId) {
      return;
    }

    let cancelled = false;

    const verifyPayment = async () => {
      try {
        await verifyCheckoutSession(sessionId);

        if (!cancelled) {
          setVerificationState("success");
        }
      } catch (error) {
        console.error(
          "Payment verification error:",
          error,
        );

        if (!cancelled) {
          setVerificationState("error");
        }
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [success, sessionId]);

  if (success && verificationState === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="size-9 animate-spin text-primary" />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Verifying Payment
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Please wait while we confirm your payment.
          </p>
        </div>
      </main>
    );
  }

  if (
    success &&
    verificationState === "success"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="size-9 text-emerald-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Payment Successful
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your payment has been completed
            successfully. Your rental is now active.
          </p>

          <Link
            href="/dashboard/rentals"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (canceled) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <XCircle className="size-9 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Payment Cancelled
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your payment was cancelled. You can try
            again from your rental requests.
          </p>

          <Link
            href="/dashboard/rentals"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (
    success &&
    verificationState === "error"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <XCircle className="size-9 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Payment Verification Failed
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your payment may have been successful,
            but we could not verify it right now.
          </p>

          <Link
            href="/dashboard/rentals"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">
        Invalid payment status.
      </p>
    </main>
  );
};

export default PaymentPage;