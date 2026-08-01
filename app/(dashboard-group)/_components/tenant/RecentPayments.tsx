
import {
  CalendarDays,
  CreditCard,
  Loader2,
  ReceiptText,
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

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">

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

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="size-5 animate-spin text-primary" />
        </div>
      ) : payments.length > 0 ? (
        <div className="mt-6 space-y-3">

          {payments
            .slice(0, 3)
            .map((payment) => (

              <div
                key={payment.transactionId}
                className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold">
                      {payment.propertyTitle}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">

                      <ReceiptText className="size-3.5 shrink-0" />

                      <span className="truncate">
                        {payment.transactionId}
                      </span>

                    </div>

                  </div>

                  <div className="shrink-0 text-right">

                    <p className="text-sm font-bold text-primary">
                      {payment.currency === "BDT"
                        ? "৳"
                        : payment.currency}{" "}
                      {Number(payment.amount).toLocaleString()}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        payment.status?.toUpperCase() ===
                        "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {payment.status}
                    </span>

                  </div>

                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">

                  <CalendarDays className="size-3.5" />

                  <span>
                    {formatDate(payment.paidAt)}
                  </span>

                </div>

              </div>

            ))}

        </div>
      ) : (
        <div className="mt-8 text-center">

          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted/60">
            <CreditCard className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-sm font-medium">
            No payment activity yet
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Payment history will appear here.
          </p>

        </div>
      )}

    </div>
  );
};

export default RecentPayments;

