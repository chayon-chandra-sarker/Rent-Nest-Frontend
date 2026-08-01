
"use client";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Clock3,
  ReceiptText,
  XCircle,
} from "lucide-react";

import { MyPayment } from "@/service/payment.service";

interface RecentPaymentsProps {
  payments: MyPayment[];
  loading: boolean;
}

const RecentPayments = ({
  payments,
  loading,
}: RecentPaymentsProps) => {
  // Latest 3 payments
  const recentPayments = payments.slice(0, 3);

  const formatAmount = (
    amount: string,
    currency: string
  ) => {
    const symbol = currency === "BDT" ? "৳" : currency;

    return `${symbol}${Number(amount || 0).toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatus = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return {
          label: "Completed",
          className:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          icon: <CheckCircle2 className="size-3.5" />,
        };

      case "FAILED":
        return {
          label: "Failed",
          className:
            "bg-red-500/10 text-red-600 dark:text-red-400",
          icon: <XCircle className="size-3.5" />,
        };

      case "PENDING":
        return {
          label: "Pending",
          className:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          icon: <Clock3 className="size-3.5" />,
        };

      default:
        return {
          label: status || "Unknown",
          className:
            "bg-muted text-muted-foreground",
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
            Recent Payments
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest payment activity
          </p>
        </div>

        <CreditCard className="size-5 text-muted-foreground" />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-8 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-muted/50"
            />
          ))}
        </div>
      ) : recentPayments.length === 0 ? (

        /* Empty */
        <div className="mt-8 flex flex-col items-center justify-center text-center">

          <div className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
            <CreditCard className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-sm font-medium">
            No payment activity yet
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your payment history will appear here.
          </p>

        </div>

      ) : (

        /* Payments */
        <div className="mt-5 space-y-3">

          {recentPayments.map((payment) => {

            const status = getStatus(payment.status);

            return (
              <div
                key={payment.transactionId}
                className="rounded-xl border border-border/60 p-4 transition hover:bg-muted/20"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-3">

                  {/* Property */}
                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ReceiptText className="size-4" />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold">
                        {payment.propertyTitle}
                      </h3>

                      <p className="mt-1 truncate text-[10px] text-muted-foreground">
                        {payment.transactionId}
                      </p>

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

                  {/* Amount */}
                  <div>
                    <span className="text-sm font-bold text-primary">
                      {formatAmount(
                        payment.amount,
                        payment.currency
                      )}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">

                    <CalendarDays className="size-3.5" />

                    {formatDate(payment.paidAt)}

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

export default RecentPayments;

