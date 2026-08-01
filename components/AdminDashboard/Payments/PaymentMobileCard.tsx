import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  ReceiptText,
  User,
  XCircle,
} from "lucide-react";

import { Payment } from "@/service/payment.service";

interface PaymentMobileCardProps {
  payment: Payment;
}

const getStatusConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return {
        label: "Completed",
        className:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
        dot: "bg-emerald-500",
      };

    case "FAILED":
      return {
        label: "Failed",
        className:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
        dot: "bg-red-500",
      };

    default:
      return {
        label: "Pending",
        className:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
        dot: "bg-amber-500",
      };
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PaymentMobileCard = ({
  payment,
}: PaymentMobileCardProps) => {
  const status = getStatusConfig(payment.status);

  return (
    <article className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* Tenant */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold">
              {payment.tenant.name}
            </h2>

            <div className="mt-1 flex items-center gap-1.5">
              <Mail className="size-3.5 text-muted-foreground" />

              <span className="truncate text-xs text-muted-foreground">
                {payment.tenant.email}
              </span>
            </div>
          </div>

        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold ${status.className}`}
        >
          <span
            className={`size-1.5 rounded-full ${status.dot}`}
          />

          {status.label}
        </span>

      </div>

      {/* Property */}
      <div className="mt-5 rounded-2xl border border-border/50 bg-muted/20 p-4">

        <div className="flex items-start gap-3">

          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-bold">
              {payment.property.title}
            </p>

            <div className="mt-1.5 flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />

              <span className="truncate text-xs text-muted-foreground">
                {payment.property.location}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Amount + Paid */}
      <div className="mt-4 grid grid-cols-2 gap-3">

        <div className="rounded-xl border border-border/60 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Amount
          </p>

          <p className="mt-1 text-base font-extrabold text-primary">
            {payment.currency === "BDT"
              ? "৳"
              : payment.currency}{" "}
            {Number(payment.amount).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-border/60 p-3.5">

          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Paid
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" />

            <p className="text-xs font-bold">
              {formatDate(payment.paidAt)}
            </p>
          </div>

        </div>

      </div>

      {/* Transaction */}
      <div className="mt-4 rounded-xl bg-muted/30 p-3.5">

        <div className="flex items-start gap-2">

          <ReceiptText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">

            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Transaction ID
            </p>

            <p className="mt-1 truncate text-xs font-semibold">
              {payment.transactionId}
            </p>

          </div>

        </div>

      </div>

    </article>
  );
};

export default PaymentMobileCard;