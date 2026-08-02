"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  if (success) {
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
            Your payment has been completed successfully.
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
            Your payment was cancelled. You can try again from your rental requests.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to Dashboard
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