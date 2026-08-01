
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  ReceiptText,
  XCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import {
  getMyPayments,
  MyPayment,
} from "@/service/payment.service";

const TenantPayments = () => {
  const [payments, setPayments] = useState<MyPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyPayments();

        setPayments(data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load payments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);



  const formatAmount = (
    amount: string,
    currency: string
  ) => {
    const symbol = currency === "BDT" ? "৳" : currency;

    return `${symbol}${Number(amount).toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return (
          <CheckCircle2 className="size-4 text-emerald-500" />
        );

      case "FAILED":
        return (
          <XCircle className="size-4 text-red-500" />
        );

      case "PENDING":
        return (
          <AlertCircle className="size-4 text-amber-500" />
        );

      default:
        return (
          <AlertCircle className="size-4 text-muted-foreground" />
        );
    }
  };

  const getStatusClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-500";

      case "FAILED":
        return "border-red-500/20 bg-red-500/10 text-red-500";

      case "PENDING":
        return "border-amber-500/20 bg-amber-500/10 text-amber-500";

      default:
        return "border-border bg-muted text-muted-foreground";
    }
  };


  const completedPayments = payments.filter(
    (payment) =>
      payment.status?.toUpperCase() === "COMPLETED"
  );

  const totalAmount = completedPayments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0
  );


  if (loading) {
    return (
      <section className="min-h-[600px] rounded-[28px] border border-border/60 bg-card shadow-sm">

        <div className="flex min-h-[600px] flex-col items-center justify-center">

          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Loader2 className="size-7 animate-spin text-primary" />
          </div>

          <p className="mt-5 text-sm font-semibold">
            Loading payment history...
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please wait a moment
          </p>

        </div>

      </section>
    );
  }




  if (error) {
    return (
      <section className="rounded-[28px] border border-red-500/20 bg-card p-8 shadow-sm">

        <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

          <div className="flex size-16 items-center justify-center rounded-2xl bg-red-500/10">
            <XCircle className="size-8 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Failed to load payments
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error}
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="space-y-7">



      <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-6 shadow-sm sm:p-8">

        <div className="absolute -right-16 -top-20 size-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 size-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">

              <CreditCard className="size-3.5" />

              Payment Center

            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Payments
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              View your payment history, transaction details
              and completed payments in one place.
            </p>

          </div>

          <div className="hidden size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
            <CreditCard className="size-7" />
          </div>

        </div>

      </div>



      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total Payments */}

        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-muted-foreground">
                Total Payments
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {payments.length}
              </h2>

              <p className="mt-2 text-xs text-muted-foreground">
                All transactions
              </p>

            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <CreditCard className="size-5" />
            </div>

          </div>

        </div>

        {/* Completed */}

        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="absolute -right-8 -top-8 size-24 rounded-full bg-emerald-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-muted-foreground">
                Completed
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {completedPayments.length}
              </h2>

              <p className="mt-2 text-xs text-emerald-500">
                Successful payments
              </p>

            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
              <CheckCircle2 className="size-5" />
            </div>

          </div>

        </div>

        {/* Total Paid */}

        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="absolute -right-8 -top-8 size-24 rounded-full bg-blue-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-muted-foreground">
                Total Paid
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                ৳{totalAmount.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-muted-foreground">
                Completed payment amount
              </p>

            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform duration-300 group-hover:scale-110">
              <ReceiptText className="size-5" />
            </div>

          </div>

        </div>

      </div>


      <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-sm">

        {/* Section Header */}

        <div className="border-b border-border/60 p-5 sm:p-7">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-bold tracking-tight">
                Payment History
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your recent payment transactions.
              </p>

            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-muted-foreground">

              <span className="size-1.5 rounded-full bg-emerald-500" />

              {payments.length} transaction
              {payments.length !== 1 ? "s" : ""}

            </div>

          </div>

        </div>

        {/* Empty State */}

        {payments.length === 0 ? (

          <div className="flex min-h-[350px] flex-col items-center justify-center px-5 text-center">

            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
              <CreditCard className="size-7 text-muted-foreground" />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              No payments yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Your payment history will appear here once
              you complete a payment.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-border/60">

            {payments.map((payment) => (

              <div
                key={payment.transactionId}
                className="group p-5 transition-colors duration-200 hover:bg-muted/20 sm:p-7"
              >

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  {/* Property + Transaction */}

                  <div className="flex min-w-0 items-start gap-4">

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      <CreditCard className="size-5" />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="max-w-[280px] truncate font-semibold">
                          {payment.propertyTitle}
                        </h3>

                        <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">

                        <ReceiptText className="size-3.5 shrink-0" />

                        <span className="max-w-[260px] truncate">
                          {payment.transactionId}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-3">

                    <div className="flex size-9 items-center justify-center rounded-xl bg-muted/50">
                      <CalendarDays className="size-4 text-muted-foreground" />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Payment Date
                      </p>

                      <p className="mt-0.5 text-sm font-semibold">
                        {formatDate(payment.paidAt)}
                      </p>

                    </div>

                  </div>

                  {/* Amount */}

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground xl:text-right">
                      Amount
                    </p>

                    <p className="mt-0.5 text-lg font-bold text-primary xl:text-right">
                      {formatAmount(
                        payment.amount,
                        payment.currency
                      )}
                    </p>

                  </div>

                  {/* Status */}

                  <div className="flex items-center">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                        payment.status
                      )}`}
                    >

                      {getStatusIcon(payment.status)}

                      {payment.status}

                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default TenantPayments;

